import { Repository, RuleName } from '../constants';
import type { BeginWhileRule, ScopeName, TmLanguage } from '../types';
import { createUtilities } from '../utils';

export function createTmLanguage(): TmLanguage {
  const scopeName: ScopeName = 'autohotkey';
  const { nameRule, includeScope } = createUtilities(scopeName);

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
        begin: '^\\s*$',
        while: '^\\s*$',
      },
      autohotkeynext_explicit: {
        begin: '(?i)^\\s*(#Requires) (AutoHotkey v2\\.1.*)$',
        beginCaptures: {
          1: nameRule(Repository.DirecitiveStatement, RuleName.DirectiveName, RuleName.Emphasis),
          2: nameRule(Repository.DirecitiveStatement, RuleName.LegacyText, RuleName.Emphasis),
        },
        while: '^(?!\\s*#Requires)',
        patterns: [ includeScope('autohotkeynext') ],
      },
      autohotkey2_explicit: {
        begin: '(?i)^\\s*(#Requires) (AutoHotkey v2.*)$',
        beginCaptures: {
          1: nameRule(Repository.DirecitiveStatement, RuleName.DirectiveName, RuleName.Emphasis),
          2: nameRule(Repository.DirecitiveStatement, RuleName.LegacyText, RuleName.Emphasis),
        },
        while: '^(?!\\s*#Requires)',
        patterns: [ includeScope('autohotkey2') ],
      },
      autohotkey2_implicit: {
        begin: '(?i)\\s*^(?!#Requires)',
        while: '^(?!\\s*#Requires)',
        patterns: [ includeScope('autohotkey2') ],
      },
      autohotkeyl_explicit: ((): BeginWhileRule => {
        return {
          begin: '(?i)^\\s*(#Requires) (AutoHotkey v1.*)$',
          beginCaptures: {
            1: nameRule(Repository.DirecitiveStatement, RuleName.DirectiveName, RuleName.Emphasis),
            2: nameRule(Repository.DirecitiveStatement, RuleName.LegacyText, RuleName.Emphasis),
          },
          while: '^(?!\\s*#Requires)',
          patterns: [ includeScope('autohotkeyl') ],
        };
      })(),
    },
  };
}
