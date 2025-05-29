import { alt, capture, char, inlineSpace, inlineSpaces0, keyword, lookahead, lookbehind, seq } from '../../../oniguruma';
import {
  nameRule, RuleName,
  type MatchRule, type ScopeName,
} from '../../../tmlanguage';

interface Placeholder {
  startAnchor: string;
}
export function createWhileStatementRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      capture(keyword('while')),
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
