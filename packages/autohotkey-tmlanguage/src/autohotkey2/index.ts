import * as markdown from '../__injection__/markdown';
import * as constants_common from '../common/constants';
import * as definition_common from '../common/definition';
import * as patterns_common from '../common/patterns';
import * as rules_common from '../common/rules';
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
    [Repository.AllSingleLineComments]: patternsRule(
      includeRule(Repository.CompilerDirectiveComment),
      includeRule(Repository.SingleLineDocumentComment),
      includeRule(Repository.SingleLineComment),
    ),
    [Repository.AllInLineComments]: patternsRule(
      includeRule(Repository.InLineComment),
      includeRule(Repository.InlineDocumentComment),
    ),
    [Repository.AllMultiLineComments]: patternsRule(
      includeRule(Repository.MultiLineDocumentComment),
      includeRule(Repository.MultiLineComment),
    ),

    // #region comment
    [Repository.SingleLineComment]: rules_common.createSingleLineCommentRule(scopeName),
    [Repository.InLineComment]: rules_common.createInLineCommentRule(scopeName),
    [Repository.MultiLineComment]: rules_common.createMultiLineCommentRule(scopeName),
    // #endregion comment

    // #region document
    ...rules_common.createDocumentCommentRepositories(scopeName, {
      leftHandPattern: patterns_v2.looseLeftHandPattern,
    }),
    // #endregion document

    // #region compiler directive
    ...rules_common.createDirectiveCommentRepositories(scopeName),
    // #endregion compiler directive
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
      rules_common.createCommandLikeStatementRule(scopeName, definition_v2.directiveDefinitions, {
        startAnchor: patterns_v2.statementStartAnchor,
        endAnchor: patterns_common.lineEndAnchor,
        commandElementName: RuleName.DirectiveName,
      }),
      rules_common.createCommandLikeStatementRule(scopeName, [ definition_common.undefinedDirective ], {
        startAnchor: patterns_v2.statementStartAnchor,
        endAnchor: patterns_common.lineEndAnchor,
        commandElementName: RuleName.DirectiveName,
      }),
    ),
    [Repository.JumpStatement]: rules_common.createJumpStatement(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
      assignmentOperators: constants_common.assignmentOperators,
      endAnchor: patterns_common.lineEndAnchor,
      identifierPattern: ordalt('Exit', 'ExitApp', 'Return'),
    }),
    [Repository.JumpToLabelStatement]: rules_common.createJumpToLabelStatement(scopeName, {
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
    [Repository.HotstringLabelStatement]: rules_common.createHotstringLabelRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
      endAnchor: patterns_common.lineEndAnchor,
    }),
    [Repository.HotkeyLabelStatement]: rules_common.createHotkeyLabelRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
    }),
    [Repository.LabelStatement]: rules_common.createLabelRule(scopeName, {
      startAnchor: patterns_common.lineStartAnchor,
      labelPattern: patterns_v2.identifierPattern,
    }),

    [Repository.IfStatement]: rules_common.createIfStatementRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
    }),
    [Repository.SwitchStatement]: rules_common.createSwitchStatementRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
      endAnchor: patterns_common.lineEndAnchor,
      identifierPattern: patterns_v2.identifierPattern,
    }),
    [Repository.WhileStatement]: rules_common.createWhileStatementRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
    }),
    [Repository.LoopStatement]: rule_v2.createLoopStatementRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
    }),
    [Repository.UntilStatement]: rules_common.createUntilStatementRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
    }),
    [Repository.ForStatement]: rules_common.createForStatementRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
    }),
    [Repository.TryStatement]: rules_common.createTryStatementRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
    }),
    [Repository.ThrowStatement]: rules_common.createThrowStatementRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
      assignmentOperators: constants_common.assignmentOperators,
    }),
    [Repository.CallStatement]: patternsRule(
      includeRule(Repository.BuiltInCallStatement),
      includeRule(Repository.UserDefinedCallStatement),
    ),
    [Repository.BuiltInCallStatement]: patternsRule(
      rules_common.createCallStatementRule(scopeName, {
        commandRuleName: RuleName.FunctionName,
        startAnchor: patterns_v2.statementStartAnchor,
        identifierPattern: ordalt(...(placeholder?.builtInFunctionNames ?? constants_v2.builtInFunctionNames)),
        assignmentOperators: constants_v2.expressionOperators,
      }),
      rules_common.createCallStatementRule(scopeName, {
        commandRuleName: RuleName.FunctionName,
        startAnchor: patterns_v2.statementStartAnchor,
        identifierPattern: ordalt(...(placeholder?.deprecatedBuiltinFunctionNames ?? constants_v2.deprecatedBuiltinFunctionNames)),
        assignmentOperators: constants_v2.expressionOperators,
        isDeprecated: true,
      }),
    ),
    [Repository.UserDefinedCallStatement]: rules_common.createCallStatementRule(scopeName, {
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
    [Repository.Modifier]: rules_common.createModifierRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
      modifiers: constants_common.accessModifiers,
    }),
    [Repository.AssignmentDeclaration]: rules_common.createAssignmentDeclarationRule(scopeName, {
      startAnchor: patterns_v2.statementStartAnchor,
      namePattern: patterns_v2.looseLeftHandPattern,
      operators: constants_common.assignmentOperators,
    }),
    [Repository.Block]: rules_common.createBlockRule(scopeName, {
      statementsInBlock: [ includeRule(Repository.Self) ],
    }),
    [Repository.ClassDeclaration]: rules_common.createClassDeclarationRule(scopeName, {
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
    [Repository.BlockInClassBody]: rules_common.createBlockInClassBodyRule(scopeName),
    [Repository.PropertyDeclaration]: rules_common.createPropertyDeclarationRule(scopeName, {
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
    [Repository.ConstantLikeVariable]: rules_common.createIdentifierRule(scopeName, {
      ruleName: RuleName.ConstantLikeVariable,
      identifierPattern: patterns_v2.upperIdentifierPattern,
    }),
    [Repository.UserDefinedVariable]: rules_common.createIdentifierRule(scopeName, {
      ruleName: RuleName.Variable,
      identifierPattern: patterns_v2.identifierPattern,
    }),
    [Repository.KeywordLikeBuiltInVariable]: rules_common.createReservedIdentifierRule(scopeName, {
      ruleName: RuleName.KeywordLikeBuiltInVariable,
      identifiers: constants_v2.keywordLikeBuiltinVariables,
    }),
    [Repository.BuiltInVariable]: rules_common.createReservedIdentifierRule(scopeName, {
      ruleName: RuleName.BuiltInVariable,
      identifiers: placeholder?.builtinVaribles ?? constants_v2.builtinVaribles,
    }),
    [Repository.BuiltInClass]: rules_common.createReservedIdentifierRule(scopeName, {
      ruleName: RuleName.ClassName,
      identifiers: placeholder?.builtInClassNames ?? constants_v2.builtInClassNames,
    }),
    [Repository.FunctionName]: rules_common.createIdentifierRule(scopeName, {
      ruleName: RuleName.FunctionName,
      identifierPattern: patterns_v2.identifierPattern,
    }),
    [Repository.MetaFunctionName]: rules_common.createReservedIdentifierRule(scopeName, {
      ruleName: RuleName.MetaFunctionName,
      identifiers: [ '__NEW', '__DELETE', '__ENUM', '__GET', '__SET', '__CALL' ],
    }),
    [Repository.MetaPropertyName]: rules_common.createReservedIdentifierRule(scopeName, {
      ruleName: RuleName.MetaFunctionName,
      identifiers: [ '__ITEM' ],
    }),
    [Repository.LabelName]: rules_common.createIdentifierRule(scopeName, {
      ruleName: RuleName.LabelName,
      identifierPattern: patterns_v2.identifierPattern,
    }),
    [Repository.KeywordInExpression]: rules_common.createReservedIdentifierRule(scopeName, {
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
    [Repository.ObjectInBrackets]: rules_common.createObjectRule(scopeName, {
      startAnchor: patterns_common.lineStartAnchor,
    }),
    ...rules_common.createObjectRepositories(scopeName, {
      startAnchor: patterns_v2.expressionContinuationStartAnchor,
      keyName: patterns_v2.keyName,
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
      includeRule(Repository.SingleString),
      includeRule(Repository.ContinuationDoubleString),
      includeRule(Repository.ContinuationSingleString),
    ),
    ...rules_common.createDoubleStringRepositories(scopeName, {
      endAnchor: patterns_common.lineEndAnchor,
      escapedQuotePattern: patterns_v2.escapedDoubleQuotePattern,
      escapeSequences: constants_v2.doubleQuoteEscapeSequences,
    }),
    ...rules_common.createSingleStringRepositories(scopeName, {
      endAnchor: patterns_common.lineEndAnchor,
      escapedQuotePattern: patterns_v2.escapedSingleQuotePattern,
      escapeSequences: constants_v2.singleQuoteEscapeSequences,
    }),
    // #endregion string

    // #region number
    ...rules_common.createNumberRepositories(scopeName),
    // #endregion number
    // #endregion literal

    // #region operator
    ...rules_common.createOperatorRepositories(scopeName, {
      expressionOperators: constants_v2.expressionOperators,
    }),
    // #endregion operator

    // #region regexp
    [Repository.ShorthandRegexpMatch]: patternsRule(
      rules_common.createShorthandRegExpMatchRule(scopeName, {
        quoteChar: '"',
        escapedQuotePattern: patterns_v2.escapedDoubleQuotePattern,
        regexpOptionsPattern: patterns_common.regexpOptionsPattern,
        contentRuleName: RuleName.RegExpString,
        contentRepository: Repository.DoubleStringAsRegExpContent,
      }),
      rules_common.createShorthandRegExpMatchRule(scopeName, {
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
    [Repository.DoubleStringAsRegexp]: rules_common.createStringAsRegExpRule(scopeName, {
      quoteChar: '"',
      escapedQuotePattern: patterns_v2.escapedDoubleQuotePattern,
      regexpOptionsPattern: patterns_common.regexpOptionsPattern,
      contentRuleName: RuleName.RegExpString,
      contentRepository: Repository.DoubleStringAsRegExpContent,
    }),
    [Repository.DoubleStringAsRegExpContent]: rules_common.createStringAsRegExpContentRule(scopeName, {
      regexpOptions: constants_common.regexpOptions,
      contentRepository: Repository.DoubleStringAsRegExpContent,
      commonContentRepository: Repository.DoubleStringAsRegExpCommonContent,
    }),
    [Repository.DoubleStringAsRegExpCommonContent]: rules_common.createRegExpCommonContentRule(scopeName, {
      regexpEscapeSequences: constants_common.regexpEscapeSequences,
      stringEscapeSequences: constants_v2.doubleQuoteEscapeSequences,
      pcreUnicodePropertyCodes: constants_common.pcreUnicodePropertyCodes,
      pcreUnicodePropertyScripts: constants_common.pcreUnicodePropertyScripts,
    }),
    [Repository.SingleStringAsRegexp]: rules_common.createStringAsRegExpRule(scopeName, {
      quoteChar: `'`,
      escapedQuotePattern: patterns_v2.escapedSingleQuotePattern,
      regexpOptionsPattern: patterns_common.regexpOptionsPattern,
      contentRuleName: RuleName.RegExpString,
      contentRepository: Repository.SingleStringAsRegExpContent,
    }),
    [Repository.SingleStringAsRegExpContent]: rules_common.createStringAsRegExpContentRule(scopeName, {
      regexpOptions: constants_common.regexpOptions,
      contentRepository: Repository.SingleStringAsRegExpContent,
      commonContentRepository: Repository.SingleStringAsRegExpCommonContent,
    }),
    [Repository.SingleStringAsRegExpCommonContent]: rules_common.createRegExpCommonContentRule(scopeName, {
      regexpEscapeSequences: constants_common.regexpEscapeSequences,
      stringEscapeSequences: constants_v2.singleQuoteEscapeSequences,
      pcreUnicodePropertyCodes: constants_common.pcreUnicodePropertyCodes,
      pcreUnicodePropertyScripts: constants_common.pcreUnicodePropertyScripts,
    }),
    // #endregion regexp

    // #region misc
    [Repository.CallExpression_FunctionDeclarationHead]: rules_common.createCallExpressionRule(scopeName, {
      callableNamePattern: patterns_v2.identifierPattern,
      callableNameRule: namedPatternsRule(
        name(scopeName, RuleName.FunctionName),
        [ includeRule(Repository.BuiltInClass) ],
      ),
      keywordsInArgument: [],
    }),
    [Repository.MethodDeclarationHead]: rules_common.createCallExpressionRule(scopeName, {
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
      includeRule(Repository.Dereference),
      includeRule(Repository.CommandArgumentText),
      includeRule(Repository.AllInLineComments),
    ),
    [Repository.CommandArgumentWithNumber]: patternsRule(
      includeRule(Repository.Dereference),
      includeRule(Repository.CommandArgumentNumber),
      includeRule(Repository.CommandArgumentText),
      includeRule(Repository.AllInLineComments),
    ),
    [Repository.CommandLastArgument]: patternsRule(
      includeRule(Repository.Dereference),
      includeRule(Repository.CommandLastArgumentText),
      includeRule(Repository.AllInLineComments),
    ),
    [Repository.CommandLastArgumentWithNumber]: patternsRule(
      includeRule(Repository.Dereference),
      includeRule(Repository.CommandArgumentNumber),
      includeRule(Repository.CommandLastArgumentText),
      includeRule(Repository.AllInLineComments),
    ),
    [Repository.CommandInvalidArgument]: rules_common.createInvalidArgumentRule(scopeName),
    [Repository.UnquotedStringEscapeSequence]: rules_common.createUnquotedEscapeSequencesRule(scopeName, constants_v2.unquoteEscapeSequences),
    [Repository.CommandArgumentText]: rules_common.createUnquotedStringRule(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      stringPattern: patterns_common.unquotedArgumentPattern,
    }),
    [Repository.CommandArgumentNumber]: rules_common.createNumberRule(scopeName),
    [Repository.CommandLastArgumentText]: rules_common.createUnquotedStringRule(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      stringPattern: patterns_common.unquotedLastArgumentPattern,
    }),
    // #endregion misc
  };
}
