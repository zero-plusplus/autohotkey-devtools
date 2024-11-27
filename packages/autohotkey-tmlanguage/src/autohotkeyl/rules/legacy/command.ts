import { hasFlag } from '@zero-plusplus/utilities/src';
import { CommandFlag, HighlightType, Repository, RuleName, StyleName } from '../../../constants';
import { alt, anyChar, anyChars0, capture, char, group, groupMany0, ignoreCase, inlineSpaces0, inlineSpaces1, lookahead, lookbehind, negativeLookahead, optional, optseq, ordalt, seq, startAnchor, wordBound } from '../../../oniguruma';
import type { BeginWhileRule, CommandDefinition, CommandParameter, CommandSignature, NameRule, Rule, ScopeName } from '../../../types';
import { includeRule, name, nameRule, patternsRule } from '../../../utils';

export interface Placeholder {
  lineEndAnchor: string;
  statementScopeName: string;
  commandScopeName: RuleName;
  commandStatementBeginAnchor: string;
  commandArgumentEndLineAnchor: string;
  commandArgument: string;
  commandLastArgument: string;
  commandExpressionArgumentWithOneTrueBrace: string;
  continuationOperators: string[];
}
export function createCommandLikeStatementRule(scopeName: ScopeName, definitions: CommandDefinition[], placeholder: Placeholder): BeginWhileRule {
  const sortedDefinitions = definitions.sort((a, b) => b.name.length - a.name.length);

  return {
    name: name(scopeName, Repository.CommandStatement),
    begin: capture(seq(
      placeholder.commandStatementBeginAnchor,
      // command name
      ignoreCase(alt(...sortedDefinitions.map((definition) => definition.name))),
      negativeLookahead(char('(')),
      optseq(
        capture(anyChars0()),
        placeholder.commandArgumentEndLineAnchor,
      ),
      placeholder.lineEndAnchor,
    )),
    beginCaptures: {
      1: patternsRule(
        includeRule(Repository.Comment),
        ...sortedDefinitions.flatMap((definition) => {
          return definition.signatures.map((signature) => createCommandRule(scopeName, definition, signature, placeholder));
        }),
      ),
    },
    while: seq(
      startAnchor(),
      groupMany0(seq(
        inlineSpaces0(),
        capture(char(',')),
        inlineSpaces0(),
        optional(capture(placeholder.commandArgument)),
      )),
      placeholder.commandArgumentEndLineAnchor,
    ),
    whileCaptures: {
      1: patternsRule(includeRule(Repository.Comma)),
      2: patternsRule(includeRule(Repository.CommandArgument)),
    },
    patterns: [ includeRule(Repository.Comment) ],
  };
}

// #region helpers
function createCommandRule(scopeName: ScopeName, definition: CommandDefinition, signature: CommandSignature, placeholder: Placeholder): Rule {
  const capturedCommandNamePattern = seq(
    placeholder.commandStatementBeginAnchor,
    capture(ignoreCase(definition.name)),
    negativeLookahead(char('(')),
  );
  const capturedParametersPattern = signature.parameters.reduceRight<string>((prev, parameter, i, parameters) => {
    const capturedCommaSeparator = seq(inlineSpaces0(), capture(char(',')));
    const capturedFirstSeparator = group(alt(
      capturedCommaSeparator,
      inlineSpaces1(),
    ));
    const separator = i === 0 ? capturedFirstSeparator : capturedCommaSeparator;

    const isLastParameter = parameters.length - 1 === i;
    return seq(
      separator,
      inlineSpaces0(),
      optional(capture(parameterToOniguruma(parameter, isLastParameter, placeholder))),
      prev !== '' ? optional(prev) : '',
    );
  }, '');

  return {
    begin: lookahead(seq(
      placeholder.commandStatementBeginAnchor,
      ignoreCase(definition.name),
    )),
    end: seq(capturedCommandNamePattern, optional(capturedParametersPattern)),
    endCaptures: Object.fromEntries([
      definitionToCommandName(scopeName, definition, placeholder),
      ...parametersToRules(scopeName, signature),
    ].map((rule, i) => [ i + 1, rule ])),
  };
}
function definitionToCommandName(scopeName: ScopeName, definition: CommandDefinition, placeholder: Placeholder): NameRule {
  if (hasFlag(definition.flags, CommandFlag.Deprecated)) {
    return nameRule(scopeName, placeholder.commandScopeName, StyleName.Strikethrough);
  }
  return nameRule(scopeName, placeholder.commandScopeName);
}
function parameterToOniguruma(parameter: CommandParameter, isLastParameter: boolean, placeholder: Placeholder): string {
  if (isLastParameter) {
    if (parameter.type === HighlightType.ExpressionWithOneTrueBrace) {
      return placeholder.commandExpressionArgumentWithOneTrueBrace;
    }
    if (parameter.type !== HighlightType.UnquotedStringShouldEscapeComma) {
      return placeholder.commandLastArgument;
    }
  }
  return placeholder.commandArgument;
}
function parameterToRule(scopeName: ScopeName, parameter: CommandParameter, isLastParameter: boolean): Rule {
  const defaultArgumentRule = isLastParameter ? includeRule(Repository.CommandLastArgument) : includeRule(Repository.CommandArgument);
  const keywordName = name(scopeName, RuleName.UnquotedString, StyleName.Strong);

  switch (parameter.type) {
    case HighlightType.None:
    case HighlightType.Blank: return nameRule(scopeName, StyleName.Invalid);
    case HighlightType.UnquotedString: {
      if (parameter.values && 0 < parameter.values.length) {
        return patternsRule(keywordsToRule(keywordName, parameter.values, isLastParameter), defaultArgumentRule);
      }
      return patternsRule(defaultArgumentRule);
    }
    case HighlightType.UnquotedStringShouldEscapeComma: return patternsRule(includeRule(Repository.CommandArgument));
    case HighlightType.LabelName: return nameRule(scopeName, Repository.CommandArgument, RuleName.LabelName);
    case HighlightType.Enum: return patternsRule(keywordsToRule(keywordName, parameter.values!, isLastParameter), defaultArgumentRule);
    case HighlightType.Input:
    case HighlightType.Output:
    case HighlightType.Expression: return patternsRule(includeRule(Repository.Expression));
    case HighlightType.CombiOptions:
    case HighlightType.GuiOptions:
    case HighlightType.GuiSubCommand:
    case HighlightType.Options:
    case HighlightType.Style:
      return patternsRule(defaultArgumentRule);
    case HighlightType.SubCommand:
      const subcommandName = name(scopeName, RuleName.SubCommandName);
      if (!parameter.values || parameter.values.length === 0) {
        throw Error(`The definition does not include a subcommand name.`);
      }
      return patternsRule(keywordsToRule(subcommandName, parameter.values, isLastParameter), defaultArgumentRule);
    default: break;
  }
  throw Error(`Specified an unknown highligh type.\nSpecified: "${String(parameter.type)}"`);
}
function parametersToRules(scopeName: ScopeName, signature: CommandSignature): Rule[] {
  return signature.parameters.flatMap((parameter, i, parameters) => {
    const isLastParameter = parameters.length - 1 === i;
    return [
      patternsRule(includeRule(Repository.Comma)),
      parameterToRule(scopeName, parameter, isLastParameter),
    ];
  });
}
function keywordsToRule(name: string, keywords: string[], isLastParameter: boolean): Rule {
  return {
    name,
    match: seq(
      lookbehind(wordBound()),
      ignoreCase(ordalt(...keywords)),
      isLastParameter
        ? negativeLookahead(anyChar())
        : wordBound(),
    ),
  };
}
// #endregion helpers

