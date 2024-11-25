import { Repository, RuleName } from '../../../constants';
import { alt, capture, char, inlineSpace, inlineSpaces1, keyword, lookahead, seq } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { name, nameRule } from '../../../utils';

interface Placeholder {
  statementBeginAnchor: string;
}
export function createIfStatementRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    name: name(scopeName, Repository.IfStatement),
    match: seq(
      placeholder.statementBeginAnchor,
      capture(alt(
        seq(keyword('else'), inlineSpaces1(), keyword('if')),
        keyword('else'),
        keyword('if'),
      )),
      lookahead(alt(
        char('('),
        inlineSpace(),
      )),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.ControlFlowKeyword),
    },
  };
}
