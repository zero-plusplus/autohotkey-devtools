import { RuleName } from '../../../constants';
import { anyChars0, capture, char, endAnchor, inlineSpace, lookbehind, seq } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { nameRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
}
export function createSingleLineCommentRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startAnchor),
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
