import { dedent } from '@zero-plusplus/utilities/src';
import { name, RuleDescriptor, RuleName, StyleName, type ScopeName } from '../../../../../src/tmlanguage';
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
            [
              dedent`
                ${commandName} ${subcommand}, % var                 ; comment
                ${commandName} ${subcommand}, %var%                 ; comment
                ${commandName} ${subcommand}, %var%var%var%         ; comment
              `,
              [
                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
                { text: 'var', scopes: name(scopeName, RuleName.Variable) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
                { text: 'var', scopes: name(scopeName, RuleName.Variable) },
                { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
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
        }),
        // Parameter 2: Count/N
        ...[ 'TabLeft', 'TabRight', 'Delete', 'Choose' ].flatMap((subcommand): ExpectedTestData[] => {
          return [
            ...[ '+', '-' ].flatMap((operator): ExpectedTestData[] => {
              return [
                [
                  dedent`
                    ${commandName} ${subcommand}, ${operator}123          ; comment
                  `,
                  [
                    { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                    { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                    { text: ',', scopes: name(scopeName, RuleName.Comma) },
                    { text: operator, scopes: name(scopeName, RuleName.Operator) },
                    { text: '123', scopes: name(scopeName, RuleName.Integer) },
                    { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                  ],
                ],
              ];
            }),
            ...[ 'invalid' ].flatMap((param): ExpectedTestData[] => {
              return [
                [
                  dedent`
                    ${commandName} ${subcommand}, ${param}        ; comment
                  `,
                  [
                    { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                    { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                    { text: ',', scopes: name(scopeName, RuleName.Comma) },
                    { text: param, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
                    { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                  ],
                ],
              ];
            }),
            [
              dedent`
                ${commandName} ${subcommand}, % var                 ; comment
                ${commandName} ${subcommand}, %var%                 ; comment
                ${commandName} ${subcommand}, +%var%                 ; comment
                ${commandName} ${subcommand}, -%var%                 ; comment
                ${commandName} ${subcommand}, %var%var%var%         ; comment
              `,
              [
                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
                { text: 'var', scopes: name(scopeName, RuleName.Variable) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
                { text: 'var', scopes: name(scopeName, RuleName.Variable) },
                { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },

                { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '+', scopes: name(scopeName, RuleName.Operator) },
                { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
                { text: 'var', scopes: name(scopeName, RuleName.Variable) },
                { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '-', scopes: name(scopeName, RuleName.Operator) },
                { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
                { text: 'var', scopes: name(scopeName, RuleName.Variable) },
                { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
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
        }),
        // Parameter 2: String
        ...[ 'Add', 'ChooseString', 'EditPaste' ].flatMap((subcommand): ExpectedTestData[] => {
          return [
            [
              dedent`
                ${commandName} ${subcommand}, unquoted              ; comment
                ${commandName} ${subcommand}, abc\`t,               ; comment
              `,
              [
                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: 'abc', scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '`t', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Escape) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                ${commandName} ${subcommand}, % var                 ; comment
                ${commandName} ${subcommand}, %var%                 ; comment
                ${commandName} ${subcommand}, +%var%                ; comment
                ${commandName} ${subcommand}, -%var%                ; comment
                ${commandName} ${subcommand}, %var%var%var%         ; comment
              `,
              [
                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
                { text: 'var', scopes: name(scopeName, RuleName.Variable) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
                { text: 'var', scopes: name(scopeName, RuleName.Variable) },
                { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },

                { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '+', scopes: name(scopeName, RuleName.Operator) },
                { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
                { text: 'var', scopes: name(scopeName, RuleName.Variable) },
                { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
                { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '-', scopes: name(scopeName, RuleName.Operator) },
                { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
                { text: 'var', scopes: name(scopeName, RuleName.Variable) },
                { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
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
        }),
      ];
    })(),

    // Parameter 3: Control
    ...((): ExpectedTestData[] => {
      return [ 'Check' /* , 'UnCheck', 'Enable', 'Disable', 'Show', 'Hide', 'ShowDropDown', 'HideDropDown', 'Style', 'ExStyle', 'TabLeft', 'TabRight', 'Delete', 'Choose', 'Add', 'ChooseString', 'EditPaste' */ ].flatMap((subcommand): ExpectedTestData[] => {
        return [
          [
            dedent`
              ${commandName} ${subcommand},, ahk_id %hwnd%          ; comment
            `,
            [
              { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
              { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: 'ahk_id', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
              { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
              { text: 'hwnd', scopes: name(scopeName, RuleName.Variable) },
              { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ],
          [
            dedent`
              ${commandName} ${subcommand},, i)^[^a](?C123:abc)regexp*          ; comment
            `,
            [
              { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
              { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: 'i)', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpOption) },
              { text: '^', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpAnchor) },
              { text: '[^', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.Begin) },
              { text: 'a', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet) },
              { text: ']', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClassSet, RuleName.RegExpCharacterClass, RuleDescriptor.End) },
              { text: '(?C123', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.Begin) },
              { text: ':', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup) },
              { text: 'abc', scopes: name(scopeName, RuleName.RegExpString, RuleName.FunctionName) },
              { text: ')', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpGroup, RuleDescriptor.End) },
              { text: 'regexp', scopes: name(scopeName, RuleName.RegExpString) },
              { text: '*', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpQuantifier) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ],
          [
            dedent`
              ${commandName} ${subcommand},, % var                 ; comment
              ${commandName} ${subcommand},, %var%                 ; comment
              ${commandName} ${subcommand},, %var%var%var%         ; comment
            `,
            [
              { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
              { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
              { text: 'var', scopes: name(scopeName, RuleName.Variable) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
              { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
              { text: 'var', scopes: name(scopeName, RuleName.Variable) },
              { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
              { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
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
      });
    })(),

    // Parameter 3: WinTitle
    ...((subcommand = 'Check'): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${commandName} ${subcommand},,, ahk_id %hwnd%          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'ahk_id', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'hwnd', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName} ${subcommand},,, % var                 ; comment
            ${commandName} ${subcommand},,, %var%                 ; comment
            ${commandName} ${subcommand},,, %var%var%var%         ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
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
