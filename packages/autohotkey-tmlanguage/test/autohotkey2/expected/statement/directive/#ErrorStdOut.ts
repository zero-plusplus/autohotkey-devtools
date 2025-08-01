import { dedent } from '@zero-plusplus/utilities/src';
import { name, RuleName, StyleName, type ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v2/lib/_ErrorStdOut.htm
export function createErrorStdOutExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#ErrorStdOut';

  return [
    ...[ '"', `'` ].flatMap((quote): ExpectedTestData[] => {
      return [ 'UTF-8', 'CP65001' ].flatMap((keyword): ExpectedTestData[] => {
        return [
          [
            dedent`
              ${directiveName} ${quote}${keyword}${quote}      ; comment
            `,
            [
              { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
              { text: quote, scopes: name(scopeName, RuleName.UnquotedString) },
              { text: keyword, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
              { text: quote, scopes: name(scopeName, RuleName.UnquotedString) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ],
        ];
      });
    }),
    [
      dedent`
        ${directiveName} UTF-8                    ; comment
        ${directiveName} %var%                    ; comment
        ${directiveName} %var%var%var%            ; comment
      `,
      [
        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: 'UTF-8', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}
