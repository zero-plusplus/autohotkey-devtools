import { capture, char, inlineSpaces0, lookbehind, negativeLookahead, seq } from '../../../oniguruma';
import {
  includeRule, name, nameRule, patternsRule, Repository, RuleName,
  type MatchRule, type ScopeName,
} from '../../../tmlanguage';

interface Placeholder {
  startAnchor: string;
  labelPattern: string;
}
export function createLabelRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    name: name(scopeName, Repository.LabelStatement),
    match: seq(
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      capture(placeholder.labelPattern),
      capture(seq(char(':'), negativeLookahead(char(':', '=')))),
    ),
    captures: {
      1: patternsRule(includeRule(Repository.LabelName)),
      2: nameRule(scopeName, RuleName.Colon),
    },
  };
}
