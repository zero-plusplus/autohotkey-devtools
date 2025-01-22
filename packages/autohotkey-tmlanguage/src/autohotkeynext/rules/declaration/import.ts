import { Repository, RuleName } from '../../../constants';
import { capture, char, inlineSpaces0, inlineSpaces1, keyword, negativeLookahead, optseq, seq, startAnchor } from '../../../oniguruma';
import type { PatternsRule, ScopeName } from '../../../types';
import { includeRule, nameRule, patternsRule } from '../../../utils';

export function createImportDeclarationRule(scopeName: ScopeName): PatternsRule {
  return patternsRule(
    // e.g. `import * from X`
    //       ^^^^^^ ^ ^^^^
    {
      match: seq(
        startAnchor(),
        inlineSpaces0(),
        capture(keyword('import')),
        inlineSpaces1(),
        capture(char('*')),
        optseq(
          inlineSpaces0(),
          capture(keyword('from')),
        ),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.MetaKeyword),
        2: nameRule(scopeName, RuleName.Operator),
        3: nameRule(scopeName, RuleName.MetaKeyword),
      },
    },
    // e.g. `import X`
    //       ^^^^^^
    {
      match: seq(
        startAnchor(),
        inlineSpaces0(),
        capture(keyword('import')),
        negativeLookahead(seq(
          inlineSpaces1(),
          char('{'),
        )),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.MetaKeyword),
      },
    },
    // e.g. `import { Y as X } from X`
    //       ^^^^^^ ^^^^^^^^^^ ^^^^
    {
      begin: seq(
        startAnchor(),
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
  );
}
