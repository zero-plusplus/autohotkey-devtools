import { Repository, RuleName } from '../constants';
import { anyChars1 } from '../oniguruma';
import type { Repositories, ScopeName, TmLanguage } from '../types';
import { includeRule, name, patternsRule } from '../utils';
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
    startAnchor: patterns_v1.statementStartAnchor,
    endAnchor: patterns_v1.lineEndAnchor,
  };

  return {
    // #region trivia
    [Repository.Comment]: patternsRule(
      includeRule(Repository.MultiLineComment),
      includeRule(Repository.SingleLineComment),
      includeRule(Repository.InLineComment),
    ),
    [Repository.MultiLineComment]: rule_v1.createMultiLineCommentRule(scopeName),
    [Repository.SingleLineComment]: rule_v1.createSingleLineCommentRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
    }),
    [Repository.InLineComment]: rule_v1.createInLineCommentRule(scopeName),
    // #endregion trivia

    // #region statement
    [Repository.Statement]: patternsRule(
      includeRule(Repository.Declaration),
      includeRule(Repository.IncludeStatement),
      includeRule(Repository.DirectiveStatement),
      includeRule(Repository.CommandStatement),
      includeRule(Repository.JumpStatement),
      includeRule(Repository.HotstringLabelStatement),
      includeRule(Repository.HotkeyLabelStatement),
      includeRule(Repository.LabelStatement),
      includeRule(Repository.IfStatement),
      includeRule(Repository.SwitchStatement),
      includeRule(Repository.WhileStatement),
      includeRule(Repository.LoopStatement),
      includeRule(Repository.UntilStatement),
      includeRule(Repository.ForStatement),
      includeRule(Repository.TryStatement),
      includeRule(Repository.ThrowStatement),

      includeRule(Repository.LegacyStatement),
      includeRule(Repository.ExpressionStatement),
      includeRule(Repository.ContinuationSection),
    ),
    [Repository.LegacyStatement]: patternsRule(includeRule(Repository.Legacy)),
    [Repository.CommandStatement]: rule_v1.createCommandLikeStatementRule(scopeName, definition_v1.commandDefinitions, {
      ...commonCommandBuilderOptions,
      statementElementName: Repository.CommandStatement,
      commandElementName: RuleName.CommandName,
    } as Placeholder),
    [Repository.IncludeStatement]: rule_v1.createIncludeStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      endAnchor: patterns_v1.lineEndAnchor,
    }),
    [Repository.DirectiveStatement]: rule_v1.createCommandLikeStatementRule(scopeName, definition_v1.directiveDefinitions, {
      ...commonCommandBuilderOptions,
      statementElementName: Repository.DirectiveStatement,
      commandElementName: RuleName.DirectiveName,
    } as Placeholder),
    [Repository.JumpStatement]: rule_v1.createCommandLikeStatementRule(scopeName, definition_v1.jumpCommandDefenitions, {
      ...commonCommandBuilderOptions,
      statementElementName: Repository.JumpStatement,
      commandElementName: RuleName.JumpCommandName,
    } as Placeholder),
    [Repository.LabelStatement]: rule_v1.createLabelRule(scopeName, { startAnchor: patterns_v1.statementStartAnchor }),
    [Repository.HotkeyLabelStatement]: rule_v1.createHotkeyLabelRule(scopeName, { startAnchor: patterns_v1.statementStartAnchor }),
    [Repository.HotstringLabelStatement]: rule_v1.createHotstringLabelRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      endAnchor: patterns_v1.lineEndAnchor,
    }),

    [Repository.ExpressionStatement]: patternsRule(includeRule(Repository.Expressions)),
    [Repository.IfStatement]: rule_v1.createIfStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
    }),
    [Repository.SwitchStatement]: rule_v1.createSwitchStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      lineEndAnchor: patterns_v1.lineEndAnchor,
    }),
    [Repository.WhileStatement]: rule_v1.createWhileStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
    }),
    [Repository.LoopStatement]: rule_v1.createLoopStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      endAnchor: patterns_v1.controlFlowEndAnchor,
    }),
    [Repository.UntilStatement]: rule_v1.createUntilStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
    }),
    [Repository.ForStatement]: rule_v1.createForStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
    }),
    [Repository.TryStatement]: rule_v1.createTryStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
    }),
    [Repository.ThrowStatement]: rule_v1.createThrowStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
    }),
    // #endregion statement

    // #region declaration
    [Repository.Declaration]: patternsRule(
      includeRule(Repository.Modifier),
      includeRule(Repository.AssignmentDeclaration),
      includeRule(Repository.CallExpression_FunctionDeclarationHead),
      includeRule(Repository.ClassDeclaration),
      includeRule(Repository.Block),
    ),
    [Repository.Modifier]: rule_v1.createModifierRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      modifiers: constants_v1.modifiers,
    }),
    [Repository.AssignmentDeclaration]: rule_v1.createAssignmentDeclarationRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      namePattern: patterns_v1.looseNamePattern,
      operators: constants_v1.assignmentOperators,
    }),
    [Repository.Block]: rule_v1.createBlockRule(scopeName, {
      statementsInBlock: [ includeRule(Repository.Self) ],
    }),
    [Repository.ClassDeclaration]: rule_v1.createClassDeclarationRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      identifierPattern: patterns_v1.identifierPattern,
      lineEndAnchor: patterns_v1.lineEndAnchor,
    }),
    [Repository.PropertyDeclaration]: rule_v1.createPropertyDeclarationRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      identifierPattern: patterns_v1.identifierPattern,
      keywordsInArgument: [ 'byref' ],
    }),
    // #endregion declaration

    // #region expression
    [Repository.Expression]: patternsRule(
      includeRule(Repository.KeywordInExpression),
      includeRule(Repository.CallExpression_FunctionDeclarationHead),
      includeRule(Repository.ParenthesizedExpression),
      includeRule(Repository.Literal),
      includeRule(Repository.KeywordLikeBuiltInVariable),
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
    [Repository.ParenthesizedExpression]: rule_v1.createParenthesizedExpressionRule(scopeName, {
      startAnchor: patterns_v1.expressionContinuationStartAnchor,
    }),

    // #region variable
    [Repository.Variable]: rule_v1.createVariableRule(scopeName, patterns_v1.nameStart, patterns_v1.nameBody),
    [Repository.InvalidVariable]: rule_v1.createInvalidVariableRule(scopeName, patterns_v1.nameStart, patterns_v1.nameBody),
    [Repository.KeywordLikeBuiltInVariable]: rule_v1.createBuiltinVariableRule(scopeName, {
      variableRuleName: RuleName.KeywordLikeBuiltInVariable,
      builtinVariables: constants_v1.keywordLikeBuiltinVariables,
    }),
    [Repository.BuiltInVariable]: rule_v1.createBuiltinVariableRule(scopeName, {
      variableRuleName: RuleName.BuiltInVariable,
      builtinVariables: constants_v1.builtinVaribles,
    }),
    // #endregion variable

    // #region access
    [Repository.Dereference]: rule_v1.createDereferenceRule(scopeName),
    [Repository.InvalidDereference]: rule_v1.createInvalidDereferenceRule(scopeName),
    // #endregion access

    // #region literal
    [Repository.Literal]: patternsRule(
      includeRule(Repository.String),
      includeRule(Repository.Number),
      includeRule(Repository.Object),
      includeRule(Repository.Array),
    ),

    // #region string
    [Repository.Object]: rule_v1.createObjectRule(scopeName, {
      startAnchor: patterns_v1.expressionContinuationStartAnchor,
      keyName: patterns_v1.keyName,
    }),
    [Repository.Array]: rule_v1.createArrayRule(scopeName),

    [Repository.String]: patternsRule(
      includeRule(Repository.DoubleString),
      includeRule(Repository.ContinuationDoubleString),
    ),
    [Repository.DoubleString]: rule_v1.createStringRule(scopeName, {
      stringContentRepository: Repository.DoubleStringContent,
      quoteChar: '"',
      stringElementName: RuleName.DoubleString,
      escapeSequences: constants_v1.doubleQuoteEscapeSequences,
    }),
    [Repository.ContinuationStringOptions]: rule_v1.createContinuationStringOptionsRule(scopeName),
    [Repository.ContinuationDoubleString]: rule_v1.createContinuationString(scopeName, {
      lineEndAnchor: patterns_v1.lineEndAnchor,
      quoteChar: '"',
      stringElementName: RuleName.DoubleString,
      stringContentRepository: Repository.DoubleStringContent,
    }),
    [Repository.DoubleStringContent]: rule_v1.createStringContentRule(scopeName, {
      quoteChar: '"',
      stringElementName: RuleName.DoubleString,
      escapeSequences: constants_v1.doubleQuoteEscapeSequences,
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

    // #region token, keyword
    [Repository.Comma]: rule_v1.createCommaSeparatorRule(scopeName, ','),
    [Repository.Operator]: rule_v1.createOperatorRule(scopeName, constants_v1.expressionOperators),
    [Repository.KeywordInExpression]: rule_v1.createKeywordRule(scopeName, {
      elementName: name(scopeName, RuleName.KeywordInExpression),
      keywords: [
        'new',

        // The following are not exactly keywords in the expression, but are defined here as keywords because it is more convenient for the TMLanguage mechanism
        'in',
      ],
    }),
    // #endregion token, keyword

    // #region misc
    [Repository.CallExpression_FunctionDeclarationHead]: rule_v1.createCallExpressionRule(scopeName, {
      callableNamePattern: patterns_v1.looseNamePattern,
      keywordsInArgument: [ 'byref' ],
    }),
    // #endregion misc
    // #endregion expression

    // #region command
    [Repository.CommandArgument]: patternsRule(
      includeRule(Repository.PercentExpression),
      includeRule(Repository.Dereference),
      includeRule(Repository.CommandArgumentText),
      includeRule(Repository.InLineComment),
    ),
    [Repository.CommandLastArgument]: patternsRule(
      includeRule(Repository.PercentExpression),
      includeRule(Repository.Dereference),
      includeRule(Repository.CommandLastArgumentText),
      includeRule(Repository.InLineComment),
    ),
    [Repository.CommandArgumentText]: rule_v1.createUnquotedString(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      stringPattern: patterns_v1.commandArgumentPattern,
      escapeSequences: constants_v1.unquoteEscapeSequences,
    }),
    [Repository.CommandLastArgumentText]: rule_v1.createUnquotedString(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      stringPattern: patterns_v1.lastArgumentPattern,
      escapeSequences: constants_v1.unquoteEscapeSequences,
    }),
    // #endregion command

    // #region legacy
    [Repository.Legacy]: patternsRule(includeRule(Repository.LegacyAssignment)),
    [Repository.LegacyAssignment]: rule_v1.createLegacyAssignmentRule(scopeName),
    [Repository.PercentExpression]: rule_v1.createPercentExpressionRule(scopeName),
    [Repository.ContinuationSection]: rule_v1.createContinuationSectionRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      lineEndAnchor: patterns_v1.lineEndAnchor,
    }),
    [Repository.ContinuationSectionText]: rule_v1.createUnquotedString(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      stringPattern: anyChars1(),
      escapeSequences: [ ...constants_v1.unquoteEscapeSequences, '`)' ],
    }),
    // #endregion legacy
  };
}
