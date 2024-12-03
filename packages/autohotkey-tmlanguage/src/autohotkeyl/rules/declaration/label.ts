import { Repository, RuleName } from '../../../constants';
import { capture, char, inlineSpaces0, lookbehind, negativeLookahead, seq } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { name, nameRule } from '../../../utils';

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
      1: nameRule(scopeName, RuleName.LabelName),
      2: nameRule(scopeName, RuleName.Colon),
    },
  };
}
