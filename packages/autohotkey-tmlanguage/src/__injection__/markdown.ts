import { Repository, RuleName } from '../constants';
import { alt, anyChars0, capture, char, endAnchor, group, ignoreCase, inlineSpace, inlineSpaces0, negativeLookahead, negChars0, optional, ordalt, seq, startAnchor, text } from '../oniguruma';
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
export function createCodeFencePatternsRule(): PatternsRule {
  return patternsRule(
    createCodeFenceRule('autohotkeynext', [ 'ahknext' ]),
    createCodeFenceRule('autohotkey2', [ 'ahk2' ]),
    createCodeFenceRule('autohotkeyl', [ 'ahkl' ]),
    createCodeFenceRule('autohotkey', [ 'ahk' ]),
  );
}
export function createCodeFenceRule(scopeName: ScopeName, aliases: readonly string[]): BeginEndRule {
  const markdownScopeName = 'markdown';

  const startPattern = group(alt(startAnchor(), '\\G'));
  const fencePattern = group(alt(text('```'), text('~~~')));
  return {
    name: name(markdownScopeName, RuleName.FencedCodeBlock),
    begin: seq(
      startPattern,
      capture(inlineSpaces0()),   // \\1: indent
      capture(fencePattern),      // \\2: fenced
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
      2: nameRule(markdownScopeName, RuleName.CodeFence),
      3: nameRule(markdownScopeName, RuleName.LanguageName),
      4: nameRule(markdownScopeName, RuleName.LanguageAttribute),
    },
    end: seq(
      startPattern,
      '\\1',            // indent
      capture('\\2'),   // fenced
      inlineSpaces0(),
      endAnchor(),
    ),
    endCaptures: {
      1: nameRule(markdownScopeName, RuleName.CodeFence),
    },
    patterns: [
      {
        contentName: name(scopeName, RuleName.EmbeddedLanguage),
        begin: seq(
          startPattern,
          inlineSpaces0(),
          anyChars0(),
          endAnchor(),
        ),
        while: seq(
          startPattern,
          negativeLookahead(seq(
            inlineSpaces0(),
            fencePattern,
            inlineSpaces0(),
            endAnchor(),
          )),
        ),
        patterns: [ includeScope(scopeName) ],
      },
    ],
  };
}
