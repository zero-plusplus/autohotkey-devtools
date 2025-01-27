import { alt, anyChars0, capture, char, charRange, endAnchor, group, ignoreCase, inlineSpace, inlineSpaces0, inlineSpaces1, keyword, lookahead, negativeLookahead, ordalt, seq, startAnchor } from '../oniguruma';
import type { ScopeName, TmLanguage } from '../types';
import { includeScope, patternsRule } from '../utils';

export function createTmLanguage(): TmLanguage {
  const scopeName: ScopeName = 'autohotkey';
  const endPattern: string = lookahead(seq(
    startAnchor(),
    inlineSpaces0(),
    ignoreCase(ordalt('#Requires', '#Module')),
    group(alt(
      inlineSpace(),
      char(','),
      endAnchor(),
    )),
  ));

  return {
    scopeName: `source.${scopeName}`,
    patterns: [
      { include: '#skip_empty_lines' },
      { include: '#autohotkeyl_explicit' },
      { include: '#autohotkeynext_explicit' },
      { include: '#autohotkey2_explicit' },
      { include: '#autohotkey2_implicit' },
    ],
    repository: {
      skip_empty_lines: {
        begin: seq(startAnchor(), inlineSpaces0(), endAnchor()),
        while: seq(startAnchor(), inlineSpaces0(), endAnchor()),
      },
      autohotkeynext_explicit: {
        begin: capture(alt(
          group(seq(
            startAnchor(),
            inlineSpaces0(),
            ignoreCase('#Module'),
            lookahead(alt(
              inlineSpace(),
              char(','),
              endAnchor(),
            )),
            anyChars0(),
            endAnchor(),
          )),
          group(seq(
            startAnchor(),
            inlineSpaces0(),
            ignoreCase('#Requires'),
            lookahead(alt(
              inlineSpace(),
              char(','),
              endAnchor(),
            )),
            inlineSpaces1(),
            ignoreCase('AutoHotkey'),
            inlineSpaces1(),
            ignoreCase('v2'),
            char('.'),
            charRange('1', '9'),
            anyChars0(),
            endAnchor(),
          )),
        )),
        beginCaptures: {
          1: patternsRule(includeScope('autohotkeynext')),
        },
        end: endPattern,
        patterns: [ includeScope('autohotkeynext') ],
      },
      autohotkey2_explicit: {
        begin: capture(seq(
          startAnchor(),
          inlineSpaces0(),
          ignoreCase('#Requires'),
          lookahead(alt(
            inlineSpace(),
            char(','),
            endAnchor(),
          )),
          inlineSpaces1(),
          ignoreCase('AutoHotkey'),
          inlineSpaces1(),
          ignoreCase('v2'),
          char('.'),
          char('0'),
          anyChars0(),
          endAnchor(),
        )),
        beginCaptures: {
          1: patternsRule(includeScope('autohotkey2')),
        },
        end: endPattern,
        patterns: [ includeScope('autohotkey2') ],
      },
      autohotkey2_implicit: {
        begin: alt(
          capture(seq(
            startAnchor(),
            inlineSpaces0(),
            ignoreCase('#Requires'),
            lookahead(alt(
              inlineSpace(),
              char(','),
              endAnchor(),
            )),
            anyChars0(),
            endAnchor(),
          )),
          lookahead(seq(
            startAnchor(),
            inlineSpaces0(),
            negativeLookahead(keyword('#Requires')),
          )),
        ),
        beginCaptures: {
          1: patternsRule(includeScope('autohotkey2')),
        },
        end: endPattern,
        patterns: [ includeScope('autohotkey2') ],
      },
      autohotkeyl_explicit: {
        begin: capture(seq(
          startAnchor(),
          inlineSpaces0(),
          ignoreCase('#Requires'),
          lookahead(alt(
            inlineSpace(),
            char(','),
            endAnchor(),
          )),
          inlineSpaces1(),
          ignoreCase('AutoHotkey'),
          inlineSpaces1(),
          ignoreCase('v1'),
          anyChars0(),
          endAnchor(),
        )),
        beginCaptures: {
          1: patternsRule(includeScope('autohotkeyl')),
        },
        end: endPattern,
        patterns: [ includeScope('autohotkeyl') ],
      },
    },
  };
}
