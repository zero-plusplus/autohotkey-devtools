import { dedent } from '@zero-plusplus/utilities/src';
import {
  blank, control, expression, fileAttributes, flagedGuiControlOptions, guiControlOptions, guiOptions, keywordOnly,
  onOff, output, restParams, sendKeys, unquoted, winTitle,
} from '../../../../src/autohotkeyl/definitions';
import {
  name, RuleDescriptor, RuleName, StyleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData, ParsedResult } from '../../../types';

export function createCommandStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // #region signatures
    // https://www.autohotkey.com/docs/v1/lib/Control.htm
    [
      dedent`
        Control, Check, blank, control-id             ; comment
        Control, UnCheck, blank, control-id           ; comment
        Control, Enable, blank, control-id            ; comment
        Control, Disable, blank, control-id           ; comment
        Control, Show, blank, control-id              ; comment
        Control, Hide, blank, control-id              ; comment
        Control, ShowDropDown, blank, control-id      ; comment
        Control, HideDropDown, blank, control-id      ; comment

        Control, Style, +0x123, control-id            ; comment
        Control, ExStyle, +0x123, control-id          ; comment

        Control, TabLeft, unquoted, control-id        ; comment
        Control, TabRight, unquoted, control-id       ; comment
        Control, Add, unquoted, control-id            ; comment
        Control, Delete, unquoted, control-id         ; comment
        Control, Choose, unquoted, control-id         ; comment
        Control, ChooseString, unquoted, control-id   ; comment
        Control, EditPaste, unquoted, control-id      ; comment

        Control, unquoted, blank, control-id          ; comment
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
            { text: 'control-id', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        ...[ 'Style', 'ExStyle' ].flatMap((subcommand) => {
          return [
            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '+', scopes: name(scopeName, RuleName.Operator) },
            { text: '0x', scopes: name(scopeName, RuleName.Hex, RuleName.HexPrefix) },
            { text: '123', scopes: name(scopeName, RuleName.Hex, RuleName.HexValue) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'control-id', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        ...[ 'TabLeft', 'TabRight', 'Add', 'Delete', 'Choose', 'ChooseString', 'EditPaste' ].flatMap((subcommand) => {
          return [
            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'control-id', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'blank', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'control-id', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],

    // https://www.autohotkey.com/docs/v1/lib/ControlGet.htm
    [
      dedent`
        ControlGet, output, List, Selected, control-id      ; comment

        ControlGet, output, Checked, blank, control-id      ; comment
        ControlGet, output, Enabled, blank, control-id      ; comment
        ControlGet, output, Visible, blank, control-id      ; comment
        ControlGet, output, Tab, blank, control-id          ; comment
        ControlGet, output, Choice, blank, control-id       ; comment
        ControlGet, output, LineCount, blank, control-id    ; comment
        ControlGet, output, CurrentLine, blank, control-id  ; comment
        ControlGet, output, CurrentCol, blank, control-id   ; comment
        ControlGet, output, Selected, blank, control-id     ; comment
        ControlGet, output, Style, blank, control-id        ; comment
        ControlGet, output, ExStyle, blank, control-id      ; comment
        ControlGet, output, Hwnd, blank, control-id         ; comment

        ControlGet, output, XXX, blank, control-id          ; comment
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
        { text: 'control-id', scopes: name(scopeName, RuleName.UnquotedString) },
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
            { text: 'control-id', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        { text: 'ControlGet', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'output', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'XXX', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'blank', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'control-id', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],

    // https://www.autohotkey.com/docs/v1/lib/Drive.htm
    [
      dedent`
        Drive, Label, C:, Z:  ; comment
        Drive, Lock, C:       ; comment
        Drive, UnLock, C:     ; comment
        Drive, Eject, C:, 1   ; comment

        Drive, unquoted, C:   ; comment
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

        { text: 'Drive', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'C:', scopes: name(scopeName, RuleName.UnquotedString) },
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

        DriveGet, output, unquoted, C:          ; comment
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

        { text: 'DriveGet', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'output', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'C:', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],

    // https://www.autohotkey.com/docs/v1/lib/FormatTime.htm
    [
      dedent`
        FormatTime, output, unquoted, Time
        FormatTime, output, unquoted, ShortDate
        FormatTime, output, unquoted, LongDate
        FormatTime, output, unquoted, YearMonth
        FormatTime, output, unquoted, YDay
        FormatTime, output, unquoted, YDay0
        FormatTime, output, unquoted, WDay
        FormatTime, output, unquoted, YWeek
      `,
      [
        ...[ 'Time', 'ShortDate', 'LongDate', 'YearMonth', 'YDay', 'YDay0', 'WDay', 'YWeek' ].flatMap((subcommand) => {
          return [
            { text: 'FormatTime', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'output', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
          ];
        }),
      ],
    ],

    // https://www.autohotkey.com/docs/v1/lib/Gui.htm
    [
      dedent`
        Gui, New, +Resize -MaximizeBox, unquoted            ; comment
        Gui, GuiName:New, unquoted, unquoted                ; comment
        Gui, Add, ActiveX, R10, unquoted                    ; comment
        Gui, Show, Center, unquoted                         ; comment
        Gui, Submit, NoHide                                 ; comment
        Gui, Cancel                                         ; comment
        Gui, Hide                                           ; comment
        Gui, Destroy                                        ; comment
        Gui, Minimize                                       ; comment
        Gui, Maximize                                       ; comment
        Gui, Restore                                        ; comment
        Gui, Default                                        ; comment
        Gui, Font, s10 cRed, unquoted                       ; comment
        Gui, Color, Red, FFFFFF                             ; comment
        Gui, Margin, 15, 30                                 ; comment
        Gui, Menu, unquoted                                 ; comment
        Gui, Flash, Off                                     ; comment
        Gui, GuiName: +Resize -MaximizeBox                  ; comment
      `,
      [
        { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'New', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '+Resize', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '-MaximizeBox', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'GuiName', scopes: name(scopeName, RuleName.LabelName) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'New', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Add', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'ActiveX', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'R10', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Show', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Center', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Submit', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'NoHide', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        ...[ 'Cancel', 'Hide', 'Destroy', 'Minimize', 'Maximize', 'Restore', 'Default' ].flatMap((subcommand) => {
          return [
            { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Font', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 's10', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'cRed', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Color', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Red', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'FFFFFF', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Margin', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '15', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '30', scopes: name(scopeName, RuleName.Integer) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Menu', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Flash', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Off', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'GuiName', scopes: name(scopeName, RuleName.LabelName) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: '+Resize', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '-MaximizeBox', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],

    // https://www.autohotkey.com/docs/v1/lib/GuiControl.htm
    [
      dedent`
        GuiControl,, unquoted, unquoted                     ; comment
        GuiControl, +AltSubmit, unquoted, unquoted          ; comment
        GuiControl, Text, unquoted, unquoted                ; comment
        GuiControl, Choose, unquoted, unquoted              ; comment
        GuiControl, ChooseString, unquoted, unquoted        ; comment
        GuiControl, Move, unquoted, w10                     ; comment
        GuiControl, MoveDraw, unquoted, w10                 ; comment
        GuiControl, Focus, unquoted                         ; comment
        GuiControl, Disable, unquoted                       ; comment
        GuiControl, Enable, unquoted                        ; comment
        GuiControl, Hide, unquoted                          ; comment
        GuiControl, Show, unquoted                          ; comment
        GuiControl, Font, unquoted                          ; comment
        GuiControl, GuiName:, unquoted, unquoted            ; comment
      `,
      [
        { text: 'GuiControl', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'GuiControl', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '+AltSubmit', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        ...[ 'Text', 'Choose', 'ChooseString' ].flatMap((subcommand) => {
          return [
            { text: 'GuiControl', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        ...[ 'Move', 'MoveDraw' ].flatMap((subcommand) => {
          return [
            { text: 'GuiControl', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'w10', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        ...[ 'Focus', 'Disable', 'Enable', 'Hide', 'Show', 'Font' ].flatMap((subcommand) => {
          return [
            { text: 'GuiControl', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        { text: 'GuiControl', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'GuiName', scopes: name(scopeName, RuleName.LabelName) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],

    // https://www.autohotkey.com/docs/v1/lib/GuiControlGet.htm
    [
      dedent`
        GuiControlGet, output,, unquoted, unquoted                  ; comment
        GuiControlGet, output, GuiName:Pos, unquoted                ; comment
        GuiControlGet, output, Pos, unquoted                        ; comment
        GuiControlGet, output, Focus, unquoted                      ; comment
        GuiControlGet, output, FocusV, unquoted                     ; comment
        GuiControlGet, output, Visible, unquoted                    ; comment
        GuiControlGet, output, Hwnd, unquoted                       ; comment
        GuiControlGet, output, Name, unquoted                       ; comment
        GuiControlGet, output, XXX, unquoted                        ; comment
      `,
      [
        { text: 'GuiControlGet', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'output', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'GuiControlGet', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'output', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'GuiName', scopes: name(scopeName, RuleName.LabelName) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'Pos', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        ...[ 'Pos', 'Focus', 'FocusV', 'Visible', 'Hwnd', 'Name' ].flatMap((subcommand) => {
          return [
            { text: 'GuiControlGet', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'output', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        { text: 'GuiControlGet', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'output', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'XXX', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],

    // https://www.autohotkey.com/docs/v1/lib/Hotkey.htm
    [
      dedent`
        Hotkey, ^a, Off, UseErrorLevel                                                  ; comment
        Hotkey, IfWinActive, abc ahk_exe abc.exe ahk_class abc, unquoted                ; comment
        Hotkey, IfWinExist, abc ahk_exe abc.exe ahk_class abc, unquoted                 ; comment
        Hotkey, If, a + b                                                               ; comment
        Hotkey, If, % a                                                                 ; comment
      `,
      [
        { text: 'Hotkey', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '^a', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Off', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'UseErrorLevel', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        ...[ 'IfWinActive', 'IfWinExist' ].flatMap((subcommand) => {
          return [
            { text: 'Hotkey', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'abc', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: 'ahk_exe', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'abc.exe', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: 'ahk_class', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'abc', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        { text: 'Hotkey', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'If', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable) },
        { text: '+', scopes: name(scopeName, RuleName.Operator) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Hotkey', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'If', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],

    // https://www.autohotkey.com/docs/v1/lib/Menu.htm
    [
      dedent`
        Menu, Tray, Icon, HBITMAP:*\\path\\to, unquoted, unquoted                 ; comment
        Menu, Tray, Tip, unquoted                                                 ; comment
        Menu, Tray, Click, unquoted                                               ; comment
        Menu, Tray, MainWindow                                                    ; comment
        Menu, Tray, NoMainWindow                                                  ; comment
        Menu, Tray, NoIcon                                                        ; comment
        Menu, Tray, unquoted, unquoted, unquoted                                  ; comment
        Menu, unquoted, Add, a&b && c, unquoted, P1                               ; comment
        Menu, unquoted, Insert, a&b && c, unquoted, unquoted, P1                  ; comment
        Menu, unquoted, Delete, a&b && c                                          ; comment
        Menu, unquoted, Check, a&b && c                                           ; comment
        Menu, unquoted, Uncheck, a&b && c                                         ; comment
        Menu, unquoted, ToggleCheck, a&b && c                                     ; comment
        Menu, unquoted, Enable, a&b && c                                          ; comment
        Menu, unquoted, Disable, a&b && c                                         ; comment
        Menu, unquoted, ToggleEnable, a&b && c                                    ; comment
        Menu, unquoted, Default, a&b && c                                         ; comment
        Menu, unquoted, NoIcon, a&b && c                                          ; comment
        Menu, unquoted, DeleteAll                                                 ; comment
        Menu, unquoted, NoDefault                                                 ; comment
        Menu, unquoted, Standard                                                  ; comment
        Menu, unquoted, NoStandard                                                ; comment
        Menu, unquoted, Rename, a&b && c, a&b && c                                ; comment
        Menu, unquoted, Icon, unquoted, unquoted, unquoted, HBITMAP:*\\path\\to   ; comment
        Menu, unquoted, UseErrorLevel, Off                                        ; comment
        Menu, unquoted, Show, unquoted, unquoted                                  ; comment
        Menu, unquoted, Color, unquoted, unquoted                                 ; comment
      `,
      [
        { text: 'Menu', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Tray', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Icon', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'HBITMAP:*\\path\\to', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        ...[ 'Tip', 'Click' ].flatMap((subcommand) => {
          return [
            { text: 'Menu', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'Tray', scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        ...[ 'MainWindow', 'NoMainWindow', 'NoIcon' ].flatMap((subcommand) => {
          return [
            { text: 'Menu', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'Tray', scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        { text: 'Menu', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Tray', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Menu', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Add', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'a', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '&b', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Underline) },
        { text: '&&', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Escape) },
        { text: 'c', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'P1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Menu', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Insert', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'a', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '&b', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Underline) },
        { text: '&&', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Escape) },
        { text: 'c', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'P1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },


        ...[ 'Delete', 'Check', 'Uncheck', 'ToggleCheck', 'Enable', 'Disable', 'ToggleEnable', 'Default', 'NoIcon' ].flatMap((subcommand) => {
          return [
            { text: 'Menu', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'a', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '&b', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Underline) },
            { text: '&&', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Escape) },
            { text: 'c', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        ...[ 'DeleteAll', 'NoDefault', 'Standard', 'NoStandard' ].flatMap((subcommand) => {
          return [
            { text: 'Menu', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        { text: 'Menu', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Rename', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'a', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '&b', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Underline) },
        { text: '&&', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Escape) },
        { text: 'c', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'a', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '&b', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Underline) },
        { text: '&&', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Escape) },
        { text: 'c', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Menu', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Icon', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'HBITMAP:*\\path\\to', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Menu', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'UseErrorLevel', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Off', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        ...[ 'Show', 'Color' ].flatMap((subcommand) => {
          return [
            { text: 'Menu', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),
      ],
    ],

    // https://www.autohotkey.com/docs/v1/lib/Process.htm
    [
      dedent`
        Process, Exist, unquoted                          ; comment
        Process, Close, unquoted                          ; comment
        Process, Wait, unquoted, unquoted                 ; comment
        Process, WaitClose, unquoted, unquoted            ; comment
        Process, Priority, unquoted, Low                  ; comment
        Process, List                                     ; comment
      `,
      [
        ...[ 'Exist', 'Close' ].flatMap((subcommand) => {
          return [
            { text: 'Process', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        ...[ 'Wait', 'WaitClose' ].flatMap((subcommand) => {
          return [
            { text: 'Process', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        { text: 'Process', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Priority', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Low', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Process', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'List', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],

    // https://www.autohotkey.com/docs/v1/lib/Progress.htm
    [
      dedent`
        Progress, Off                                               ; comment
        Progress, unquoted, unquoted, unquoted, ahk_id, unquoted    ; comment
      `,
      [
        { text: 'Progress', scopes: name(scopeName, RuleName.CommandName, StyleName.Strikethrough) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Off', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Progress', scopes: name(scopeName, RuleName.CommandName, StyleName.Strikethrough) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'ahk_id', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],

    // https://www.autohotkey.com/docs/v1/lib/SplashImage.htm
    [
      dedent`
        SplashImage, Off                                                               ; comment
        SplashImage, HBITMAP:*\\path\\to, x1 y1, unquoted, unquoted, ahk_id, unquoted  ; comment
      `,
      [
        { text: 'SplashImage', scopes: name(scopeName, RuleName.CommandName, StyleName.Strikethrough) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Off', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'SplashImage', scopes: name(scopeName, RuleName.CommandName, StyleName.Strikethrough) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'HBITMAP:*\\path\\to', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'x1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'y1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'ahk_id', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],

    // https://www.autohotkey.com/docs/v1/lib/SysGet.htm
    [
      dedent`
        SysGet, output, MonitorCount                ; comment
        SysGet, output, MonitorPrimary              ; comment

        SysGet, output, Monitor, 80                 ; comment
        SysGet, output, MonitorWorkArea, 80         ; comment
        SysGet, output, MonitorName, 80             ; comment
        SysGet, output, 80                          ; comment
      `,
      [
        ...[ 'MonitorCount', 'MonitorPrimary' ].flatMap(((subcommand) => {
          return [
            { text: 'SysGet', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'output', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        })),

        ...[ 'Monitor', 'MonitorWorkArea', 'MonitorName' ].flatMap(((subcommand) => {
          return [
            { text: 'SysGet', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'output', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '80', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        })),

        { text: 'SysGet', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'output', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '80', scopes: name(scopeName, RuleName.Integer) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],

    // https://www.autohotkey.com/docs/v1/lib/Thread.htm
    [
      dedent`
        Thread, NoTimers, a + b                       ; comment
        Thread, Priority, a + b                       ; comment
        Thread, Interrupt, 80, 80                     ; comment
        Thread, 80                                    ; comment
      `,
      [
        ...[ 'NoTimers', 'Priority' ].flatMap((subcommand) => {
          return [
            { text: 'Thread', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'a', scopes: name(scopeName, RuleName.Variable) },
            { text: '+', scopes: name(scopeName, RuleName.Operator) },
            { text: 'b', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        { text: 'Thread', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Interrupt', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '80', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '80', scopes: name(scopeName, RuleName.Integer) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Thread', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '80', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],

    // https://www.autohotkey.com/docs/v1/lib/Transform.htm
    [
      dedent`
        Transform, output, Unicode, unquoted                                    ; comment
        Transform, output, Deref, unquoted                                      ; comment
        Transform, output, Asc, unquoted                                        ; comment
        Transform, output, Chr, unquoted                                        ; comment
        Transform, output, Exp, unquoted                                        ; comment
        Transform, output, Sqrt, unquoted                                       ; comment
        Transform, output, Log, unquoted                                        ; comment
        Transform, output, Ln, unquoted                                         ; comment
        Transform, output, Ceil, unquoted                                       ; comment
        Transform, output, Floor, unquoted                                      ; comment
        Transform, output, Abs, unquoted                                        ; comment
        Transform, output, Sin, unquoted                                        ; comment
        Transform, output, Cos, unquoted                                        ; comment
        Transform, output, Tan, unquoted                                        ; comment
        Transform, output, ASin, unquoted                                       ; comment
        Transform, output, ACos, unquoted                                       ; comment
        Transform, output, ATan, unquoted                                       ; comment
        Transform, output, BitNot, unquoted                                     ; comment
        Transform, output, HTML, unquoted, unquoted                             ; comment
        Transform, output, Mod, unquoted, unquoted                              ; comment
        Transform, output, Round, unquoted, unquoted                            ; comment
        Transform, output, Pow, unquoted, unquoted                              ; comment
        Transform, output, BitAnd, unquoted, unquoted                           ; comment
        Transform, output, BitOr, unquoted, unquoted                            ; comment
        Transform, output, BitXOr, unquoted, unquoted                           ; comment
        Transform, output, BitShiftLeft, unquoted, unquoted                     ; comment
        Transform, output, BitShiftRight, unquoted, unquoted                    ; comment
      `,
      [
        ...[ 'Unicode', 'Deref', 'Asc', 'Chr', 'Exp', 'Sqrt', 'Log', 'Ln', 'Ceil', 'Floor', 'Abs', 'Sin', 'Cos', 'Tan', 'ASin', 'ACos', 'ATan', 'BitNot' ].flatMap((subcommand) => {
          return [
            { text: 'Transform', scopes: name(scopeName, RuleName.CommandName, StyleName.Strikethrough) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'output', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        ...[ 'HTML', 'Mod', 'Round', 'Pow', 'BitAnd', 'BitOr', 'BitXOr', 'BitShiftLeft', 'BitShiftRight' ].flatMap((subcommand) => {
          return [
            { text: 'Transform', scopes: name(scopeName, RuleName.CommandName, StyleName.Strikethrough) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'output', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),
      ],
    ],

    // https://www.autohotkey.com/docs/v1/lib/WinSet.htm
    [
      dedent`
        WinSet, AlwaysOnTop, on, ahk_id, unquoted, unquoted, unquoted           ; comment
        WinSet, Transparent, unquoted, ahk_id, unquoted, unquoted, unquoted     ; comment
        WinSet, TransColor, unquoted, ahk_id, unquoted, unquoted, unquoted      ; comment
        WinSet, Style, unquoted, ahk_id, unquoted, unquoted, unquoted           ; comment
        WinSet, ExStyle, unquoted, ahk_id, unquoted, unquoted, unquoted         ; comment
        WinSet, Bottom, blank, ahk_id, unquoted, unquoted, unquoted             ; comment
        WinSet, Top, blank, ahk_id, unquoted, unquoted, unquoted                ; comment
        WinSet, Disable, blank, ahk_id, unquoted, unquoted, unquoted            ; comment
        WinSet, Enable, blank, ahk_id, unquoted, unquoted, unquoted             ; comment
        WinSet, Redraw, blank, ahk_id, unquoted, unquoted, unquoted             ; comment
        WinSet, Region, R10-10, ahk_id, unquoted, unquoted, unquoted            ; comment
      `,
      [
        { text: 'WinSet', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'AlwaysOnTop', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'on', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'ahk_id', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        ...[ 'Transparent', 'TransColor' ].flatMap((subcommand) => {
          return [
            { text: 'WinSet', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'ahk_id', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        ...[ 'Style', 'ExStyle' ].flatMap((subcommand) => {
          return [
            { text: 'WinSet', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'ahk_id', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        ...[ 'Bottom', 'Top', 'Disable', 'Enable', 'Redraw' ].flatMap((subcommand) => {
          return [
            { text: 'WinSet', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'blank', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'ahk_id', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        { text: 'WinSet', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Region', scopes: name(scopeName, RuleName.SubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'R10-10', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'ahk_id', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'unquoted', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
    // #endregion signatures

    // #region arg
    [
      dedent`
        AutoTrim, on                  ; comment
        AutoTrim, ON                  ; comment
        AutoTrim, off                 ; comment
        AutoTrim, OFF                 ; comment
        AutoTrim, 1                   ; comment
        AutoTrim, 0                   ; comment

        AutoTrim, % on                ; comment
        AutoTrim, %o%%f%%f%           ; comment
        AutoTrim, on,                 ; comment

        BlockInput, Send
        BlockInput, Mouse
        BlockInput, SendAndMouse
        BlockInput, Default
        BlockInput, MouseMove
        BlockInput, MouseMoveOff
        BlockInput, on
        BlockInput, ON
        BlockInput, off
        BlockInput, OFF
        BlockInput, 1
        BlockInput, 0

        BlockInput, % on                ; comment
        BlockInput, %o%%f%%f%           ; comment
        BlockInput, on,                 ; comment
      `,
      [
        ...[ 'on', 'ON', 'off', 'OFF', '1', '0' ].flatMap((arg) => {
          onOff;

          return [
            { text: 'AutoTrim', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: arg, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        }),

        { text: 'AutoTrim', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
        { text: 'on', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'AutoTrim', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'o', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'f', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'f', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'AutoTrim', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'on', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        ...[
          ...[ // keywords
            'Send',
            'Mouse',
            'SendAndMouse',
            'Default',
            'MouseMove',
            'MouseMoveOff',
          ],
          'on',
          'ON',
          'off',
          'OFF',
          '1',
          '0',
        ].flatMap((arg) => {
          onOff; // with keywords

          return [
            { text: 'BlockInput', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: arg, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
          ];
        }),

        { text: 'BlockInput', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
        { text: 'on', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'BlockInput', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'o', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'f', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'f', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'BlockInput', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'on', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
    ...((): ExpectedTestData[] => {
      unquoted;

      return [
        [
          dedent`
            Click, 100 200 Left       ; comment
            Click, 100 200 L          ; comment
            Click, 100 200 Right      ; comment
            Click, 100 200 R          ; comment
            Click, 100 200 Middle     ; comment
            Click, 100 200 M          ; comment
            Click, 100 200 X1         ; comment
            Click, 100 200 X2         ; comment
            Click, 100 200 Up         ; comment
            Click, 100 200 U          ; comment
            Click, 100 200 Down       ; comment
            Click, 100 200 D          ; comment
          `,
          [
            ...[ 'Left', 'L', 'Right', 'R', 'Middle', 'M', 'X1', 'X2', 'Up', 'U', 'Down', 'D' ].flatMap((keyword) => {
              return [
                { text: 'Click', scopes: name(scopeName, RuleName.CommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '100', scopes: name(scopeName, RuleName.Integer) },
                { text: '200', scopes: name(scopeName, RuleName.Integer) },
                { text: keyword, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ];
            }),
          ],
        ],
        [
          dedent`
            Input,,,, Tab,Tab          ; comment
          `,
          [
            { text: 'Input', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'Tab', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: ',', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: 'Tab', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
      ];
    })(),
    [
      dedent`
        ClipWait, 1, 0              ; comment
        ClipWait, 1 + 1, var, 1     ; comment
      `,
      [
        ...((): ParsedResult[] => {
          expression;

          return [
            { text: 'ClipWait', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '0', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'ClipWait', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '+', scopes: name(scopeName, RuleName.Operator) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        })(),
      ],
    ],
    [
      dedent`
        Control, Check, blank             ; comment
        Control, Check, %blank%           ; comment
        Control, Check, % blank           ; comment
      `,
      [
        ...((): ParsedResult[] => {
          blank;

          return [
            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'Check', scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'blank', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'Check', scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%blank%', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'Check', scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: 'blank', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        })(),
      ],
    ],
    [
      dedent`
        Control, Check,, ahk_id %ctrlHwnd%              ; comment
        Control, Check,, % "ahk_id" ctrlHwnd            ; comment
      `,
      [
        ...((): ParsedResult[] => {
          control;

          return [
            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'Check', scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'ahk_id', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'ctrlHwnd', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'Check', scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
            { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
            { text: 'ahk_id', scopes: name(scopeName, RuleName.DoubleString) },
            { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
            { text: 'ctrlHwnd', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        })(),
      ],
    ],
    [
      dedent`
        Control, Check,,, ahk_class %winHwnd%               ; comment
        Control, Check,,, % "ahk_class" winHwnd             ; comment
      `,
      [
        ...((): ParsedResult[] => {
          winTitle;

          return [
            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'Check', scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'ahk_class', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'winHwnd', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'Check', scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
            { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
            { text: 'ahk_class', scopes: name(scopeName, RuleName.DoubleString) },
            { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
            { text: 'winHwnd', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        })(),
      ],
    ],
    [
      dedent`
        ControlGet, output    ; comment
      `,
      [
        ...((): ParsedResult[] => {
          output;

          return [
            { text: 'ControlGet', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'output', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        })(),
      ],
    ],
    [
      dedent`
        ControlGet,, a, b, c      ; comment
        ControlGet,, % a, b, c    ; comment
      `,
      [
        ...((): ParsedResult[] => {
          restParams;

          return [
            { text: 'ControlGet', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'a', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'b', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'c', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'ControlGet', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
            { text: 'a', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'b', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'c', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        })(),
      ],
    ],
    [
      dedent`
        ControlSend,, +!#{Up}                 ; comment
        ControlSend,, +!#{Tab Up}             ; comment
        ControlSend,, +!#{Tab Down}           ; comment
        ControlSend,, +!#{Tab DownTemp}       ; comment
        ControlSend,, +!#{Tab 5}              ; comment
        ControlSend,, {Click 100 100 Left}    ; comment
        ControlSend,, {Blind}+!#{Up}          ; comment
        ControlSend,, {Raw}+!#{Up}            ; comment
        ControlSend,, {Raw}line 1\`nline 2    ; comment
        ControlSend,, {Raw}%a%bc              ; comment
        ControlSend,, {Text}+!#{Up}           ; comment
        ControlSend,, {Text}line 1\`nline 2   ; comment
        ControlSend,, {Text}%a%bc             ; comment
      `,
      [
        ...((): ParsedResult[] => {
          sendKeys;

          return [
            { text: 'ControlSend', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '+!#', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '{Up}', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            ...[ 'Up', 'Down', 'DownTemp' ].flatMap((word) => {
              return [
                { text: 'ControlSend', scopes: name(scopeName, RuleName.CommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '+!#', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: '{', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: 'Tab', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: `${word}}`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ];
            }),

            { text: 'ControlSend', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '+!#', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '{', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'Tab', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '5}', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'ControlSend', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '{', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'Click', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '100', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '100', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'Left', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '}', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'ControlSend', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '{Blind}', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '+!#', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '{Up}', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            ...[ '{Raw}', '{Text}' ].flatMap((mode) => {
              return [
                { text: 'ControlSend', scopes: name(scopeName, RuleName.CommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: mode, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: '+!#{Up}', scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'ControlSend', scopes: name(scopeName, RuleName.CommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: mode, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: `line 1`, scopes: name(scopeName, RuleName.UnquotedString) },
                { text: `\`n`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Escape) },
                { text: `line 2`, scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'ControlSend', scopes: name(scopeName, RuleName.CommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: mode, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: `%`, scopes: name(scopeName, RuleName.PercentBegin) },
                { text: `a`, scopes: name(scopeName, RuleName.Variable) },
                { text: `%`, scopes: name(scopeName, RuleName.PercentEnd) },
                { text: 'bc', scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ];
            }),
          ];
        })(),
      ],
    ],
    [
      dedent`
        CoordMode, ToolTip          ; comment
        CoordMode, Pixel            ; comment
        CoordMode, Mouse            ; comment
        CoordMode, Caret            ; comment
        CoordMode, Menu             ; comment
        CoordMode, Invalid          ; comment
        CoordMode, MenuInvalid      ; comment

        CoordMode, %var%            ; comment
        CoordMode, % expression     ; comment
      `,
      [
        ...((): ParsedResult[] => {
          keywordOnly;
          return [
            ...[ 'ToolTip', 'Pixel', 'Mouse', 'Caret', 'Menu' ].flatMap((word) => {
              return [
                { text: 'CoordMode', scopes: name(scopeName, RuleName.CommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: word, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ];
            }),

            ...[ 'Invalid', 'MenuInvalid' ].flatMap((word) => {
              return [
                { text: 'CoordMode', scopes: name(scopeName, RuleName.CommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: word, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ];
            }),

            { text: 'CoordMode', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'CoordMode', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
            { text: 'expression', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        })(),
      ],
    ],
    [
      dedent`
        FileSetAttrib, RASHNOTU     ; comment
        FileSetAttrib, +RA-SH^NO+U  ; comment
      `,
      [
        ...((): ParsedResult[] => {
          fileAttributes;

          return [
            { text: 'FileSetAttrib', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'R', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'A', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'S', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'H', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'N', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'O', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'T', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'U', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'FileSetAttrib', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '+R', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'A', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '-S', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'H', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '^N', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'O', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '+', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: 'U', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ];
        })(),
      ],
    ],
    ...((): ExpectedTestData[] => {
      guiOptions;

      return [
        [
          dedent`
            Gui, GuiName:New, +AlwaysOnTop Delimiter\`,   ; comment
            Gui, GuiName: +AlwaysOnTop Delimiter,         ; comment
          `,
          [
            { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'GuiName', scopes: name(scopeName, RuleName.LabelName) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: 'New', scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '+AlwaysOnTop', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'Delimiter`,', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'GuiName', scopes: name(scopeName, RuleName.LabelName) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '+AlwaysOnTop', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'Delimiter,', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
      ];
    })(),
    ...((): ExpectedTestData[] => {
      guiControlOptions;
      flagedGuiControlOptions;

      return [
        [
          dedent`
            Gui, Add, ActiveX, X+M
            GuiControl, +X+M
            GuiControl, GuiName:+X+M
          `,
          [
            { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'Add', scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'ActiveX', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'X+M', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },

            { text: 'GuiControl', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '+X+M', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },

            { text: 'GuiControl', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'GuiName', scopes: name(scopeName, RuleName.LabelName) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '+X+M', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
          ],
        ],
      ];
    })(),
    // #endregion arg

    // #region continuation
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            Control               ; comment
              , arg1              ; comment
              , arg2, arg3        ; comment

            {                     ; comment
              Control             ; comment
                , arg1            ; comment
                , arg2, arg3      ; comment
            }                     ; comment

            F() {                 ; comment
              Control             ; comment
                , arg1            ; comment
                , arg2, arg3      ; comment
            }                     ; comment

            class {               ; comment
              M() {               ; comment
                Control           ; comment
                  , arg1          ; comment
                  , arg2, arg3    ; comment
              }                   ; comment
            }                     ; comment
          `,
          [
            // global
            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg1', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg2', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg3', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            // block
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg1', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg2', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg3', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            // function block
            { text: 'F', scopes: name(scopeName, RuleName.FunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg1', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg2', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg3', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            // method block
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'M', scopes: name(scopeName, RuleName.FunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg1', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg2', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg3', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
        [
          dedent`
            Control               ; comment
              , arg1              ; comment
              , arg2, arg3,       ; comment
              (                   ; comment
                arg4              ; text
              )                   ; comment

            {                     ; comment
              Control             ; comment
                , arg1            ; comment
                , arg2, arg3,     ; comment
                (                 ; comment
                  arg4            ; text
                )                 ; comment
            }                     ; comment

            F() {                 ; comment
              Control             ; comment
                , arg1            ; comment
                , arg2, arg3,     ; comment
                (                 ; comment
                  arg4            ; text
                )                 ; comment
            }                     ; comment

            class {               ; comment
              M() {               ; comment
                Control           ; comment
                  , arg1          ; comment
                  , arg2, arg3,   ; comment
                  (               ; comment
                    arg4          ; text
                  )               ; comment
              }                   ; comment
            }                     ; comment
          `,
          [
            // global
            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg1', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg2', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg3', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'arg4              ; text', scopes: name(scopeName, RuleName.UnquotedString) },

            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            // block
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg1', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg2', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg3', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'arg4            ; text', scopes: name(scopeName, RuleName.UnquotedString) },

            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            // function block
            { text: 'F', scopes: name(scopeName, RuleName.FunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg1', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg2', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg3', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'arg4            ; text', scopes: name(scopeName, RuleName.UnquotedString) },

            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            // method block
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'M', scopes: name(scopeName, RuleName.FunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg1', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg2', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg3', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'arg4          ; text', scopes: name(scopeName, RuleName.UnquotedString) },

            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
      ];
    })(),
    // #endregion continuation

    // command or expression
    [
      dedent`
        Control += var
        Control, += var
      `,
      [
        { text: 'Control', scopes: name(scopeName, RuleName.Variable) },
        { text: '+=', scopes: name(scopeName, RuleName.Operator) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },

        { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '+=', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: 'var', scopes: name(scopeName, RuleName.UnquotedString) },
      ],
    ],

    // Fix: If the last argument is a percent expression, the comma after is highlighted as a string
    [
      dedent`
        Click, % abc, d ; comment
      `,
      [
        { text: 'Click', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'd', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}
