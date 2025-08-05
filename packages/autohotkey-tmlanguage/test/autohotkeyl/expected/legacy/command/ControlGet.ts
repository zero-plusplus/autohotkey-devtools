import { dedent } from '@zero-plusplus/utilities/src';
import { name, RuleName, StyleName, type ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/ControlGet.htm
export function createControlGetExpectedDataList(scopeName: ScopeName, commandName = 'ControlGet'): ExpectedTestData[] {
  return [
    // Parameter 1: Control
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${commandName} output          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: 'output', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName} f()          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: 'f', scopes: name(scopeName, RuleName.Variable) },
            { text: '()', scopes: name(scopeName, RuleName.Variable, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName}, %output%           ; comment
            ${commandName}, %ou%t%put%         ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'output', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'ou', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 't', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: 'put', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName} % output          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: '% output', scopes: name(scopeName, RuleName.PercentExpressionBegin, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // Parameter 2: SubCommand
    ...((): ExpectedTestData[] => {
      return [
        ...((subcommand = 'List'): ExpectedTestData[] => {
          return [
            [
              dedent`
                ${commandName},, ${subcommand}          ; comment
              `,
              [
                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],

            // Parameter 3: Options
            ...((options = [ 'Selected', 'Focused', 'Col', 'Count' ]): ExpectedTestData[] => {
              return [
                [
                  dedent`
                    ${commandName},, ${subcommand}, ${options.join(' ')}          ; comment
                  `,
                  [
                    { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                    { text: ',', scopes: name(scopeName, RuleName.Comma) },
                    { text: ',', scopes: name(scopeName, RuleName.Comma) },
                    { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                    { text: ',', scopes: name(scopeName, RuleName.Comma) },
                    ...options.map(((option) => ({ text: option, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) }))),
                    { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                  ],
                ],
                [
                  dedent`
                    ${commandName},, ${subcommand}, invalid          ; comment
                  `,
                  [
                    { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                    { text: ',', scopes: name(scopeName, RuleName.Comma) },
                    { text: ',', scopes: name(scopeName, RuleName.Comma) },
                    { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                    { text: ',', scopes: name(scopeName, RuleName.Comma) },
                    { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
                    { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                  ],
                ],
                [
                  dedent`
                    ${commandName},, ${subcommand}, % var                 ; comment
                    ${commandName},, ${subcommand}, %var%                 ; comment
                    ${commandName},, ${subcommand}, %var%var%var%         ; comment
                  `,
                  [
                    { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                    { text: ',', scopes: name(scopeName, RuleName.Comma) },
                    { text: ',', scopes: name(scopeName, RuleName.Comma) },
                    { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                    { text: ',', scopes: name(scopeName, RuleName.Comma) },
                    { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
                    { text: 'var', scopes: name(scopeName, RuleName.Variable) },
                    { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                    { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                    { text: ',', scopes: name(scopeName, RuleName.Comma) },
                    { text: ',', scopes: name(scopeName, RuleName.Comma) },
                    { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                    { text: ',', scopes: name(scopeName, RuleName.Comma) },
                    { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
                    { text: 'var', scopes: name(scopeName, RuleName.Variable) },
                    { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
                    { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                    { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                    { text: ',', scopes: name(scopeName, RuleName.Comma) },
                    { text: ',', scopes: name(scopeName, RuleName.Comma) },
                    { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
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
        })(),
      ];
    })(),
  ];
}
