import { capture, inlineSpaces0, keyword, lookbehind, optional, seq, textalt } from '../../../oniguruma';
import {
  includeRule, nameRule, patternsRule, Repository, RuleName,
  type MatchRule, type ScopeName,
} from '../../../tmlanguage';

interface Placeholder {
  startAnchor: string;
  namePattern: string;
  operators: readonly string[];
}
export function createAssignmentDeclarationRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      optional(capture(keyword('global', 'local', 'static'))),
      inlineSpaces0(),
      capture(seq(placeholder.namePattern)),
      inlineSpaces0(),
      capture(textalt(...placeholder.operators)),
    ),
    captures: {
      1: patternsRule(includeRule(Repository.Modifier)),
      2: patternsRule(
        includeRule(Repository.Comma),
        includeRule(Repository.Expression),
      ),
      3: nameRule(scopeName, RuleName.Operator),
    },
  };
}
