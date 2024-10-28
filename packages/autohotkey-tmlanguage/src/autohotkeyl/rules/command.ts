import { HighlightType, Repository, RuleName } from '../../constants';
import { alt, anyChars0, anyChars1, capture, char, escapeOnigurumaTexts, group, groupMany1, ignoreCase, inlineSpace, inlineSpaces0, inlineSpaces1, lookahead, lookbehind, many1, negativeLookahead, opt, ordalt, seq, startAnchor, wordBound } from '../../oniguruma';
import type { BeginWhileRule, CommandDefinition, CommandSignature, MatchRule, PatternsRule, Rule, ScopeName } from '../../types';
import { includeRule, name, nameRule, patternsRule } from '../../utils';
import * as constants_v1 from '../constants';
import * as patterns_v1 from '../patterns';

export function createCommandRule(scopeName: ScopeName, definition: CommandDefinition, signature: CommandSignature): BeginWhileRule {
  // #region helpers
  const createArgsRegExpText = (shouldCapture = true): string => {
    const captureOrGroup = shouldCapture ? capture : group;

    const commaSeparator = captureOrGroup(char(','));
    const firstSeparator = group(alt(
      inlineSpaces1(),
      seq(inlineSpaces0(), commaSeparator, inlineSpaces0()),
    ));
    const argsSeparator = group(seq(
      inlineSpaces0(),
      seq(negativeLookahead(char('`')), commaSeparator),
      inlineSpaces0(),
    ));

    return signature.parameters.reduce<string>((prev, current, i) => {
      const separator = i === 0 ? firstSeparator : argsSeparator;

      const isSubCommand = current.type === HighlightType.SubCommand;
      if (isSubCommand) {
        const subCommandName = current.values![0]!;
        prev += opt(seq(separator, captureOrGroup(subCommandName)));
        return prev;
      }

      let commandArgument = patterns_v1.commandUnquotedStringArgument;
      switch (current.type) {
        case HighlightType.None:
        case HighlightType.Expression: commandArgument = patterns_v1.commandExpressionArgument; break;
      }
      prev += opt(seq(separator, captureOrGroup(commandArgument)));
      return prev;
    }, ignoreCase());
  };
  const createKeywordMatchRule = (keywords: string[]): MatchRule => {
    return {
      match: ignoreCase(seq(
        lookbehind(wordBound()),
        capture(ordalt(...keywords)),
        lookahead(wordBound()),
      )),
      captures: { 1: nameRule(scopeName, RuleName.UnquotedString, RuleName.Strong) },
    };
  };
  const getArgumentRuleByType = (argType: HighlightType, keywords: string[]): PatternsRule => {
    switch (argType) {
      case HighlightType.None: return patternsRule();
      case HighlightType.Blank: return patternsRule(nameRule(scopeName, RuleName.UnquotedString, RuleName.Invalid));
      case HighlightType.UnquotedString: {
        const commandArgumentRule = includeRule(Repository.CommandArgument);

        return 0 < keywords.length
          ? patternsRule(createKeywordMatchRule(keywords), commandArgumentRule)
          : patternsRule(commandArgumentRule);
      }
      case HighlightType.Expression: return patternsRule(includeRule(Repository.Expression));
      case HighlightType.Input:
      case HighlightType.Output: return patternsRule(
        includeRule(Repository.BuiltInVariable),
        includeRule(Repository.Variable),
      );
      case HighlightType.ControlStyle: return patternsRule(includeRule(Repository.CommandArgumentControlStyleText));
      case HighlightType.Enum: {
        if (keywords.length === 0) {
          throw Error('Must specify one or more keywords.');
        }

        return {
          patterns: [
            createKeywordMatchRule(keywords),
            includeRule(Repository.PercentExpression),
            includeRule(Repository.Dereference),
            { name: name(scopeName, RuleName.UnquotedString, RuleName.Invalid), match: anyChars1() },
          ],
        };
      }
    }
    throw Error(`Specified an unknown argument type.\nSpecified: "${String(argType)}"`);
  };
  // #endregion helpers

  const argsWithCaptures = createArgsRegExpText();
  const argsWithoutCaptures = createArgsRegExpText(false);
  return {
    name: name(scopeName, Repository.CommandStatement),
    begin: ignoreCase(seq(
      patterns_v1.statementBeginAnchor,
      capture(definition.name),
      opt(capture(argsWithoutCaptures)),
      inlineSpaces0(),
      capture(anyChars0()),
      patterns_v1.commandArgumentEndLineAnchor,
    )),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.CommandName),
      2: {
        name: name(scopeName, Repository.CommandArgument),
        patterns: [
          {
            match: argsWithCaptures,
            captures: Object.fromEntries(signature.parameters.flatMap((parameter, i): Array<[ string, Rule ]> => {
              const separatorKey = `${(i * 2) + 1}`;
              const argKey = `${(i * 2) + 2}`;

              return [
                [ separatorKey, nameRule(scopeName, RuleName.Separator) ], ((): [ string, Rule ] => {
                  const isSubCommand = parameter.type === HighlightType.SubCommand;
                  if (isSubCommand) {
                    return [ argKey, nameRule(scopeName, RuleName.SubCommandName) ];
                  }

                  return [ argKey, getArgumentRuleByType(parameter.type, parameter.values ?? []) ];
                })(),
              ];
            })),
          },
        ],
      },
      3: {
        patterns: [
          includeRule(Repository.InLineComment),
          {
            name: name(scopeName, Repository.CommandArgument, RuleName.UnquotedString, RuleName.Invalid),
            match: groupMany1(alt(
              patterns_v1.unquotedStringChar,
              char(','),
            )),
          },
        ],
      },
    },
    ...createContinuationArgumentsRuleSnippet(scopeName),
  };
}
export function createCommandCommonRule(scopeName: ScopeName, names: readonly string[]): BeginWhileRule {
  const argumentsPatternsRule = createArgumentsPatternsRule(scopeName);
  const continuationArgumentsRuleSnippet = createContinuationArgumentsRuleSnippet(scopeName);
  const commandName = seq(ordalt(...names), lookahead(wordBound()));

  return {
    name: name(scopeName, Repository.CommandStatement),
    begin: ignoreCase(seq(
      patterns_v1.statementBeginAnchor,
      capture(commandName),
      opt(group(alt(
        inlineSpace(),
        capture(char(',')),
      ))),
      inlineSpaces0(),
      capture(anyChars0()),
      patterns_v1.commandArgumentEndLineAnchor,
    )),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.CommandName),
      2: nameRule(scopeName, Repository.CommandArgument, RuleName.Comma),
      3: patternsRule(argumentsPatternsRule),
      4: nameRule(scopeName, Repository.CommandArgument, RuleName.Comma),
    },
    ...continuationArgumentsRuleSnippet,
  };
}
export function createArgumentsPatternsRule(scopeName: ScopeName): PatternsRule {
  // In some cases, highlighting is not applied in a captures even if a repository with a complex patterns is specified?
  // This problem is solved by specifying the rule directly
  return patternsRule(
    {
      match: '(,)',
      captures: {
        1: nameRule(scopeName, Repository.CommandArgument, RuleName.Separator),
      },
    },
    includeRule(Repository.CommandArgument),
  );
}
export function createContinuationArgumentsRuleSnippet(scopeName: ScopeName): Pick<BeginWhileRule, 'while' | 'whileCaptures' | 'patterns'> {
  const whileLegacyArgument = seq(
    startAnchor(),
    inlineSpaces0(),
    capture(char(',')),
    inlineSpaces0(),
    capture(anyChars0()),
    patterns_v1.commandArgumentEndLineAnchor,
  );
  const whileExpression = seq(
    startAnchor(),
    inlineSpaces0(),
    capture(ordalt(...escapeOnigurumaTexts(constants_v1.operators))),
    opt(group(seq(
      inlineSpaces0(),
      capture(patterns_v1.commandExpressionArgument),
      inlineSpaces0(),
      opt(capture(char(','))),
      inlineSpaces0(),
      capture(anyChars0()),
    ))),
    patterns_v1.commandArgumentEndLineAnchor,
  );
  const argumentsPatternsRule = createArgumentsPatternsRule(scopeName);

  return {
    while: alt(whileLegacyArgument, whileExpression),
    whileCaptures: {
      1: nameRule(scopeName, Repository.CommandArgument, RuleName.Separator),
      2: {
        ...argumentsPatternsRule,
        name: name(scopeName, Repository.CommandArgument),
      },
      3: nameRule(scopeName, Repository.CommandArgument, RuleName.Operator),
      4: {
        name: name(scopeName, Repository.CommandArgument),
        patterns: [ includeRule(Repository.Expression) ],
      },
      5: nameRule(scopeName, Repository.CommandArgument, RuleName.Separator),
      6: {
        ...argumentsPatternsRule,
        name: name(scopeName, Repository.CommandArgument),
      },
    },
    patterns: [
      {
        ...argumentsPatternsRule,
        begin: seq(startAnchor(), inlineSpaces0(), capture(char(',')), inlineSpaces0()),
        end: patterns_v1.commandArgumentEndLineAnchor,
        captures: {
          1: nameRule(scopeName, Repository.CommandArgument, RuleName.Separator),
        },
      },
      {
        begin: seq(startAnchor(), inlineSpaces0(), capture(ordalt(...escapeOnigurumaTexts(constants_v1.operators))), inlineSpaces0()),
        end: patterns_v1.commandArgumentEndLineAnchor,
        captures: {
          1: nameRule(scopeName, RuleName.Operator),
        },
        patterns: [
          includeRule(Repository.Expression),
          ...argumentsPatternsRule.patterns,
        ],
      },
    ],
  };
}
export function createUnquotedString(scopeName: ScopeName, unquotedStringChar: string): MatchRule {
  return {
    name: name(scopeName, RuleName.UnquotedString),
    match: many1(unquotedStringChar),
  };
}
