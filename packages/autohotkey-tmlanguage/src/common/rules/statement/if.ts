import {
  alt,
  capture,
  char,
  inlineSpace,
  inlineSpaces0,
  inlineSpaces1,
  keyword,
  lookahead,
  lookbehind,
  seq,
} from '../../../oniguruma';
import {
  nameRule,
  RuleName,
  type MatchRule,
  type ScopeName,
} from '../../../tmlanguage';

interface Placeholder {
  startPattern: string;
}
export function createIfStatementRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startPattern),
      inlineSpaces0(),
      capture(alt(
        seq(keyword('else'), inlineSpaces1(), keyword('if')),
        keyword('else'),
        keyword('if'),
      )),
      lookahead(alt(
        char('(', '{'),
        inlineSpace(),
      )),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.ControlFlowKeyword),
    },
  };
}
