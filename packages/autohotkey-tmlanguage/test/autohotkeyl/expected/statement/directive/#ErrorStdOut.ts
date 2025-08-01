import { dedent } from '@zero-plusplus/utilities/src';
import { name, RuleName, StyleName, type ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_ErrorStdOut.htm
export function createErrorStdOutExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#ErrorStdOut';

  return [
    [
      dedent`
        ${directiveName} x          ; comment
        ${directiveName}, x         ; comment
      `,
      [
        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: 'x', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'x', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    ...[ 'UTF-8', 'CP65001' ].flatMap((param): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${directiveName} ${param}        ; comment
          `,
          [
            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: param, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    }),
    [
      dedent`
        ${directiveName}, % var                 ; comment
        ${directiveName}, %var%                 ; comment
        ${directiveName}, %var%var%var%         ; comment
      `,
      [
        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
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
