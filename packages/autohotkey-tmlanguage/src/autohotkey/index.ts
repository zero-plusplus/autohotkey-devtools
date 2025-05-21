import * as constants_v2 from '../autohotkey2/constants';
import * as constants_v1 from '../autohotkeyl/constants';
import {
  alt, anyChars0, capture, char, charRange, endAnchor, escapeOnigurumaTexts, group, ignoreCase, inlineSpaces0,
  inlineSpaces1, lookahead, lookbehind, negativeLookahead, optional, optseq, ordalt, reluctant, seq, startAnchor,
} from '../oniguruma';
import type { Rule, ScopeName, TmLanguage } from '../types';
import { includeScope, patternsRule } from '../utils';

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
        expressionOperators: constants_v2.expressionOperators,
        versionPattern: seq(
          ignoreCase('v2'),
          char('.'),
          charRange('1', '9'),
        ),
      }),
      autohotkey2: createAutoHotkeyRule('autohotkey2', {
        startPattern,
        expressionOperators: constants_v2.expressionOperators,
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
        expressionOperators: constants_v1.expressionOperators,
        versionPattern: seq(ignoreCase('v1')),
      }),
      default: createDefaultAutoHotkeyRule('autohotkey2', {
        startPattern,
        expressionOperators: constants_v2.expressionOperators,
      }),
    },
  };
}

// #region helpers
interface Placeholder_AutoHotkeyRule {
  startPattern: string;
  expressionOperators: readonly string[];
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
      negativeLookahead(ordalt(...escapeOnigurumaTexts(placeholder.expressionOperators))),
    )),
    patterns: [ includeScope(scopeName) ],
  };
}
interface Placeholder_DefaultAutoHotkeyRule {
  startPattern: string;
  expressionOperators: readonly string[];
}
function createDefaultAutoHotkeyRule(scopeName: ScopeName, placeholder: Placeholder_DefaultAutoHotkeyRule): Rule {
  return {
    begin: alt(
      capture(seq(
        placeholder.startPattern,
        inlineSpaces0(),
        ignoreCase('#Requires'),
        inlineSpaces1(),
        negativeLookahead(ordalt(...escapeOnigurumaTexts(placeholder.expressionOperators))),
        anyChars0(),
        endAnchor(),
      )),
      negativeLookahead(seq(
        placeholder.startPattern,
        inlineSpaces0(),
        ignoreCase('#Requires'),
        inlineSpaces1(),
        ignoreCase('AutoHotkey'),
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
    )),
    patterns: [ includeScope(scopeName) ],
  };
}
// #endregion helpers
