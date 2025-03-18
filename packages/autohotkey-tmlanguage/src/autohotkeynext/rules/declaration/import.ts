import { Repository, RuleName } from '../../../constants';
import { capture, char, inlineSpaces0, inlineSpaces1, keyword, lookbehind, optseq, seq } from '../../../oniguruma';
import type { PatternsRule, ScopeName } from '../../../types';
import { includeRule, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
}
export function createImportDeclarationRule(scopeName: ScopeName, placeholder: Placeholder): PatternsRule {
  return patternsRule(
    // e.g. `import * from "path/to"`
    //       ^^^^^^ ^ ^^^^
    {
      match: seq(
        lookbehind(placeholder.startAnchor),
        inlineSpaces0(),
        capture(keyword('import')),
        inlineSpaces1(),
        capture(char('*')),
        optseq(
          inlineSpaces1(),
          capture(keyword('from')),
        ),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.MetaKeyword),
        2: nameRule(scopeName, RuleName.Operator),
        3: nameRule(scopeName, RuleName.MetaKeyword),
      },
    },
    // e.g. `import { Y as X, A as B } from X`
    //       ^^^^^^ ^ ^ ^^ ^^ ^ ^^ ^ ^ ^^^^
    {
      begin: seq(
        lookbehind(placeholder.startAnchor),
        inlineSpaces0(),
        capture(keyword('import')),
        inlineSpaces1(),
        capture(char('{')),
      ),
      beginCaptures: {
        1: nameRule(scopeName, RuleName.MetaKeyword),
        2: nameRule(scopeName, RuleName.OpenBrace),
      },
      end: seq(
        capture(char('}')),
        inlineSpaces0(),
        capture(keyword('from')),
      ),
      endCaptures: {
        1: nameRule(scopeName, RuleName.CloseBrace),
        2: nameRule(scopeName, RuleName.MetaKeyword),
      },
      patterns: [ includeRule(Repository.Expressions) ],
    },
    // e.g. `import "path/to"`
    //       ^^^^^^
    // e.g. `import "path/to" as X`
    //       ^^^^^^
    {
      match: seq(
        lookbehind(placeholder.startAnchor),
        inlineSpaces0(),
        capture(keyword('import')),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.MetaKeyword),
      },
    },
  );
}
