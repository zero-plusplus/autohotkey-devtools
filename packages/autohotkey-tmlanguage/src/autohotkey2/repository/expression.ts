import * as ahkl from '../../autohotkeyl/repository/expression';
import { Repository, RuleName } from '../../constants';
import type { BeginEndRule, MatchRule, PatternsRule, Repositories, ScopeName } from '../../types';
import { createUtilities } from '../../utils';

export function createLiteralRepositories(scopeName: ScopeName): Repositories {
  const { getEscapeSequencesInfo, name, nameRule, includeRule } = createUtilities(scopeName);
  const escapeSequenceInfo = getEscapeSequencesInfo();
  const ahklRepositories = ahkl.createLiteralRepositories(scopeName);

  return {
    [Repository.Expression]: ((): PatternsRule => {
      return {
        patterns: [
          includeRule(Repository.Comma),

          includeRule(Repository.ParenthesizedExpression),
          includeRule(Repository.Literal),
          includeRule(Repository.BuiltInVariable),
          includeRule(Repository.InvalidVariable),
          includeRule(Repository.Variable),
          includeRule(Repository.InvalidDereference),
          includeRule(Repository.Dereference),
        ],
      };
    })(),
    [Repository.ParenthesizedExpression]: ahklRepositories[Repository.ParenthesizedExpression],

    // #region variable
    [Repository.Variable]: ahklRepositories[Repository.Variable],
    [Repository.InvalidVariable]: ahklRepositories[Repository.InvalidVariable],
    [Repository.BuiltInVariable]: ahklRepositories[Repository.BuiltInVariable],
    // #endregion variable

    // #region access
    [Repository.Dereference]: ((): MatchRule => {
      return {
        match: '(%)([^\\r\\n]+)(%)',
        captures: {
          1: nameRule(RuleName.Dereference, RuleName.DereferencePercentBegin),
          2: {
            patterns: [
              includeRule(Repository.InvalidDereference),
              includeRule(Repository.Dereference),
              {
                name: name(RuleName.Dereference),
                match: '(.+)',
                captures: {
                  1: {
                    patterns: [ includeRule(Repository.Expression) ],
                  },
                },
              },
            ],
          },
          3: nameRule(RuleName.Dereference, RuleName.DereferencePercentEnd),
        },
      };
    })(),
    [Repository.InvalidDereference]: ((): PatternsRule => {
      return {
        patterns: [
          // %%
          //  ^ missing
          {
            match: '(%)(%)',
            captures: {
              1: nameRule(RuleName.Dereference, RuleName.DereferencePercentBegin, RuleName.InvalidDereferencePercent),
              2: nameRule(RuleName.Dereference, RuleName.DereferencePercentEnd, RuleName.InvalidDereferencePercent),
            },
          },
          // %
          //  ^ missing
          {
            name: name(RuleName.Dereference),
            match: '(%)(?=[^\\S\\r\\n]+;|[^\\S\\r\\n]*$)',
            captures: {
              1: nameRule(RuleName.DereferencePercentBegin, RuleName.InvalidDereferencePercent),
            },
          },
          // %abc
          //     ^ missing
          {
            match: '(%)([^\\r\\n%]*)(?!%)([^\\r\\n])(?=\\s+;|\\s*$)',
            captures: {
              1: nameRule(RuleName.Dereference, RuleName.DereferencePercentBegin),
              2: {
                name: name(RuleName.Dereference),
                patterns: [
                  includeRule(Repository.InvalidDereference),
                  includeRule(Repository.Dereference),
                  includeRule(Repository.Expression),
                ],
              },
              3: nameRule(RuleName.Dereference, RuleName.Variable, RuleName.InvalidDereference),
            },
          },
        ],
      };
    })(),
    // #endregion access

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
          includeRule(Repository.InvalidStringContent),
          includeRule(Repository.DoubleStringEscapeSequence),
        ],
      };
    })(),
    [Repository.DoubleStringEscapeSequence]: ((): MatchRule => {
      return {
        name: name(RuleName.DoubleStringEscapeSequence),
        match: `(${escapeSequenceInfo.doubleQuote.join('|')})(?!\\r\\n|\\n)`,
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
        includeRule(Repository.InvalidStringContent),
        includeRule(Repository.SingleStringEscapeSequence),
      ],
    },
    [Repository.SingleStringEscapeSequence]: ((): MatchRule => {
      return {
        name: name(RuleName.SingleStringEscapeSequence),
        match: `(${escapeSequenceInfo.singleQuote.join('|')})(?!\\r\\n|\\n)`,
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

    // #region token
    [Repository.Comma]: ahklRepositories[Repository.Comma],
    // #endregion token
  };
}
