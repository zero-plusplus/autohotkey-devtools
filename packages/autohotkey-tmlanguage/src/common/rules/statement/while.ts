import {
  capture,
  char,
  ignoreCase,
  inlineSpace,
  inlineSpaces0,
  lookahead,
  lookbehind,
  optcapture,
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
export function createWhileStatementRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startPattern),
      inlineSpaces0(),
      capture(ignoreCase('while')),
      inlineSpaces0(),
      optcapture(char(',')),      // Only v1 allows comma
      lookahead(char('(', '{', inlineSpace())),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.ControlFlowKeyword),
      2: nameRule(scopeName, RuleName.Comma),
    },
  };
}
