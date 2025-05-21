import * as rules_common from '../../../common/rules/misc/keyword';
import { Repository, RuleName, StyleName } from '../../../constants';
import {
  capture, char, charRange, ignoreCase, inlineSpaces0, inlineSpaces1, keyword, lookahead, lookbehind,
  many1, optseq, seq,
} from '../../../oniguruma';
import type { BeginEndRule, MatchRule, ScopeName } from '../../../types';
import { includeRule, name, nameRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
  endAnchor: string;
  identifierPattern: string;
}
export function createLegacyIfStatementRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  const invalidOnetTrueBraceStyleRule: MatchRule = {
    name: name(scopeName, RuleName.UnquotedString, StyleName.Invalid),
    match: char('{'),
  };

  return {
    name: name(scopeName, Repository.LegacyIfStatement),
    begin: seq(
      lookbehind(placeholder.startAnchor),
      lookahead(seq(
        inlineSpaces0(),
        optseq(keyword('else'), inlineSpaces1()),
        keyword('if'),
        inlineSpaces1(),
        placeholder.identifierPattern,
        inlineSpaces1(),
        keyword(
          'between',
          'and',
          'is',
          'not',
          'in',
          'contains',
        ),
      )),
    ),
    end: lookahead(placeholder.endAnchor),
    patterns: [
      includeRule(Repository.IfStatement),

      // https://www.autohotkey.com/docs/v1/lib/IfBetween.htm
      rules_common.createKeywordRule(scopeName, {
        keywordRuleName: RuleName.KeywordInExpression,
        keywords: [ 'between', 'not' ],
      }),

      // https://www.autohotkey.com/docs/v1/lib/IfIs.htm
      {
        begin: capture(keyword('is')),
        beginCaptures: {
          1: nameRule(scopeName, RuleName.KeywordInExpression),
        },
        end: lookahead(placeholder.endAnchor),
        patterns: [
          invalidOnetTrueBraceStyleRule,
          rules_common.createKeywordRule(scopeName, {
            keywordRuleName: RuleName.KeywordInExpression,
            keywords: [ 'not' ],
          }),
          rules_common.createKeywordRule(scopeName, {
            keywordRuleName: RuleName.KeywordLikeBuiltInVariable,
            keywords: [
              'integer',
              'float',
              'number',
              'digit',
              'xdigit',
              'alpha',
              'upper',
              'lower',
              'alnum',
              'space',
              'time',
            ],
          }),
          {
            name: name(scopeName, RuleName.KeywordLikeBuiltInVariable, StyleName.Invalid),
            match: ignoreCase(many1(charRange('a', 'z'))),
          },
        ],
      },

      // https://www.autohotkey.com/docs/v1/lib/IfIn.htm
      {
        begin: capture(keyword('in', 'contains')),
        beginCaptures: {
          1: nameRule(scopeName, RuleName.KeywordInExpression),
        },
        end: lookahead(placeholder.endAnchor),
        patterns: [ includeRule(Repository.CommandLastArgument) ],
      },

      invalidOnetTrueBraceStyleRule,
      includeRule(Repository.Comma),
      includeRule(Repository.Expression),
    ],
  };
}
