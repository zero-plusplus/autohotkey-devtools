import { RuleName, MatchRule, Repository, Repositories, BeginEndRule, Utilities, PatternsRule } from '../../types';

// [Escape Sequences](https://www.autohotkey.com/docs/v2/misc/EscapeChar.htm)
const commonEscapeSequences = [ '``', '`;', '`:', '`{', '`n', '`r', '`b', '`t', '`s', '`v', '`a', '`f' ] as const;

export function createLiteralRepositories({ name, include }: Utilities): Repositories {
  return {
    [Repository.String]: ((): PatternsRule => {
      return {
        patterns: [
          include(Repository.DoubleString),
          include(Repository.SingleString),
        ],
      };
    })(),
    [Repository.DoubleString]: ((): BeginEndRule => {
      return {
        name: name(RuleName.DoubleString),
        begin: '(?<!`)(")',
        beginCaptures: {
          1: { name: name(RuleName.StringBegin) },
        },
        end: '(?<!`)(")',
        endCaptures: {
          1: { name: name(RuleName.StringEnd) },
        },
        patterns: [ include(Repository.DoubleStringEscapeSequence) ],
      };
    })(),
    [Repository.DoubleStringEscapeSequence]: ((): MatchRule => {
      const escapeSequences = [ ...commonEscapeSequences, `\"` ];
      return {
        name: name(RuleName.DoubleStringEscapeSequence),
        match: `(${escapeSequences.join('|')})`,
      };
    })(),
    [Repository.SingleString]: {
      name: name(RuleName.DoubleString),
      begin: '(?<!`)(\')',
      beginCaptures: {
        1: { name: name(RuleName.StringBegin) },
      },
      end: '(?<!`)(\')',
      endCaptures: {
        1: { name: name(RuleName.StringEnd) },
      },
      patterns: [ include(Repository.SingleStringEscapeSequence) ],
    },
    [Repository.SingleStringEscapeSequence]: ((): MatchRule => {
      const escapeSequences = [ ...commonEscapeSequences, `\'` ];
      return {
        name: name(RuleName.SingleStringEscapeSequence),
        match: `(${escapeSequences.join('|')})`,
      };
    })(),
  };
}
