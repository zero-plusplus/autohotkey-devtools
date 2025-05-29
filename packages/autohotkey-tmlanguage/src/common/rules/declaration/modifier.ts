import { RuleName } from '../../../constants';
import { capture, inlineSpaces0, keyword, lookbehind, seq } from '../../../oniguruma';
import { nameRule } from '../../../tmlanguage';
import type { MatchRule, ScopeName } from '../../../types';

interface Placeholder {
  startAnchor: string;
  modifiers: readonly string[];
}
export function createModifierRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      capture(keyword(...placeholder.modifiers)),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.Modifier),
    },
  };
}
