import { CommandArgsType, commandNames, Repository, RuleName } from '../../constants';
import { alt, anyChars0, anyChars1, capture, char, endAnchor, escapeOnigurumaTexts, ignoreCase, inlineSpace, inlineSpaces0, inlineSpaces1, lookahead, lookbehind, many0, many1, negativeLookahead, negativeLookbehind, negChar, negChars0, noCapture, opt, ordalt, seq, startAnchor, wordBound } from '../../oniguruma';
import type { BeginWhileRule, CommandInfo, IncludeRule, MatchRule, PatternsRule, Repositories, Rule, ScopeName } from '../../types';
import { createUtilities, getCommandInfos, getLegacyTextChar, patternsRule } from '../../utils';

export function createRepositories(scopeName: ScopeName): Repositories {
  const {
    getOperators,
    getEscapeSequencesInfo,
    getStatementBegin,
    includeRule,
    name,
    nameRule,
  } = createUtilities(scopeName);
  const commandInfos = getCommandInfos();
  const { legacyText: legacyTextEscapeSequence } = getEscapeSequencesInfo();
  const legacyTextChar = getLegacyTextChar();
  const statementBegin = getStatementBegin();
  const operators = getOperators();
  const createRepositoryNameByCommandInfo = (commandInfo: CommandInfo): string => {
    return commandInfo.reduce<string>((prev, current) => {
      if (typeof current === 'string') {
        return `${prev}.${current.toLowerCase()}`;
      }
      return prev;
    }, 'command');
  };

  const legacyEndLine = lookahead(alt(
    seq(inlineSpaces1(), negativeLookahead(char('`')), char(';')),
    seq(inlineSpaces0(), endAnchor()),
  ));

  const brackets = noCapture(alt(
    seq(char('('), negChars0('\\r', '\\n', ')'), char(')')),
    seq(char('['), negChars0('\\r', '\\n', ']'), char(']')),
    seq(char('{'), negChars0('\\r', '\\n', '}'), char('}')),
  ));

  const commandLegacyArgument = many0(noCapture(alt(
    brackets,
    legacyTextChar,
    char(...legacyTextEscapeSequence, '%'),
  )));
  const commandExpressionArgument = many0(noCapture(alt(
    brackets,
    negChar('\\r', '\\n', ','),
  )));
  const argumentsPatterns = [
    // In some cases, highlighting is not applied in a captures even if a repository with a complex patterns is specified?
    // This problem is solved by specifying the rule directly
    {
      match: '(,)',
      captures: {
        1: nameRule(RuleName.CommandArgumentSeparator),
      },
    },
    includeRule(Repository.CommandArgument),
  ];

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
    opt(noCapture(seq(
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
      1: nameRule(RuleName.CommandArgumentSeparator),
      2: { patterns: argumentsPatterns },
      3: nameRule(RuleName.Operator),
      4: { patterns: [ includeRule(Repository.Expression) ] },
      5: nameRule(RuleName.CommandArgumentSeparator),
      6: { patterns: argumentsPatterns },
    },
    patterns: [
      {
        begin: seq(startAnchor(), inlineSpaces0(), capture(char(',')), inlineSpaces0()),
        end: legacyEndLine,
        captures: {
          1: nameRule(RuleName.CommandArgumentSeparator),
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

  return {
    [Repository.Command]: ((): PatternsRule => {
      return {
        patterns: [
          ...commandInfos.map((commandInfo) => {
            return { include: `#${createRepositoryNameByCommandInfo(commandInfo)}` };
          }),
          includeRule(Repository.CommonCommand),
        ],
      };
    })(),
    [Repository.CommonCommand]: ((): BeginWhileRule => {
      const commandName = seq(ordalt(...commandNames), lookahead(wordBound()));

      return {
        name: name(RuleName.Command),
        begin: ignoreCase(seq(
          statementBegin,
          capture(commandName),
          opt(noCapture(alt(
            inlineSpace(),
            capture(char(',')),
          ))),
          inlineSpaces0(),
          capture(anyChars0()),
          legacyEndLine,
        )),
        beginCaptures: {
          1: nameRule(RuleName.CommandName),
          2: nameRule(RuleName.CommandArgumentSeparator),
          3: { patterns: argumentsPatterns },
          4: nameRule(RuleName.CommandArgumentSeparator),
        },
        ...continuationArguments,
      };
    })(),
    [Repository.CommandArgument]: ((): PatternsRule => {
      return {
        patterns: [
          includeRule(Repository.PercentExpression),
          includeRule(Repository.Dereference),
          includeRule(Repository.LegacyTextEscapeSequence),
          includeRule(Repository.CommandArgumentText),
          includeRule(Repository.InLineComment),
        ],
      };
    })(),
    [Repository.CommandArgumentText]: ((): MatchRule => {
      return {
        name: name(RuleName.LegacyText),
        match: many1(legacyTextChar),
      };
    })(),
    [Repository.CommandArgumentSeparator]: ((): MatchRule => {
      return {
        match: capture(char(',')),
        captures: {
          1: nameRule(RuleName.CommandArgumentSeparator),
        },
      };
    }),
    ...Object.fromEntries(commandInfos.map((commandInfo): [ string, Rule ] => {
      const [ commandName, ...args ] = commandInfo;
      const repositoryName = createRepositoryNameByCommandInfo(commandInfo);

      // #region helpers
      const createArgsRegExpText = (shouldCapture = true): string => {
        const group = shouldCapture ? capture : noCapture;

        const spaceSeparator = inlineSpaces1();
        const commaSeparator = group(char(','));
        const firstSeparator = noCapture(alt(
          spaceSeparator,
          seq(inlineSpaces0(), commaSeparator, inlineSpaces0()),
        ));
        const argsSeparator = noCapture(seq(
          inlineSpaces0(),
          seq(negativeLookahead(char('`')), commaSeparator),
          inlineSpaces0(),
        ));

        return args.reduce<string>((prev, current, i) => {
          const separator = i === 0 ? firstSeparator : argsSeparator;
          const argType = Array.isArray(current) ? current[0] : current;

          const isSubCommand = typeof argType === 'string';
          if (isSubCommand) {
            prev += opt(seq(separator, group(argType)));
            return prev;
          }

          let commandArgument = commandLegacyArgument;
          switch (argType) {
            case CommandArgsType.None:
            case CommandArgsType.Expression: commandArgument = commandExpressionArgument; break;
          }
          prev += opt(seq(separator, group(commandArgument)));
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
          captures: { 1: nameRule(RuleName.CommandArgumentKeyword) },
        };
      };
      const getArgumentRuleByType = (argType: CommandArgsType, keywords: string[]): PatternsRule => {
        switch (argType) {
          case CommandArgsType.None: return patternsRule(nameRule(RuleName.InvalidCommandArgument));
          case CommandArgsType.Expression: return patternsRule(includeRule(Repository.Expression));
          case CommandArgsType.Input:
          case CommandArgsType.Output: return patternsRule(
            includeRule(Repository.BuiltInVariable),
            includeRule(Repository.Variable),
          );
          case CommandArgsType.ControlStyle: return patternsRule(includeRule(Repository.ControlStyle));
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
              patterns: [
                createKeywordMatchRule(keywords),
                includeRule(Repository.PercentExpression),
                includeRule(Repository.Dereference),
                { name: name(RuleName.InvalidCommandArgument), match: anyChars1() },
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
          name: name(RuleName.Command),
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
                      [ separatorKey, nameRule(RuleName.CommandArgumentSeparator) ], ((): [ string, Rule ] => {
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
                  name: name(RuleName.InvalidCommandArgument),
                  match: alt(
                    negChar('\\r', '\\n', ';'),
                    many1(noCapture(seq(negativeLookbehind(inlineSpace()), char(';')))),
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
