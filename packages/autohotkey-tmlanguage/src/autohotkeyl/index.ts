import * as markdown from '../__injection__/markdown';
import * as constants_common from '../common/constants';
import * as definition_common from '../common/definition';
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
      includeRule(Repository.RequiresStatement),
      includeRule(Repository.IncludeStatement),
      includeRule(Repository.DirectiveStatement),
    ),

    // #region trivia
    [Repository.Comment]: patternsRule(
      includeRule(Repository.MultiLineComments),
      includeRule(Repository.InLineComments),
      includeRule(Repository.SingleLineComments),
    ),
    [Repository.MultiLineComments]: patternsRule(
      includeRule(Repository.MultiLineDocumentComment),
      includeRule(Repository.MultiLineComment),
    ),
    [Repository.MultiLineComment]: rule_v1.createMultiLineCommentRule(scopeName),
    [Repository.MultiLineDocumentComment]: rule_v1.createDocumentCommentRule(scopeName, {
      leftHandPattern: patterns_v1.looseLeftHandPattern,
    }),
    [Repository.SingleLineComments]: patternsRule(
      includeRule(Repository.CompilerDirectiveComment),
      includeRule(Repository.SingleLineDocumentComment),
      includeRule(Repository.SingleLineComment),
    ),
    [Repository.SingleLineComment]: rule_v1.createSingleLineCommentRule(scopeName),
    [Repository.SingleLineDocumentComment]: rule_v1.createSinglelineDocumentCommentRule(scopeName, {
      leftHandPattern: patterns_v1.looseLeftHandPattern,
    }),
    [Repository.InLineComments]: patternsRule(
      includeRule(Repository.InlineDocumentComment),
      includeRule(Repository.InLineComment),
    ),
    [Repository.InLineComment]: rule_v1.createInLineCommentRule(scopeName),
    [Repository.InlineDocumentComment]: rule_v1.createInlineDocumentCommentRule(scopeName, {
      leftHandPattern: patterns_v1.looseLeftHandPattern,
    }),

    [Repository.TypeInDocument]: rule_v1.createDocumentTypeRule(scopeName),
    [Repository.InlineTextInDocument]: rule_v1.createInlineTextInDocumentRule(scopeName),
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
    [Repository.CommandStatement]: rule_v1.createCommandLikeStatementRule(scopeName, definition_v1.commandDefinitions, {
      startAnchor: patterns_v1.statementStartAnchor,
      endAnchor: patterns_v1.lineEndAnchor,
      commandElementName: RuleName.CommandName,
    }),
    [Repository.RequiresStatement]: rule_v1.createRequiresStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      expressionOperators: constants_v1.expressionOperators,
      endAnchor: patterns_v1.lineEndAnchor,
    }),
    [Repository.IncludeStatement]: rule_v1.createIncludeStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      expressionOperators: constants_v1.expressionOperators,
      endAnchor: patterns_v1.lineEndAnchor,
    }),
    [Repository.DirectiveStatement]: rule_v1.createCommandLikeStatementRule(scopeName, definition_v1.directiveDefinitions, {
      startAnchor: patterns_v1.lineStartAnchor,
      endAnchor: patterns_v1.lineEndAnchor,
      commandElementName: RuleName.DirectiveName,
    }),
    [Repository.JumpStatement]: rule_v1.createJumpStatement(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      assignmentOperators: constants_v1.assignmentOperators,
      endAnchor: patterns_v1.lineEndAnchor,
      identifierPattern: ordalt('Exit', 'ExitApp', 'Return'),
    }),
    [Repository.JumpToLabelStatement]: rule_v1.createJumpToLabelStatement(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      endAnchor: patterns_v1.lineEndAnchor,
      names: [
        'Break',
        'Continue',
        'Gosub',
        'Goto',
      ],
      labelPattern: patterns_v1.identifierPattern,
    }),
    [Repository.HotstringLabelStatement]: rule_v1.createHotstringLabelRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      endAnchor: patterns_v1.lineEndAnchor,
    }),
    [Repository.HotkeyLabelStatement]: rule_v1.createHotkeyLabelRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
    }),
    [Repository.LabelStatement]: rule_v1.createLabelRule(scopeName, {
      startAnchor: patterns_v1.lineStartAnchor,
      labelPattern: patterns_v1.identifierPattern,
    }),

    [Repository.IfStatement]: rule_v1.createIfStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
    }),
    [Repository.SwitchStatement]: rule_v1.createSwitchStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      endAnchor: patterns_v1.lineEndAnchor,
      identifierPattern: patterns_v1.identifierPattern,
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
      assignmentOperators: constants_v1.assignmentOperators,
    }),

    [Repository.ExpressionStatement]: patternsRule(includeRule(Repository.Expressions)),
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
    [Repository.Modifier]: rule_v1.createModifierRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      modifiers: constants_common.accessModifiers,
    }),
    [Repository.AssignmentDeclaration]: rule_v1.createAssignmentDeclarationRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      namePattern: patterns_v1.looseLeftHandPattern,
      operators: constants_v1.assignmentOperators,
    }),
    [Repository.Block]: rule_v1.createBlockRule(scopeName, {
      statementsInBlock: [ includeRule(Repository.Self) ],
    }),
    [Repository.ClassDeclaration]: rule_v1.createClassDeclarationRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      endAnchor: patterns_v1.lineEndAnchor,
      identifierPattern: patterns_v1.identifierPattern,
      rulesInBody: [
        includeRule(Repository.Meta),

        includeRule(Repository.MethodDeclarationHead),
        includeRule(Repository.PropertyDeclaration),
        includeRule(Repository.BlockInClassBody),
        includeRule(Repository.Statement),
      ],
    }),
    [Repository.BlockInClassBody]: rule_v1.createBlockInClassBodyRule(scopeName),
    [Repository.PropertyDeclaration]: rule_v1.createPropertyDeclarationRule(scopeName, {
      modifiers: constants_common.accessModifiers,
      identifierPattern: patterns_v1.looseLeftHandPattern,
      identifierNameRule: patternsRule(includeRule(Repository.Variable)),
      keywordsInArgument: [ 'byref' ],
    }),
    // #endregion declaration

    // #region expression
    [Repository.Expression]: includeRule(Repository.ExpressionInControlFlow),
    [Repository.Expressions]: patternsRule(
      includeRule(Repository.Comma),
      includeRule(Repository.Expression),
    ),
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
      includeRule(Repository.InvalidVariable),
      includeRule(Repository.Variable),

      includeRule(Repository.Dot),
      includeRule(Repository.Operator),
    ),
    [Repository.ParenthesizedExpression]: rule_v1.createParenthesizedExpressionRule(scopeName),

    // #region variable
    [Repository.Variable]: patternsRule(
      includeRule(Repository.KeywordLikeBuiltInVariable),
      includeRule(Repository.BuiltInVariable),
      includeRule(Repository.ConstantLikeVariable),
      includeRule(Repository.UserDefinedVariable),
      includeRule(Repository.InvalidVariable),
    ),
    [Repository.ConstantLikeVariable]: rule_v1.createVariableRule(scopeName, {
      ruleName: RuleName.ConstantLikeVariable,
      nameHeadChar: patterns_v1.nameStart_upper,
      nameBodyChar: patterns_v1.nameBody_upper,
    }),
    [Repository.UserDefinedVariable]: rule_v1.createVariableRule(scopeName, {
      ruleName: RuleName.Variable,
      nameHeadChar: patterns_v1.nameStart,
      nameBodyChar: patterns_v1.nameBody,
    }),
    [Repository.InvalidVariable]: rule_v1.createInvalidVariableRule(scopeName, {
      ruleName: RuleName.Variable,
      nameHeadChar: patterns_v1.nameStart,
      nameBodyChar: patterns_v1.nameBody,
    }),
    [Repository.KeywordLikeBuiltInVariable]: rule_v1.createBuiltinVariableRule(scopeName, {
      variableRuleName: RuleName.KeywordLikeBuiltInVariable,
      builtinVariables: constants_v1.keywordLikeBuiltinVariables,
    }),
    [Repository.BuiltInVariable]: rule_v1.createBuiltinVariableRule(scopeName, {
      variableRuleName: RuleName.BuiltInVariable,
      builtinVariables: constants_v1.builtinVaribles,
    }),
    [Repository.MetaFunctionName]: rule_v1.createKeywordRule(scopeName, {
      keywordRuleName: RuleName.MetaFunctionName,
      keywords: [ '__NEW', '__DELETE', '__GET', '__SET', '__CALL' ],
    }),
    [Repository.FunctionName]: rule_v1.createVariableRule(scopeName, {
      ruleName: RuleName.FunctionName,
      nameHeadChar: patterns_v1.nameStart,
      nameBodyChar: patterns_v1.nameBody,
    }),
    // #endregion variable

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
    [Repository.ObjectInBrackets]: rule_v1.createObjectRule(scopeName, {
      startAnchor: patterns_v1.lineStartAnchor,
    }),
    [Repository.Object]: rule_v1.createObjectRule(scopeName, {
      startAnchor: patterns_v1.expressionContinuationStartAnchor,
    }),
    [Repository.ObjectContent]: patternsRule(
      includeRule(Repository.Meta),

      includeRule(Repository.ObjectKey),
      includeRule(Repository.Comma),
      includeRule(Repository.ExpressionInBrackets),
    ),
    [Repository.ObjectKey]: rule_v1.createObjectKeyRule(scopeName, {
      keyName: patterns_v1.keyName,
    }),
    [Repository.Array]: rule_v1.createArrayRule(scopeName),
    // #endregion object

    // #region string
    [Repository.String]: patternsRule(
      includeRule(Repository.DoubleString),
      includeRule(Repository.ContinuationDoubleString),
    ),
    [Repository.DoubleString]: rule_v1.createStringRule(scopeName, {
      stringContentRepository: Repository.DoubleStringContent,
      quoteChar: '"',
      unescapedQuotePattern: patterns_v1.unescapedDoubleQuotePattern,
      stringElementName: RuleName.DoubleString,
    }),
    [Repository.DoubleStringContent]: rule_v1.createStringContentRule(scopeName, {
      escapeSequences: constants_v1.doubleQuoteEscapeSequences,
    }),
    [Repository.ContinuationStringOptions]: rule_v1.createContinuationStringOptionsRule(scopeName),
    [Repository.ContinuationDoubleString]: rule_v1.createContinuationString(scopeName, {
      endAnchor: patterns_v1.lineEndAnchor,
      quoteChar: '"',
      unescapedQuotePattern: patterns_v1.unescapedDoubleQuotePattern,
      stringElementName: RuleName.DoubleString,
      stringContentRepository: Repository.DoubleStringContent,
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
    [Repository.Comma]: rule_v1.createOperatorRule(scopeName, {
      operatorRuleName: RuleName.Comma,
      operators: [ ',' ],
    }),
    [Repository.Dot]: rule_v1.createDotOperatorRule(scopeName),
    [Repository.Operator]: rule_v1.createOperatorRule(scopeName, {
      operatorRuleName: RuleName.Operator,
      operators: constants_v1.expressionOperators,
    }),
    [Repository.KeywordInExpression]: rule_v1.createKeywordRule(scopeName, {
      keywordRuleName: RuleName.KeywordInExpression,
      keywords: [
        'new',
        ...constants_v1.expressionKeywords,

        // #region The following are not exactly keywords in the expression, but are defined here as keywords because it is more convenient for the TMLanguage mechanism
        // for key, value in obj
        //                ^^
        'in',
        // #endregion
      ],
    }),
    // #endregion token, keyword

    // #region regexp
    [Repository.ShorthandRegexpMatch]: rule_v1.createShorthandRegExpMatchRule(scopeName, {
      quoteChar: '"',
      unescapedQuotePattern: patterns_v1.unescapedDoubleQuotePattern,
      regexpOptionsPattern: patterns_v1.regexpOptionsPattern,
      contentRuleName: RuleName.RegExpString,
      contentRepository: Repository.DoubleStringAsRegExpContent,
    }),
    [Repository.StringAsRegExp]: patternsRule(includeRule(Repository.DoubleStringAsRegexp)),
    [Repository.DoubleStringAsRegexp]: rule_v1.createStringAsRegExpRule(scopeName, {
      quoteChar: '"',
      unescapedQuotePattern: patterns_v1.unescapedDoubleQuotePattern,
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
      regexpEscapeSequences: constants_v1.regexpEscapeSequences,
      stringEscapeSequences: constants_v1.doubleQuoteEscapeSequences,
      pcreUnicodePropertyCodes: constants_v1.pcreUnicodePropertyCodes,
      pcreUnicodePropertyScripts: constants_v1.pcreUnicodePropertyScripts,
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
      includeRule(Repository.InLineComments),
    ),
    [Repository.CommandArgumentWithNumber]: patternsRule(
      includeRule(Repository.PercentExpression),
      includeRule(Repository.Dereference),
      includeRule(Repository.CommandArgumentNumber),
      includeRule(Repository.CommandArgumentText),
      includeRule(Repository.InLineComments),
    ),
    [Repository.CommandLastArgument]: patternsRule(
      includeRule(Repository.PercentExpressions),
      includeRule(Repository.Dereference),
      includeRule(Repository.CommandLastArgumentText),
      includeRule(Repository.InLineComments),
    ),
    [Repository.CommandLastArgumentWithNumber]: patternsRule(
      includeRule(Repository.PercentExpressions),
      includeRule(Repository.Dereference),
      includeRule(Repository.CommandArgumentNumber),
      includeRule(Repository.CommandLastArgumentText),
      includeRule(Repository.InLineComments),
    ),
    [Repository.CommandRestArguments]: rule_v1.createCommandRestArgumentsRule(scopeName),
    [Repository.CommandInvalidArgument]: rule_v1.createInvalidArgumentRule(scopeName),
    [Repository.MenuItemNameCommandArgument]: rule_v1.createMenuNameCommandArgumentRule(scopeName),
    [Repository.UnquotedStringEscapeSequence]: rule_v1.createUnquotedEscapeSequencesRule(scopeName, constants_v1.unquoteEscapeSequences),
    [Repository.CommandArgumentText]: rule_v1.createUnquotedStringRule(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      stringPattern: patterns_v1.commandArgumentPattern,
    }),
    [Repository.CommandArgumentNumber]: rule_v1.createNumberRule(scopeName),
    [Repository.CommandLastArgumentText]: rule_v1.createUnquotedStringRule(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      stringPattern: patterns_v1.lastArgumentPattern,
    }),
    [Repository.CommandArgumentSendKeyName]: rule_v1.createSendKeyCommandArgumentRule(scopeName),
    // #endregion command

    // #region legacy
    [Repository.Legacy]: patternsRule(includeRule(Repository.LegacyAssignmentDeclaration)),
    [Repository.LegacyIfStatement]: rule_v1.createLegacyIfStatementRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      endAnchor: patterns_v1.lineEndAnchor,
      identifierPattern: patterns_v1.identifierPattern,
    }),
    [Repository.LegacyAssignmentDeclaration]: rule_v1.createLegacyAssignmentRule(scopeName, {
      startAnchor: patterns_v1.statementStartAnchor,
      leftHandPattern: patterns_v1.looseLeftHandPattern,
    }),
    [Repository.PercentExpression]: rule_v1.createPercentExpressionRule(scopeName, {
      expressionPattern: patterns_v1.expressionArgumentPattern,
    }),
    [Repository.PercentExpressions]: rule_v1.createPercentExpressionRule(scopeName, {
      expressionPattern: patterns_v1.expressionLastArgumentPattern,
    }),
    [Repository.ContinuationSection]: rule_v1.createContinuationSectionRule(scopeName, {
      endAnchor: patterns_v1.lineEndAnchor,
    }),
    [Repository.ContinuationSectionText]: rule_v1.createUnquotedStringRule(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      stringPattern: anyChars1(),
      additionalRules: [ rule_v1.createUnquotedEscapeSequencesRule(scopeName, [ '`)' ]) ],
    }),
    // #endregion legacy

    // #region compiler directive
    [Repository.CompilerDirectiveComment]: rule_v1.createDirectiveCommentPatternsRule(scopeName, {
      startAnchor: patterns_v1.lineStartAnchor,
      endAnchor: patterns_v1.lineEndAnchor,
      definitions: definition_common.compilerDirectives,
    }),
    [Repository.UnquotedStringInCompilerDirective]: rule_v1.createUnquotedStringRule(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      stringPattern: patterns_v1.commandArgumentPattern,
      escapeSequenceRepository: Repository.UnquotedStringEscapeSequenceInCompilerDirective,
      additionalRules: [ includeRule(Repository.DereferenceInCompilerDirective) ],
    }),
    [Repository.UnquotedStringEscapeSequenceInCompilerDirective]: rule_v1.createUnquotedEscapeSequencesRule(
      scopeName,
      constants_common.compilerDirectiveEscapeSequences,
    ),
    [Repository.BuiltInVariableInCompilerDirective]: rule_v1.createBuiltinVariableRule(scopeName, {
      variableRuleName: RuleName.KeywordLikeBuiltInVariable,
      builtinVariables: constants_common.compilerDirectiveVariables,
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
