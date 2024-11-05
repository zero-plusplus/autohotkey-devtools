import { hasFlag } from '@zero-plusplus/utilities/src';
import { CommandFlag, HighlightType, Repository, RuleName } from '../../constants';
import { alt, anyChars0, capture, char, escapeOnigurumaTexts, group, groupMany0, ignoreCase, inlineSpaces0, inlineSpaces1, lookahead, lookbehind, negativeLookahead, optional, optseq, ordalt, seq, startAnchor, wordBound } from '../../oniguruma';
import type { BeginWhileRule, Captures, CommandDefinition, CommandParameter, CommandSignature, MatchRule, NameRule, Rule, ScopeName } from '../../types';
import { includeRule, name, nameRule, patternsRule } from '../../utils';

interface PlaceHolder {
  lineEndAnchor: string;
  commandStatementBeginAnchor: string;
  commandArgumentEndLineAnchor: string;
  commandArgument: string;
  commandLastArgument: string;
  expressionArgument: string;
  continuationOperators: string[];
}
export function createCommandStatementRule(scopeName: ScopeName, definitions: CommandDefinition[], placeholder: PlaceHolder): BeginWhileRule {
  return {
    name: name(scopeName, Repository.CommandStatement),
    begin: capture(seq(
      placeholder.commandStatementBeginAnchor,
      // command name
      ignoreCase(ordalt(...definitions.map((definition) => definition.name))),
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
        ...definitions.flatMap((definition) => {
          return definition.signatures.map((signature) => createCommandRule(scopeName, definition, signature, placeholder));
        }),
      ),
    },
    while: seq(
      startAnchor(),
      // continuation expression
      optional(capture(seq(
        inlineSpaces0(),
        group(ordalt(...escapeOnigurumaTexts(placeholder.continuationOperators))),
        inlineSpaces0(),
        optional(placeholder.expressionArgument),
      ))),
      // continuation unquoted arguments
      groupMany0(seq(
        inlineSpaces0(),
        capture(char(',')),
        inlineSpaces0(),
        optional(capture(placeholder.commandArgument)),
      )),
      placeholder.commandArgumentEndLineAnchor,
      placeholder.lineEndAnchor,
    ),
    whileCaptures: {
      1: {
        name: name(scopeName, Repository.CommandArgument),
        patterns: [ includeRule(Repository.Expression) ],
      },
      2: {
        name: name(scopeName, Repository.CommandArgument),
        patterns: [ includeRule(Repository.Comma) ],
      },
      3: {
        name: name(scopeName, Repository.CommandArgument),
        patterns: [
          includeRule(Repository.Comma),
          includeRule(Repository.CommandArgument),
        ],
      },
    },
    patterns: [ includeRule(Repository.Comment) ],
  };
}
export function createCommandRule(scopeName: ScopeName, definition: CommandDefinition, signature: CommandSignature, placeholder: PlaceHolder): Rule {
  const capturedCommandNamePattern = seq(
    placeholder.commandStatementBeginAnchor,
    capture(ignoreCase(definition.name)),
    negativeLookahead(char('(')),
  );
  const capturedParametersPattern = seq(...signature.parameters.map((parameter, i, parameters) => {
    const commaSeparator = seq(inlineSpaces0(), char(','));
    const firstSeparator = alt(inlineSpaces1(), char(','));
    const separator = i === 0 ? capture(firstSeparator) : capture(commaSeparator);

    const isLastParameter = parameters.length - 1 === i;
    return optseq(
      separator,
      inlineSpaces0(),
      optional(parameterToOniguruma(parameter, isLastParameter, placeholder)),
      placeholder.lineEndAnchor,
    );
  }));

  return {
    begin: lookahead(seq(
      placeholder.commandStatementBeginAnchor,
      ignoreCase(definition.name),
    )),
    end: seq(capturedCommandNamePattern, capturedParametersPattern),
    endCaptures: signatureToCaptures(scopeName, definition, signature),
  };
}
export function createUnquotedString(scopeName: ScopeName, unquotedString: string): MatchRule {
  return {
    name: name(scopeName, RuleName.UnquotedString),
    match: unquotedString,
  };
}

// #region helpers
function signatureToCaptures(scopeName: ScopeName, definition: CommandDefinition, signature: CommandSignature): Captures {
  return Object.fromEntries([
    definitionToCommandName(scopeName, definition),
    ...parametersToRules(scopeName, signature),
  ].map((rule, i) => {
    const i_1base = i + 1;
    return [ i_1base, rule ];
  }));
}
function definitionToCommandName(scopeName: ScopeName, definition: CommandDefinition): NameRule {
  if (hasFlag(definition.flags, CommandFlag.Deprecated)) {
    return nameRule(scopeName, RuleName.CommandName, RuleName.Strikethrough);
  }
  return nameRule(scopeName, RuleName.CommandName);
}
function parameterToOniguruma(parameter: CommandParameter, isLastParameter: boolean, placeholder: PlaceHolder): string {
  if (isLastParameter) {
    if (parameter.type !== HighlightType.UnquotedStringShouldEscapeComma) {
      return capture(placeholder.commandLastArgument);
    }
  }
  return capture(placeholder.commandArgument);
}
function parameterToRule(scopeName: ScopeName, parameter: CommandParameter, isLastParameter: boolean): Rule {
  const defaultArgumentRule = isLastParameter ? includeRule(Repository.CommandLastArgument) : includeRule(Repository.CommandArgument);

  switch (parameter.type) {
    case HighlightType.None:
    case HighlightType.Blank: return nameRule(scopeName, RuleName.Invalid);
    case HighlightType.UnquotedString: {
      if (parameter.values) {
        return patternsRule(keywordsToRule(scopeName, parameter.values), defaultArgumentRule);
      }
      return patternsRule(defaultArgumentRule);
    }
    case HighlightType.UnquotedStringShouldEscapeComma: return patternsRule(includeRule(Repository.CommandArgument));
    case HighlightType.Enum: {
      return patternsRule(keywordsToRule(scopeName, parameter.values!), defaultArgumentRule);
    }
    case HighlightType.Expression: return patternsRule(includeRule(Repository.Expression));
    case HighlightType.CombiOptions:
    case HighlightType.GuiOptions:
    case HighlightType.GuiSubCommand:
    case HighlightType.Input:
    case HighlightType.Options:
    case HighlightType.Output:
    case HighlightType.Style:
    case HighlightType.SubCommand:
      return patternsRule(defaultArgumentRule);
    default: break;
  }
  throw Error(`Specified an unknown highligh type.\nSpecified: "${String(parameter.type)}"`);
}
function parametersToRules(scopeName: ScopeName, signature: CommandSignature): Rule[] {
  return signature.parameters.flatMap((parameter, i, parameters) => {
    const isLastParameter = parameters.length - 1 === i;
    return [
      {
        name: name(scopeName, Repository.CommandArgument),
        patterns: [ patternsRule(includeRule(Repository.Comma)) ],
      },
      {
        name: name(scopeName, Repository.CommandArgument),
        patterns: [ parameterToRule(scopeName, parameter, isLastParameter) ],
      },
    ];
  });
}
function keywordsToRule(scopeName: ScopeName, keywords: string[]): Rule {
  return {
    name: name(scopeName, RuleName.UnquotedString, RuleName.Strong),
    match: seq(
      lookbehind(wordBound()),
      ignoreCase(ordalt(...keywords)),
      lookahead(wordBound()),
    ),
  };
}
// #endregion helpers

