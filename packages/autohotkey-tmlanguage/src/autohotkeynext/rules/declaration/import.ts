import {
  anyChars0,
  capture,
  char,
  inlineSpaces0,
  inlineSpaces1,
  keyword,
  lookbehind,
  optseq,
  reluctant,
  seq,
} from '../../../oniguruma.ts';
import {
  includeRule,
  name,
  nameRule,
  patternsRule,
  Repository,
  RuleName,
  type PatternsRule,
  type Rule,
  type ScopeName,
} from '../../../tmlanguage.ts';

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
    // e.g. `#Import Export "path/to" as X { *, Y, Z as ZZ }`
    //       ^^^^^^^^^^^^^^                ^^^^^^^^^^^^^^^^^
    //                      ^^^^^^^^^^^^^^
    //                Highlight as an expression
    {
      begin: seq(
        lookbehind(placeholder.startPattern),
        inlineSpaces0(),
        capture(seq(char('#'), keyword('Import'))),
        optseq(
          inlineSpaces1(),
          capture(keyword('Export')),
        ),
        inlineSpaces0(),
        capture(reluctant(anyChars0())),
        capture(char('{')),
      ),
      beginCaptures: {
        1: nameRule(scopeName, RuleName.MetaKeyword),
        2: nameRule(scopeName, RuleName.MetaKeyword),
        3: patternsRule(includeRule(Repository.Expression)),
        4: nameRule(scopeName, RuleName.OpenBrace),
      },
      end: capture(char('}')),
      endCaptures: {
        1: nameRule(scopeName, RuleName.CloseBrace),
      },
      patterns: rulesInBrace,
    },
    // e.g. `#Import Export "path/to"`
    //       ^^^^^^^ ^^^^^^
    //                      ^^^^^^^^^
    //             Highlight as an expression
    //
    // e.g. `#Import Export "path/to" as X`
    //       ^^^^^^^ ^^^^^^
    //                      ^^^^^^^^^^^^^^^
    //                Highlight as an expression
    {
      match: seq(
        lookbehind(placeholder.startPattern),
        inlineSpaces0(),
        capture(seq(char('#'), keyword('Import'))),
        optseq(
          inlineSpaces1(),
          capture(keyword('Export')),
        ),
        inlineSpaces0(),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.MetaKeyword),
        2: nameRule(scopeName, RuleName.MetaKeyword),
      },
    },
  );
}
