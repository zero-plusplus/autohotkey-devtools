import { Repositories, PatternsRule, ScopeName, Rule, CommandInfo, MatchRule, BeginWhileRule } from '../../types';
import { commandNames, Repository, RuleName, CommandArgsType } from '../../constants';
import { createUtilities, escapeOnigurumaText, getCommandInfos, getLegacyTextChar } from '../../utils';

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

  const legacyEndLine = '(?=\\s+(?!\`);|\\s*$)';
  const brackets = '(?:\\([^\\r\\n\\)]*\\)|\\[[^\\r\\n\\]]*\\]|\\{[^\\r\\n\\}]*\\})';
  const commandLegacyArgument = `(?:(?:${brackets}|${legacyTextChar}|${legacyTextEscapeSequence.join('|')}|%)*)`;
  const commandExpressionArgument = `(?:(?:${brackets}|[^\\r\\n,])*)`;
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
      const sortedCommandNames = [ ...commandNames ].sort((a, b) => b.length - a.length);
      const commandNameCapture = `(${sortedCommandNames.join('|')})(?=\\b)`;
      const expressionOperators = operators.filter((operator) => operator !== ',').map((operator) => escapeOnigurumaText(operator)).join('|');

      const whileLegacyArgument = `^\\s*(,)\\s*(.*)${legacyEndLine}`;
      const whileExpression = `^\\s*(${expressionOperators})\\s*(.*)\\s*(,)?\\s*(.*))?${legacyEndLine})))`;

      return {
        name: name(RuleName.Command),
        begin: `(?i)${statementBegin}${commandNameCapture}(?:\\s|(,))?\\s*(.*)${legacyEndLine}`,
        beginCaptures: {
          1: nameRule(RuleName.CommandName),
          2: nameRule(RuleName.CommandArgumentSeparator),
          3: { patterns: argumentsPatterns },
          4: nameRule(RuleName.CommandArgumentSeparator),
        },
        while: `(?:${whileLegacyArgument}|${whileExpression})`,
        whileCaptures: {
          1: nameRule(RuleName.CommandArgumentSeparator),
          2: { patterns: argumentsPatterns },
          3: nameRule(RuleName.Operator),
          4: includeRule(Repository.Expression),
          5: nameRule(RuleName.CommandArgumentSeparator),
          6: { patterns: argumentsPatterns },
        },
        patterns: [
          {
            begin: `^\\s*(,)\\s*`,
            end: legacyEndLine,
            captures: {
              1: nameRule(RuleName.CommandArgumentSeparator),
            },
            patterns: argumentsPatterns,
          },
          {
            begin: `^\\s*(${expressionOperators})\\s*`,
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
        match: `${legacyTextChar}+`,
      };
    })(),
    [Repository.CommandArgumentSeparator]: ((): MatchRule => {
      return {
        match: '(,)',
        captures: {
          1: nameRule(RuleName.CommandArgumentSeparator),
        },
      };
    }),
    ...Object.fromEntries(commandInfos.map((commandInfo): [ string, Rule ] => {
      const [ commandName, ...args ] = commandInfo;
      const repositoryName = createRepositoryNameByCommandInfo(commandInfo);

      // #region helpers
      const createArgsRegExpText = (capture = true): string => {
        const firstSeparator = `(?:\\s+|\\s*${capture ? '(,)' : ','}\\s*)`;
        const argsSeparator = `(?:\\s*(?<!\`)${capture ? '(,)' : ','}\\s*)`;

        return args.reduce<string>((prev, current, i) => {
          const separator = i === 0 ? firstSeparator : argsSeparator;
          const argType = Array.isArray(current) ? current[0] : current;

          const isSubCommand = typeof argType === 'string';
          if (isSubCommand) {
            prev += capture
              ? `(?:${separator}(${argType}))?`
              : `(?:${separator}(?:${argType}))?`;
            return prev;
          }

          let commandArgument = commandLegacyArgument;
          switch (argType) {
            case CommandArgsType.None:
            case CommandArgsType.Expression: commandArgument = commandExpressionArgument; break;
          }
          prev += capture
            ? `(?:${separator}(${commandArgument}))?`
            : `(?:${separator}(?:${commandArgument}))?`;
          return prev;
        }, '(?i)');
      };
      const getArgumentRuleByType = (argType: CommandArgsType, keywords: string[]): PatternsRule => {
        switch (argType) {
          case CommandArgsType.None: return {
            patterns: [ nameRule(RuleName.InvalidCommandArgument) ],
          };
          case CommandArgsType.Expression: return {
            patterns: [ includeRule(Repository.Expression) ],
          };
          case CommandArgsType.Input:
          case CommandArgsType.Output: return {
            patterns: [
              includeRule(Repository.BuiltInVariable),
              includeRule(Repository.Variable),
            ],
          };
          case CommandArgsType.ControlStyle: return { patterns: [ includeRule(Repository.ControlStyle) ] };
          case CommandArgsType.Legacy: {
            return 0 < keywords.length
              ? { patterns: [ { match: `(?i)(?<=\\b)(${keywords.join('|')})(?=\\b)`, captures: { 1: nameRule(RuleName.CommandArgumentKeyword) } }, includeRule(Repository.CommandArgument) ] }
              : { patterns: [ includeRule(Repository.CommandArgument) ] };
          }
          case CommandArgsType.Enum: {
            if (keywords.length === 0) {
              throw Error('Must specify one or more keywords.');
            }

            return {
              patterns: [
                {
                  match: `(?i)(?<=\\b)(${keywords.join('|')})(?=\\b)`,
                  captures: { 1: nameRule(RuleName.CommandArgumentKeyword) },
                },
                includeRule(Repository.PercentExpression),
                includeRule(Repository.Dereference),
                { name: name(RuleName.InvalidCommandArgument), match: '(.+)' },
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
          begin: `(?i)${statementBegin}(${commandName})(${argsWithoutCaptures})?\\s*(.*)${legacyEndLine}`,
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
                  match: '(?:[^\\r\\n;]|(?<!\\s);)+(?!\\s;)',
                },
              ],
            },
          },
          while: `^\\s*(,)\\s*(.*)${legacyEndLine}`,
          whileCaptures: {
            1: nameRule(RuleName.CommandArgumentSeparator),
            2: { patterns: argumentsPatterns },
          },
        },
      ];
    })),
  };
}
