import { Repository, Repositories, PatternsRule, ScopeName, BeginEndRule, MatchRule, RuleName } from '../../types';
import * as ahkl from '../../autohotkeyl/repository/expression';
import { createUtilities } from '../../utils';

// [Escape Sequences](https://www.autohotkey.com/docs/v2/misc/EscapeChar.htm)
export const commonEscapeSequences: string[] = [ '``', '`;', '`:', '`{', '`n', '`r', '`b', '`t', '`s', '`v', '`a', '`f' ] as const;
export const doubleStringEscapeSequences: string[] = [ ...commonEscapeSequences, '`\"' ] as const;
export const singleStringEscapeSequences: string[] = [ ...commonEscapeSequences, `\`'` ] as const;

export function createLiteralRepositories(scopeName: ScopeName): Repositories {
  const { name, nameRule, includeRule } = createUtilities(scopeName);
  const ahklRepositories = ahkl.createLiteralRepositories(scopeName);

  return {
    [Repository.Expression]: ((): PatternsRule => {
      return {
        patterns: [
          includeRule(Repository.Literal),
          includeRule(Repository.BuiltInVariable),
          includeRule(Repository.InvalidVariable),
          includeRule(Repository.Variable),
        ],
      };
    })(),
    [Repository.Variable]: ahklRepositories[Repository.Variable],
    [Repository.InvalidVariable]: ahklRepositories[Repository.InvalidVariable],
    [Repository.BuiltInVariable]: ahklRepositories[Repository.BuiltInVariable],

    // #region literal
    [Repository.Literal]: ((): PatternsRule => {
      return {
        patterns: [
          includeRule(Repository.String),
          includeRule(Repository.Number),
        ],
      };
    })(),

    // #region string
    [Repository.String]: ((): PatternsRule => {
      return {
        patterns: [
          includeRule(Repository.DoubleString),
          includeRule(Repository.SingleString),
        ],
      };
    })(),
    [Repository.InvalidStringContent]: ahklRepositories[Repository.InvalidStringContent],
    [Repository.InvalidStringNewLine]: ahklRepositories[Repository.InvalidStringNewLine],
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
          includeRule(Repository.InvalidStringNewLine),
          includeRule(Repository.InvalidStringContent),
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
        includeRule(Repository.InvalidStringNewLine),
        includeRule(Repository.InvalidStringContent),
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
    // #endregion string

    // #region number
    [Repository.Number]: ahklRepositories[Repository.Number],
    [Repository.Integer]: ahklRepositories[Repository.Integer],
    [Repository.Float]: ahklRepositories[Repository.Float],
    [Repository.InvalidFloat]: ahklRepositories[Repository.InvalidFloat],
    [Repository.Hex]: ahklRepositories[Repository.Hex],
    [Repository.InvalidHex]: ahklRepositories[Repository.InvalidHex],
    [Repository.ScientificNotation]: ahklRepositories[Repository.ScientificNotation],
    [Repository.InvalidScientificNotation]: ahklRepositories[Repository.InvalidScientificNotation],
    // #endregion number
    // #endregion literal
  };
}
