import { alt, char, charRange, endAnchor, ignoreCase, inlineSpace, inlineSpaces0, inlineSpaces1, keyword, lookahead, negativeLookahead, seq, startAnchor } from '../oniguruma';
import type { ScopeName, TmLanguage } from '../types';
import { includeScope } from '../utils';

export function createTmLanguage(): TmLanguage {
  const scopeName: ScopeName = 'autohotkey';

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
        begin: alt(
          lookahead(seq(ignoreCase('#Module'), alt(inlineSpace(), endAnchor()))),
          lookahead((seq(
            startAnchor(),
            inlineSpaces0(),
            ignoreCase('#Requires'),
            inlineSpaces1(),
            ignoreCase('AutoHotkey'),
            inlineSpaces1(),
            ignoreCase('v2'),
            char('.'),
            charRange('1', '9'),
          ))),
        ),
        while: seq(
          startAnchor(),
          negativeLookahead(seq(
            inlineSpaces0(),
            ignoreCase('#Requires'),
            alt(
              inlineSpace(),
              endAnchor(),
            ),
          )),
        ),
        patterns: [ includeScope('autohotkeynext') ],
      },
      autohotkey2_explicit: {
        begin: lookahead(seq(
          startAnchor(),
          inlineSpaces0(),
          ignoreCase('#Requires'),
          inlineSpaces1(),
          ignoreCase('AutoHotkey'),
          inlineSpaces1(),
          ignoreCase('v2'),
          char('.'),
          char('0'),
        )),
        while: seq(
          startAnchor(),
          negativeLookahead(seq(
            inlineSpaces0(),
            ignoreCase('#Requires'),
            alt(
              inlineSpace(),
              endAnchor(),
            ),
          )),
        ),
        patterns: [ includeScope('autohotkey2') ],
      },
      autohotkey2_implicit: {
        begin: seq(
          startAnchor(),
          inlineSpaces0(),
          negativeLookahead(keyword('#Requires')),
        ),
        while: seq(
          startAnchor(),
          negativeLookahead(seq(
            inlineSpaces0(),
            keyword('#Requires'),
          )),
        ),
        patterns: [ includeScope('autohotkey2') ],
      },
      autohotkeyl_explicit: {
        begin: lookahead(seq(
          startAnchor(),
          inlineSpaces0(),
          ignoreCase('#Requires'),
          inlineSpaces1(),
          ignoreCase('AutoHotkey'),
          inlineSpaces1(),
          ignoreCase('v1'),
        )),
        while: seq(
          startAnchor(),
          negativeLookahead(seq(
            inlineSpaces0(),
            ignoreCase('#Requires'),
            alt(
              inlineSpace(),
              endAnchor(),
            ),
          )),
        ),
        patterns: [ includeScope('autohotkeyl') ],
      },
    },
  };
}
