import * as markdown from '../__injection__/markdown';
import * as constants_common from '../common/constants';
import * as patterns_common from '../common/patterns';
import * as rules_common from '../common/rules';
import {
  anyChars1,
  ordalt,
} from '../oniguruma';
import {
  includeRule,
  name,
  namedPatternsRule,
  patternsRule,
  Repository,
  RuleName,
  type Repositories,
  type ScopeName,
  type TmLanguage,
} from '../tmlanguage';
import * as constants_v1 from './constants';
import * as definitions_v1 from './definitions';
import * as patterns_v1 from './patterns';
import * as rules_v1 from './rules';

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
      includeRule(Repository.Trivias),
      includeRule(Repository.DirectiveStatement),
    ),

    // #region trivia
    [Repository.Trivias]: patternsRule(
      includeRule(Repository.MultiLineTrivias),
      includeRule(Repository.InlineTrivias),
      includeRule(Repository.SingleLineTrivias),
    ),
    [Repository.SingleLineTrivias]: patternsRule(
      includeRule(Repository.CompilerDirectiveComment),
      includeRule(Repository.SingleLineDocumentComment),
      includeRule(Repository.SingleLineComment),
    ),
    [Repository.InlineTrivias]: patternsRule(
      includeRule(Repository.InlineDocumentComment),
      includeRule(Repository.InlineComment),
    ),
    [Repository.MultiLineTrivias]: patternsRule(
      includeRule(Repository.MultiLineDocumentComment),
      includeRule(Repository.MultiLineComment),
    ),

    // #region comment
    [Repository.SingleLineComment]: rules_common.createSingleLineCommentRule(scopeName),
    [Repository.InlineComment]: rules_common.createInLineCommentRule(scopeName),
    [Repository.MultiLineComment]: rules_common.createMultiLineCommentRule(scopeName),
    // #endregion comment

    // #region document
    [Repository.SingleLineDocumentComment]: rules_common.createSinglelineDocumentCommentRule(scopeName),
    [Repository.InlineDocumentComment]: rules_common.createInlineDocumentCommentRule(scopeName),
    [Repository.InlineTextInDocument]: rules_common.createInlineTextInDocumentRule(scopeName),
    [Repository.MultiLineDocumentComment]: rules_common.createDocumentCommentRule(scopeName),
    [Repository.TypeInDocument]: rules_common.createDocumentTypeRule(scopeName),
    // #endregion document

    // #region compiler directive
    ...rules_common.createDirectiveCommentRepositories(scopeName),
    // #endregion compiler directive
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
    [Repository.CommandStatement]: rules_v1.createCommandStatementRule(definitions_v1.commandDefinitions, {
      startPattern: patterns_v1.statementStartPattern,
      endPattern: patterns_common.lineEndPattern,
      argumentStartPattern: patterns_v1.commandArgumentStartPattern,
      assignmentOperators: constants_common.assignmentOperators,
    }),
    [Repository.CommandDefinitions]: rules_common.createCommandLikeDefinitionsRule(scopeName, definitions_v1.commandDefinitions, {
      commandElementName: RuleName.CommandName,
      startPattern: patterns_common.lineStartPattern,
      endPattern: patterns_common.lineEndPattern,
      legacyMode: true,
    }),
    ...rules_v1.createDirectiveRepositories(scopeName, definitions_v1.directiveDefinitions, {
      startPattern: patterns_common.lineStartPattern,
      endPattern: patterns_common.lineEndPattern,
      unquotedArgumentPattern: patterns_common.unquotedArgumentPattern,
      assignmentOperators: constants_common.assignmentOperators,
    }),
    [Repository.JumpStatement]: rules_common.createJumpStatement(scopeName, {
      startPattern: patterns_v1.statementStartPattern,
      assignmentOperators: constants_common.assignmentOperators,
      endPattern: patterns_common.lineEndPattern,
      identifierPattern: ordalt('Exit', 'ExitApp', 'Return'),
    }),
    [Repository.JumpToLabelStatement]: rules_common.createJumpToLabelStatement(scopeName, {
      startPattern: patterns_v1.statementStartPattern,
      endPattern: patterns_common.lineEndPattern,
      names: [
        'Break',
        'Continue',
        'Gosub',
        'Goto',
      ],
      labelPattern: patterns_v1.identifierPattern,
    }),
    [Repository.HotstringLabelStatement]: rules_common.createHotstringLabelRule(scopeName, {
      startPattern: patterns_v1.statementStartPattern,
      endPattern: patterns_common.lineEndPattern,
    }),
    [Repository.HotkeyLabelStatement]: rules_common.createHotkeyLabelRule(scopeName, {
      startPattern: patterns_v1.statementStartPattern,
    }),
    [Repository.LabelStatement]: rules_common.createLabelRule(scopeName, {
      startPattern: patterns_common.lineStartPattern,
      labelPattern: patterns_v1.identifierPattern,
    }),

    [Repository.IfStatement]: rules_common.createIfStatementRule(scopeName, {
      startPattern: patterns_v1.statementStartPattern,
    }),
    [Repository.SwitchStatement]: rules_common.createSwitchStatementRule(scopeName, {
      startPattern: patterns_v1.statementStartPattern,
      endPattern: patterns_common.lineEndPattern,
      identifierPattern: patterns_v1.identifierPattern,
    }),
    [Repository.WhileStatement]: rules_common.createWhileStatementRule(scopeName, {
      startPattern: patterns_v1.statementStartPattern,
    }),
    [Repository.LoopStatement]: rules_v1.createLoopStatementRule(scopeName, {
      startPattern: patterns_v1.statementStartPattern,
      endPattern: patterns_v1.controlFlowEndPattern,
      definitions: definitions_v1.loopCommandDefenitions,
    }),
    [Repository.UntilStatement]: rules_common.createUntilStatementRule(scopeName, {
      startPattern: patterns_v1.statementStartPattern,
    }),
    [Repository.ForStatement]: rules_common.createForStatementRule(scopeName, {
      startPattern: patterns_v1.statementStartPattern,
    }),
    [Repository.TryStatement]: rules_common.createTryStatementRule(scopeName, {
      startPattern: patterns_v1.statementStartPattern,
    }),
    [Repository.ThrowStatement]: rules_common.createThrowStatementRule(scopeName, {
      startPattern: patterns_v1.statementStartPattern,
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
      includeRule(Repository.CallExpression_FunctionDeclarationHead),
      includeRule(Repository.ClassDeclaration),
      includeRule(Repository.Block),
    ),
    [Repository.Modifier]: rules_common.createModifierRule(scopeName, {
      startPattern: patterns_v1.statementStartPattern,
      modifiers: constants_common.accessModifiers,
    }),
    [Repository.Block]: rules_common.createBlockRule(scopeName, {
      statementsInBlock: [ includeRule(Repository.Self) ],
    }),
    [Repository.ClassDeclaration]: rules_common.createClassDeclarationRule(scopeName, {
      startPattern: patterns_v1.statementStartPattern,
      endPattern: patterns_common.lineEndPattern,
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
      identifierPattern: patterns_v1.identifierPattern,
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
    [Repository.ParenthesizedExpression]: rules_v1.createParenthesizedExpressionRule(scopeName),

    // #region identifier
    [Repository.Variable]: patternsRule(
      includeRule(Repository.KeywordLikeBuiltInVariable),
      includeRule(Repository.BuiltInVariable),
      includeRule(Repository.ConstantLikeVariable),
      includeRule(Repository.UserDefinedVariable),
    ),
    [Repository.ConstantLikeVariable]: rules_common.createIdentifierRule(scopeName, {
      ruleName: RuleName.ConstantLikeVariable,
      identifierPattern: patterns_v1.identifierPattern_upper,
      invalidIdentifierCharPattern: patterns_v1.identifierPart_upper,
      endPattern: patterns_v1.identifierEndPattern,
    }),
    [Repository.UserDefinedVariable]: rules_common.createIdentifierRule(scopeName, {
      ruleName: RuleName.Variable,
      identifierPattern: patterns_v1.identifierPattern,
      invalidIdentifierCharPattern: patterns_v1.identifierPart,
      endPattern: patterns_v1.identifierEndPattern,
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
      invalidIdentifierCharPattern: patterns_v1.identifierPart,
    }),
    [Repository.HotkeyName]: rules_common.createHotkeyNameRule(scopeName),
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
    [Repository.Dereference]: rules_v1.createDereferenceRule(scopeName),
    [Repository.InvalidDereference]: rules_v1.createInvalidDereferenceRule(scopeName),
    [Repository.DereferenceInCommandArgument]: rules_v1.createDereferenceInCommandArgumentRule(scopeName),
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
      startPattern: patterns_common.lineStartPattern,
    }),
    [Repository.Object]: rules_common.createObjectRule(scopeName, {
      startPattern: patterns_v1.continuationExpressionStartPattern,
    }),
    [Repository.ObjectKey]: rules_v1.createObjectKeyRule(scopeName, {
      keyPattern: patterns_v1.objectKeyNamePattern,
    }),
    [Repository.ObjectContent]: patternsRule(
      includeRule(Repository.Meta),

      includeRule(Repository.ObjectKey),
      includeRule(Repository.Comma),
      includeRule(Repository.ExpressionInBrackets),
    ),
    [Repository.Array]: rules_common.createArrayRule(scopeName),
    // #endregion object

    // #region string
    [Repository.String]: patternsRule(
      includeRule(Repository.DoubleString),
      includeRule(Repository.ContinuationDoubleString),
    ),
    [Repository.DoubleString]: rules_common.createStringRule(scopeName, {
      stringElementName: RuleName.DoubleString,
      quoteChar: patterns_v1.doubleQuoteCharPattern,
      escapedQuotePattern: patterns_v1.escapedDoubleQuotePattern,
      escapeSequences: constants_v1.doubleQuoteEscapeSequences,
    }),
    [Repository.ContinuationStringOptions]: rules_common.createContinuationStringOptionsRule(scopeName),
    [Repository.ContinuationDoubleString]: rules_common.createContinuationString(scopeName, {
      stringElementName: RuleName.DoubleString,
      quoteChar: patterns_v1.doubleQuoteCharPattern,
      escapedQuotePattern: patterns_v1.escapedDoubleQuotePattern,
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
    [Repository.Integer]: rules_common.createIntegerRule(scopeName),
    [Repository.Float]: rules_common.createFloatRule(scopeName),
    [Repository.InvalidFloat]: rules_common.createInvalidFloatRule(scopeName),
    [Repository.Hex]: rules_common.createHexRule(scopeName),
    [Repository.InvalidHex]: rules_common.createInvalidHexRule(scopeName),
    [Repository.ScientificNotation]: rules_common.createScientificNotationRule(scopeName),
    [Repository.InvalidScientificNotation]: rules_common.createInvalidScientificNotationRule(scopeName),
    // #endregion number
    // #endregion literal

    // #region operator
    [Repository.Comma]: rules_common.createOperatorRule(scopeName, {
      operatorRuleName: RuleName.Comma,
      operators: [ ',' ],
    }),
    [Repository.Dot]: rules_common.createDotOperatorRule(scopeName),
    [Repository.Operator]: rules_common.createOperatorRule(scopeName, {
      operatorRuleName: RuleName.Operator,
      operators: constants_v1.expressionOperators,
    }),
    [Repository.DereferenceUnaryOperator]: {
      name: name(scopeName, RuleName.Operator),
      match: patterns_common.dereferenceUnaryOperatorPattern,
    },
    // #endregion operator

    // #region regexp
    [Repository.ShorthandRegexpMatch]: rules_common.createShorthandRegExpMatchRule(scopeName, {
      quoteChar: patterns_v1.doubleQuoteCharPattern,
      escapedQuotePattern: patterns_v1.escapedDoubleQuotePattern,
      regexpOptionsPattern: patterns_v1.regexpOptionsPattern,
      contentRuleName: RuleName.RegExpString,
      contentRepository: Repository.DoubleStringAsRegExpContent,
    }),
    [Repository.StringAsRegExp]: patternsRule(includeRule(Repository.DoubleStringAsRegexp)),
    [Repository.DoubleStringAsRegexp]: rules_common.createStringAsRegExpRule(scopeName, {
      quoteChar: patterns_v1.doubleQuoteCharPattern,
      escapedQuotePattern: patterns_v1.escapedDoubleQuotePattern,
      regexpOptionsPattern: patterns_v1.regexpOptionsPattern,
      contentRuleName: RuleName.RegExpString,
      contentRepository: Repository.DoubleStringAsRegExpContent,
    }),
    [Repository.DoubleStringAsRegExpContent]: rules_common.createStringAsRegExpContentRule(scopeName, {
      regexpOptions: constants_v1.regexpOptions,
      contentRepository: Repository.DoubleStringAsRegExpContent,
      commonContentRepository: Repository.DoubleStringAsRegExpCommonContent,
    }),
    [Repository.DoubleStringAsRegExpCommonContent]: rules_common.createRegExpCommonContentRule(scopeName, {
      regexpEscapeSequences: constants_common.regexpEscapeSequences,
      stringEscapeSequences: constants_v1.doubleQuoteEscapeSequences,
      pcreUnicodePropertyCodes: constants_common.pcreUnicodePropertyCodes,
      pcreUnicodePropertyScripts: constants_common.pcreUnicodePropertyScripts,
    }),
    [Repository.UnquotedRegExp]: rules_common.createStringAsRegExpContentRule(scopeName, {
      commonContentRepository: Repository.UnquotedRegExpContent,
      regexpOptions: constants_v1.regexpOptions,
      contentRepository: Repository.DoubleStringAsRegExpContent,
    }),
    [Repository.UnquotedRegExpContent]: rules_common.createRegExpCommonContentRule(scopeName, {
      regexpEscapeSequences: constants_common.regexpEscapeSequences,
      stringEscapeSequences: constants_v1.unquoteEscapeSequences,
      pcreUnicodePropertyCodes: constants_common.pcreUnicodePropertyCodes,
      pcreUnicodePropertyScripts: constants_common.pcreUnicodePropertyScripts,
    }),
    // #endregion regexp

    // #region misc
    [Repository.CallExpression_FunctionDeclarationHead]: rules_common.createCallExpressionRule(scopeName, {
      callableNamePattern: patterns_v1.looseCallableNamePattern,
      callableNameRule: namedPatternsRule(
        name(scopeName, RuleName.FunctionName),
        [ includeRule(Repository.BuiltInClass) ],
      ),
      keywordsInArgument: [ 'byref' ],
    }),
    [Repository.MethodDeclarationHead]: rules_common.createCallExpressionRule(scopeName, {
      callableNamePattern: patterns_v1.identifierPattern,
      callableNameRule: patternsRule(
        includeRule(Repository.MetaFunctionName),
        includeRule(Repository.FunctionName),
      ),
      keywordsInArgument: [ 'byref' ],
    }),
    [Repository.NewCallExpression]: rules_v1.createNewCallExpressionRule(scopeName, {
      callableNamePattern: patterns_v1.looseCallableNamePattern,
    }),
    // #endregion misc
    // #endregion expression

    // #region command
    [Repository.CommandArgument]: patternsRule(
      includeRule(Repository.PercentExpression),
      includeRule(Repository.Dereference),
      includeRule(Repository.CommandArgumentText),
      includeRule(Repository.InlineTrivias),
    ),
    [Repository.CommandLastArgument]: patternsRule(
      includeRule(Repository.PercentExpressionInLastArgument),
      includeRule(Repository.Dereference),
      includeRule(Repository.CommandLastArgumentText),
      includeRule(Repository.InlineTrivias),
    ),
    [Repository.UnquotedStringEscapeSequence]: rules_common.createUnquotedEscapeSequencesRule(scopeName, constants_v1.unquoteEscapeSequences),
    [Repository.CommandArgumentText]: rules_common.createUnquotedStringRule(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      stringPattern: patterns_common.unquotedArgumentPattern,
    }),
    [Repository.CommandLastArgumentText]: rules_common.createUnquotedStringRule(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      stringPattern: patterns_common.unquotedLastArgumentPattern,
    }),
    [Repository.CommandArgumentClick]: rules_common.createClickCommandArgumentRule(scopeName),
    [Repository.CommandArgumentColor]: rules_common.createColorCommandArgumentRule(scopeName),
    [Repository.CommandArgumentControlStyle]: rules_common.createControlStyleCommandArgumentRule(scopeName),
    [Repository.CommandArgumentGuiOptions]: rules_common.createGuiOptionsCommandArgumentRule(scopeName),
    [Repository.CommandArgumentHotstringOptions]: rules_common.createHotstringOptionsCommandArgumentRule(scopeName),
    [Repository.CommandArgumentMenuItemName]: rules_common.createMenuNameCommandArgumentRule(scopeName),
    [Repository.CommandArgumentMenuOptions]: rules_common.createMenuOptionsCommandArgumentRule(scopeName),
    [Repository.CommandArgumentRegKey]: rules_common.createRegKeyCommandArgumentRule(scopeName),
    [Repository.CommandArgumentSendKeyName]: rules_common.createSendKeyCommandArgumentRule(scopeName),
    [Repository.CommandArgumentWhichButton]: rules_common.createWhichButtonCommandArgumentRule(scopeName),
    // #endregion command

    // #region legacy
    [Repository.Legacy]: patternsRule(includeRule(Repository.LegacyAssignmentDeclaration)),
    [Repository.LegacyIfStatement]: rules_v1.createLegacyIfStatementRule(scopeName, {
      startPattern: patterns_v1.statementStartPattern,
      endPattern: patterns_common.lineEndPattern,
      identifierPattern: patterns_v1.identifierPattern,
    }),
    [Repository.LegacyAssignmentDeclaration]: rules_v1.createLegacyAssignmentRule(scopeName, {
      startPattern: patterns_v1.statementStartPattern,
      leftHandPattern: patterns_v1.identifierPattern,
    }),
    [Repository.PercentExpression]: rules_v1.createPercentExpressionRule(scopeName, {
      expressionPattern: patterns_common.unquotedExpressionArgumentPattern,
    }),
    [Repository.InvalidPercentExpression]: rules_v1.createInvalidPercentExpressionRule(scopeName),
    [Repository.PercentExpressionInLastArgument]: rules_v1.createPercentExpressionRule(scopeName, {
      expressionPattern: patterns_common.unquotedExpressionLastArgumentPattern,
    }),
    [Repository.ContinuationSection]: rules_v1.createContinuationSectionRule(scopeName, {
      endPattern: patterns_common.lineEndPattern,
    }),
    [Repository.ContinuationSectionText]: rules_common.createUnquotedStringRule(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      stringPattern: anyChars1(),
      additionalRules: [ rules_common.createUnquotedEscapeSequencesRule(scopeName, [ '`)' ]) ],
    }),
    // #endregion legacy
  };
}
