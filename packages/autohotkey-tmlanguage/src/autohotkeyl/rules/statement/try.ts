import { RuleName } from '../../../constants';
import { alt, capture, char, inlineSpace, inlineSpaces0, keyword, lookahead, seq } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { nameRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
}
export function createTryStatementRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      placeholder.startAnchor,
      inlineSpaces0(),
      capture(alt(
        keyword('try'),
        keyword('catch'),
      )),
      lookahead(alt(
        char('{'),
        inlineSpace(),
      )),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.ControlFlowKeyword),
    },
  };
}
