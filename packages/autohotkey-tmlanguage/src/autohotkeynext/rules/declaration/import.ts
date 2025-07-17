import { anyChars0, capture, char, inlineSpaces0, inlineSpaces1, keyword, lookbehind, optseq, reluctant, seq } from '../../../oniguruma';
import {
  includeRule, name, nameRule, patternsRule, Repository, RuleName,
  type PatternsRule, type Rule, type ScopeName,
} from '../../../tmlanguage';

interface Placeholder {
  startPattern: string;
}
export function createImportDeclarationRule(scopeName: ScopeName, placeholder: Placeholder): PatternsRule {
  const rulesInBrace: Rule[] = [
    includeRule(Repository.Trivias),

    {
      name: name(scopeName, RuleName.ImportExportAll),
      match: char('*'),
    },
    includeRule(Repository.Comma),
    includeRule(Repository.Expression),
  ];

  return patternsRule(
    // e.g. `import * from "path/to"`
    //       ^^^^^^ ^ ^^^^
    {
      match: seq(
        lookbehind(placeholder.startPattern),
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
        2: nameRule(scopeName, RuleName.ImportExportAll),
        3: nameRule(scopeName, RuleName.MetaKeyword),
      },
    },
    // e.g. `import { Y as X, A as B } from X`
    //       ^^^^^^ ^ ^ ^^ ^^ ^ ^^ ^ ^ ^^^^
    {
      begin: seq(
        lookbehind(placeholder.startPattern),
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
      patterns: rulesInBrace,
    },
    // e.g. `export import "path/to" as X { *, Y, Z as ZZ }`
    //       ^^^^^^
    {
      begin: seq(
        lookbehind(placeholder.startPattern),
        inlineSpaces0(),
        optseq(
          capture(keyword('export')),
          inlineSpaces1(),
        ),
        inlineSpaces0(),
        capture(keyword('import')),
        inlineSpaces1(),
        capture(reluctant(anyChars0())),
        capture(char('{')),
      ),
      beginCaptures: {
        1: nameRule(scopeName, RuleName.MetaKeyword),
        2: nameRule(scopeName, RuleName.MetaKeyword),
        3: patternsRule(...rulesInBrace),
        4: nameRule(scopeName, RuleName.OpenBrace),
      },
      end: capture(char('}')),
      endCaptures: {
        1: nameRule(scopeName, RuleName.CloseBrace),
      },
      patterns: rulesInBrace,
    },
    // e.g. `import "path/to"`
    //       ^^^^^^
    // e.g. `import "path/to" as X`
    //       ^^^^^^
    {
      match: seq(
        lookbehind(placeholder.startPattern),
        inlineSpaces0(),
        optseq(
          capture(keyword('export')),
          inlineSpaces1(),
        ),
        inlineSpaces0(),
        capture(keyword('import')),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.MetaKeyword),
        2: nameRule(scopeName, RuleName.MetaKeyword),
      },
    },
  );
}
