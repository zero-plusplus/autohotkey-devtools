import { dedent } from '@zero-plusplus/utilities/src';
import { name, RuleName, StyleName, type ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v2/lib/_DllLoad.htm
export function createDllLoadExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#DllLoad';

  return [
    ...[ '"', `'` ].flatMap((quote): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${directiveName} ${quote}*i path\\to\\file.dll${quote}      ; comment
          `,
          [
            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: quote, scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '*i', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'path\\to\\file.dll', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: quote, scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    }),
    [
      dedent`
        ${directiveName} path\\to.dll                       ; comment
        ${directiveName} %var%\\path\\to.dll                ; comment
        ${directiveName} %var%var%var%\\path\\to.dll        ; comment
      `,
      [
        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: 'path\\to.dll', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '\\path\\to.dll', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '\\path\\to.dll', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}
