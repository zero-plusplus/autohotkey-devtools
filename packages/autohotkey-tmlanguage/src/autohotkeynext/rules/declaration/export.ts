import { RuleName } from '../../../constants';
import { capture, inlineSpaces0, inlineSpaces1, keyword, lookahead, lookbehind, optseq, seq, wordBound } from '../../../oniguruma';
import { nameRule } from '../../../tmlanguage';
import type { MatchRule, ScopeName } from '../../../types';

interface Placeholder {
  startAnchor: string;
}
export function createExportDeclarationRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      capture(keyword('export')),
      optseq(
        inlineSpaces1(),
        capture(keyword('default')),
      ),
      lookahead(wordBound()),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.MetaKeyword),
      2: nameRule(scopeName, RuleName.MetaKeyword),
    },
  };
}
