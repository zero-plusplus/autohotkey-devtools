import { RuleName, MatchRule, Repository, Repositories, BeginEndRule, PatternsRule, ScopeName } from '../../types';
import * as ahkl from '../../autohotkeyl/repository/literal';
import { createUtilities } from '../../utils';

// [Escape Sequences](https://www.autohotkey.com/docs/v2/misc/EscapeChar.htm)
export const commonEscapeSequences: string[] = [ '``', '`;', '`:', '`{', '`n', '`r', '`b', '`t', '`s', '`v', '`a', '`f' ] as const;
export const doubleStringEscapeSequences: string[] = [ ...commonEscapeSequences, '`\"' ] as const;
export const singleStringEscapeSequences: string[] = [ ...commonEscapeSequences, `\`'` ] as const;

export function createLiteralRepositories(scopeName: ScopeName): Repositories {
  const { name, nameRule, includeRule } = createUtilities(scopeName);
  const ahklRepositories = ahkl.createLiteralRepositories(scopeName);

  return {
    [Repository.String]: ((): PatternsRule => {
      return {
        patterns: [
          includeRule(Repository.DoubleString),
          includeRule(Repository.SingleString),
        ],
      };
    })(),
    [Repository.IllegalStringContent]: ahklRepositories[Repository.IllegalStringContent],
    [Repository.IllegalStringNewLine]: ahklRepositories[Repository.IllegalStringNewLine],
    [Repository.DoubleString]: ((): BeginEndRule => {
      return {
        name: name(RuleName.DoubleString),
        begin: '(?<!`)(")',
        beginCaptures: {
          1: nameRule(RuleName.StringBegin),
        },
        end: '(?<!`)(")',
        endCaptures: {
          1: nameRule(RuleName.StringEnd),
        },
        patterns: [
          includeRule(Repository.IllegalStringNewLine),
          includeRule(Repository.IllegalStringContent),
          includeRule(Repository.DoubleStringEscapeSequence),
        ],
      };
    })(),
    [Repository.DoubleStringEscapeSequence]: ((): MatchRule => {
      const escapeSequences = [ ...commonEscapeSequences, '`\"' ];
      return {
        name: name(RuleName.DoubleStringEscapeSequence),
        match: `(${escapeSequences.join('|')})(?!\\r\\n|\\n)`,
      };
    })(),
    [Repository.SingleString]: {
      name: name(RuleName.SingleString),
      begin: '(?<!`)(\')',
      beginCaptures: {
        1: { name: name(RuleName.StringBegin) },
      },
      end: '(?<!`)(\')',
      endCaptures: {
        1: { name: name(RuleName.StringEnd) },
      },
      patterns: [
        includeRule(Repository.IllegalStringNewLine),
        includeRule(Repository.IllegalStringContent),
        includeRule(Repository.SingleStringEscapeSequence),
      ],
    },
    [Repository.SingleStringEscapeSequence]: ((): MatchRule => {
      const escapeSequences = [ ...commonEscapeSequences, `\`'` ];
      return {
        name: name(RuleName.SingleStringEscapeSequence),
        match: `(${escapeSequences.join('|')})(?!\\r\\n|\\n)`,
      };
    })(),
  };
}
