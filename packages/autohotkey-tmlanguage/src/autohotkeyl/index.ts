import { Repository } from '../constants';
import type { Repositories, ScopeName, TmLanguage } from '../types';
import { includeRule, name, patternsRule } from '../utils';
import * as constants_v1 from './constants';
import * as command from './repository/command';
import * as rule_v1 from './rules';

export function createTmLanguage(): TmLanguage {
  const scopeName: ScopeName = 'autohotkeyl';

  return {
    scopeName: `source.${scopeName}`,
    patterns: [
      includeRule(Repository.Comment),
      includeRule(Repository.Statement),
    ],
    repository: createRepositories(scopeName),
  };
}

export function createRepositories(scopeName: ScopeName): Repositories {
  return {
    ...command.createRepositories(scopeName),

    // #region trivia
    [Repository.Comment]: patternsRule(
      includeRule(Repository.SingleLineComment),
      includeRule(Repository.InLineComment),
    ),
    [Repository.SingleLineComment]: rule_v1.createSingleLineCommentRule(scopeName),
    [Repository.InLineComment]: rule_v1.createInLineCommentRule(scopeName),
    // #endregion trivia

    // #region statement
    [Repository.Statement]: patternsRule(
      includeRule(Repository.CommandStatement),
      includeRule(Repository.LegacyStatement),
      includeRule(Repository.ExpressionStatement),
    ),
    [Repository.LegacyStatement]: patternsRule(includeRule(Repository.Legacy)),
    [Repository.CommandStatement]: {
      name: name(scopeName, Repository.CommandStatement),
      patterns: [ includeRule(Repository.Command) ],
    },
    [Repository.ExpressionStatement]: patternsRule(includeRule(Repository.Expression)),
    // #endregion statement

    // #region expression
    [Repository.Expression]: patternsRule(
      includeRule(Repository.Comma),

      includeRule(Repository.ParenthesizedExpression),
      includeRule(Repository.Literal),
      includeRule(Repository.BuiltInVariable),
      includeRule(Repository.InvalidVariable),
      includeRule(Repository.Variable),
      includeRule(Repository.InvalidDereference),
      includeRule(Repository.Dereference),

      includeRule(Repository.Operator),
    ),
    [Repository.ParenthesizedExpression]: rule_v1.createParenthesizedExpressionRule(scopeName),

    // #region variable
    [Repository.Variable]: rule_v1.createVariableRule(scopeName, constants_v1.nameStart, constants_v1.nameBody),
    [Repository.InvalidVariable]: rule_v1.createInvalidVariableRule(scopeName, constants_v1.nameStart, constants_v1.nameBody),
    [Repository.BuiltInVariable]: rule_v1.createBuiltinVariableRule(scopeName, constants_v1.builtinVaribles),
    // #endregion variable

    // #region access
    [Repository.Dereference]: rule_v1.createDereferenceRule(scopeName),
    [Repository.InvalidDereference]: rule_v1.createInvalidDereferenceRule(scopeName),
    // #endregion access

    // #region literal
    [Repository.Literal]: patternsRule(
      includeRule(Repository.DoubleString),
      includeRule(Repository.Number),
    ),

    // #region string
    [Repository.String]: patternsRule(includeRule(Repository.DoubleString)),
    [Repository.DoubleString]: rule_v1.createStringRule(scopeName, '"', constants_v1.doubleQuoteEscapeSequences),
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
    [Repository.Integer]: rule_v1.createIntegerRule(scopeName),
    [Repository.Float]: rule_v1.createFloatRule(scopeName),
    [Repository.InvalidFloat]: rule_v1.createInvalidFloatRule(scopeName),
    [Repository.Hex]: rule_v1.createHexRule(scopeName),
    [Repository.InvalidHex]: rule_v1.createInvalidHexRule(scopeName),
    [Repository.ScientificNotation]: rule_v1.createScientificNotationRule(scopeName),
    [Repository.InvalidScientificNotation]: rule_v1.createInvalidScientificNotationRule(scopeName),
    // #endregion number
    // #endregion literal

    // #region token
    [Repository.Comma]: rule_v1.createSeparatorRule(scopeName, ','),
    [Repository.Operator]: rule_v1.createOperatorRule(scopeName, constants_v1.operators),
    // #endregion token
    // #endregion expression

    // #region legacy
    [Repository.Legacy]: patternsRule(includeRule(Repository.LegacyAssignment)),
    [Repository.LegacyAssignment]: rule_v1.createLegacyAssignmentRule(scopeName),
    [Repository.PercentExpression]: rule_v1.createPercentExpressionRule(scopeName),
    // #endregion legacy
  };
}
