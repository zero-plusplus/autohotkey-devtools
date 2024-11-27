import { Repository, RuleName } from '../constants';
import type { Repositories, ScopeName, TmLanguage } from '../types';
import { includeRule, patternsRule } from '../utils';
import * as constants_v1 from './constants';
import * as definition_v1 from './definition';
import * as patterns_v1 from './patterns';
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
  type Placeholder = Parameters<typeof rule_v1.createCommandLikeStatementRule>[2];
  const commonCommandBuilderOptions: Partial<Placeholder> = {
    lineEndAnchor: patterns_v1.lineEndAnchor,
    commandStatementBeginAnchor: patterns_v1.statementBeginAnchor,
    commandArgumentEndLineAnchor: patterns_v1.commandArgumentEndLineAnchor,
    continuationOperators: constants_v1.continuationOperators,
    commandArgument: patterns_v1.commandArgument,
    commandLastArgument: patterns_v1.commandLastArgument,
    commandExpressionArgumentWithOneTrueBrace: patterns_v1.commandExpressionWithOneTrueBraceArgument,
  };

  return {
    // #region trivia
    [Repository.Comment]: patternsRule(
      includeRule(Repository.SingleLineComment),
      includeRule(Repository.InLineComment),
    ),
    [Repository.SingleLineComment]: rule_v1.createSingleLineCommentRule(scopeName, {
      startAnchor: patterns_v1.statementBeginAnchor,
    }),
    [Repository.InLineComment]: rule_v1.createInLineCommentRule(scopeName),
    // #endregion trivia

    // #region statement
    [Repository.Statement]: patternsRule(
      includeRule(Repository.IncludeStatement),
      includeRule(Repository.DirectiveStatement),
      includeRule(Repository.CommandStatement),
      includeRule(Repository.JumpStatement),
      includeRule(Repository.HotstringLabelStatement),
      includeRule(Repository.HotkeyLabelStatement),
      includeRule(Repository.LabelStatement),
      includeRule(Repository.IfStatement),
      includeRule(Repository.WhileStatement),
      includeRule(Repository.TryStatement),
      includeRule(Repository.ThrowStatement),
      includeRule(Repository.Block),

      includeRule(Repository.LegacyStatement),
      includeRule(Repository.ExpressionStatement),
    ),
    [Repository.LegacyStatement]: patternsRule(includeRule(Repository.Legacy)),
    [Repository.CommandStatement]: rule_v1.createCommandLikeStatementRule(scopeName, definition_v1.commandDefinitions, {
      ...commonCommandBuilderOptions,
      statementScopeName: Repository.CommandStatement,
      commandScopeName: RuleName.CommandName,
    } as Placeholder),
    [Repository.IncludeStatement]: rule_v1.createIncludeStatementRule(scopeName, {
      startAnchor: patterns_v1.statementBeginAnchor,
      endAnchor: patterns_v1.lineEndAnchor,
    }),
    [Repository.DirectiveStatement]: rule_v1.createCommandLikeStatementRule(scopeName, definition_v1.directiveDefinitions, {
      ...commonCommandBuilderOptions,
      statementScopeName: Repository.DirectiveStatement,
      commandScopeName: RuleName.DirectiveName,
    } as Placeholder),
    [Repository.JumpStatement]: rule_v1.createCommandLikeStatementRule(scopeName, definition_v1.jumpCommandDefenitions, {
      ...commonCommandBuilderOptions,
      statementScopeName: Repository.JumpStatement,
      commandScopeName: RuleName.JumpCommandName,
    } as Placeholder),
    [Repository.LabelStatement]: rule_v1.createLabelRule(scopeName, { startAnchor: patterns_v1.statementBeginAnchor }),
    [Repository.HotkeyLabelStatement]: rule_v1.createHotkeyLabelRule(scopeName, { startAnchor: patterns_v1.statementBeginAnchor }),
    [Repository.HotstringLabelStatement]: rule_v1.createHotstringLabelRule(scopeName, {
      startAnchor: patterns_v1.statementBeginAnchor,
      endAnchor: patterns_v1.lineEndAnchor,
    }),

    [Repository.ExpressionStatement]: patternsRule(includeRule(Repository.Expression)),
    [Repository.IfStatement]: rule_v1.createIfStatementRule(scopeName, {
      startAnchor: patterns_v1.statementBeginAnchor,
    }),
    [Repository.WhileStatement]: rule_v1.createWhileStatementRule(scopeName, {
      startAnchor: patterns_v1.statementBeginAnchor,
    }),
    [Repository.TryStatement]: rule_v1.createTryStatementRule(scopeName, {
      startAnchor: patterns_v1.statementBeginAnchor,
    }),
    [Repository.ThrowStatement]: rule_v1.createThrowStatementRule(scopeName, {
      startAnchor: patterns_v1.statementBeginAnchor,
    }),
    // #endregion statement

    // #region declaration
    [Repository.Block]: rule_v1.createBlockRule(scopeName),
    // #endregion declaration

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
    [Repository.Variable]: rule_v1.createVariableRule(scopeName, patterns_v1.nameStart, patterns_v1.nameBody),
    [Repository.InvalidVariable]: rule_v1.createInvalidVariableRule(scopeName, patterns_v1.nameStart, patterns_v1.nameBody),
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
      includeRule(Repository.Object),
      includeRule(Repository.Array),
    ),

    // #region string
    [Repository.Object]: rule_v1.createObjectRule(scopeName, {
      startAnchor: patterns_v1.objectStartAnchor,
      keyName: patterns_v1.keyName,
    }),
    [Repository.Array]: rule_v1.createArrayRule(scopeName),

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
    [Repository.Comma]: rule_v1.createCommaSeparatorRule(scopeName, ','),
    [Repository.Operator]: rule_v1.createOperatorRule(scopeName, constants_v1.operators),
    // #endregion token
    // #endregion expression

    // #region command
    [Repository.CommandArgument]: patternsRule(
      includeRule(Repository.PercentExpression),
      includeRule(Repository.Dereference),
      includeRule(Repository.LegacyTextEscapeSequence),
      includeRule(Repository.CommandArgumentText),
      includeRule(Repository.InLineComment),
    ),
    [Repository.CommandLastArgument]: patternsRule(
      includeRule(Repository.PercentExpression),
      includeRule(Repository.Dereference),
      includeRule(Repository.LegacyTextEscapeSequence),
      includeRule(Repository.CommandLastArgumentText),
      includeRule(Repository.InLineComment),
    ),
    [Repository.CommandArgumentText]: rule_v1.createUnquotedString(scopeName, patterns_v1.commandArgument),
    [Repository.CommandLastArgumentText]: rule_v1.createUnquotedString(scopeName, patterns_v1.commandLastArgument),
    // #endregion command

    // #region legacy
    [Repository.Legacy]: patternsRule(includeRule(Repository.LegacyAssignment)),
    [Repository.LegacyAssignment]: rule_v1.createLegacyAssignmentRule(scopeName),
    [Repository.PercentExpression]: rule_v1.createPercentExpressionRule(scopeName),
    // #endregion legacy
  };
}
