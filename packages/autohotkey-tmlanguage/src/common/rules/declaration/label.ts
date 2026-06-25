import {
  capture,
  char,
  inlineSpaces0,
  lookbehind,
  negativeLookahead,
  seq,
} from '../../../oniguruma.ts';
import {
  includeRule,
  nameRule,
  patternsRule,
  Repository,
  RuleName,
  type MatchRule,
  type ScopeName,
} from '../../../tmlanguage.ts';

interface Placeholder {
  startPattern: string;
  labelPattern: string;
}
export function createLabelRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startPattern),
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
