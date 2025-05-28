import { RuleName } from '../../../constants';
import { alt, capture, char, group, inlineSpaces0, inlineSpaces1, keyword, lookbehind, optional, optseq, seq } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { nameRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
}
export function createLoopStatementRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      capture(keyword('Loop')),
      optseq(
        group(alt(
          seq(inlineSpaces0(), capture(char(','))),
          inlineSpaces1(),
        )),
        inlineSpaces0(),
        optional(capture(keyword(
          'Files',
          'Parse',
          'Read',
          'Reg',
        ))),
      ),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.ControlFlowKeyword),
      2: nameRule(scopeName, RuleName.Comma),
      3: nameRule(scopeName, RuleName.FlowSubCommandName),
    },
  };
}
