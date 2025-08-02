import { dedent, isIntegerLike } from '@zero-plusplus/utilities/src';
import { name, RuleName, StyleName, type ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData, ParsedResult } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/Click.htm
export function createClickExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'Click';

  return [
    // Parameter 1: Options
    ...((): ExpectedTestData[] => {
      return [
        ...[
          [ '2' ],
          [ '100', '200', 'Left' ],
          [ '100', '200', 'L' ],
          [ '100', '200', 'Right' ],
          [ '100', '200', 'R' ],
          [ '100', '200', 'Middle' ],
          [ '100', '200', 'M' ],
          [ '100', '200', 'X1' ],
          [ '100', '200', 'X2' ],
          [ '100', '200', 'Up' ],
          [ '100', '200', 'U' ],
          [ '100', '200', 'Down' ],
          [ '100', '200', 'D' ],
          [ '100', '200', '0' ],
          [ '100', '200', 'Relative' ],
        ].flatMap((options): ExpectedTestData[] => {
          return [
            [
              dedent`
                ${commandName}, ${options.join(' ')}       ; comment
              `,
              [
                { text: 'Click', scopes: name(scopeName, RuleName.CommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                ...options.map((option): ParsedResult => {
                  return isIntegerLike(option)
                    ? { text: option, scopes: name(scopeName, RuleName.Integer) }
                    : { text: option, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) };
                }),
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
