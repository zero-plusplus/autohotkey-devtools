import { Repository, RuleName } from '../constants';
import { alt, anyChars0, capture, char, endAnchor, group, ignoreCase, inlineSpace, inlineSpaces0, lookbehind, manyX, manyXtoY, negativeLookahead, negChars0, optional, ordalt, seq, startAnchor } from '../oniguruma';
import type { BeginEndRule, PatternsRule, ScopeName, TmLanguage } from '../types';
import { includeRule, includeScope, name, nameRule, patternsRule } from '../utils';

export function createTmLanguage(): TmLanguage {
  return {
    scopeName: 'injection.to-markdown',
    injectionSelector: 'L:text.html.markdown',
    patterns: [ includeRule(Repository.FencedCodeBlockInDocument) ],
    repository: {
      [Repository.FencedCodeBlockInDocument]: createCodeFencePatternsRule(),
    },
  };
}
export function createCodeFencePatternsRule(inDocument = false): PatternsRule {
  return patternsRule(
    createCodeFenceRule('autohotkeynext', [ 'ahknext' ], inDocument),
    createCodeFenceRule('autohotkey2', [ 'ahk2' ], inDocument),
    createCodeFenceRule('autohotkeyl', [ 'ahkl' ], inDocument),
    createCodeFenceRule('autohotkey', [ 'ahk' ], inDocument),
  );
}
export function createCodeFenceInDocumentRule(): PatternsRule {
  return createCodeFencePatternsRule(true);
}
export function createCodeFenceRule(scopeName: ScopeName, aliases: readonly string[], inDocument = false): BeginEndRule {
  const markdownScopeName = 'markdown';

  return {
    name: name(markdownScopeName, RuleName.FencedCodeBlock),
    begin: seq(
      capture(alt(startAnchor(), '\\G')),
      capture(inlineSpaces0()),
      capture(alt(
        manyX(3)(char('`')),
        manyX(3)(char('~')),
      )),
      inlineSpaces0(),
      group(seq(
        capture(ignoreCase(ordalt(scopeName, ...aliases))),
        optional(capture(seq(
          capture(alt(
            inlineSpace(),
            char(':', ',', '{', '?'),
          )),
          inlineSpaces0(),
          negChars0('`'),
        ))),
      )),
      endAnchor(),
    ),
    beginCaptures: {
      3: nameRule(markdownScopeName, RuleName.CodeFence),
      4: nameRule(markdownScopeName, RuleName.LanguageName),
      5: nameRule(markdownScopeName, RuleName.LanguageAttribute),
    },
    end: seq(
      capture(alt(startAnchor(), '\\G')),
      capture(alt(
        '\\2',
        manyXtoY(0, 3)(inlineSpace()),
      )),
      capture('\\3'),
      inlineSpaces0(),
      endAnchor(),
    ),
    endCaptures: {
      3: nameRule(markdownScopeName, RuleName.CodeFence),
    },
    patterns: [
      {
        contentName: name(scopeName, RuleName.EmbeddedLanguage),
        begin: seq(
          capture(alt(startAnchor(), '\\G')),
          capture(inlineSpaces0()),
          capture(anyChars0()),
        ),
        while: seq(
          capture(alt(startAnchor(), '\\G')),
          negativeLookahead(seq(
            inlineSpaces0(),
            capture(manyX(3)(char('`', '~'))),
            inlineSpaces0(),
            endAnchor(),
          )),
        ),
        patterns: [
          ...(inDocument
            ? [
              {
                name: name(scopeName, RuleName.CodeBegin),
                match: seq(
                  lookbehind(seq(
                    startAnchor(),
                    inlineSpaces0(),
                    char('*'),
                  )),
                  char(':'),
                ),
              },
            ]
            : []),
          includeScope(scopeName),
        ],
      },
    ],
  };
}
