import * as patterns_v1 from '../autohotkeyl/patterns';
import * as rule_v1 from '../autohotkeyl/rules';
import { Repository, RuleName } from '../constants';
import type { Repositories, ScopeName, TmLanguage } from '../types';
import { includeRule, patternsRule } from '../utils';
import * as constants_v2 from './constants';
import * as patterns_v2 from './patterns';
import * as rule_v2 from './rules';

export function createTmLanguage(): TmLanguage {
  const scopeName: ScopeName = 'autohotkey2';

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
    // #region trivia
    [Repository.Comment]: patternsRule(
      includeRule(Repository.SingleLineComment),
      includeRule(Repository.InLineComment),
    ),
    [Repository.SingleLineComment]: rule_v1.createSingleLineCommentRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
    }),
    [Repository.InLineComment]: rule_v1.createInLineCommentRule(scopeName),
    // #endregion trivia

    // #region statement
    [Repository.Statement]: patternsRule(includeRule(Repository.ExpressionStatement)),
    [Repository.ExpressionStatement]: patternsRule(
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
    // #endregion statement

    // #region expression
    [Repository.Expression]: patternsRule(
      includeRule(Repository.ParenthesizedExpression),
      includeRule(Repository.Literal),
      includeRule(Repository.BuiltInVariable),
      includeRule(Repository.InvalidVariable),
      includeRule(Repository.Variable),
      includeRule(Repository.InvalidDereference),
      includeRule(Repository.Dereference),
      includeRule(Repository.Operator),
    ),
    [Repository.Expressions]: patternsRule(
      includeRule(Repository.Comma),
      includeRule(Repository.Expression),
    ),
    [Repository.ParenthesizedExpression]: rule_v2.createParenthesizedExpressionRule(scopeName),

    // #region variable
    [Repository.Variable]: rule_v1.createVariableRule(scopeName, patterns_v2.nameStart, patterns_v2.nameBody),
    [Repository.InvalidVariable]: rule_v1.createInvalidVariableRule(scopeName, patterns_v2.nameStart, patterns_v2.nameBody),
    [Repository.BuiltInVariable]: rule_v1.createBuiltinVariableRule(scopeName, {
      variableRuleName: RuleName.BuiltInVariable,
      builtinVariables: constants_v2.builtinVaribles,
    }),
    // #endregion variable

    // #region access
    [Repository.Dereference]: rule_v2.createDereferenceRule(scopeName),
    [Repository.InvalidDereference]: rule_v2.createInvalidDereferenceRule(scopeName),
    // #endregion access

    // #region literal
    [Repository.Literal]: patternsRule(
      includeRule(Repository.String),
      includeRule(Repository.Number),
    ),

    // #region string
    [Repository.String]: patternsRule(
      includeRule(Repository.DoubleString),
      includeRule(Repository.SingleString),
    ),
    [Repository.DoubleString]: rule_v2.createStringRule(scopeName, {
      quoteChar: '"',
      escapeSequences: constants_v2.doubleQuoteEscapeSequences,
      stringElementName: RuleName.DoubleString,
    }),
    [Repository.SingleString]: rule_v2.createStringRule(scopeName, {
      quoteChar: `'`,
      escapeSequences: constants_v2.singleQuoteEscapeSequences,
      stringElementName: RuleName.SingleString,
    }),
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
    [Repository.Comma]: rule_v1.createCommaSeparatorRule(scopeName, ','),
    [Repository.Operator]: rule_v1.createOperatorRule(scopeName, constants_v2.expressionOperators),
    // #endregion token
    // #endregion expression
  };
}
