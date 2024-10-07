import { Repository, Repositories, PatternsRule, ScopeName, RuleName, Rule, CommandArgsType, CommandInfo, MatchRule } from '../../types';
import { createUtilities, getCommandInfos, getLegacyTextChar } from '../../utils';

export function createRepositories(scopeName: ScopeName): Repositories {
  const { getEscapeSequencesInfo, getStatementBegin, includeRule, name, nameRule } = createUtilities(scopeName);
  const legacyText = getLegacyTextChar();
  const commandInfos = getCommandInfos();
  const statementBegin = getStatementBegin();
  const escapeSequencesInfo = getEscapeSequencesInfo();
  const createRepositoryNameByCommandInfo = (commandInfo: CommandInfo): string => {
    return commandInfo.reduce<string>((prev, current) => {
      if (typeof current === 'string') {
        return `${prev}.${current.toLowerCase()}`;
      }
      return prev;
    }, 'command');
  };

  const brackets = '(?:\\([^\\r\\n\\)]*\\)|\\[[^\\r\\n\\]]*\\]|\\{[^\\r\\n\\}]*\\})';
  const commandLegacyArgument = `(?:(?:${brackets}|${legacyText}|${escapeSequencesInfo.legacyText.join('|')}|%)*)`;
  const commandExpressionArgument = `(?:(?:${brackets}|[^\\r\\n,])*)`;

  return {
    [Repository.Command]: ((): PatternsRule => {
      return {
        patterns: commandInfos.map((commandInfo) => {
          return { include: `#${createRepositoryNameByCommandInfo(commandInfo)}` };
        }),
      };
    })(),
    [Repository.CommandArgument]: ((): PatternsRule => {
      return {
        patterns: [
          includeRule(Repository.Dereference),
          includeRule(Repository.CommandArgumentText),
        ],
      };
    })(),
    [Repository.CommandArgumentText]: ((): MatchRule => {
      return {
        name: name(RuleName.LegacyText),
        match: `(?:${commandLegacyArgument})+`,
      };
    })(),
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
      // #endregion helpers

      const argsWithCaptures = createArgsRegExpText();
      const argsWithoutCaptures = createArgsRegExpText(false);
      return [
        repositoryName, {
          name: name(RuleName.Command),
          match: `(?i)${statementBegin}(${commandName})(${argsWithoutCaptures})?([^\\r\\n;]*)`,
          captures: {
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
                        const keywords = Array.isArray(arg) ? arg.slice(1) : [];

                        const isSubCommand = typeof argType === 'string';
                        if (isSubCommand) {
                          return [ argKey, nameRule(RuleName.SubCommandName) ];
                        }

                        switch (argType) {
                          case CommandArgsType.None: return [ argKey, { name: name(RuleName.InvalidCommandArgument) } ];
                          case CommandArgsType.Expression: return [ argKey, { patterns: [ includeRule(Repository.Expression) ] } ];
                          case CommandArgsType.Input:
                          case CommandArgsType.Output: return [ argKey, { patterns: [ includeRule(Repository.BuiltInVariable), includeRule(Repository.Variable) ] } ];
                          case CommandArgsType.ControlStyle: return [ argKey, { patterns: [ includeRule(Repository.ControlStyle) ] } ];
                          case CommandArgsType.Legacy: {
                            return 0 < keywords.length
                              ? [ argKey, { patterns: [ { match: `(?i)(?<=\\b)(${keywords.join('|')})(?=\\b)`, captures: { 1: nameRule(RuleName.CommandArgumentKeyword) } }, includeRule(Repository.CommandArgument) ] } ]
                              : [ argKey, { patterns: [ includeRule(Repository.CommandArgument) ] } ];
                          }
                          case CommandArgsType.Enum: {
                            if (keywords.length === 0) {
                              throw Error('Must specify one or more keywords.');
                            }

                            const invalidRule: MatchRule = { name: name(RuleName.InvalidCommandArgument), match: '(.+)' };
                            return [
                              argKey, {
                                patterns: [
                                  {
                                    match: `(?i)(?<=\\b)(${keywords.join('|')})(?=\\b)`,
                                    captures: { 1: nameRule(RuleName.CommandArgumentKeyword) },
                                  },
                                  includeRule(Repository.PercentExpression),
                                  includeRule(Repository.Dereference),
                                  invalidRule,
                                ],
                              },
                            ];
                          }
                          default: break;
                        }
                        throw Error(`Specified an unknown argument type.\nSpecified: "${String(argType)}"`);
                      })(),
                    ];
                  })),
                },
              ],
            },
            3: nameRule(RuleName.InvalidCommandArgument),
          },
        },
      ];
    })),
  };
}
