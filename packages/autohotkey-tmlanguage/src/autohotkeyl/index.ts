import * as markdown from '../__injection__/markdown';
import * as constants_common from '../common/constants';
import * as definition_common from '../common/definition';
import * as patterns_common from '../common/patterns';
import * as rules_common from '../common/rules';
import { Repository, RuleName } from '../constants';
import { anyChars1, ordalt } from '../oniguruma';
import type { Repositories, ScopeName, TmLanguage } from '../types';
import { includeRule, name, namedPatternsRule, patternsRule } from '../utils';
import * as constants_v1 from './constants';
import * as definition_v1 from './definition';
import * as patterns_v1 from './patterns';
import * as rule_v1 from './rules';

export function createTmLanguage(): TmLanguage {
  const scopeName: ScopeName = 'autohotkeyl';

  return {
    scopeName: `source.${scopeName}`,
    patterns: [
      includeRule(Repository.Meta),
      includeRule(Repository.Statement),
    ],
    repository: createRepositories(scopeName),
  };
}

export function createRepositories(scopeName: ScopeName): Repositories {
  return {
    [Repository.FencedCodeBlockInDocument]: markdown.createCodeFencePatternsRule(),
    [Repository.Meta]: patternsRule(
      includeRule(Repository.Comment),
      includeRule(Repository.DirectiveStatement),
    ),

    // #region trivia
    [Repository.Comment]: patternsRule(
      includeRule(Repository.AllMultiLineComments),
      includeRule(Repository.AllInLineComments),
      includeRule(Repository.AllSingleLineComments),
    ),
    [Repository.AllMultiLineComments]: patternsRule(
      includeRule(Repository.MultiLineDocumentComment),
      includeRule(Repository.MultiLineComment),
    ),
    [Repository.MultiLineComment]: rules_common.createMultiLineCommentRule(scopeName),
    [Repository.MultiLineDocumentComment]: rules_common.createDocumentCommentRule(scopeName, {
      leftHandPattern: patterns_v1.looseLeftHandPattern,
    }),
    [Repository.AllSingleLineComments]: patternsRule(
      includeRule(Repository.CompilerDirectiveComment),
      includeRule(Repository.SingleLineDocumentComment),
      includeRule(Repository.SingleLineComment),
    ),
    [Repository.SingleLineComment]: rules_common.createSingleLineCommentRule(scopeName),
    [Repository.SingleLineDocumentComment]: rules_common.createSinglelineDocumentCommentRule(scopeName, {
      leftHandPattern: patterns_v1.looseLeftHandPattern,
    }),
    [Repository.AllInLineComments]: patternsRule(
      includeRule(Repository.InlineDocumentComment),
      includeRule(Repository.InLineComment),
    ),
    [Repository.InLineComment]: rules_common.createInLineCommentRule(scopeName),
    [Repository.InlineDocumentComment]: rules_common.createInlineDocumentCommentRule(scopeName, {
      leftHandPattern: patterns_v1.looseLeftHandPattern,
    }),

    [Repository.TypeInDocument]: rules_common.createDocumentTypeRule(scopeName),
    [Repository.InlineTextInDocument]: rules_common.createInlineTextInDocumentRule(scopeName),
    // #endregion trivia

    // #region statement
    [Repository.Statement]: patternsRule(
      includeRule(Repository.ContinuationSection),

      includeRule(Repository.Declaration),
      includeRule(Repository.CommandStatement),
      includeRule(Repository.JumpStatement),
      includeRule(Repository.JumpToLabelStatement),
      includeRule(Repository.HotstringLabelStatement),
      includeRule(Repository.HotkeyLabelStatement),
      includeRule(Repository.LabelStatement),
      includeRule(Repository.LegacyIfStatement),
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
    ),
    [Repository.LegacyStatement]: patternsRule(includeRule(Repository.Legacy)),
    [Repository.CommandStatement]: rules_common.createCommandLikeStatementRule(scopeName, definition_v1.commandDefinitions, {
      startAnchor: patterns_v1.statementStartAnchor,
      endAnchor: patterns_common.lineEndAnchor,
      commandElementName: RuleName.CommandName,
      argumentStartPattern: patterns_v1.commandArgumentStartPattern,
    }),
    [Repository.DirectiveStatement]: rules_common.createCommandLikeStatementRule(scopeName, definition_v1.directiveDefinitions, {
      startAnchor: patterns_common.lineStartAnchor,
      endAnchor: patterns_common.lineEndAnchor,
      commandElementName: RuleName.DirectiveName,
    }),
    [Repository.JumpStatement]: rules_common.createJumpStatement(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      assignmentOperators: constants_common.assignmentOperators,
      endAnchor: patterns_common.lineEndAnchor,
      identifierPattern: ordalt('Exit', 'ExitApp', 'Return'),
    }),
    [Repository.JumpToLabelStatement]: rules_common.createJumpToLabelStatement(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      endAnchor: patterns_common.lineEndAnchor,
      names: [
        'Break',
        'Continue',
        'Gosub',
        'Goto',
      ],
      labelPattern: patterns_v1.identifierPattern,
    }),
    [Repository.HotstringLabelStatement]: rules_common.createHotstringLabelRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      endAnchor: patterns_common.lineEndAnchor,
    }),
    [Repository.HotkeyLabelStatement]: rules_common.createHotkeyLabelRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
    }),
    [Repository.LabelStatement]: rules_common.createLabelRule(scopeName, {
      startAnchor: patterns_common.lineStartAnchor,
      labelPattern: patterns_v1.identifierPattern,
    }),

    [Repository.IfStatement]: rules_common.createIfStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
    }),
    [Repository.SwitchStatement]: rules_common.createSwitchStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      endAnchor: patterns_common.lineEndAnchor,
      identifierPattern: patterns_v1.identifierPattern,
    }),
    [Repository.WhileStatement]: rules_common.createWhileStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
    }),
    [Repository.LoopStatement]: rule_v1.createLoopStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      endAnchor: patterns_v1.controlFlowEndAnchor,
    }),
    [Repository.UntilStatement]: rules_common.createUntilStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
    }),
    [Repository.ForStatement]: rules_common.createForStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
    }),
    [Repository.TryStatement]: rules_common.createTryStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
    }),
    [Repository.ThrowStatement]: rules_common.createThrowStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      assignmentOperators: constants_common.assignmentOperators,
    }),

    [Repository.ExpressionStatement]: patternsRule(
      includeRule(Repository.Comma),
      includeRule(Repository.Expression),
    ),
    // #endregion statement

    // #region declaration
    [Repository.Declaration]: patternsRule(
      includeRule(Repository.Modifier),
      includeRule(Repository.LegacyAssignmentDeclaration),
      includeRule(Repository.AssignmentDeclaration),
      includeRule(Repository.CallExpression_FunctionDeclarationHead),
      includeRule(Repository.ClassDeclaration),
      includeRule(Repository.Block),
    ),
    [Repository.Modifier]: rules_common.createModifierRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      modifiers: constants_common.accessModifiers,
    }),
    [Repository.AssignmentDeclaration]: rules_common.createAssignmentDeclarationRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      namePattern: patterns_v1.looseLeftHandPattern,
      operators: constants_common.assignmentOperators,
    }),
    [Repository.Block]: rules_common.createBlockRule(scopeName, {
      statementsInBlock: [ includeRule(Repository.Self) ],
    }),
    [Repository.ClassDeclaration]: rules_common.createClassDeclarationRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      endAnchor: patterns_common.lineEndAnchor,
      identifierPattern: patterns_v1.identifierPattern,
      rulesInBody: [
        includeRule(Repository.Meta),

        includeRule(Repository.MethodDeclarationHead),
        includeRule(Repository.PropertyDeclaration),
        includeRule(Repository.BlockInClassBody),
        includeRule(Repository.Statement),
      ],
    }),
    [Repository.BlockInClassBody]: rules_common.createBlockInClassBodyRule(scopeName),
    [Repository.PropertyDeclaration]: rules_common.createPropertyDeclarationRule(scopeName, {
      modifiers: constants_common.accessModifiers,
      identifierPattern: patterns_v1.looseLeftHandPattern,
      identifierNameRule: patternsRule(includeRule(Repository.Variable)),
      keywordsInArgument: [ 'byref' ],
    }),
    // #endregion declaration

    // #region expression
    [Repository.Expression]: includeRule(Repository.ExpressionInControlFlow),
    [Repository.ExpressionInBrackets]: patternsRule(
      includeRule(Repository.ObjectInBrackets),
      includeRule(Repository.Expression),
    ),
    [Repository.ExpressionInControlFlow]: patternsRule(
      includeRule(Repository.ShorthandRegexpMatch),
      includeRule(Repository.NewCallExpression),
      includeRule(Repository.KeywordInExpression),
      includeRule(Repository.InvalidDereference),
      includeRule(Repository.Dereference),
      includeRule(Repository.CallExpression_FunctionDeclarationHead),
      includeRule(Repository.ParenthesizedExpression),
      includeRule(Repository.Literal),
      includeRule(Repository.KeywordLikeBuiltInVariable),
      includeRule(Repository.BuiltInVariable),
      includeRule(Repository.Variable),

      includeRule(Repository.Dot),
      includeRule(Repository.Operator),
    ),
    [Repository.ParenthesizedExpression]: rule_v1.createParenthesizedExpressionRule(scopeName),

    // #region identifier
    [Repository.Variable]: patternsRule(
      includeRule(Repository.KeywordLikeBuiltInVariable),
      includeRule(Repository.BuiltInVariable),
      includeRule(Repository.ConstantLikeVariable),
      includeRule(Repository.UserDefinedVariable),
    ),
    [Repository.ConstantLikeVariable]: rules_common.createIdentifierRule(scopeName, {
      ruleName: RuleName.ConstantLikeVariable,
      identifierPattern: patterns_v1.upperIdentifierPattern,
      endAnchor: patterns_v1.identifierEndAnchor,
    }),
    [Repository.UserDefinedVariable]: rules_common.createIdentifierRule(scopeName, {
      ruleName: RuleName.Variable,
      identifierPattern: patterns_v1.identifierPattern,
      endAnchor: patterns_v1.identifierEndAnchor,
    }),
    [Repository.KeywordLikeBuiltInVariable]: rules_common.createReservedIdentifierRule(scopeName, {
      ruleName: RuleName.KeywordLikeBuiltInVariable,
      identifiers: constants_v1.keywordLikeBuiltinVariables,
    }),
    [Repository.BuiltInVariable]: rules_common.createReservedIdentifierRule(scopeName, {
      ruleName: RuleName.BuiltInVariable,
      identifiers: constants_v1.builtinVaribles,
    }),
    [Repository.MetaFunctionName]: rules_common.createReservedIdentifierRule(scopeName, {
      ruleName: RuleName.MetaFunctionName,
      identifiers: [ '__NEW', '__DELETE', '__GET', '__SET', '__CALL' ],
    }),
    [Repository.FunctionName]: rules_common.createIdentifierRule(scopeName, {
      ruleName: RuleName.FunctionName,
      identifierPattern: patterns_v1.identifierPattern,
    }),
    [Repository.LabelName]: rules_common.createIdentifierRule(scopeName, {
      ruleName: RuleName.LabelName,
      identifierPattern: patterns_v1.identifierPattern,
    }),
    [Repository.KeywordInExpression]: rules_common.createReservedIdentifierRule(scopeName, {
      ruleName: RuleName.KeywordInExpression,
      identifiers: [
        'new',
        ...constants_common.expressionKeywords,

        // #region The following are not exactly keywords in the expression, but are defined here as keywords because it is more convenient for the TMLanguage mechanism
        // for key, value in obj
        //                ^^
        'in',
        // #endregion
      ],
    }),
    // #endregion identifier

    // #region access
    [Repository.Dereference]: rule_v1.createDereferenceRule(scopeName),
    [Repository.InvalidDereference]: rule_v1.createInvalidDereferenceRule(scopeName),
    // #endregion access

    // #region literal
    [Repository.Literal]: patternsRule(
      includeRule(Repository.StringAsRegExp),
      includeRule(Repository.String),
      includeRule(Repository.Number),
      includeRule(Repository.Object),
      includeRule(Repository.Array),
    ),

    // #region object
    [Repository.ObjectInBrackets]: rules_common.createObjectRule(scopeName, {
      startAnchor: patterns_common.lineStartAnchor,
    }),
    ...rules_common.createObjectRepositories(scopeName, {
      startAnchor: patterns_v1.expressionContinuationStartAnchor,
      keyName: patterns_v1.keyName,
      contents: [
        includeRule(Repository.Meta),

        includeRule(Repository.ObjectKey),
        includeRule(Repository.Comma),
        includeRule(Repository.ExpressionInBrackets),
      ],
    }),
    [Repository.Array]: rules_common.createArrayRule(scopeName),
    // #endregion object

    // #region string
    [Repository.String]: patternsRule(
      includeRule(Repository.DoubleString),
      includeRule(Repository.ContinuationDoubleString),
    ),
    ...rules_common.createDoubleStringRepositories(scopeName, {
      endAnchor: patterns_common.lineEndAnchor,
      escapedQuotePattern: patterns_v1.escapedDoubleQuotePattern,
      escapeSequences: constants_v1.doubleQuoteEscapeSequences,
    }),
    // #endregion string

    // #region number
    ...rules_common.createNumberRepositories(scopeName),
    // #endregion number
    // #endregion literal

    // #region operator
    ...rules_common.createOperatorRepositories(scopeName, {
      expressionOperators: constants_v1.expressionOperators,
    }),
    // #endregion operator

    // #region regexp
    [Repository.ShorthandRegexpMatch]: rule_v1.createShorthandRegExpMatchRule(scopeName, {
      quoteChar: '"',
      escapedQuotePattern: patterns_v1.escapedDoubleQuotePattern,
      regexpOptionsPattern: patterns_v1.regexpOptionsPattern,
      contentRuleName: RuleName.RegExpString,
      contentRepository: Repository.DoubleStringAsRegExpContent,
    }),
    [Repository.StringAsRegExp]: patternsRule(includeRule(Repository.DoubleStringAsRegexp)),
    [Repository.DoubleStringAsRegexp]: rule_v1.createStringAsRegExpRule(scopeName, {
      quoteChar: '"',
      escapedQuotePattern: patterns_v1.escapedDoubleQuotePattern,
      regexpOptionsPattern: patterns_v1.regexpOptionsPattern,
      contentRuleName: RuleName.RegExpString,
      contentRepository: Repository.DoubleStringAsRegExpContent,
    }),
    [Repository.DoubleStringAsRegExpContent]: rule_v1.createStringAsRegExpContentRule(scopeName, {
      regexpOptions: constants_v1.regexpOptions,
      contentRepository: Repository.DoubleStringAsRegExpContent,
      commonContentRepository: Repository.DoubleStringAsRegExpCommonContent,
    }),
    [Repository.DoubleStringAsRegExpCommonContent]: rule_v1.createRegExpCommonContentRule(scopeName, {
      regexpEscapeSequences: constants_common.regexpEscapeSequences,
      stringEscapeSequences: constants_v1.doubleQuoteEscapeSequences,
      pcreUnicodePropertyCodes: constants_common.pcreUnicodePropertyCodes,
      pcreUnicodePropertyScripts: constants_common.pcreUnicodePropertyScripts,
    }),
    // #endregion regexp

    // #region misc
    [Repository.CallExpression_FunctionDeclarationHead]: rule_v1.createCallExpressionRule(scopeName, {
      callableNamePattern: patterns_v1.looseCallableNamePattern,
      callableNameRule: namedPatternsRule(
        name(scopeName, RuleName.FunctionName),
        [ includeRule(Repository.BuiltInClass) ],
      ),
      keywordsInArgument: [ 'byref' ],
    }),
    [Repository.MethodDeclarationHead]: rule_v1.createCallExpressionRule(scopeName, {
      callableNamePattern: patterns_v1.identifierPattern,
      callableNameRule: patternsRule(
        includeRule(Repository.MetaFunctionName),
        includeRule(Repository.FunctionName),
      ),
      keywordsInArgument: [ 'byref' ],
    }),
    [Repository.NewCallExpression]: rule_v1.createNewCallExpressionRule(scopeName, {
      callableNamePattern: patterns_v1.looseCallableNamePattern,
    }),
    // #endregion misc
    // #endregion expression

    // #region command
    [Repository.CommandArgument]: patternsRule(
      includeRule(Repository.PercentExpression),
      includeRule(Repository.Dereference),
      includeRule(Repository.CommandArgumentText),
      includeRule(Repository.AllInLineComments),
    ),
    [Repository.CommandArgumentWithNumber]: patternsRule(
      includeRule(Repository.PercentExpression),
      includeRule(Repository.Dereference),
      includeRule(Repository.CommandArgumentNumber),
      includeRule(Repository.CommandArgumentText),
      includeRule(Repository.AllInLineComments),
    ),
    [Repository.CommandLastArgument]: patternsRule(
      includeRule(Repository.PercentExpressionInLastArgument),
      includeRule(Repository.Dereference),
      includeRule(Repository.CommandLastArgumentText),
      includeRule(Repository.AllInLineComments),
    ),
    [Repository.CommandLastArgumentWithNumber]: patternsRule(
      includeRule(Repository.PercentExpressionInLastArgument),
      includeRule(Repository.Dereference),
      includeRule(Repository.CommandArgumentNumber),
      includeRule(Repository.CommandLastArgumentText),
      includeRule(Repository.AllInLineComments),
    ),
    [Repository.CommandRestArguments]: rules_common.createCommandRestArgumentsRule(scopeName),
    [Repository.CommandInvalidArgument]: rules_common.createInvalidArgumentRule(scopeName),
    [Repository.MenuItemNameCommandArgument]: rules_common.createMenuNameCommandArgumentRule(scopeName),
    [Repository.UnquotedStringEscapeSequence]: rule_v1.createUnquotedEscapeSequencesRule(scopeName, constants_v1.unquoteEscapeSequences),
    [Repository.CommandArgumentText]: rule_v1.createUnquotedStringRule(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      stringPattern: patterns_common.unquotedArgumentPattern,
    }),
    [Repository.CommandArgumentNumber]: rule_v1.createNumberRule(scopeName),
    [Repository.CommandLastArgumentText]: rule_v1.createUnquotedStringRule(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      stringPattern: patterns_common.unquotedLastArgumentPattern,
    }),
    [Repository.CommandArgumentSendKeyName]: rules_common.createSendKeyCommandArgumentRule(scopeName),
    // #endregion command

    // #region legacy
    [Repository.Legacy]: patternsRule(includeRule(Repository.LegacyAssignmentDeclaration)),
    [Repository.LegacyIfStatement]: rule_v1.createLegacyIfStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      endAnchor: patterns_common.lineEndAnchor,
      identifierPattern: patterns_v1.identifierPattern,
    }),
    [Repository.LegacyAssignmentDeclaration]: rule_v1.createLegacyAssignmentRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      leftHandPattern: patterns_v1.looseLeftHandPattern,
    }),
    [Repository.PercentExpression]: rule_v1.createPercentExpressionRule(scopeName, {
      expressionPattern: patterns_common.unquotedExpressionArgumentPattern,
    }),
    [Repository.PercentExpressionInLastArgument]: rule_v1.createPercentExpressionRule(scopeName, {
      expressionPattern: patterns_common.unquotedExpressionLastArgumentPattern,
    }),
    [Repository.ContinuationSection]: rule_v1.createContinuationSectionRule(scopeName, {
      endAnchor: patterns_common.lineEndAnchor,
    }),
    [Repository.ContinuationSectionText]: rule_v1.createUnquotedStringRule(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      stringPattern: anyChars1(),
      additionalRules: [ rule_v1.createUnquotedEscapeSequencesRule(scopeName, [ '`)' ]) ],
    }),
    // #endregion legacy

    // #region compiler directive
    [Repository.CompilerDirectiveComment]: rules_common.createDirectiveCommentPatternsRule(scopeName, {
      startAnchor: patterns_common.lineStartAnchor,
      endAnchor: patterns_common.lineEndAnchor,
      definitions: definition_common.compilerDirectives,
    }),
    [Repository.UnquotedStringInCompilerDirective]: rule_v1.createUnquotedStringRule(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      stringPattern: patterns_common.unquotedArgumentPattern,
      escapeSequenceRepository: Repository.UnquotedStringEscapeSequenceInCompilerDirective,
      additionalRules: [ includeRule(Repository.DereferenceInCompilerDirective) ],
    }),
    [Repository.UnquotedStringEscapeSequenceInCompilerDirective]: rule_v1.createUnquotedEscapeSequencesRule(
      scopeName,
      constants_common.compilerDirectiveEscapeSequences,
    ),
    [Repository.BuiltInVariableInCompilerDirective]: rules_common.createReservedIdentifierRule(scopeName, {
      ruleName: RuleName.KeywordLikeBuiltInVariable,
      identifiers: constants_common.compilerDirectiveVariables,
    }),
    [Repository.DereferenceInCompilerDirective]: rules_common.createCompilerDirectiveDereferenceMatchRule(scopeName),
    [Repository.ExpressionInCompilerDirective]: patternsRule(
      includeRule(Repository.KeywordInExpression),
      includeRule(Repository.Dereference),
      includeRule(Repository.ParenthesizedExpression),
      includeRule(Repository.DereferenceInCompilerDirective),
      includeRule(Repository.DoubleStringInCompilerDirective),
      includeRule(Repository.Literal),
      includeRule(Repository.BuiltInVariableInCompilerDirective),
      includeRule(Repository.Variable),

      includeRule(Repository.Dot),
      includeRule(Repository.Operator),
    ),
    [Repository.DoubleStringInCompilerDirective]: rules_common.createDoubleStringInCompilerDirectiveRule(scopeName),
    [Repository.DoubleStringContentInCompilerDirective]: rules_common.createDoubleStringContentInCompilerDirectiveRule(scopeName),
    // #endregion compiler directive
  };
}
