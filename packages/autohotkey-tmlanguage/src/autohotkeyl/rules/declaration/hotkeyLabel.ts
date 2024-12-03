import { Repository, RuleName } from '../../../constants';
import { anyChars1, capture, char, lookbehind, negativeLookahead, negativeLookbehind, seq } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { name, nameRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
}
export function createHotkeyLabelRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    name: name(scopeName, Repository.HotkeyLabelStatement),
    match: seq(
      lookbehind(placeholder.startAnchor),
      negativeLookahead(char(':')),
      capture(anyChars1()),
      capture(seq(negativeLookbehind('`'), char(':'), negativeLookahead('='), char(':'))),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.HotkeyLabelName),
      2: nameRule(scopeName, RuleName.ColonColon),
    },
  };
}
