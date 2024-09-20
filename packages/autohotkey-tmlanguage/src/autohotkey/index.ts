import { BeginWhileRule, RuleName, ScopeName, TmLanguage } from '../types';

export function createTmLanguage(): TmLanguage {
  const scopeName: ScopeName = 'autohotkey';
  // const utils = createUtilities(scopeName);
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
        begin: '(?i)^(#Requires) (AutoHotkey v2\\.1.*)$',
        beginCaptures: {
          1: { name: 'emphasis meta.preprocessor' },
          2: { name: `emphasis ${RuleName.DoubleString}` },
        },
        while: '(.*)',
        whileCaptures: {
          1: {
            patterns: [ { include: 'source.autohotkeynext' } ],
          },
        },
        patterns: [ { include: 'source.autohotkeynext' } ],
      },
      autohotkey2_explicit: {
        begin: '(?i)^(#Requires) (AutoHotkey v2.*)$',
        beginCaptures: {
          1: { name: 'emphasis meta.preprocessor' },
          2: { name: `emphasis ${RuleName.DoubleString}` },
        },
        while: '(.*)',
        whileCaptures: {
          1: {
            patterns: [ { include: 'source.autohotkey2' } ],
          },
        },
        patterns: [ { include: 'source.autohotkey2' } ],
      },
      autohotkey2_implicit: {
        begin: '(?i)^(?!#Requires)',
        while: '(.*)',
        whileCaptures: {
          1: {
            patterns: [ { include: 'source.autohotkey2' } ],
          },
        },
        patterns: [ { include: 'source.autohotkey2' } ],
      },
      autohotkeyl_explicit: ((): BeginWhileRule => {
        return {
          begin: '(?i)^(#Requires) (AutoHotkey v1.*)$',
          beginCaptures: {
            1: { name: 'emphasis meta.preprocessor' },
            2: { name: `emphasis ${RuleName.DoubleString}` },
          },
          while: '(.*)',
          whileCaptures: {
            1: {
              patterns: [ { include: 'source.autohotkeyl' } ],
            },
          },
          patterns: [ { include: 'source.autohotkeyl' } ],
        };
      })(),
    },
  };
}
