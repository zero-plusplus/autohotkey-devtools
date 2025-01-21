import { Repository, RuleName } from '../../../constants';
import { capture, char, inlineSpace, inlineSpaces0, optional, ordalt, seq, startAnchor } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { includeRule, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  modifiers: readonly string[];
  namePattern: string;
  operators: readonly string[];
}
export function createTypedAssignmentDeclarationRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      startAnchor(),
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
      2: patternsRule(includeRule(Repository.Expressions)),
      3: nameRule(scopeName, RuleName.Colon),
      4: nameRule(scopeName, RuleName.Type),
    },
  };
}
