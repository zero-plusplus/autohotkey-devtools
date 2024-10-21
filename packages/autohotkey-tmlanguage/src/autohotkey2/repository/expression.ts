import * as ahkl from '../../autohotkeyl/repository/expression';
import { Repository, RuleName } from '../../constants';
import { alt, anyChars1, capture, char, endAnchor, inlineSpaces0, inlineSpaces1, lookahead, negativeLookahead, negativeLookbehind, negChar, negChars0, negChars1, ordalt, seq } from '../../oniguruma';
import type { BeginEndRule, MatchRule, PatternsRule, Repositories, ScopeName } from '../../types';
import { createUtilities, getEscapeSequencesInfo } from '../../utils';

export function createLiteralRepositories(scopeName: ScopeName): Repositories {
  const { name, nameRule, includeRule } = createUtilities(scopeName);

  const escapeSequenceInfo = getEscapeSequencesInfo(scopeName);
  const ahklRepositories = ahkl.createLiteralRepositories(scopeName);

  const endLine = lookahead(alt(
    seq(inlineSpaces1(), char(';')),
    seq(inlineSpaces0(), endAnchor()),
  ));

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
        match: seq(
          capture(char('%')),
          capture(negChars1('\\r', '\\n')),
          capture(char('%')),
        ),
        captures: {
          1: nameRule(Repository.Dereference, RuleName.PercentBegin),
          2: {
            patterns: [
              includeRule(Repository.InvalidDereference),
              includeRule(Repository.Dereference),
              {
                name: name(Repository.Dereference),
                match: capture(anyChars1()),
                captures: {
                  1: {
                    patterns: [ includeRule(Repository.Expression) ],
                  },
                },
              },
            ],
          },
          3: nameRule(Repository.Dereference, RuleName.PercentEnd),
        },
      };
    })(),
    [Repository.InvalidDereference]: ((): PatternsRule => {
      return {
        patterns: [
          // %%
          //  ^ missing
          {
            match: seq(
              capture(char('%')),
              capture(char('%')),
            ),
            captures: {
              1: nameRule(Repository.Dereference, RuleName.PercentBegin, RuleName.Invalid),
              2: nameRule(Repository.Dereference, RuleName.PercentEnd, RuleName.Invalid),
            },
          },
          // %
          //  ^ missing
          {
            name: name(Repository.Dereference),
            match: seq(
              capture(char('%')),
              lookahead(alt(
                seq(negChars1('\\S', '\\r', '\\n'), char(';')),
                seq(negChars0('\\S', '\\r', '\\n'), endAnchor()),
              )),
            ),
            captures: {
              1: nameRule(RuleName.PercentBegin, RuleName.Invalid),
            },
          },
          // %abc
          //     ^ missing
          {
            match: seq(
              capture(char('%')),
              capture(negChars0('\\r', '\\n', '%')),
              negativeLookahead(char('%')),
              capture(negChar('\\r', '\\n')),
              endLine,
            ),
            captures: {
              1: nameRule(Repository.Dereference, RuleName.PercentBegin),
              2: {
                name: name(Repository.Dereference),
                patterns: [
                  includeRule(Repository.InvalidDereference),
                  includeRule(Repository.Dereference),
                  includeRule(Repository.Expression),
                ],
              },
              3: nameRule(Repository.Dereference, RuleName.Variable, RuleName.Invalid),
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
        begin: capture(char('"')),
        beginCaptures: {
          1: nameRule(RuleName.StringBegin),
        },
        end: seq(
          negativeLookbehind(char('`')),
          capture(char('"')),
        ),
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
        match: seq(
          capture(ordalt(...escapeSequenceInfo.doubleQuote)),
          negativeLookahead(alt(char('\\r\\n'), char('\\n'))),
        ),
      };
    })(),
    [Repository.SingleString]: {
      name: name(RuleName.SingleString),
      begin: capture(char(`'`)),
      beginCaptures: {
        1: { name: name(RuleName.StringBegin) },
      },
      end: seq(
        negativeLookbehind(char('`')),
        capture(char(`'`)),
      ),
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
        match: seq(
          ordalt(...escapeSequenceInfo.singleQuote),
          negativeLookahead(alt(char('\\r\\n'), char('\\n'))),
        ),
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
