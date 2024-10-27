import { CommandArgsType, Repository, RuleName } from '../../constants';
import { commandInfos } from '../../definition';
import { alt, anyChars0, anyChars1, capture, char, endAnchor, escapeOnigurumaTexts, group, groupMany0, groupMany1, ignoreCase, inlineSpace, inlineSpaces0, inlineSpaces1, lookahead, lookbehind, many1, negativeLookahead, negativeLookbehind, negChar, negChars0, opt, ordalt, seq, startAnchor, wordBound } from '../../oniguruma';
import type { BeginWhileRule, CommandInfo, IncludeRule, MatchRule, PatternsRule, Repositories, Rule, ScopeName } from '../../types';
import { createUtilities, getEscapeSequencesInfo, getOperators, getStatementBegin, patternsRule } from '../../utils';
import * as constants_v1 from '../constants';

export function createRepositories(scopeName: ScopeName): Repositories {
  const { includeRule, name, nameRule } = createUtilities(scopeName);

  const { legacyText: legacyTextEscapeSequence } = getEscapeSequencesInfo(scopeName);
  const statementBegin = getStatementBegin(scopeName);
  const operators = getOperators(scopeName);
  const argumentsPatterns = [
    // In some cases, highlighting is not applied in a captures even if a repository with a complex patterns is specified?
    // This problem is solved by specifying the rule directly
    {
      match: '(,)',
      captures: {
        1: nameRule(Repository.CommandArgument, RuleName.Comma),
      },
    },
    includeRule(Repository.CommandArgument),
  ];

  // #region common matchers
  const legacyTextChar = group(alt(
    negChar('\\s', ',', '%', '`', ';', ':'),
    seq(inlineSpace(), negativeLookahead(';')),
  ));
  const legacyEndLine = lookahead(alt(
    seq(inlineSpaces1(), negativeLookahead(char('`')), char(';')),
    seq(inlineSpaces0(), endAnchor()),
  ));
  const brackets = group(alt(
    seq(char('('), negChars0('\\r', '\\n', ')'), char(')')),
    seq(char('['), negChars0('\\r', '\\n', ']'), char(']')),
    seq(char('{'), negChars0('\\r', '\\n', '}'), char('}')),
  ));
  const commandLegacyArgument = groupMany0(alt(
    brackets,
    legacyTextChar,
    char(...legacyTextEscapeSequence, '%'),
  ));
  const commandExpressionArgument = groupMany0(alt(
    brackets,
    negChar('\\r', '\\n', ','),
  ));

  const expressionOperators = ignoreCase(ordalt(...escapeOnigurumaTexts(operators.filter((operator) => operator !== ','))));
  const whileLegacyArgument = seq(
    startAnchor(),
    inlineSpaces0(),
    capture(char(',')),
    inlineSpaces0(),
    capture(anyChars0()),
    legacyEndLine,
  );
  const whileExpression = seq(
    startAnchor(),
    inlineSpaces0(),
    capture(expressionOperators),
    opt(group(seq(
      inlineSpaces0(),
      capture(commandExpressionArgument),
      inlineSpaces0(),
      opt(capture(char(','))),
      inlineSpaces0(),
      capture(anyChars0()),
    ))),
    legacyEndLine,
  );
  const continuationArguments: Pick<BeginWhileRule, 'while' | 'whileCaptures' | 'patterns'> = {
    while: alt(whileLegacyArgument, whileExpression),
    whileCaptures: {
      1: nameRule(Repository.CommandArgument, RuleName.Comma),
      2: {
        name: name(Repository.CommandArgument),
        patterns: argumentsPatterns,
      },
      3: nameRule(Repository.CommandArgument, RuleName.Operator),
      4: {
        name: name(Repository.CommandArgument),
        patterns: [ includeRule(Repository.Expression) ],
      },
      5: nameRule(Repository.CommandArgument, RuleName.Comma),
      6: {
        name: name(Repository.CommandArgument),
        patterns: argumentsPatterns,
      },
    },
    patterns: [
      {
        begin: seq(startAnchor(), inlineSpaces0(), capture(char(',')), inlineSpaces0()),
        end: legacyEndLine,
        captures: {
          1: nameRule(Repository.CommandArgument, RuleName.Comma),
        },
        patterns: argumentsPatterns,
      },
      {
        begin: seq(startAnchor(), inlineSpaces0(), capture(expressionOperators), inlineSpaces0()),
        end: legacyEndLine,
        captures: {
          1: nameRule(RuleName.Operator),
        },
        patterns: [
          includeRule(Repository.Expression),
          ...argumentsPatterns,
        ],
      },
    ],
  };
  // #endregion common matchers

  return {
    [Repository.Command]: patternsRule(
      ...commandInfos.map((commandInfo) => {
        return { include: `#${createRepositoryNameByCommandInfo(commandInfo)}` };
      }),
      includeRule(Repository.CommonCommand),
    ),
    [Repository.CommonCommand]: ((): BeginWhileRule => {
      const commandName = seq(ordalt(...constants_v1.commandNames), lookahead(wordBound()));

      return {
        name: name(Repository.CommandStatement),
        begin: ignoreCase(seq(
          statementBegin,
          capture(commandName),
          opt(group(alt(
            inlineSpace(),
            capture(char(',')),
          ))),
          inlineSpaces0(),
          capture(anyChars0()),
          legacyEndLine,
        )),
        beginCaptures: {
          1: nameRule(RuleName.CommandName),
          2: nameRule(Repository.CommandArgument, RuleName.Comma),
          3: { patterns: argumentsPatterns },
          4: nameRule(Repository.CommandArgument, RuleName.Comma),
        },
        ...continuationArguments,
      };
    })(),
    [Repository.CommandArgument]: patternsRule(
      includeRule(Repository.PercentExpression),
      includeRule(Repository.Dereference),
      includeRule(Repository.LegacyTextEscapeSequence),
      includeRule(Repository.CommandArgumentText),
      includeRule(Repository.InLineComment),
    ),
    [Repository.CommandArgumentText]: ((): MatchRule => {
      return {
        name: name(RuleName.LegacyText),
        match: many1(legacyTextChar),
      };
    })(),
    ...Object.fromEntries(commandInfos.map((commandInfo): [ string, Rule ] => {
      const [ commandName, ...args ] = commandInfo;
      const repositoryName = createRepositoryNameByCommandInfo(commandInfo);

      // #region helpers
      const createArgsRegExpText = (shouldCapture = true): string => {
        const captureOrGroup = shouldCapture ? capture : group;

        const spaceSeparator = inlineSpaces1();
        const commaSeparator = captureOrGroup(char(','));
        const firstSeparator = group(alt(
          spaceSeparator,
          seq(inlineSpaces0(), commaSeparator, inlineSpaces0()),
        ));
        const argsSeparator = group(seq(
          inlineSpaces0(),
          seq(negativeLookahead(char('`')), commaSeparator),
          inlineSpaces0(),
        ));

        return args.reduce<string>((prev, current, i) => {
          const separator = i === 0 ? firstSeparator : argsSeparator;
          const argType = Array.isArray(current) ? current[0] : current;

          const isSubCommand = typeof argType === 'string';
          if (isSubCommand) {
            prev += opt(seq(separator, captureOrGroup(argType)));
            return prev;
          }

          let commandArgument = commandLegacyArgument;
          switch (argType) {
            case CommandArgsType.None:
            case CommandArgsType.Expression: commandArgument = commandExpressionArgument; break;
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
          captures: { 1: nameRule(RuleName.LegacyText, RuleName.Strong) },
        };
      };
      const getArgumentRuleByType = (argType: CommandArgsType, keywords: string[]): PatternsRule => {
        switch (argType) {
          case CommandArgsType.None: return patternsRule(nameRule(RuleName.LegacyText, RuleName.Invalid));
          case CommandArgsType.Expression: return patternsRule(includeRule(Repository.Expression));
          case CommandArgsType.Input:
          case CommandArgsType.Output: return patternsRule(
            includeRule(Repository.BuiltInVariable),
            includeRule(Repository.Variable),
          );
          case CommandArgsType.ControlStyle: return patternsRule(includeRule(Repository.CommandArgumentControlStyleText));
          case CommandArgsType.Legacy: {
            const commandArgumentRule: IncludeRule = includeRule(Repository.CommandArgument);

            return 0 < keywords.length
              ? patternsRule(createKeywordMatchRule(keywords), commandArgumentRule)
              : patternsRule(commandArgumentRule);
          }
          case CommandArgsType.Enum: {
            if (keywords.length === 0) {
              throw Error('Must specify one or more keywords.');
            }

            return {
              name: name(Repository.CommandArgument),
              patterns: [
                createKeywordMatchRule(keywords),
                includeRule(Repository.PercentExpression),
                includeRule(Repository.Dereference),
                { name: name(RuleName.LegacyText, RuleName.Invalid), match: anyChars1() },
              ],
            };
          }
        }
        throw Error(`Specified an unknown argument type.\nSpecified: "${String(argType)}"`);
      };
      // #endregion helpers

      const argsWithCaptures = createArgsRegExpText();
      const argsWithoutCaptures = createArgsRegExpText(false);
      return [
        repositoryName, {
          name: name(Repository.CommandStatement),
          begin: ignoreCase(seq(
            statementBegin,
            capture(commandName),
            opt(capture(argsWithoutCaptures)),
            inlineSpaces0(),
            capture(anyChars0()),
            legacyEndLine,
          )),
          beginCaptures: {
            1: nameRule(RuleName.CommandName),
            2: {
              patterns: [
                {
                  match: argsWithCaptures,
                  captures: Object.fromEntries(args.flatMap((arg, i): Array<[ string, Rule ]> => {
                    const separatorKey = `${(i * 2) + 1}`;
                    const argKey = `${(i * 2) + 2}`;

                    return [
                      [ separatorKey, nameRule(Repository.CommandArgument, RuleName.Comma) ], ((): [ string, Rule ] => {
                        const argType = Array.isArray(arg) ? arg[0] : arg;
                        const keywords = (Array.isArray(arg) ? arg.slice(1) : []) as string[];

                        const isSubCommand = typeof argType === 'string';
                        if (isSubCommand) {
                          return [ argKey, nameRule(RuleName.SubCommandName) ];
                        }

                        return [ argKey, getArgumentRuleByType(argType, keywords) ];
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
                  name: name(Repository.CommandArgument, RuleName.LegacyText, RuleName.Invalid),
                  match: alt(
                    negChar('\\r', '\\n', ';'),
                    groupMany1(seq(negativeLookbehind(inlineSpace()), char(';'))),
                    negativeLookahead(seq(inlineSpaces1(), char(';'))),
                  ),
                },
              ],
            },
          },
          ...continuationArguments,
        },
      ];
    })),
  };
}

// #region helpers
function createRepositoryNameByCommandInfo(commandInfo: CommandInfo): string {
  return commandInfo.reduce<string>((prev, current) => {
    if (typeof current === 'string') {
      return `${prev}.${current.toLowerCase()}`;
    }
    return prev;
  }, 'command');
}
// #endregion helpers
