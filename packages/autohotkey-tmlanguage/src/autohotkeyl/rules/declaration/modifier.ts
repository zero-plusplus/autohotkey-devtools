import { RuleName } from '../../../constants';
import { capture, inlineSpaces0, keyword, seq } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { nameRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
  modifiers: readonly string[];
}
export function createModifierRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      placeholder.startAnchor,
      inlineSpaces0(),
      capture(keyword(...placeholder.modifiers)),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.Modifier),
    },
  };
}
