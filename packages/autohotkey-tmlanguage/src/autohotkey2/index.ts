import * as markdown from '../__injection__/markdown';
import * as constants_v1 from '../autohotkeyl/constants';
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
    [Repository.FencedCodeBlockInDocument]: markdown.createCodeFenceInDocumentRule(),

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
    [Repository.Statement]: patternsRule(includeRule(Repository.ExpressionStatement)),
    [Repository.ExpressionStatement]: patternsRule(includeRule(Repository.Expressions)),
    // #endregion statement

    // #region expression
    [Repository.Expression]: patternsRule(
      includeRule(Repository.ShorthandRegexpMatch),
      includeRule(Repository.KeywordInExpression),
      includeRule(Repository.ParenthesizedExpression),
      includeRule(Repository.Literal),
      includeRule(Repository.KeywordLikeBuiltInVariable),
      includeRule(Repository.BuiltInVariable),
      includeRule(Repository.InvalidVariable),
      includeRule(Repository.Variable),
      includeRule(Repository.InvalidDereference),
      includeRule(Repository.Dereference),

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
      includeRule(Repository.KeywordLikeBuiltInVariable),
      includeRule(Repository.BuiltInVariable),
      includeRule(Repository.UserDefinedVariable),
      includeRule(Repository.InvalidVariable),
    ),
    [Repository.UserDefinedVariable]: rule_v1.createVariableRule(scopeName, patterns_v2.nameStart, patterns_v2.nameBody),
    [Repository.InvalidVariable]: rule_v1.createInvalidVariableRule(scopeName, patterns_v2.nameStart, patterns_v2.nameBody),
    [Repository.KeywordLikeBuiltInVariable]: rule_v1.createBuiltinVariableRule(scopeName, {
      variableRuleName: RuleName.KeywordLikeBuiltInVariable,
      builtinVariables: constants_v2.keywordLikeBuiltinVariables,
    }),
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
      includeRule(Repository.StringAsRegExp),
      includeRule(Repository.String),
      includeRule(Repository.Number),
    ),

    // #region string
    [Repository.String]: patternsRule(
      includeRule(Repository.DoubleString),
      includeRule(Repository.SingleString),
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

        // The following are not exactly keywords in the expression, but are defined here as keywords because it is more convenient for the TMLanguage mechanism
        'in',
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
      regexpEscapeSequences: constants_v1.regexpEscapeSequences,
      stringEscapeSequences: constants_v2.doubleQuoteEscapeSequences,
      pcreUnicodePropertyCodes: constants_v1.pcreUnicodePropertyCodes,
      pcreUnicodePropertyScripts: constants_v1.pcreUnicodePropertyScripts,
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
      regexpEscapeSequences: constants_v1.regexpEscapeSequences,
      stringEscapeSequences: constants_v2.singleQuoteEscapeSequences,
      pcreUnicodePropertyCodes: constants_v1.pcreUnicodePropertyCodes,
      pcreUnicodePropertyScripts: constants_v1.pcreUnicodePropertyScripts,
    }),
    // #endregion regexp
    // #endregion expression
  };
}
