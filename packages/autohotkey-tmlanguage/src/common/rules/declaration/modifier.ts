import { capture, inlineSpaces0, keyword, lookbehind, seq } from '../../../oniguruma';
import {
  nameRule, RuleName,
  type MatchRule, type ScopeName,
} from '../../../tmlanguage';

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
