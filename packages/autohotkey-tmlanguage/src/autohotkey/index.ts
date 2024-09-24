import { BeginWhileRule, RuleName, ScopeName, TmLanguage } from '../types';
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
          1: nameRule(RuleName.Emphasis, RuleName.Directive),
          2: nameRule(RuleName.Emphasis, RuleName.LegacyExpressionContent),
        },
        while: '(.*)',
        whileCaptures: {
          1: {
            patterns: [ includeScope('autohotkeynext') ],
          },
        },
        patterns: [ includeScope('autohotkeynext') ],
      },
      autohotkey2_explicit: {
        begin: '(?i)^\\s*(#Requires) (AutoHotkey v2.*)$',
        beginCaptures: {
          1: nameRule(RuleName.Emphasis, RuleName.Directive),
          2: nameRule(RuleName.Emphasis, RuleName.LegacyExpressionContent),
        },
        while: '(.*)',
        whileCaptures: {
          1: {
            patterns: [ includeScope('autohotkey2') ],
          },
        },
        patterns: [ includeScope('autohotkey2') ],
      },
      autohotkey2_implicit: {
        begin: '(?i)\\s*^(?!#Requires)',
        while: '(.*)',
        whileCaptures: {
          1: {
            patterns: [ includeScope('autohotkey2') ],
          },
        },
        patterns: [ includeScope('autohotkey2') ],
      },
      autohotkeyl_explicit: ((): BeginWhileRule => {
        return {
          begin: '(?i)^\\s*(#Requires) (AutoHotkey v1.*)$',
          beginCaptures: {
            1: nameRule(RuleName.Emphasis, RuleName.Directive),
            2: nameRule(RuleName.Emphasis, RuleName.LegacyExpressionContent),
          },
          while: '(.*)',
          whileCaptures: {
            1: {
              patterns: [ includeScope('autohotkeyl') ],
            },
          },
          patterns: [ includeScope('autohotkeyl') ],
        };
      })(),
    },
  };
}
