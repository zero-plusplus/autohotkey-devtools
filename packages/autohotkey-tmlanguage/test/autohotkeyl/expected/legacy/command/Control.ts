import { dedent } from '@zero-plusplus/utilities/src';
import { name, RuleDescriptor, RuleName, StyleName, type ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $blank } from '../../../../helpers/definition/parameter/$blank';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger';
import { $style } from '../../../../helpers/definition/parameter/$style';
import { $subcommand } from '../../../../helpers/definition/parameter/$subcommand';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/Control.htm
export function createControlExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'Control';

  return [
    // Parameter 1: SubCommand, Parameter 2: Blank
    ...$subcommand(scopeName, [ 'Check', 'UnCheck', 'Enable', 'Disable', 'Show', 'Hide', 'ShowDropDown', 'HideDropDown' ], { name: commandName, index: 0 }),
    ...$blank(scopeName, { name: commandName, index: 1, subcommand: { index: 0, name: 'Check' } }),

    // Parameter 1: SubCommand, Parameter 2: N
    ...$subcommand(scopeName, [ 'Style', 'ExStyle' ], { name: commandName, index: 0 }),
    ...$style(scopeName, { name: commandName, index: 1, subcommand: { index: 0, name: 'Style' } }),

    // Parameter 1: SubCommand, Parameter 2: Count/N
    ...$subcommand(scopeName, [ 'TabLeft', 'TabRight', 'Delete', 'Choose' ], { name: commandName, index: 0 }),
    ...$shouldInteger(scopeName, { name: commandName, index: 1, subcommand: { index: 0, name: 'TabLeft' } }),

    // Parameter 1: SubCommand, Parameter 2: Count/N
    ...$subcommand(scopeName, [ 'Add', 'ChooseString', 'EditPaste' ], { name: commandName, index: 0 }),
    ...$(scopeName, { name: commandName, index: 1, subcommand: { index: 0, name: 'Add' } }),

    // Parameter 3: Control
    ...((subcommand = 'Check'): ExpectedTestData[] => {
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
    })(),

    // Parameter 4: WinTitle
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

    // Parameter 5: WinText
    ...((subcommand = 'Check'): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${commandName} ${subcommand},,,, unquoted,          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName} ${subcommand},,,, % var                 ; comment
            ${commandName} ${subcommand},,,, %var%                 ; comment
            ${commandName} ${subcommand},,,, %var%var%var%         ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
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

    // Parameter 6: ExcludeTitle
    ...((subcommand = 'Check'): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${commandName} ${subcommand},,,,, ahk_id %hwnd%          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
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
            ${commandName} ${subcommand},,,,, % var                 ; comment
            ${commandName} ${subcommand},,,,, %var%                 ; comment
            ${commandName} ${subcommand},,,,, %var%var%var%         ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
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

    // Parameter 7: ExcludeText
    ...((subcommand = 'Check'): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${commandName} ${subcommand},,,,,, unquoted,          ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted,', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${commandName} ${subcommand},,,,,, % var                 ; comment
            ${commandName} ${subcommand},,,,,, %var%                 ; comment
            ${commandName} ${subcommand},,,,,, %var%var%var%         ; comment
          `,
          [
            { text: commandName, scopes: name(scopeName, RuleName.CommandName) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
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
