import { RuleName } from '../../../constants';
import { capture, inlineSpaces0, inlineSpaces1, keyword, lookahead, optseq, seq, startAnchor, wordBound } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { nameRule } from '../../../utils';

export function createExportDeclarationRule(scopeName: ScopeName): MatchRule {
  return {
    match: seq(
      startAnchor(),
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
