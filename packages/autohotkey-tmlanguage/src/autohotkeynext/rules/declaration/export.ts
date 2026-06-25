import {
  alt,
  capture,
  group,
  inlineSpace,
  inlineSpaces0,
  inlineSpaces1,
  keyword,
  lookahead,
  lookbehind,
  optseq,
  seq,
} from '../../../oniguruma.ts';
import {
  nameRule,
  RuleName,
  type MatchRule,
  type ScopeName,
} from '../../../tmlanguage.ts';

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
        group(alt(
          capture(keyword('default')),
          capture(keyword('global')),
        )),
      ),
      lookahead(inlineSpace()),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.MetaKeyword),
      2: nameRule(scopeName, RuleName.MetaKeyword),
      3: nameRule(scopeName, RuleName.Modifier),
    },
  };
}
