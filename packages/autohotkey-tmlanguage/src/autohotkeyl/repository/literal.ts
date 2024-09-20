import { RuleName, MatchRule, Repository, Repositories, BeginEndRule, Utilities, PatternsRule } from '../../types';

// [Escape Sequences](https://www.autohotkey.com/docs/v1/misc/EscapeChar.htm)
const commonEscapeSequences = [ '`,', '`%', '``', '`;', '`::', '`n', '`r', '`b', '`t', '`v', '`a', '`f' ] as const;

export function createLiteralRepositories({ name, include }: Utilities): Repositories {
  return {
    [Repository.String]: ((): PatternsRule => {
      return {
        patterns: [ include(Repository.DoubleString) ],
      };
    })(),
    [Repository.DoubleString]: ((): BeginEndRule => {
      return {
        name: name(RuleName.DoubleString),
        begin: '(?<!")"',
        end: '(?<!")"',
        patterns: [ include(Repository.DoubleStringEscapeSequence) ],
      };
    })(),
    [Repository.DoubleStringEscapeSequence]: ((): MatchRule => {
      const escapeSequences = [ ...commonEscapeSequences, `""` ];
      return {
        name: name(RuleName.DoubleStringEscapeSequence),
        match: `(${escapeSequences.join('|')})`,
      };
    })(),
  };
}
