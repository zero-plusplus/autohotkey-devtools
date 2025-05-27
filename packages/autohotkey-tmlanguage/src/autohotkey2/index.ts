import * as markdown from '../__injection__/markdown';
import * as constants_v1 from '../autohotkeyl/constants';
import * as patterns_v1 from '../autohotkeyl/patterns';
import * as rule_v1 from '../autohotkeyl/rules';
import * as constants_common from '../common/constants';
import * as definition_common from '../common/definition';
import * as patterns_common from '../common/patterns';
import * as rule_common from '../common/rules';
import { Repository, RuleName } from '../constants';
import { ordalt } from '../oniguruma';
import type { Repositories, ScopeName, TmLanguage } from '../types';
import { includeRule, name, namedPatternsRule, patternsRule } from '../utils';
import * as constants_v2 from './constants';
import * as definition_v2 from './definition';
import * as patterns_v2 from './patterns';
import * as rule_v2 from './rules';

export function createTmLanguage(): TmLanguage {
  const scopeName: ScopeName = 'autohotkey2';

  return {
    scopeName: `source.${scopeName}`,
    patterns: [
      includeRule(Repository.Meta),
      includeRule(Repository.Statement),
    ],
    repository: createRepositories(scopeName),
  };
}

interface Placeholder {
  builtinVaribles: readonly string[];
  builtInClassNames: readonly string[];
  builtInFunctionNames: readonly string[];
  deprecatedBuiltinFunctionNames: readonly string[];
}
export function createRepositories(scopeName: ScopeName, placeholder?: Placeholder): Repositories {
  return {
    [Repository.FencedCodeBlockInDocument]: markdown.createCodeFencePatternsRule(),
    [Repository.Meta]: patternsRule(
      includeRule(Repository.Comment),
      includeRule(Repository.DirectiveStatement),
    ),

    // #region trivia
    [Repository.Comment]: patternsRule(
      includeRule(Repository.AllMultiLineComments),
      includeRule(Repository.AllSingleLineComments),
      includeRule(Repository.AllInLineComments),
    ),
    [Repository.AllMultiLineComments]: patternsRule(
      includeRule(Repository.MultiLineDocumentComment),
      includeRule(Repository.MultiLineComment),
    ),
    [Repository.MultiLineComment]: rule_common.createMultiLineCommentRule(scopeName),
    [Repository.MultiLineDocumentComment]: rule_common.createDocumentCommentRule(scopeName, {
      leftHandPattern: patterns_v2.looseLeftHandPattern,
    }),
    [Repository.AllSingleLineComments]: patternsRule(
      includeRule(Repository.CompilerDirectiveComment),
      includeRule(Repository.SingleLineDocumentComment),
      includeRule(Repository.SingleLineComment),
    ),
    [Repository.SingleLineComment]: rule_common.createSingleLineCommentRule(scopeName),
    [Repository.SingleLineDocumentComment]: rule_common.createSinglelineDocumentCommentRule(scopeName, {
      leftHandPattern: patterns_v2.looseLeftHandPattern,
    }),
    [Repository.AllInLineComments]: patternsRule(
      includeRule(Repository.InLineComment),
      includeRule(Repository.InlineDocumentComment),
    ),
    [Repository.InLineComment]: rule_common.createInLineCommentRule(scopeName),
    [Repository.InlineDocumentComment]: rule_common.createInlineDocumentCommentRule(scopeName, {
      leftHandPattern: patterns_v2.looseLeftHandPattern,
    }),
    [Repository.TypeInDocument]: rule_common.createDocumentTypeRule(scopeName),
    [Repository.InlineTextInDocument]: rule_common.createInlineTextInDocumentRule(scopeName),
    // #endregion trivia

    // #region statement
    [Repository.Statement]: patternsRule(
      includeRule(Repository.StatementCommon),

      includeRule(Repository.CallStatement),
      includeRule(Repository.ExpressionStatement),
    ),
    [Repository.StatementCommon]: patternsRule(
      includeRule(Repository.Declaration),
      includeRule(Repository.JumpStatement),
      includeRule(Repository.JumpToLabelStatement),
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
    ),
    [Repository.DirectiveStatement]: patternsRule(
      rule_v1.createCommandLikeStatementRule(scopeName, definition_v2.directiveDefinitions, {
        startAnchor: patterns_v2.statementStartAnchor,
        endAnchor: patterns_common.lineEndAnchor,
        commandElementName: RuleName.DirectiveName,
      }),
      rule_v1.createCommandLikeStatementRule(scopeName, [ definition_common.undefinedDirective ], {
        startAnchor: patterns_v2.statementStartAnchor,
        endAnchor: patterns_common.lineEndAnchor,
        commandElementName: RuleName.DirectiveName,
      }),
    ),
    [Repository.JumpStatement]: rule_v1.createJumpStatement(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
      assignmentOperators: constants_common.assignmentOperators,
      endAnchor: patterns_common.lineEndAnchor,
      identifierPattern: ordalt('Exit', 'ExitApp', 'Return'),
    }),
    [Repository.JumpToLabelStatement]: rule_v1.createJumpToLabelStatement(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
      endAnchor: patterns_common.lineEndAnchor,
      names: [
        'Break',
        'Continue',
        'Gosub',
        'Goto',
      ],
      labelPattern: patterns_v2.identifierPattern,
    }),
    [Repository.HotstringLabelStatement]: rule_v1.createHotstringLabelRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
      endAnchor: patterns_common.lineEndAnchor,
    }),
    [Repository.HotkeyLabelStatement]: rule_v1.createHotkeyLabelRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
    }),
    [Repository.LabelStatement]: rule_v1.createLabelRule(scopeName, {
      startAnchor: patterns_common.lineStartAnchor,
      labelPattern: patterns_v2.identifierPattern,
    }),

    [Repository.IfStatement]: rule_v1.createIfStatementRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
    }),
    [Repository.SwitchStatement]: rule_v1.createSwitchStatementRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
      endAnchor: patterns_common.lineEndAnchor,
      identifierPattern: patterns_v2.identifierPattern,
    }),
    [Repository.WhileStatement]: rule_v1.createWhileStatementRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
    }),
    [Repository.LoopStatement]: rule_v2.createLoopStatementRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
      endAnchor: patterns_v1.controlFlowEndAnchor,
    }),
    [Repository.UntilStatement]: rule_v1.createUntilStatementRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
    }),
    [Repository.ForStatement]: rule_v1.createForStatementRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
    }),
    [Repository.TryStatement]: rule_v1.createTryStatementRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
    }),
    [Repository.ThrowStatement]: rule_v1.createThrowStatementRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
      assignmentOperators: constants_common.assignmentOperators,
    }),
    [Repository.CallStatement]: patternsRule(
      includeRule(Repository.BuiltInCallStatement),
      includeRule(Repository.UserDefinedCallStatement),
    ),
    [Repository.BuiltInCallStatement]: patternsRule(
      rule_common.createCallStatementRule(scopeName, {
        commandRuleName: RuleName.FunctionName,
        startAnchor: patterns_v2.statementStartAnchor,
        identifierPattern: ordalt(...(placeholder?.builtInFunctionNames ?? constants_v2.builtInFunctionNames)),
        assignmentOperators: constants_v2.expressionOperators,
      }),
      rule_common.createCallStatementRule(scopeName, {
        commandRuleName: RuleName.FunctionName,
        startAnchor: patterns_v2.statementStartAnchor,
        identifierPattern: ordalt(...(placeholder?.deprecatedBuiltinFunctionNames ?? constants_v2.deprecatedBuiltinFunctionNames)),
        assignmentOperators: constants_v2.expressionOperators,
        isDeprecated: true,
      }),
    ),
    [Repository.UserDefinedCallStatement]: rule_common.createCallStatementRule(scopeName, {
      commandRuleName: RuleName.FunctionName,
      startAnchor: patterns_v2.statementStartAnchor,
      identifierPattern: patterns_v2.identifierPattern,
      assignmentOperators: constants_v2.expressionOperators,
    }),
    [Repository.ExpressionStatement]: patternsRule(
      includeRule(Repository.Comma),
      includeRule(Repository.Expression),
    ),
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
      startAnchor: patterns_v2.statementStartAnchor,
      modifiers: constants_common.accessModifiers,
    }),
    [Repository.AssignmentDeclaration]: rule_v1.createAssignmentDeclarationRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
      namePattern: patterns_v2.looseLeftHandPattern,
      operators: constants_common.assignmentOperators,
    }),
    [Repository.Block]: rule_v1.createBlockRule(scopeName, {
      statementsInBlock: [ includeRule(Repository.Self) ],
    }),
    [Repository.ClassDeclaration]: rule_v1.createClassDeclarationRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
      endAnchor: patterns_common.lineEndAnchor,
      identifierPattern: patterns_v2.identifierPattern,
      rulesInBody: [
        includeRule(Repository.Meta),

        includeRule(Repository.MetaPropertyName),
        includeRule(Repository.MethodDeclarationHead),
        includeRule(Repository.PropertyDeclaration),
        includeRule(Repository.BlockInClassBody),
        includeRule(Repository.StatementCommon),
        includeRule(Repository.ExpressionStatement),
      ],
    }),
    [Repository.BlockInClassBody]: rule_v1.createBlockInClassBodyRule(scopeName),
    [Repository.PropertyDeclaration]: rule_v1.createPropertyDeclarationRule(scopeName, {
      modifiers: constants_common.accessModifiers,
      identifierPattern: patterns_v2.identifierPattern,
      identifierNameRule: patternsRule(
        includeRule(Repository.MetaPropertyName),
        includeRule(Repository.Variable),
      ),
      keywordsInArgument: [],
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
      includeRule(Repository.KeywordInExpression),
      includeRule(Repository.Dereference),
      includeRule(Repository.CallExpression_FunctionDeclarationHead),
      includeRule(Repository.ParenthesizedExpression),
      includeRule(Repository.Literal),
      includeRule(Repository.Variable),

      includeRule(Repository.Dot),
      includeRule(Repository.Operator),
    ),
    [Repository.ParenthesizedExpression]: rule_v2.createParenthesizedExpressionRule(scopeName),

    // #region identifier
    [Repository.Variable]: patternsRule(
      includeRule(Repository.KeywordLikeBuiltInVariable),
      includeRule(Repository.BuiltInClass),
      includeRule(Repository.BuiltInVariable),
      includeRule(Repository.ConstantLikeVariable),
      includeRule(Repository.UserDefinedVariable),
    ),
    [Repository.ConstantLikeVariable]: rule_common.createIdentifierRule(scopeName, {
      ruleName: RuleName.ConstantLikeVariable,
      identifierPattern: patterns_v2.upperIdentifierPattern,
    }),
    [Repository.UserDefinedVariable]: rule_common.createIdentifierRule(scopeName, {
      ruleName: RuleName.Variable,
      identifierPattern: patterns_v2.identifierPattern,
    }),
    [Repository.KeywordLikeBuiltInVariable]: rule_common.createReservedIdentifierRule(scopeName, {
      ruleName: RuleName.KeywordLikeBuiltInVariable,
      identifiers: constants_v2.keywordLikeBuiltinVariables,
    }),
    [Repository.BuiltInVariable]: rule_common.createReservedIdentifierRule(scopeName, {
      ruleName: RuleName.BuiltInVariable,
      identifiers: placeholder?.builtinVaribles ?? constants_v2.builtinVaribles,
    }),
    [Repository.BuiltInClass]: rule_common.createReservedIdentifierRule(scopeName, {
      ruleName: RuleName.ClassName,
      identifiers: placeholder?.builtInClassNames ?? constants_v2.builtInClassNames,
    }),
    [Repository.FunctionName]: rule_common.createIdentifierRule(scopeName, {
      ruleName: RuleName.FunctionName,
      identifierPattern: patterns_v2.identifierPattern,
    }),
    [Repository.MetaFunctionName]: rule_common.createReservedIdentifierRule(scopeName, {
      ruleName: RuleName.MetaFunctionName,
      identifiers: [ '__NEW', '__DELETE', '__ENUM', '__GET', '__SET', '__CALL' ],
    }),
    [Repository.MetaPropertyName]: rule_common.createReservedIdentifierRule(scopeName, {
      ruleName: RuleName.MetaFunctionName,
      identifiers: [ '__ITEM' ],
    }),
    [Repository.KeywordInExpression]: rule_common.createReservedIdentifierRule(scopeName, {
      ruleName: RuleName.KeywordInExpression,
      identifiers: [
        ...constants_v2.expressionKeywords,

        // #region The following are not exactly keywords in the expression, but are defined here as keywords because it is more convenient for the TMLanguage mechanism
        // for key, value in obj
        //                ^^
        'in',
        // catch Error as err
        //             ^^
        'as',
        // #endregion
      ],
    }),
    // #endregion identifier

    // #region access
    [Repository.Dereference]: rule_v2.createDereferenceRule(scopeName),
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
    [Repository.ObjectInBrackets]: rule_common.createObjectRule(scopeName, {
      startAnchor: patterns_common.lineStartAnchor,
    }),
    ...rule_common.createObjectRepositories(scopeName, {
      startAnchor: patterns_v2.expressionContinuationStartAnchor,
      keyName: patterns_v2.keyName,
      contents: [
        includeRule(Repository.Meta),

        includeRule(Repository.ObjectKey),
        includeRule(Repository.Comma),
        includeRule(Repository.ExpressionInBrackets),
      ],
    }),
    [Repository.Array]: rule_v1.createArrayRule(scopeName),
    // #endregion object

    // #region string
    [Repository.String]: patternsRule(
      includeRule(Repository.DoubleString),
      includeRule(Repository.SingleString),
      includeRule(Repository.ContinuationDoubleString),
      includeRule(Repository.ContinuationSingleString),
    ),
    ...rule_common.createDoubleStringRepositories(scopeName, {
      endAnchor: patterns_common.lineEndAnchor,
      escapedQuotePattern: patterns_v2.escapedDoubleQuotePattern,
      escapeSequences: constants_v2.doubleQuoteEscapeSequences,
    }),
    ...rule_common.createSingleStringRepositories(scopeName, {
      endAnchor: patterns_common.lineEndAnchor,
      escapedQuotePattern: patterns_v2.escapedSingleQuotePattern,
      escapeSequences: constants_v2.singleQuoteEscapeSequences,
    }),
    // #endregion string

    // #region number
    ...rule_common.createNumberRepositories(scopeName),
    // #endregion number
    // #endregion literal

    // #region operator
    ...rule_common.createOperatorRepositories(scopeName, {
      expressionOperators: constants_v2.expressionOperators,
    }),
    // #endregion operator

    // #region regexp
    [Repository.ShorthandRegexpMatch]: patternsRule(
      rule_v1.createShorthandRegExpMatchRule(scopeName, {
        quoteChar: '"',
        escapedQuotePattern: patterns_v2.escapedDoubleQuotePattern,
        regexpOptionsPattern: patterns_common.regexpOptionsPattern,
        contentRuleName: RuleName.RegExpString,
        contentRepository: Repository.DoubleStringAsRegExpContent,
      }),
      rule_v1.createShorthandRegExpMatchRule(scopeName, {
        quoteChar: `'`,
        escapedQuotePattern: patterns_v2.escapedSingleQuotePattern,
        regexpOptionsPattern: patterns_common.regexpOptionsPattern,
        contentRuleName: RuleName.RegExpString,
        contentRepository: Repository.SingleStringAsRegExpContent,
      }),
    ),
    [Repository.StringAsRegExp]: patternsRule(
      includeRule(Repository.DoubleStringAsRegexp),
      includeRule(Repository.SingleStringAsRegexp),
    ),
    [Repository.DoubleStringAsRegexp]: rule_v1.createStringAsRegExpRule(scopeName, {
      quoteChar: '"',
      escapedQuotePattern: patterns_v2.escapedDoubleQuotePattern,
      regexpOptionsPattern: patterns_common.regexpOptionsPattern,
      contentRuleName: RuleName.RegExpString,
      contentRepository: Repository.DoubleStringAsRegExpContent,
    }),
    [Repository.DoubleStringAsRegExpContent]: rule_v1.createStringAsRegExpContentRule(scopeName, {
      regexpOptions: constants_common.regexpOptions,
      contentRepository: Repository.DoubleStringAsRegExpContent,
      commonContentRepository: Repository.DoubleStringAsRegExpCommonContent,
    }),
    [Repository.DoubleStringAsRegExpCommonContent]: rule_v1.createRegExpCommonContentRule(scopeName, {
      regexpEscapeSequences: constants_common.regexpEscapeSequences,
      stringEscapeSequences: constants_v2.doubleQuoteEscapeSequences,
      pcreUnicodePropertyCodes: constants_common.pcreUnicodePropertyCodes,
      pcreUnicodePropertyScripts: constants_common.pcreUnicodePropertyScripts,
    }),
    [Repository.SingleStringAsRegexp]: rule_v1.createStringAsRegExpRule(scopeName, {
      quoteChar: `'`,
      escapedQuotePattern: patterns_v2.escapedSingleQuotePattern,
      regexpOptionsPattern: patterns_common.regexpOptionsPattern,
      contentRuleName: RuleName.RegExpString,
      contentRepository: Repository.SingleStringAsRegExpContent,
    }),
    [Repository.SingleStringAsRegExpContent]: rule_v1.createStringAsRegExpContentRule(scopeName, {
      regexpOptions: constants_v1.regexpOptions,
      contentRepository: Repository.SingleStringAsRegExpContent,
      commonContentRepository: Repository.SingleStringAsRegExpCommonContent,
    }),
    [Repository.SingleStringAsRegExpCommonContent]: rule_v1.createRegExpCommonContentRule(scopeName, {
      regexpEscapeSequences: constants_common.regexpEscapeSequences,
      stringEscapeSequences: constants_v2.singleQuoteEscapeSequences,
      pcreUnicodePropertyCodes: constants_common.pcreUnicodePropertyCodes,
      pcreUnicodePropertyScripts: constants_common.pcreUnicodePropertyScripts,
    }),
    // #endregion regexp

    // #region misc
    [Repository.CallExpression_FunctionDeclarationHead]: rule_v1.createCallExpressionRule(scopeName, {
      callableNamePattern: patterns_v2.identifierPattern,
      callableNameRule: namedPatternsRule(
        name(scopeName, RuleName.FunctionName),
        [ includeRule(Repository.BuiltInClass) ],
      ),
      keywordsInArgument: [],
    }),
    [Repository.MethodDeclarationHead]: rule_v1.createCallExpressionRule(scopeName, {
      callableNamePattern: patterns_v2.identifierPattern,
      callableNameRule: patternsRule(
        includeRule(Repository.MetaFunctionName),
        includeRule(Repository.FunctionName),
      ),
      keywordsInArgument: [],
    }),
    // #endregion misc
    // #endregion expression

    // #region misc
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
    [Repository.CommandInvalidArgument]: rule_v1.createInvalidArgumentRule(scopeName),
    [Repository.PercentExpressionInLastArgument]: rule_v1.createPercentExpressionRule(scopeName, {
      expressionPattern: patterns_v1.expressionLastArgumentPattern,
    }),
    [Repository.UnquotedStringEscapeSequence]: rule_v1.createUnquotedEscapeSequencesRule(scopeName, constants_v2.unquoteEscapeSequences),
    [Repository.CommandArgumentText]: rule_v1.createUnquotedStringRule(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      stringPattern: patterns_v1.commandArgumentPattern,
    }),
    [Repository.CommandArgumentNumber]: rule_v1.createNumberRule(scopeName),
    [Repository.CommandLastArgumentText]: rule_v1.createUnquotedStringRule(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      stringPattern: patterns_v1.lastArgumentPattern,
    }),
    // #endregion misc

    // #region compiler directive
    [Repository.CompilerDirectiveComment]: rule_common.createDirectiveCommentPatternsRule(scopeName, {
      startAnchor: patterns_common.lineStartAnchor,
      endAnchor: patterns_common.lineEndAnchor,
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
    [Repository.BuiltInVariableInCompilerDirective]: rule_common.createReservedIdentifierRule(scopeName, {
      ruleName: RuleName.KeywordLikeBuiltInVariable,
      identifiers: constants_common.compilerDirectiveVariables,
    }),
    [Repository.DereferenceInCompilerDirective]: rule_common.createCompilerDirectiveDereferenceMatchRule(scopeName),
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
    [Repository.DoubleStringInCompilerDirective]: rule_common.createDoubleStringInCompilerDirectiveRule(scopeName),
    [Repository.DoubleStringContentInCompilerDirective]: rule_common.createDoubleStringContentInCompilerDirectiveRule(scopeName),
    // #endregion compiler directive
  };
}
