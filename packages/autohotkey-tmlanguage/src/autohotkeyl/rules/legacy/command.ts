import { hasFlag } from '@zero-plusplus/utilities/src';
import type { SetOptional } from 'type-fest';
import { CommandFlag, HighlightType, Repository, RuleName, StyleName } from '../../../constants';
import { alt, anyChar, anyChars0, capture, char, group, groupMany0, ignoreCase, inlineSpace, inlineSpaces0, inlineSpaces1, keyword, lookahead, lookbehind, negativeLookahead, optional, ordalt, seq, startAnchor, wordBound } from '../../../oniguruma';
import type { BeginWhileRule, CommandDefinition, CommandParameter, CommandSignature, ElementName, MatchRule, NameRule, PatternsRule, Rule, ScopeName } from '../../../types';
import { includeRule, name, nameRule, patternsRule } from '../../../utils';
import * as patterns_v1 from '../../patterns';

interface Placeholder {
  startAnchor: string;
  endAnchor: string;
  statementElementName: ElementName;
  commandElementName: ElementName;
}
export function createCommandLikeStatementRule(scopeName: ScopeName, definitions: CommandDefinition[], placeholder: Placeholder): BeginWhileRule {
  const sortedDefinitions = definitions.sort((a, b) => b.name.length - a.name.length);

  return {
    name: name(scopeName, placeholder.statementElementName),
    begin: capture(seq(
      lookbehind(placeholder.startAnchor),
      ignoreCase(alt(...sortedDefinitions.map((definition) => definition.name))),
      lookahead(alt(
        seq(inlineSpaces1()),
        seq(inlineSpaces0(), char(',')),
      )),
      optional(capture(anyChars0())),
      placeholder.endAnchor,
    )),
    beginCaptures: {
      1: patternsRule(
        includeRule(Repository.Comment),
        ...sortedDefinitions.flatMap((definition) => {
          return definition.signatures.map((signature) => createCommandLikeRule(scopeName, definition, signature, placeholder));
        }),
        createCommandNames(scopeName, definitions, {
          commandElementName: placeholder.commandElementName,
          startAnchor: placeholder.startAnchor,
          endAnchor: placeholder.endAnchor,
        }),
      ),
    },
    while: seq(
      startAnchor(),
      groupMany0(seq(
        inlineSpaces0(),
        capture(char(',')),
        inlineSpaces0(),
        optional(capture(patterns_v1.commandArgumentPattern)),
      )),
      placeholder.endAnchor,
    ),
    whileCaptures: {
      1: patternsRule(includeRule(Repository.Comma)),
      2: patternsRule(includeRule(Repository.CommandArgument)),
    },
    patterns: [ includeRule(Repository.Comment) ],
  };
}
export function createCommandLikeRule(scopeName: ScopeName, definition: CommandDefinition, signature: CommandSignature, placeholder: Placeholder): Rule {
  const capturedCommandNamePattern = seq(
    lookbehind(placeholder.startAnchor),
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

  const subcommands = signature.parameters.filter((parameter) => parameter.type === HighlightType.SubCommand);
  return {
    begin: lookahead(seq(
      lookbehind(placeholder.startAnchor),
      ignoreCase(definition.name),
      ...1 <= subcommands.length
        ? [ group(alt(inlineSpace(), char(','))), inlineSpaces0(), keyword(String(subcommands[0]?.values![0])) ]
        : [],
    )),
    end: seq(capturedCommandNamePattern, optional(capturedParametersPattern)),
    endCaptures: Object.fromEntries([
      definitionToCommandName(scopeName, definition, placeholder),
      ...parametersToRules(scopeName, signature, placeholder),
    ].map((rule, i) => [ i + 1, rule ])),
  };
}
export function createCommandNames(scopeName: ScopeName, definitions: CommandDefinition[], placeholder: SetOptional<Placeholder, 'statementElementName'>): PatternsRule {
  const commandNames = definitions.filter((definition) => !hasFlag(definition.flags, CommandFlag.Deprecated)).map((definition) => definition.name);
  const deprecatedCommandNames = definitions.filter((definition) => hasFlag(definition.flags, CommandFlag.Deprecated)).map((definition) => definition.name);

  const targets: [ [ string[], boolean ], [ string[], boolean ] ] = [ [ commandNames, false ], [ deprecatedCommandNames, true ] ];
  return patternsRule(...targets.map(([ names, isDeprecated ]): MatchRule => {
    return {
      ...placeholder.statementElementName ? nameRule(scopeName, placeholder.statementElementName) : {},
      match: seq(
        lookbehind(placeholder.startAnchor),
        inlineSpaces0(),
        capture(keyword(...names)),
      ),
      captures: {
        1: isDeprecated
          ? nameRule(scopeName, placeholder.commandElementName, StyleName.Strikethrough)
          : nameRule(scopeName, placeholder.commandElementName),
      },
    };
  }));
}

// #region helpers
function definitionToCommandName(scopeName: ScopeName, definition: CommandDefinition, placeholder: Placeholder): NameRule {
  if (hasFlag(definition.flags, CommandFlag.Deprecated)) {
    return nameRule(scopeName, placeholder.commandElementName, StyleName.Strikethrough);
  }
  return nameRule(scopeName, placeholder.commandElementName);
}
function parameterToOniguruma(parameter: CommandParameter, isLastParameter: boolean, placeholder: Placeholder): string {
  if (isLastParameter) {
    if (parameter.type === HighlightType.ExpressionWithOneTrueBrace) {
      return patterns_v1.expressionWithOneTrueBraceArgumentPattern;
    }
    if (parameter.type !== HighlightType.UnquotedStringShouldEscapeComma) {
      return patterns_v1.lastArgumentPattern;
    }
  }

  switch (parameter.type) {
    case HighlightType.SubCommand: return keyword(parameter.values![0]!);
    case HighlightType.Input:
    case HighlightType.Output:
    case HighlightType.Expression: return patterns_v1.expressionArgumentPattern;
    default: break;
  }
  return patterns_v1.commandArgumentPattern;
}
function parameterToRule(scopeName: ScopeName, parameter: CommandParameter, isLastParameter: boolean, placeholder: Placeholder): Rule {
  const defaultArgumentRule = isLastParameter ? includeRule(Repository.CommandLastArgument) : includeRule(Repository.CommandArgument);
  const invalidRule: MatchRule = { name: name(scopeName, StyleName.Invalid), match: anyChars0() };
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
    case HighlightType.UnquotedStringShouldEscapeComma: return patternsRule(
      { name: name(scopeName, RuleName.UnquotedString, StyleName.Escape), match: '`,' },
      includeRule(Repository.CommandArgument),
    );
    case HighlightType.LabelName: return nameRule(scopeName, Repository.CommandArgument, RuleName.LabelName);
    case HighlightType.Enum: return patternsRule(keywordsToRule(keywordName, parameter.values!, isLastParameter), defaultArgumentRule);
    case HighlightType.Input:
    case HighlightType.Output:
    case HighlightType.Expression: return patternsRule(
      includeRule(Repository.PercentExpression),
      includeRule(Repository.Expressions),
    );
    case HighlightType.Options:
      if (!parameter.values || parameter.values.length === 0) {
        return defaultArgumentRule;
      }

      const optionsRule: MatchRule = {
        name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
        match: keyword(...parameter.values),
      };
      return patternsRule(
        optionsRule,
        defaultArgumentRule,
      );
    case HighlightType.CombiOptions:
      if (!parameter.values || parameter.values.length === 0) {
        return defaultArgumentRule;
      }
      const combiOptionsRule: MatchRule = {
        name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
        match: ignoreCase(ordalt(...parameter.values)),
      };
      return patternsRule(
        combiOptionsRule,
        defaultArgumentRule,
      );
    case HighlightType.GuiOptions:
    case HighlightType.GuiSubCommand:
    case HighlightType.Style:
      return patternsRule(defaultArgumentRule);
    case HighlightType.SubCommand:
      if (!parameter.values || parameter.values.length === 0) {
        throw Error(`The definition does not include a subcommand name.`);
      }
      return patternsRule(
        keywordsToRule(name(scopeName, placeholder.commandElementName), parameter.values, isLastParameter),
        invalidRule,
      );
    default: break;
  }
  throw Error(`Specified an unknown highligh type.\nSpecified: "${String(parameter.type)}"`);
}
function parametersToRules(scopeName: ScopeName, signature: CommandSignature, placeholder: Placeholder): Rule[] {
  return signature.parameters.flatMap((parameter, i, parameters) => {
    const isLastParameter = parameters.length - 1 === i;
    return [
      patternsRule(includeRule(Repository.Comma)),
      parameterToRule(scopeName, parameter, isLastParameter, placeholder),
    ];
  });
}
function keywordsToRule(name: ElementName, keywords: string[], isLastParameter: boolean): Rule {
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

