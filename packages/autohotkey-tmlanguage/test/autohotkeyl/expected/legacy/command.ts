import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName, StyleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData, ParsedResult } from '../../../types';

export function createCommandStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // https://www.autohotkey.com/docs/v1/lib/Control.htm
    [
      dedent`
        Control, Check, blank, control id         ; comment
        Control, UnCheck, blank, control id       ; comment
        Control, Enable, blank, control id        ; comment
        Control, Disable, blank, control id       ; comment
        Control, Show, blank, control id          ; comment
        Control, Hide, blank, control id          ; comment
        Control, ShowDropDown, blank, control id  ; comment
        Control, HideDropDown, blank, control id  ; comment

        Control, Style, abc, control id           ; comment
        Control, ExStyle, abc, control id         ; comment

        Control, TabLeft, abc, control id         ; comment
        Control, TabRight, abc, control id        ; comment
        Control, Add, abc, control id             ; comment
        Control, Delete, abc, control id          ; comment
        Control, Choose, abc, control id          ; comment
        Control, ChooseString, abc, control id    ; comment
        Control, EditPaste, abc, control id       ; comment

        Control, XXX, blank, control id           ; comment
      `,
      [
        ...[ 'Check', 'UnCheck', 'Enable', 'Disable', 'Show', 'Hide', 'ShowDropDown', 'HideDropDown' ].flatMap((subcommand): ParsedResult[] => {
          return [
            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'blank', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'control id', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        ...[ 'Style', 'ExStyle' ].flatMap((subcommand) => {
          return [
            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'abc', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'control id', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        ...[ 'TabLeft', 'TabRight', 'Add', 'Delete', 'Choose', 'ChooseString', 'EditPaste' ].flatMap((subcommand) => {
          return [
            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'abc', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'control id', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'XXX', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'blank', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'control id', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],

    // https://www.autohotkey.com/docs/v1/lib/ControlGet.htm
    [
      dedent`
        ControlGet, output, List, Selected, control id ; comment

        ControlGet, output, Checked, blank, control id      ; comment
        ControlGet, output, Enabled, blank, control id      ; comment
        ControlGet, output, Visible, blank, control id      ; comment
        ControlGet, output, Tab, blank, control id          ; comment
        ControlGet, output, Choice, blank, control id       ; comment
        ControlGet, output, LineCount, blank, control id    ; comment
        ControlGet, output, CurrentLine, blank, control id  ; comment
        ControlGet, output, CurrentCol, blank, control id   ; comment
        ControlGet, output, Selected, blank, control id     ; comment
        ControlGet, output, Style, blank, control id        ; comment
        ControlGet, output, ExStyle, blank, control id      ; comment
        ControlGet, output, Hwnd, blank, control id         ; comment
      `,
      [
        { text: 'ControlGet', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'output', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'List', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Selected', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'control id', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        ...[ 'Checked', 'Enabled', 'Visible', 'Tab', 'Choice', 'LineCount', 'CurrentLine', 'CurrentCol', 'Selected', 'Style', 'ExStyle', 'Hwnd' ].flatMap((subcommand) => {
          return [
            { text: 'ControlGet', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'output', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'blank', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'control id', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),
      ],
    ],

    // https://www.autohotkey.com/docs/v1/lib/Drive.htm
    [
      dedent`
        Drive, Label, C:, Z:  ; comment
        Drive, Lock, C:       ; comment
        Drive, UnLock, C:     ; comment
        Drive, Eject, C:, 1   ; comment
      `,
      [
        { text: 'Drive', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Label', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'C:', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Z:', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Drive', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Lock', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'C:', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Drive', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'UnLock', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'C:', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Drive', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Eject', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'C:', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],

    // https://www.autohotkey.com/docs/v1/lib/DriveGet.htm
    [
      dedent`
        DriveGet, output, List, CDROM           ; comment
        DriveGet, output, Capacity, \\path\\to  ; comment
        DriveGet, output, Cap, \\path\\to       ; comment
        DriveGet, output, FileSystem, C:        ; comment
        DriveGet, output, FS, C:                ; comment
        DriveGet, output, Label, C:             ; comment
        DriveGet, output, Serial, C:            ; comment
        DriveGet, output, Type, \\path\\to      ; comment
        DriveGet, output, Status, \\path\\to    ; comment
        DriveGet, output, StatusCD, C:          ; comment
      `,
      [
        { text: 'DriveGet', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'output', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'List', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'CDROM', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        ...[ 'Capacity', 'Cap' ].flatMap((subcommand) => {
          return [
            { text: 'DriveGet', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'output', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '\\path\\to', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),
        ...[ 'FileSystem', 'FS' ].flatMap((subcommand) => {
          return [
            { text: 'DriveGet', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'output', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'C:', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        { text: 'DriveGet', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'output', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Label', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'C:', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'DriveGet', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'output', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Serial', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'C:', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'DriveGet', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'output', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Type', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '\\path\\to', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'DriveGet', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'output', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Status', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '\\path\\to', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'DriveGet', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'output', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'StatusCD', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'C:', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}
