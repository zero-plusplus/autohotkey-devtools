import {
  capture,
  inlineSpaces0,
  inlineSpaces1,
  keyword,
  lookahead,
  lookbehind,
  optseq,
  seq,
  wordBound,
} from '../../../oniguruma';
import {
  nameRule,
  RuleName,
  type MatchRule,
  type ScopeName,
} from '../../../tmlanguage';

interface Placeholder {
  startPattern: string;
}
export function createExportDeclarationRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startPattern),
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
