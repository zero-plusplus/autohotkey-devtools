import {
  anyChars0,
  capture,
  char,
  endAnchor,
  inlineSpace,
  inlineSpaces0,
  lookbehind,
  seq,
  startAnchor,
} from '../../../oniguruma';
import {
  nameRule,
  RuleName,
  type MatchRule,
  type ScopeName,
} from '../../../tmlanguage';

export function createSingleLineCommentRule(scopeName: ScopeName): MatchRule {
  return {
    match: seq(
      startAnchor(),
      inlineSpaces0(),
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
      inlineSpaces0(),
      capture(seq(char(';'), anyChars0())),
      endAnchor(),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.InlineComment),
    },
  };
}
