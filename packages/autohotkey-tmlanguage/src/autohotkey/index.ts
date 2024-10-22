import { Repository, RuleName } from '../constants';
import { anyChars0, capture, char, charRange, endAnchor, ignoreCase, inlineSpaces0, inlineSpaces1, negativeLookahead, seq, startAnchor } from '../oniguruma';
import type { BeginWhileRule, ScopeName, TmLanguage } from '../types';
import { createUtilities } from '../utils';

export function createTmLanguage(): TmLanguage {
  const scopeName: ScopeName = 'autohotkey';
  const { nameRule, includeScope } = createUtilities(scopeName);

  const requiresKeyword = ignoreCase('#Requires');
  const minVersion_2_1 = seq(
    ignoreCase('AutoHotkey'),
    inlineSpaces1(),
    ignoreCase('v2'),
    char('.'),
    charRange('1', '9'),
    anyChars0(),
  );
  const version_2_x = seq(
    ignoreCase('AutoHotkey'),
    inlineSpaces1(),
    ignoreCase('v2'),
    char('.'),
    anyChars0(),
  );
  const version_1_x = seq(
    ignoreCase('AutoHotkey'),
    inlineSpaces1(),
    capture(ignoreCase('v1')),
    char('.'),
    anyChars0(),
  );

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
        begin: seq(
          startAnchor(),
          inlineSpaces0(),
          capture(requiresKeyword),
          inlineSpaces1(),
          capture(minVersion_2_1),
          endAnchor(),
        ),
        beginCaptures: {
          1: nameRule(Repository.DirecitiveStatement, RuleName.DirectiveName, RuleName.Emphasis),
          2: nameRule(Repository.DirecitiveStatement, RuleName.LegacyText, RuleName.Emphasis),
        },
        while: seq(
          startAnchor(),
          negativeLookahead(seq(
            inlineSpaces0(),
            requiresKeyword,
          )),
        ),
        patterns: [ includeScope('autohotkeynext') ],
      },
      autohotkey2_explicit: {
        begin: seq(
          startAnchor(),
          capture(requiresKeyword),
          inlineSpaces1(),
          capture(version_2_x),
          endAnchor(),
        ),
        beginCaptures: {
          1: nameRule(Repository.DirecitiveStatement, RuleName.DirectiveName, RuleName.Emphasis),
          2: nameRule(Repository.DirecitiveStatement, RuleName.LegacyText, RuleName.Emphasis),
        },
        while: seq(
          startAnchor(),
          negativeLookahead(seq(
            inlineSpaces0(),
            requiresKeyword,
          )),
        ),
        patterns: [ includeScope('autohotkey2') ],
      },
      autohotkey2_implicit: {
        begin: seq(
          startAnchor(),
          inlineSpaces0(),
          negativeLookahead(requiresKeyword),
        ),
        while: seq(
          startAnchor(),
          negativeLookahead(seq(
            inlineSpaces0(),
            requiresKeyword,
          )),
        ),
        patterns: [ includeScope('autohotkey2') ],
      },
      autohotkeyl_explicit: ((): BeginWhileRule => {
        return {
          begin: seq(
            startAnchor(),
            inlineSpaces0(),
            capture(requiresKeyword),
            inlineSpaces1(),
            capture(version_1_x),
            endAnchor(),
          ),
          beginCaptures: {
            1: nameRule(Repository.DirecitiveStatement, RuleName.DirectiveName, RuleName.Emphasis),
            2: nameRule(Repository.DirecitiveStatement, RuleName.LegacyText, RuleName.Emphasis),
          },
          while: seq(
            startAnchor(),
            negativeLookahead(seq(
              inlineSpaces0(),
              requiresKeyword,
            )),
          ),
          patterns: [ includeScope('autohotkeyl') ],
        };
      })(),
    },
  };
}
