import {
  alt, anyChars0, capture, char, charRange, endAnchor, group, ignoreCase, inlineSpaces0, inlineSpaces1,
  lookahead, lookbehind, negativeLookahead, optional, optseq, reluctant, seq, startAnchor, wordBound,
} from '../oniguruma';
import { includeScope, patternsRule } from '../tmlanguage';
import type { Rule, ScopeName, TmLanguage } from '../types';

export function createTmLanguage(): TmLanguage {
  const scopeName: ScopeName = 'autohotkey';
  const startPattern = group(alt(startAnchor(), '\\G'));

  return {
    scopeName: `source.${scopeName}`,
    patterns: [
      { include: '#skip_empty_lines' },
      { include: '#autohotkeynext' },
      { include: '#autohotkey2' },
      { include: '#autohotkeyl' },
      { include: '#default' },
    ],
    repository: {
      skip_empty_lines: {
        begin: seq(startPattern, inlineSpaces0(), endAnchor()),
        while: seq(startPattern, inlineSpaces0(), endAnchor()),
      },
      autohotkeynext: createAutoHotkeyRule('autohotkeynext', {
        startPattern,
        versionPattern: seq(
          ignoreCase('v2'),
          char('.'),
          charRange('1', '9'),
        ),
      }),
      autohotkey2: createAutoHotkeyRule('autohotkey2', {
        startPattern,
        versionPattern: seq(
          ignoreCase('v2'),
          optseq(
            char('.'),
            optional(char('0')),
          ),
        ),
      }),
      autohotkeyl: createAutoHotkeyRule('autohotkeyl', {
        startPattern,
        versionPattern: seq(ignoreCase('v1')),
      }),
      default: createDefaultAutoHotkeyRule('autohotkey2', {
        startPattern,
      }),
    },
  };
}

// #region helpers
interface Placeholder_AutoHotkeyRule {
  startPattern: string;
  versionPattern: string;
}
function createAutoHotkeyRule(scopeName: ScopeName, placeholder: Placeholder_AutoHotkeyRule): Rule {
  return {
    begin: capture(seq(
      placeholder.startPattern,
      inlineSpaces0(),
      ignoreCase('#Requires'),
      inlineSpaces1(),
      optseq(
        ignoreCase('AutoHotkey'),
        inlineSpaces1(),
        placeholder.versionPattern,
        reluctant(anyChars0()),
        optseq(
          inlineSpaces1(),
          capture(seq(
            char(';'),
            anyChars0(),
          )),
        ),
      ),
      endAnchor(),
    )),
    beginCaptures: {
      1: patternsRule(includeScope(scopeName)),
    },
    end: lookahead(seq(
      lookbehind(placeholder.startPattern),
      inlineSpaces0(),
      ignoreCase('#Requires'),
      inlineSpaces1(),
      ignoreCase('AutoHotkey'),
      lookahead(wordBound()),
    )),
    patterns: [ includeScope(scopeName) ],
  };
}
interface Placeholder_DefaultAutoHotkeyRule {
  startPattern: string;
}
function createDefaultAutoHotkeyRule(scopeName: ScopeName, placeholder: Placeholder_DefaultAutoHotkeyRule): Rule {
  return {
    begin: alt(
      capture(seq(
        placeholder.startPattern,
        inlineSpaces0(),
        ignoreCase('#Requires'),
        inlineSpaces1(),
        ignoreCase('AutoHotkey'),
        lookahead(wordBound()),
        anyChars0(),
        endAnchor(),
      )),
      negativeLookahead(seq(
        placeholder.startPattern,
        inlineSpaces0(),
        ignoreCase('#Requires'),
        inlineSpaces1(),
        ignoreCase('AutoHotkey'),
        lookahead(wordBound()),
      )),
    ),
    beginCaptures: {
      1: patternsRule(includeScope(scopeName)),
    },
    end: lookahead(seq(
      placeholder.startPattern,
      inlineSpaces0(),
      ignoreCase('#Requires'),
      inlineSpaces1(),
      ignoreCase('AutoHotkey'),
      lookahead(wordBound()),
    )),
    patterns: [ includeScope(scopeName) ],
  };
}
// #endregion helpers
