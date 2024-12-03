import { Repository, RuleName } from '../../../constants';
import { capture, escapeOnigurumaTexts, inlineSpaces0, keyword, lookbehind, optional, ordalt, seq } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { includeRule, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
  namePattern: string;
  operators: readonly string[];
}
export function createAssignmentDeclarationRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startAnchor),
      optional(capture(keyword('global', 'local', 'static'))),
      inlineSpaces0(),
      capture(seq(placeholder.namePattern)),
      inlineSpaces0(),
      capture(ordalt(...escapeOnigurumaTexts(placeholder.operators))),
    ),
    captures: {
      1: patternsRule(includeRule(Repository.Modifier)),
      2: patternsRule(includeRule(Repository.Expressions)),
      3: nameRule(scopeName, RuleName.Operator),
    },
  };
}
