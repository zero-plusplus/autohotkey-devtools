import { RuleName } from '../../../constants';
import { capture, char, inlineSpace, inlineSpaces0, lookbehind, optional, ordalt, seq } from '../../../oniguruma';
import type { MatchRule, Rule, ScopeName } from '../../../types';
import { nameRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
  modifiers: readonly string[];
  namePattern: string;
  nameRule: Rule;
  operators: readonly string[];
}
export function createTypedAssignmentDeclarationRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      optional(seq(
        capture(ordalt(...placeholder.modifiers)),
        inlineSpace(),
      )),
      inlineSpaces0(),
      capture(seq(placeholder.namePattern)),
      inlineSpaces0(),
      capture(char(':')),
      inlineSpaces0(),
      capture(seq(placeholder.namePattern)),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.Modifier),
      2: placeholder.nameRule,
      3: nameRule(scopeName, RuleName.Colon),
      4: nameRule(scopeName, RuleName.Type),
    },
  };
}
