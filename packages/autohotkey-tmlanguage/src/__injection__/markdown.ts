import {
  alt,
  anyChars0,
  capture,
  char,
  endAnchor,
  group,
  ignoreCase,
  inlineSpace,
  inlineSpaces0,
  negativeLookahead,
  negChars0,
  optcapture,
  ordalt,
  seq,
  startAnchor,
  text,
} from '../oniguruma';
import {
  includeRule,
  includeScope,
  name,
  nameRule,
  patternsRule,
  Repository,
  RuleName,
  type BeginEndRule,
  type PatternsRule,
  type Rule,
  type ScopeName,
  type TmLanguage,
} from '../tmlanguage';

export function createTmLanguage(): TmLanguage {
  return {
    scopeName: 'injection.to-markdown',
    injectionSelector: 'L:text.html.markdown',
    patterns: [ includeRule(Repository.FencedCodeBlockInDocument) ],
    repository: {
      [Repository.FencedCodeBlockInDocument]: patternsRule(
        createCodeFenceRule('autohotkeynext', [ 'ahknext' ], includeScope('autohotkeynext')),
        createCodeFenceRule('autohotkey2', [ 'ahk2' ], includeScope('autohotkey2')),
        createCodeFenceRule('autohotkeyl', [ 'ahkl' ], includeScope('autohotkeyl')),
        createCodeFenceRule('autohotkey', [ 'ahk' ], includeScope('autohotkey')),
      ),
    },
  };
}
export function createCodeFencePatternsRule(): PatternsRule {
  return patternsRule(
    createCodeFenceRule('autohotkeynext', [ 'ahknext' ], includeScope('autohotkeynext')),
    createCodeFenceRule('autohotkey2', [ 'ahk2' ], includeScope('autohotkey2')),
    createCodeFenceRule('autohotkeyl', [ 'ahkl' ], includeScope('autohotkeyl')),
    // The `autohotkey` language ID mechanism does not work well in the fenced code block in the document. So I've highlighted it in the current scope until I can figure out the cause
    createCodeFenceRule('autohotkey', [ 'ahk', '' ], includeRule(Repository.Self)),
  );
}
export function createCodeFenceRule(scopeName: ScopeName, aliases: readonly string[], syntax: Rule): BeginEndRule {
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
        optcapture(seq(
          capture(char(':', ',', '{', '?', inlineSpace())),
          inlineSpaces0(),
          negChars0('`'),
        )),
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
        patterns: [ syntax ],
      },
    ],
  };
}
