import { dedent } from '@zero-plusplus/utilities/src';
import { name, RuleName, StyleName, type ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/Control.htm
export function createControlExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'Control';

  return [
    // Parameter 1: SubCommand
    ...((): ExpectedTestData[] => {
      return [
        // Parameter 2: Blank
        ...[ 'Check', 'UnCheck', 'Enable', 'Disable', 'Show', 'Hide', 'ShowDropDown', 'HideDropDown' ].flatMap((subcommand): ExpectedTestData[] => {
          return [
            [
              dedent`
                ${commandName} ${subcommand},,          ; comment
              `,
              [
                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                ${commandName} %var%,,          ; comment
              `,
              [
                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                { text: '%var%', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
                { text: ',', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
                { text: ',', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
          ];
        }),
        // Parameter 2: N
        ...[ 'Style', 'ExStyle' ].flatMap((subcommand): ExpectedTestData[] => {
          return [
            ...[ '+', '-', '^' ].flatMap((operator): ExpectedTestData[] => {
              return [
                [
                  dedent`
                    ${commandName} ${subcommand}, ${operator}0x123          ; comment
                  `,
                  [
                    { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                    { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                    { text: ',', scopes: name(scopeName, RuleName.Comma) },
                    { text: operator, scopes: name(scopeName, RuleName.Operator) },
                    { text: '0x', scopes: name(scopeName, RuleName.Hex, RuleName.HexPrefix) },
                    { text: '123', scopes: name(scopeName, RuleName.Hex, RuleName.HexValue) },
                    { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                  ],
                ],
              ];
            }),
          ];
        }),
      ];
    })(),
  ];
}
