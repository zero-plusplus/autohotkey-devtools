import { builtinVaribles_v1, operators_v1, Repository } from '../../constants';
import type { Repositories, ScopeName } from '../../types';
import { createUtilities, getEscapeSequencesInfo, getVariableParts, patternsRule } from '../../utils';
import * as v1 from '../rules';

export function createLiteralRepositories(scopeName: ScopeName): Repositories {
  const { includeRule } = createUtilities(scopeName);

  const variableParts = getVariableParts(scopeName);
  const escapeSequencesInfo = getEscapeSequencesInfo(scopeName);

  return {
    [Repository.Expression]: v1.createExpressionRule(),
    [Repository.ParenthesizedExpression]: v1.createParenthesizedExpressionRule(scopeName),

    // #region variable
    [Repository.Variable]: v1.createVariableRule(scopeName, variableParts.headChar, variableParts.tailChar),
    [Repository.InvalidVariable]: v1.createInvalidVariableRule(scopeName, variableParts.headChar, variableParts.tailChar),
    [Repository.BuiltInVariable]: v1.createBuiltinVariableRule(scopeName, [ ...builtinVaribles_v1 ]),
    // #endregion variable

    // #region access
    [Repository.Dereference]: v1.createDereferenceRule(scopeName),
    [Repository.InvalidDereference]: v1.createInvalidDereferenceRule(scopeName),
    // #endregion access

    // #region literal
    [Repository.Literal]: patternsRule(
      includeRule(Repository.DoubleString),
      includeRule(Repository.Number),
    ),

    // #region string
    [Repository.String]: patternsRule(includeRule(Repository.DoubleString)),
    [Repository.DoubleString]: v1.createStringRule(scopeName, '"', escapeSequencesInfo.doubleQuote),
    // #endregion string

    // #region number
    [Repository.Number]: patternsRule(
      includeRule(Repository.Integer),
      includeRule(Repository.InvalidFloat),
      includeRule(Repository.Float),
      includeRule(Repository.InvalidHex),
      includeRule(Repository.Hex),
      includeRule(Repository.InvalidScientificNotation),
      includeRule(Repository.ScientificNotation),
    ),
    [Repository.Integer]: v1.createIntegerRule(scopeName),
    [Repository.Float]: v1.createFloatRule(scopeName),
    [Repository.InvalidFloat]: v1.createInvalidFloatRule(scopeName),
    [Repository.Hex]: v1.createHexRule(scopeName),
    [Repository.InvalidHex]: v1.createInvalidHexRule(scopeName),
    [Repository.ScientificNotation]: v1.createScientificNotationRule(scopeName),
    [Repository.InvalidScientificNotation]: v1.createInvalidScientificNotationRule(scopeName),
    // #endregion number
    // #endregion literal

    // #region token
    [Repository.Comma]: v1.createSeparatorRule(scopeName, ','),
    [Repository.Operator]: v1.createOperatorRule(scopeName, operators_v1),
    // #endregion token
  };
}
