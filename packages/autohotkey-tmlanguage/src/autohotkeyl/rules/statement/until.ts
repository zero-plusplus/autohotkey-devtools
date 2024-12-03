import { RuleName } from '../../../constants';
import { alt, capture, char, inlineSpace, inlineSpaces0, keyword, lookahead, lookbehind, seq } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { nameRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
}
export function createUntilStatementRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      capture(keyword('until')),
      lookahead(alt(
        char('('),
        char('{'),
        inlineSpace(),
      )),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.ControlFlowKeyword),
    },
  };
}
