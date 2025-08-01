import { dedent } from '@zero-plusplus/utilities/src';
import { name, RuleName, StyleName, type ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_Warn.htm
export function createWarnExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#Warn';

  return [
    // Parameter 1: WarningType
    ...((): ExpectedTestData[] => {
      return [
        ...[ 'UseUnsetLocal', 'UseUnsetGlobal', 'UseEnv', 'LocalSameAsGlobal', 'ClassOverwrite', 'Unreachable', 'All' ].flatMap((param): ExpectedTestData[] => {
          return [
            [
              dedent`
                ${directiveName} ${param}        ; comment
                ${directiveName}, ${param}       ; comment
              `,
              [
                { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
                { text: param, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
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
    })(),

    // Parameter 2: WarningMode
    ...((): ExpectedTestData[] => {
      return [
        ...[ 'MsgBox', 'StdOut', 'OutputDebug', 'Off' ].flatMap((param): ExpectedTestData[] => {
          return [
            [
              dedent`
                ${directiveName},, ${param}        ; comment
              `,
              [
                { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: param, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
          ];
        }),
        [
          dedent`
            ${directiveName},, % var                 ; comment
            ${directiveName},, %var%                 ; comment
            ${directiveName},, %var%var%var%         ; comment
          `,
          [
            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
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
    })(),
  ];
}
