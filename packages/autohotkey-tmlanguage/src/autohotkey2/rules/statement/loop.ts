import {
  alt,
  capture,
  char,
  group,
  inlineSpaces0,
  inlineSpaces1,
  keyword,
  lookbehind,
  optcapture,
  optseq,
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
export function createLoopStatementRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startPattern),
      inlineSpaces0(),
      capture(keyword('Loop')),
      optseq(
        group(alt(
          seq(inlineSpaces0(), capture(char(','))),
          inlineSpaces1(),
        )),
        inlineSpaces0(),
        optcapture(keyword(
          'Files',
          'Parse',
          'Read',
          'Reg',
        )),
      ),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.ControlFlowKeyword),
      2: nameRule(scopeName, RuleName.Comma),
      3: nameRule(scopeName, RuleName.FlowSubCommandName),
    },
  };
}
