import { dedent } from '@zero-plusplus/utilities/src';
import { name, RuleName, StyleName, type ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/AutoTrim.htm
export function createAutoTrimExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'AutoTrim';

  return [
    // Parameter 1: OnOff
    ...((): ExpectedTestData[] => {
      return [
        ...[ 'On', 'Off', '0', '1' ].flatMap((param): ExpectedTestData[] => {
          return [
            [
              dedent`
                ${commandName} ${param}        ; comment
                ${commandName}, ${param}       ; comment
              `,
              [
                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                { text: param, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: param, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
          ];
        }),
        ...[ 'invalid' ].flatMap((param): ExpectedTestData[] => {
          return [
            [
              dedent`
                ${commandName} ${param}        ; comment
              `,
              [
                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                { text: param, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
          ];
        }),
        [
          dedent`
            ${commandName}, % var                 ; comment
            ${commandName}, %var%                 ; comment
            ${commandName}, %var%var%var%         ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
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
