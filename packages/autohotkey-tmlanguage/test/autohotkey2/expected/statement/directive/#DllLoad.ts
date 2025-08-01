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
            ${directiveName} ${quote}*i path\\to\\file.exe${quote}      ; comment
          `,
          [
            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: quote, scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '*i', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'path\\to\\file.exe', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: quote, scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    }),
  ];
}
