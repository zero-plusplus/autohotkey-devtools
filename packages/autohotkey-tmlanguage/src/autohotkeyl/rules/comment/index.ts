import { RuleName } from '../../../constants';
import { anyChars0, capture, char, endAnchor, inlineSpace, inlineSpaces0, lookbehind, seq, startAnchor } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { nameRule } from '../../../utils';

export function createSingleLineCommentRule(scopeName: ScopeName): MatchRule {
  return {
    match: seq(
      lookbehind(seq(startAnchor(), inlineSpaces0())),
      capture(seq(char(';'), anyChars0())),
      endAnchor(),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.SingleLineComment),
    },
  };
}
export function createInLineCommentRule(scopeName: ScopeName): MatchRule {
  return {
    match: seq(
      lookbehind(inlineSpace()),
      capture(seq(char(';'), anyChars0())),
      endAnchor(),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.InLineComment),
    },
  };
}
