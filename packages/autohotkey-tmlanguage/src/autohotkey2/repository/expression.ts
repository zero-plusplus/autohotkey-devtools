import { createDereferenceRule, createInvalidDereferenceRule } from '../../autohotkey2/rules/expression/access';
import * as ahkl from '../../autohotkeyl/repository/expression';
import { createExpressionRule, createParenthesizedExpressionRule } from '../../autohotkeyl/rules/expression';
import { createBuiltinVariableRule, createInvalidVariableRule, createVariableRule } from '../../autohotkeyl/rules/expression/variable';
import { builtinVaribles_v2, Repository, RuleName } from '../../constants';
import { alt, capture, char, negativeLookahead, negativeLookbehind, ordalt, seq } from '../../oniguruma';
import type { BeginEndRule, MatchRule, PatternsRule, Repositories, ScopeName } from '../../types';
import { createUtilities, getEscapeSequencesInfo, getVariableParts } from '../../utils';

export function createLiteralRepositories(scopeName: ScopeName): Repositories {
  const { name, nameRule, includeRule } = createUtilities(scopeName);

  const escapeSequenceInfo = getEscapeSequencesInfo(scopeName);
  const ahklRepositories = ahkl.createLiteralRepositories(scopeName);
  const variablePars = getVariableParts(scopeName);

  return {
    [Repository.Expression]: createExpressionRule(),
    [Repository.ParenthesizedExpression]: createParenthesizedExpressionRule(scopeName),

    // #region variable
    [Repository.Variable]: createVariableRule(scopeName, variablePars.headChar, variablePars.tailChar),
    [Repository.InvalidVariable]: createInvalidVariableRule(scopeName, variablePars.headChar, variablePars.tailChar),
    [Repository.BuiltInVariable]: createBuiltinVariableRule(scopeName, [ ...builtinVaribles_v2 ]),
    // #endregion variable

    // #region access
    [Repository.Dereference]: createDereferenceRule(scopeName),
    [Repository.InvalidDereference]: createInvalidDereferenceRule(scopeName),
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
