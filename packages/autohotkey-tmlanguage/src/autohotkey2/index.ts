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
      includeRule(Repository.RequiresStatement),
      includeRule(Repository.IncludeStatement),
      includeRule(Repository.DirectiveStatement),
    ),

    // #region trivia
    [Repository.Comment]: patternsRule(
      includeRule(Repository.MultiLineComments),
      includeRule(Repository.SingleLineComments),
      includeRule(Repository.InLineComments),
    ),
    [Repository.MultiLineComments]: patternsRule(
      includeRule(Repository.MultiLineDocumentComment),
      includeRule(Repository.MultiLineComment),
    ),
    [Repository.MultiLineComment]: rule_v1.createMultiLineCommentRule(scopeName),
    [Repository.MultiLineDocumentComment]: rule_v1.createDocumentCommentRule(scopeName, {
      leftHandPattern: patterns_v2.looseLeftHandPattern,
    }),
    [Repository.SingleLineComments]: patternsRule(
      includeRule(Repository.CompilerDirectiveComment),
      includeRule(Repository.SingleLineDocumentComment),
      includeRule(Repository.SingleLineComment),
    ),
    [Repository.SingleLineComment]: rule_v1.createSingleLineCommentRule(scopeName),
    [Repository.SingleLineDocumentComment]: rule_v1.createSinglelineDocumentCommentRule(scopeName, {
      leftHandPattern: patterns_v2.looseLeftHandPattern,
    }),
    [Repository.InLineComments]: patternsRule(
      includeRule(Repository.InLineComment),
      includeRule(Repository.InlineDocumentComment),
    ),
    [Repository.InLineComment]: rule_v1.createInLineCommentRule(scopeName),
    [Repository.InlineDocumentComment]: rule_v1.createInlineDocumentCommentRule(scopeName, {
      leftHandPattern: patterns_v2.looseLeftHandPattern,
    }),
    [Repository.TypeInDocument]: rule_v1.createDocumentTypeRule(scopeName),
    [Repository.InlineTextInDocument]: rule_v1.createInlineTextInDocumentRule(scopeName),
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
    [Repository.RequiresStatement]: rule_v1.createRequiresStatementRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
      expressionOperators: constants_v2.expressionOperators,
      endAnchor: patterns_v1.lineEndAnchor,
    }),
    [Repository.IncludeStatement]: rule_v1.createIncludeStatementRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
      expressionOperators: constants_v2.expressionOperators,
      endAnchor: patterns_v1.lineEndAnchor,
    }),
    [Repository.DirectiveStatement]: rule_v1.createCommandLikeStatementRule(scopeName, definition_v2.directiveDefinitions, {
      startAnchor: patterns_v2.statementStartAnchor,
      endAnchor: patterns_v1.lineEndAnchor,
      commandElementName: RuleName.DirectiveName,
    }),
    [Repository.JumpStatement]: rule_v1.createJumpStatement(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
      assignmentOperators: constants_common.assignmentOperators,
      endAnchor: patterns_v1.lineEndAnchor,
      identifierPattern: ordalt('Exit', 'ExitApp', 'Return'),
    }),
    [Repository.JumpToLabelStatement]: rule_v1.createJumpToLabelStatement(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
      endAnchor: patterns_v1.lineEndAnchor,
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
      endAnchor: patterns_v1.lineEndAnchor,
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
      endAnchor: patterns_v1.lineEndAnchor,
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
      endAnchor: patterns_v1.lineEndAnchor,
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
    [Repository.Expressions]: patternsRule(
      includeRule(Repository.Comma),
      includeRule(Repository.Expression),
    ),
    [Repository.ParenthesizedExpression]: rule_v2.createParenthesizedExpressionRule(scopeName),

    // #region variable
    [Repository.Variable]: patternsRule(
      includeRule(Repository.InvalidVariable),
      includeRule(Repository.KeywordLikeBuiltInVariable),
      includeRule(Repository.BuiltInClass),
      includeRule(Repository.BuiltInVariable),
      includeRule(Repository.ConstantLikeVariable),
      includeRule(Repository.UserDefinedVariable),
    ),
    [Repository.ConstantLikeVariable]: rule_v1.createVariableRule(scopeName, {
      ruleName: RuleName.ConstantLikeVariable,
      nameHeadChar: patterns_v2.nameStart_upper,
      nameBodyChar: patterns_v2.nameBody_upper,
    }),
    [Repository.UserDefinedVariable]: rule_v1.createVariableRule(scopeName, {
      ruleName: RuleName.Variable,
      nameHeadChar: patterns_v2.nameStart,
      nameBodyChar: patterns_v2.nameBody,
    }),
    [Repository.InvalidVariable]: rule_v1.createInvalidVariableRule(scopeName, {
      ruleName: RuleName.Variable,
      nameHeadChar: patterns_v2.nameStart,
      nameBodyChar: patterns_v2.nameBody,
    }),
    [Repository.KeywordLikeBuiltInVariable]: rule_v1.createBuiltinVariableRule(scopeName, {
      variableRuleName: RuleName.KeywordLikeBuiltInVariable,
      builtinVariables: constants_v2.keywordLikeBuiltinVariables,
    }),
    [Repository.BuiltInVariable]: rule_v1.createBuiltinVariableRule(scopeName, {
      variableRuleName: RuleName.BuiltInVariable,
      builtinVariables: placeholder?.builtinVaribles ?? constants_v2.builtinVaribles,
    }),
    [Repository.BuiltInClass]: rule_v1.createBuiltinVariableRule(scopeName, {
      variableRuleName: RuleName.ClassName,
      builtinVariables: placeholder?.builtInClassNames ?? constants_v2.builtInClassNames,
    }),
    [Repository.MetaFunctionName]: rule_v1.createKeywordRule(scopeName, {
      keywords: [ '__NEW', '__DELETE', '__ENUM', '__GET', '__SET', '__CALL' ],
      keywordRuleName: RuleName.MetaFunctionName,
    }),
    [Repository.FunctionName]: rule_v1.createVariableRule(scopeName, {
      ruleName: RuleName.FunctionName,
      nameHeadChar: patterns_v2.nameStart,
      nameBodyChar: patterns_v2.nameBody,
    }),
    [Repository.MetaPropertyName]: rule_v1.createKeywordRule(scopeName, {
      keywords: [ '__ITEM' ],
      keywordRuleName: RuleName.MetaFunctionName,
    }),
    // #endregion variable

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
    [Repository.ObjectInBrackets]: rule_v1.createObjectRule(scopeName, {
      startAnchor: patterns_common.lineStartAnchor,
    }),
    [Repository.Object]: rule_v1.createObjectRule(scopeName, {
      startAnchor: patterns_v2.expressionContinuationStartAnchor,
    }),
    [Repository.ObjectContent]: patternsRule(
      includeRule(Repository.Meta),

      includeRule(Repository.ObjectKey),
      includeRule(Repository.Comma),
      includeRule(Repository.ExpressionInBrackets),
    ),
    [Repository.ObjectKey]: rule_v1.createObjectKeyRule(scopeName, {
      keyName: patterns_v2.keyName,
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
    [Repository.DoubleString]: rule_v1.createStringRule(scopeName, {
      quoteChar: '"',
      unescapedQuotePattern: patterns_v2.unescapedDoubleQuotePattern,
      stringContentRepository: Repository.DoubleStringContent,
      stringElementName: RuleName.DoubleString,
    }),
    [Repository.DoubleStringContent]: rule_v1.createStringContentRule(scopeName, {
      escapeSequences: constants_v2.doubleQuoteEscapeSequences,
    }),
    [Repository.SingleString]: rule_v1.createStringRule(scopeName, {
      quoteChar: `'`,
      unescapedQuotePattern: patterns_v2.unescapedSingleQuotePattern,
      stringContentRepository: Repository.SingleStringContent,
      stringElementName: RuleName.SingleString,
    }),
    [Repository.SingleStringContent]: rule_v1.createStringContentRule(scopeName, {
      escapeSequences: constants_v2.singleQuoteEscapeSequences,
    }),
    [Repository.ContinuationStringOptions]: rule_v1.createContinuationStringOptionsRule(scopeName),
    [Repository.ContinuationDoubleString]: rule_v1.createContinuationString(scopeName, {
      endAnchor: patterns_v1.lineEndAnchor,
      quoteChar: '"',
      unescapedQuotePattern: patterns_v2.unescapedDoubleQuotePattern,
      stringElementName: RuleName.DoubleString,
      stringContentRepository: Repository.DoubleStringContent,
    }),
    [Repository.ContinuationSingleString]: rule_v1.createContinuationString(scopeName, {
      endAnchor: patterns_v1.lineEndAnchor,
      quoteChar: `'`,
      unescapedQuotePattern: patterns_v2.unescapedSingleQuotePattern,
      stringElementName: RuleName.SingleString,
      stringContentRepository: Repository.SingleStringContent,
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
      operators: constants_v2.expressionOperators,
    }),
    [Repository.KeywordInExpression]: rule_v1.createKeywordRule(scopeName, {
      keywordRuleName: RuleName.KeywordInExpression,
      keywords: [
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
    // #endregion token, keyword

    // #region regexp
    [Repository.ShorthandRegexpMatch]: patternsRule(
      rule_v1.createShorthandRegExpMatchRule(scopeName, {
        quoteChar: '"',
        unescapedQuotePattern: patterns_v2.unescapedDoubleQuotePattern,
        regexpOptionsPattern: patterns_v1.regexpOptionsPattern,
        contentRuleName: RuleName.RegExpString,
        contentRepository: Repository.DoubleStringAsRegExpContent,
      }),
      rule_v1.createShorthandRegExpMatchRule(scopeName, {
        quoteChar: `'`,
        unescapedQuotePattern: patterns_v2.unescapedSingleQuotePattern,
        regexpOptionsPattern: patterns_v1.regexpOptionsPattern,
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
      unescapedQuotePattern: patterns_v2.unescapedDoubleQuotePattern,
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
      stringEscapeSequences: constants_v2.doubleQuoteEscapeSequences,
      pcreUnicodePropertyCodes: constants_common.pcreUnicodePropertyCodes,
      pcreUnicodePropertyScripts: constants_common.pcreUnicodePropertyScripts,
    }),
    [Repository.SingleStringAsRegexp]: rule_v1.createStringAsRegExpRule(scopeName, {
      quoteChar: `'`,
      unescapedQuotePattern: patterns_v2.unescapedSingleQuotePattern,
      regexpOptionsPattern: patterns_v1.regexpOptionsPattern,
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
      callableNamePattern: patterns_v1.identifierPattern,
      callableNameRule: namedPatternsRule(
        name(scopeName, RuleName.FunctionName),
        [ includeRule(Repository.BuiltInClass) ],
      ),
      keywordsInArgument: [],
    }),
    [Repository.MethodDeclarationHead]: rule_v1.createCallExpressionRule(scopeName, {
      callableNamePattern: patterns_v1.identifierPattern,
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
    [Repository.CommandInvalidArgument]: rule_v1.createInvalidArgumentRule(scopeName),
    [Repository.PercentExpressions]: rule_v1.createPercentExpressionRule(scopeName, {
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
    [Repository.CompilerDirectiveComment]: rule_v1.createDirectiveCommentPatternsRule(scopeName, {
      startAnchor: patterns_common.lineStartAnchor,
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
