import {
  capture,
  char,
  inlineSpace,
  inlineSpaces0,
  lookbehind,
  optional,
  ordalt,
  seq,
} from '../../../oniguruma';
import {
  nameRule,
  RuleName,
  type MatchRule,
  type Rule,
  type ScopeName,
} from '../../../tmlanguage';

interface Placeholder {
  startPattern: string;
  modifiers: readonly string[];
  namePattern: string;
  nameRule: Rule;
  operators: readonly string[];
}
export function createTypedAssignmentDeclarationRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startPattern),
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
