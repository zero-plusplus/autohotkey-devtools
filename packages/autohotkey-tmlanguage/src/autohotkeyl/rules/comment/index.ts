import { Repository, RuleName } from '../../../constants';
import { anyChars0, capture, char, endAnchor, inlineSpace, inlineSpaces0, lookbehind, seq, startAnchor } from '../../../oniguruma';
import type { MatchRule, PatternsRule, ScopeName } from '../../../types';
import { includeRule, nameRule, patternsRule } from '../../../utils';

export function createCommentRule(): PatternsRule {
  return patternsRule(
    includeRule(Repository.SingleLineComment),
    includeRule(Repository.InLineComment),
  );
}
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
