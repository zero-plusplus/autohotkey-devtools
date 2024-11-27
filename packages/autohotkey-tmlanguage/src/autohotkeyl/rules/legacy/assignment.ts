import { Repository, RuleName } from '../../../constants';
import { alt, capture, char, endAnchor, escapeOnigurumaTexts, group, groupMany0, inlineSpaces0, inlineSpaces1, lookahead, many1, negativeLookahead, ordalt, seq } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { includeRule, name, nameRule } from '../../../utils';
import * as constants_v1 from '../../constants';
import * as patterns_v1 from '../../patterns';

export function createLegacyAssignmentRule(scopeName: ScopeName): MatchRule {
  const endLine = lookahead(alt(
    seq(inlineSpaces1(), negativeLookahead(char('`'))),
    seq(inlineSpaces0(), endAnchor()),
  ));

  return {
    match: seq(
      patterns_v1.expressionStartAnchor,
      capture(seq(patterns_v1.nameStart, groupMany0(patterns_v1.nameBody))),
      inlineSpaces0(),
      capture(char('=')),
      inlineSpaces0(),
      capture(groupMany0(alt(
        patterns_v1.pairs,
        patterns_v1.unquotedStringChar,
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
            name: name(scopeName, RuleName.UnquotedString),
            match: many1(patterns_v1.unquotedStringChar),
          },
        ],
      },
    },
  };
}
