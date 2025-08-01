import { dedent } from '@zero-plusplus/utilities/src';
import { name, RuleName, type ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_KeyHistory.htm
export function createKeyHistoryExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#KeyHistory';

  return [
    ...[ '0', '50', '500' ].map((param): ExpectedTestData => {
      return [
        dedent`
          ${directiveName} ${param}        ; comment
          ${directiveName}, ${param}       ; comment
        `,
        [
          { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
          { text: param, scopes: name(scopeName, RuleName.Integer) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

          { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
          { text: param, scopes: name(scopeName, RuleName.Integer) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
        ],
      ];
    }),
    // Allow values outside the range
    [
      dedent`
        ${directiveName}, -10       ; comment
        ${directiveName}, 501       ; comment
      `,
      [
        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '-', scopes: name(scopeName, RuleName.Operator) },
        { text: '10', scopes: name(scopeName, RuleName.Integer) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '501', scopes: name(scopeName, RuleName.Integer) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
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
