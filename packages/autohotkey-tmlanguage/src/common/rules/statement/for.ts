import {
  alt,
  capture,
  char,
  inlineSpace,
  inlineSpaces0,
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
export function createForStatementRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startPattern),
      inlineSpaces0(),
      capture(keyword('for')),
      lookahead(alt(
        char('{', ','),
        inlineSpace(),
      )),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.ControlFlowKeyword),
    },
  };
}
