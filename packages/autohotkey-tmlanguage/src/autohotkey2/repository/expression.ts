import * as v2 from '../../autohotkey2/rules';
import * as ahkl from '../../autohotkeyl/repository/expression';
import * as v1 from '../../autohotkeyl/rules';
import { builtinVaribles_v2, Repository } from '../../constants';
import type { PatternsRule, Repositories, ScopeName } from '../../types';
import { createUtilities, getEscapeSequencesInfo, getVariableParts } from '../../utils';

export function createLiteralRepositories(scopeName: ScopeName): Repositories {
  const { includeRule } = createUtilities(scopeName);

  const escapeSequenceInfo = getEscapeSequencesInfo(scopeName);
  const ahklRepositories = ahkl.createLiteralRepositories(scopeName);
  const variablePars = getVariableParts(scopeName);

  return {
    [Repository.Expression]: v2.createExpressionRule(),
    [Repository.ParenthesizedExpression]: v2.createParenthesizedExpressionRule(scopeName),

    // #region variable
    [Repository.Variable]: v1.createVariableRule(scopeName, variablePars.headChar, variablePars.tailChar),
    [Repository.InvalidVariable]: v1.createInvalidVariableRule(scopeName, variablePars.headChar, variablePars.tailChar),
    [Repository.BuiltInVariable]: v1.createBuiltinVariableRule(scopeName, [ ...builtinVaribles_v2 ]),
    // #endregion variable

    // #region access
    [Repository.Dereference]: v2.createDereferenceRule(scopeName),
    [Repository.InvalidDereference]: v2.createInvalidDereferenceRule(scopeName),
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
    [Repository.DoubleString]: v1.createStringRule(scopeName, '"', escapeSequenceInfo.doubleQuote),
    [Repository.SingleString]: v1.createStringRule(scopeName, `'`, escapeSequenceInfo.singleQuote),
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
