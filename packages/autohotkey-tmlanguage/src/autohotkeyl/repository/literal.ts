import { RuleName, MatchRule, Repository, Repositories, BeginEndRule, PatternsRule, ScopeName } from '../../types';
import { createUtilities } from '../../utils';

// [Escape Sequences](https://www.autohotkey.com/docs/v1/misc/EscapeChar.htm)
export const commonEscapeSequences: string[] = [ '`,', '`%', '``', '`;', '`::', '`r', '`n', '`b', '`t', '`v', '`a', '`f' ] as const;
export const doubleStringEscapeSequences: string[] = [ ...commonEscapeSequences, `""` ] as const;

export function createLiteralRepositories(scopeName: ScopeName): Repositories {
  const { name, nameRule, includeRule } = createUtilities(scopeName);

  return {
    [Repository.String]: ((): PatternsRule => {
      return {
        patterns: [ includeRule(Repository.DoubleString) ],
      };
    })(),
    [Repository.DoubleString]: ((): BeginEndRule => {
      return {
        name: name(RuleName.DoubleString),
        begin: '(?<!")(")',
        beginCaptures: {
          1: nameRule(RuleName.StringBegin),
        },
        end: '(")(?!")',
        endCaptures: {
          1: nameRule(RuleName.StringEnd),
        },
        patterns: [
          includeRule(Repository.InvalidStringNewLine),
          includeRule(Repository.InvalidStringContent),
          includeRule(Repository.DoubleStringEscapeSequence),
        ],
      };
    })(),
    [Repository.InvalidStringContent]: ((): MatchRule => {
      return {
        match: '(.)(?=\\r\\n|\\n)',
        captures: {
          1: nameRule(RuleName.IllegalSingleLineStringContent),
        },
      };
    })(),
    [Repository.InvalidStringNewLine]: ((): PatternsRule => {
      return {
        patterns: [
          {
            match: '(\\r\\n)',
            captures: {
              1: nameRule(RuleName.IllegalStringNewLine),
            },
          },
          {
            match: '(\\r|\\n)',
            captures: {
              1: nameRule(RuleName.IllegalStringNewLine),
            },
          },
        ],
      };
    })(),
    [Repository.DoubleStringEscapeSequence]: ((): MatchRule => {
      return {
        name: name(RuleName.DoubleStringEscapeSequence),
        match: `(${doubleStringEscapeSequences.join('|')})(?!(\\r\\n|\\n))`,
      };
    })(),
  };
}
