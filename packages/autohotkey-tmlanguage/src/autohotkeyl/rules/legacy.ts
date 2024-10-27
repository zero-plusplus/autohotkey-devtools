import { Repository, RuleName } from '../../constants';
import { alt, capture, char, endAnchor, escapeOnigurumaTexts, group, groupMany0, inlineSpace, inlineSpaces0, inlineSpaces1, lookahead, many1, negativeLookahead, negativeLookbehind, negChar, ordalt, seq } from '../../oniguruma';
import type { MatchRule, ScopeName } from '../../types';
import { includeRule, name, nameRule } from '../../utils';
import * as constants_v1 from '../constants';

export function createLegacyAssignmentRule(scopeName: ScopeName): MatchRule {
  const endLine = lookahead(alt(
    seq(inlineSpaces1(), negativeLookahead(char('`'))),
    seq(inlineSpaces0(), endAnchor()),
  ));

  return {
    match: seq(
      constants_v1.expressionBegin,
      capture(seq(constants_v1.nameStart, groupMany0(constants_v1.nameBody))),
      inlineSpaces0(),
      capture(char('=')),
      inlineSpaces0(),
      capture(groupMany0(alt(
        constants_v1.brackets,
        constants_v1.legacyText,
        group(ordalt(...constants_v1.unquoteEscapeSequences)),
        char('%'),
      ))),
      endLine,
    ),
    captures: {
      1: {
        name: name(scopeName, Repository.LegacyAssignment),
        patterns: [ includeRule(Repository.Variable) ],
      },
      2: nameRule(scopeName, Repository.LegacyAssignment, RuleName.Operator),
      3: {
        name: name(scopeName, Repository.LegacyAssignment),
        patterns: [
          includeRule(Repository.PercentExpression),
          includeRule(Repository.Dereference),
          // escape sequences
          {
            name: name(scopeName, RuleName.EscapeSequence),
            match: ordalt(...escapeOnigurumaTexts(constants_v1.unquoteEscapeSequences)),
          },
          {
            name: name(scopeName, RuleName.LegacyText),
            match: many1(constants_v1.legacyText),
          },
        ],
      },
    },
  };
}
export function createPercentExpressionRule(scopeName: ScopeName): MatchRule {
  return {
    match: seq(
      capture(char('%')),
      inlineSpaces1(),
      capture(groupMany0(alt(
        constants_v1.brackets,
        negChar('\\r', '\\n', ',', ';'),
        seq(negativeLookbehind(inlineSpace()), char(';')),
      ))),
    ),
    captures: {
      1: nameRule(scopeName, Repository.PercentExpression, RuleName.PercentBegin),
      2: {
        name: name(scopeName, Repository.PercentExpression),
        patterns: [ includeRule(Repository.Expression) ],
      },
    },
  };
}
