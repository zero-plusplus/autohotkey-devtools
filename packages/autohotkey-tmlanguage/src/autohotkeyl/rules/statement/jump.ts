import { RuleName } from '../../../constants';
import { alt, capture, char, group, ignoreCase, inlineSpace, inlineSpaces0, lookahead, lookbehind, optional, optseq, ordalt, seq } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { nameRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
  endAnchor: string;
  names: readonly string[];
}
export function createJumpStatement(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startAnchor),
      capture(ignoreCase(ordalt(...placeholder.names))),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.JumpCommandName),
    },
  };
}

interface Placeholder2 {
  startAnchor: string;
  endAnchor: string;
  names: readonly string[];
  labelPattern: string;
}
export function createJumpToLabelStatement(scopeName: ScopeName, placeholder: Placeholder2): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      capture(ignoreCase(ordalt(...placeholder.names))),
      optseq(
        group(alt(
          inlineSpace(),
          capture(char(',')),
        )),
        inlineSpaces0(),
        optional(capture(placeholder.labelPattern)),
      ),
      lookahead(placeholder.endAnchor),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.JumpCommandName),
      2: nameRule(scopeName, RuleName.Comma),
      3: nameRule(scopeName, RuleName.LabelName),
    },
  };
}

