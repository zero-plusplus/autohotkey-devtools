import { CommandFlag, CommandParameterFlag, CommandSignatureFlag, HighlightType } from '../constants';
import type { CommandDefinition, CommandParameter, CommandSignature } from '../types';

// #region common parameter(s)
export const winParams: CommandParameter[] = [
  winTitle(),
  unquoted(),
  winTitle(),
  unquoted(),
] as const;
// #endregion common parameter(s)

// #region directives
export const directiveDefinitions: CommandDefinition[] = [
  // https://www.autohotkey.com/docs/v1/lib/_ClipboardTimeout.htm
  command('#ClipboardTimeout', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/_CommentFlag.htm
  command('#CommentFlag', signature([ unquoted() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/_EscapeChar.htm#Delimiter
  command('#Delimiter', signature([ unquoted() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/_EscapeChar.htm#DerefChar
  command('#DerefChar', signature([ unquoted() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/_ErrorStdOut.htm
  command('#ErrorStdOut', signature([ encoding() ])),

  // https://www.autohotkey.com/docs/v1/lib/_EscapeChar.htm
  command('#EscapeChar', signature([ unquoted() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/_HotkeyInterval.htm
  command('#HotkeyInterval', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/_HotkeyModifierTimeout.htm
  command('#HotkeyModifierTimeout', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/_Hotstring.htm
  command('#Hotstring', signature([ unquoted([ 'NoMouse', 'EndChars' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/_If.htm
  command('#If', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/_IfTimeout.htm
  command('#IfTimeout', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/index.htm
  ...commands([ '#IfWinActive', '#IfWinNotActive', '#IfWinExist', '#IfWinNotExist' ], signature([ winTitle(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/_InputLevel.htm
  command('#InputLevel', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/_InstallKeybdHook.htm
  // https://www.autohotkey.com/docs/v1/lib/_InstallMouseHook.htm
  ...commands([ '#InstallKeybdHook', '#InstallMouseHook' ], signature([])),

  // https://www.autohotkey.com/docs/v1/lib/_KeyHistory.htm
  command('#KeyHistory', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/Scripts.htm#LTrim
  command('#LTrim', signature([ keyword([ 'Off' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/_MaxHotkeysPerInterval.htm
  command('#MaxHotkeysPerInterval', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/_MaxMem.htm
  command('#MaxMem', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/_MaxThreads.htm
  command('#MaxThreads', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/_MaxThreadsBuffer.htm
  command('#MaxThreadsBuffer', signature([ onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/_MaxThreadsPerHotkey.htm
  command('#MaxThreadsPerHotkey', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/_MenuMaskKey.htm
  command('#MenuMaskKey', signature([ keyName() ])),

  // https://www.autohotkey.com/docs/v1/lib/_NoEnv.htm
  command('#NoEnv', signature([])),

  // https://www.autohotkey.com/docs/v1/lib/_NoTrayIcon.htm
  command('#NoTrayIcon', signature([])),

  // https://www.autohotkey.com/docs/v1/lib/_Persistent.htm
  command('#Persistent', signature([])),

  // https://www.autohotkey.com/docs/v1/lib/_SingleInstance.htm
  command('#SingleInstance', signature([ keyword([ 'Force', 'Ignore', 'Prompt', 'Off' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/_UseHook.htm
  command('#UseHook', signature([ onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/_Warn.htm
  command('#Warn', signature([
    keyword([ 'UseUnsetLocal', 'UseUnsetGlobal', 'UseEnv', 'LocalSameAsGlobal', 'ClassOverwrite', 'Unreachable' ]),
    keyword([ 'MsgBox', 'StdOut', 'OutputDebug', 'Off' ]),
  ])),

  // https://www.autohotkey.com/docs/v1/lib/_WinActivateForce.htm
  command('#WinActivateForce', signature([])),
];
// #endregion directives

// #region commands
export const commandDefinitions: CommandDefinition[] = [
  // https://www.autohotkey.com/docs/v1/lib/AutoTrim.htm
  command('AutoTrim', signature([ onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/BlockInput.htm
  command('BlockInput', signature([ onOff([ 'Send', 'Mouse', 'SendAndMouse', 'Default', 'MouseMove', 'MouseMoveOff' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/Click.htm
  command('Click', signature([ unquoted([ 'Left', 'L', 'Right', 'R', 'Middle', 'M', 'X1', 'X2', 'Up', 'U', 'Down', 'D' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/ClipWait.htm
  command('ClipWait', signature([ expression(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/Control.htm
  command(
    'Control',
    [
      signature([ subcommand([ 'Check', 'UnCheck', 'Enable', 'Disable', 'Show', 'Hide', 'ShowDropDown', 'HideDropDown' ]), blank(), control(), ...winParams ]),
      signature([ subcommand([ 'Style', 'ExStyle' ]), style(), control(), ...winParams ]),
      signature([ subcommand([ 'TabLeft', 'TabRight', 'Add', 'Delete', 'Choose', 'ChooseString', 'EditPaste' ]), unquoted(), control(), ...winParams ]),
    ],
  ),

  // https://www.autohotkey.com/docs/v1/lib/ControlClick.htm
  command('ControlClick', signature([ controlOrPos(), winTitle(), unquoted(), whichButton(), expression(), options([ 'NA', 'D', 'U', 'Pos', 'X<decimal>', 'Y<decimal>' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlFocus.htm
  command('ControlFocus', signature([ control(), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlGet.htm
  command('ControlGet', [
    signature([ output(), subcommand('List'), options([ 'Selected', 'Focused', 'Col', 'Count' ]), control(), ...winParams ]),
    signature([ output(), subcommand([ 'Checked', 'Enabled', 'Visible', 'Tab', 'Choice', 'LineCount', 'CurrentLine', 'CurrentCol', 'Selected', 'Style', 'ExStyle', 'Hwnd' ]), blank(), control(), ...winParams ]),
    signature([ output(), subcommand([ 'FindString', 'Line' ]), unquoted(), control(), ...winParams ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/ControlGetFocus.htm
  command('ControlGetFocus', signature([ output(), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlGetPos.htm
  command('ControlGetPos', signature([ output(), output(), output(), output(), control(), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlGetText.htm
  command('ControlGetText', signature([ output(), control(), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlMove.htm
  command('ControlMove', signature([ control(), expression(), expression(), expression(), expression(), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlSend.htm
  ...commands([ 'ControlSend', 'ControlSendRaw' ], signature([ control(), sendKeys(), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlSetText.htm
  command('ControlSetText', signature([ control(), unquoted(), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/CoordMode.htm
  command('CoordMode', signature([ keyword([ 'ToolTip', 'Pixel', 'Mouse', 'Caret', 'Menu' ]), keyword([ 'Screen', 'Relative', 'Window', 'Client' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/Critical.htm
  command('Critical', signature([ unquoted([ 'On', 'Off' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/DetectHiddenText.htm
  // https://www.autohotkey.com/docs/v1/lib/DetectHiddenWindows.htm
  ...commands([ 'DetectHiddenText', 'DetectHiddenWindows' ], signature([ onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/Drive.htm
  command('Drive', [
    signature([ subcommand([ 'Label', 'Eject' ]), unquoted(), unquoted() ]),
    signature([ subcommand([ 'Lock', 'Unlock' ]), unquoted() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/DriveGet.htm
  command('DriveGet', [
    signature([ output(), subcommand('List'), keyword([ 'CDROM', 'REMOVABLE', 'FIXED', 'NETWORK', 'RAMDISK', 'UNKNOWN' ]) ]),
    signature([ output(), subcommand([ 'Capacity', 'Cap', 'FileSystem', 'Label', 'Serial', 'Type', 'Status', 'StatusCD' ]), unquoted() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/DriveSpaceFree.htm
  command('DriveSpaceFree', signature([ output(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/Edit.htm
  // https://www.autohotkey.com/docs/v1/lib/EnvUpdate.htm
  ...commands([ 'Edit', 'EnvUpdate' ], signature([])),

  // https://www.autohotkey.com/docs/v1/lib/EnvAdd.htm
  // https://www.autohotkey.com/docs/v1/lib/EnvSub.htm
  ...commands([ 'EnvAdd', 'EnvSub' ], signature([ input(), expression(), timeunit() ])),

  // https://www.autohotkey.com/docs/v1/lib/EnvDiv.htm
  // https://www.autohotkey.com/docs/v1/lib/EnvMult.htm
  ...commands([ 'EnvDiv', 'EnvMult' ], signature([ input(), expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/EnvGet.htm
  command('EnvGet', signature([ input(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/EnvSet.htm
  command('EnvSet', signature([ unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileAppend.htm
  command('FileAppend', signature([ unquoted(), path(), encoding() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileCopy.htm
  command('FileCopy', signature([ glob(), glob(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileCopyDir.htm
  // https://www.autohotkey.com/docs/v1/lib/FileInstall.htm
  ...commands([ 'FileCopyDir', 'FileInstall' ], signature([ path(), path(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileCreateDir.htm
  command('FileCreateDir', signature([ path() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileCreateShortcut.htm
  command('FileCreateShortcut', signature([ path(), path(), path(), unquoted(), unquoted(), path(), unquoted(), expression(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileDelete.htm
  command('FileDelete', signature([ glob() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileEncoding.htm
  command('FileEncoding', signature([ encoding() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileGetAttrib.htm
  // https://www.autohotkey.com/docs/v1/lib/FileGetVersion.htm
  ...commands([ 'FileGetAttrib', 'FileGetVersion' ], signature([ output(), path() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileGetShortcut.htm
  command('FileGetShortcut', signature([ path(), output(), output(), output(), output(), output(), output(), output() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileGetSize.htm
  command('FileGetSize', signature([ output(), path(), keyword([ 'B', 'K', 'M' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/FileGetTime.htm
  command('FileGetTime', signature([ output(), path(), keyword([ 'M', 'C', 'A' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/FileMove.htm
  command('FileMove', signature([ glob(), glob(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileMoveDir.htm
  command('FileMoveDir', signature([ path(), path(), keyword([ '0', '1', '2', 'R' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/FileRead.htm
  command('FileRead', signature([ output(), path([ '*c', '*m<decimal>', '*t', '*P<decimal>' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/FileReadLine.htm
  command('FileReadLine', signature([ output(), path(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileRecycle.htm
  command('FileRecycle', signature([ glob() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileRecycleEmpty.htm
  command('FileRecycleEmpty', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileRemoveDir.htm
  command('FileRemoveDir', signature([ path(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileSelectFile.htm
  command('FileSelectFile', signature([ output(), options([ 'M', 'S' ]), path(), unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileSelectFolder.htm
  command('FileSelectFolder', signature([ output(), unquoted(), expression(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileSetAttrib.htm
  command('FileSetAttrib', signature([ combiOptions([ 'R', 'A', 'S', 'H', 'N', 'O', 'T' ]), glob(), expression(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileSetTime.htm
  command('FileSetTime', signature([ expression(), glob(), keyword([ 'M', 'C', 'A' ]), expression(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FormatTime.htm
  command('FormatTime', [
    signature([ output(), unquoted(), keyword([ 'Time', 'ShortDate', 'LongDate', 'YearMonth', 'YDay', 'YDay0', 'WDay', 'YWeek' ]) ]),
    signature([ output(), unquoted(), formatTime() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/GetKeyState.htm#command
  command('GetKeyState', signature([ output(), keyword([ 'P', 'T' ]) ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/GroupActivate.htm
  command('GroupActivate', signature([ unquoted(), keyword([ 'R' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/GroupAdd.htm
  command('GroupAdd', signature([ unquoted(), winTitle(), unquoted(), unquoted(), winTitle(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/GroupClose.htm
  command('GroupClose', signature([ unquoted(), keyword([ 'R', 'A' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/GroupDeactivate.htm
  command('GroupDeactivate', signature([ unquoted(), keyword([ 'R' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/Gui.htm
  command('Gui', [
    signature([ guiSubcommand('New'), guiOptions(), unquoted() ]),
    signature([ guiSubcommand('Add'), controlType(), controlOptions(), unquoted() ]),
    signature([ guiSubcommand('Show'), options([ 'W<number>', 'H<number>', 'X<number>', 'Y<number>', 'Center', 'xCenter', 'yCenter', 'AutoSize', 'Minimize', 'Maximize', 'Restore', 'NoActivate', 'NA', 'Hide' ]), unquoted() ]),
    signature([ guiSubcommand('Submit'), keyword([ 'NoHide' ]) ]),
    signature([ guiSubcommand([ 'Cancel', 'Hide', 'Destroy', 'Minimize', 'Maximize', 'Restore' ]) ]),
    signature([ guiSubcommand('Font'), options([ 'C<color>', 'S<number>', 'W<number>', 'Q<number>' ]) ]),
    signature([ guiSubcommand('Color'), color(), color() ]),
    signature([ guiSubcommand('Margin'), unquoted(), unquoted() ]),
    signature([ guiSubcommand('Menu'), unquoted() ]),
    signature([ guiSubcommand('Flash'), keyword([ 'Off' ]) ]),
    signature([ guiSubcommand('Default') ]),
    signature([ guiOptions() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/GuiControl.htm
  command('GuiControl', [
    signature([ blank(), control(), unquoted() ]),
    signature([ subcommand([ 'Text', 'Choose', 'ChooseString' ]), control(), unquoted() ]),
    signature([ subcommand([ 'Move', 'MoveDraw' ]), control(), controlOptions() ]),
    signature([ subcommand([ 'Focus', 'Disable', 'Enable', 'Hide', 'Show', 'Font' ]), control() ]),
    signature([ unquoted(), control(), unquoted() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/GuiControlGet.htm
  command('GuiControlGet', [
    signature([ output(), blank(), control(), unquoted() ]),
    signature([ output(), subcommand([ 'Pos', 'Focus', 'FocusV', 'Visible', 'Hwnd', 'Name' ]), control() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/Hotkey.htm
  command('Hotkey', [
    signature([ subcommand('If'), expression() ]),
    signature([ subcommand([ 'IfWinActive', 'IfWinExist' ]), winTitle(), unquoted() ]),
    signature([ hotkeyName(), unquoted(), options([ 'UseErrorLevel', 'On', 'Off', 'B', 'B0', 'P<number>', 'T<number>', 'I<number>' ]) ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/ImageSearch.htm
  command('ImageSearch', signature([ output(), output(), expression(), expression(), expression(), expression(), unquoted([ '*Icon<number>', '*<number>', '*Trans<number>', '*w<number>', '*h<number>', 'HBITMAP:' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/IniDelete.htm
  command('IniDelete', signature([ path(), unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/IniRead.htm
  command('IniRead', signature([ output(), path(), unquoted(), unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/IniWrite.htm
  command('IniWrite', signature([ unquoted(), unquoted(), path(), unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/Input.htm
  command('Input', signature([ output(), options([ 'B', 'C', 'I<number>', 'L<number>', 'M', 'T<number>', 'V', '*', 'E' ]), sendKeys(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/InputBox.htm
  command('InputBox', signature([ output(), unquoted(), unquoted(), unquoted(), expression(), expression(), expression(), expression(), unquoted(), expression(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/KeyHistory.htm
  command('KeyHistory', signature([])),

  // https://www.autohotkey.com/docs/v1/lib/KeyWait.htm
  command('KeyWait', signature([ keyName(), options([ 'D', 'L', 'T' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/ListHotkeys.htm
  command('ListHotkeys', signature([])),

  // https://www.autohotkey.com/docs/v1/lib/ListLines.htm
  command('ListLines', signature([ onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/ListVars.htm
  command('ListVars', signature([])),

  // https://www.autohotkey.com/docs/v1/lib/Menu.htm
  command('Menu', [
    signature([ unquoted(), subcommand('Add'), unquoted(), unquoted(), menuOptions() ]),
    signature([ unquoted(), subcommand('Insert'), unquoted(), unquoted(), unquoted(), menuOptions() ]),
    signature([ unquoted(), subcommand([ 'Delete', 'Check', 'Uncheck', 'ToggleCheck', 'Enable', 'Disable', 'ToggleEnable', 'Default', 'NoIcon' ]), unquoted() ]),
    signature([ unquoted(), subcommand([ 'DeleteAll', 'Standard', 'NoStandard' ]) ]),
    signature([ unquoted(), subcommand('Rename'), unquoted(), unquoted() ]),
    signature([ unquoted(), subcommand('Icon'), unquoted(), path(), unquoted(), unquoted() ]),
    signature([ unquoted(), subcommand('UseErrorLevel '), keyword([ 'Off' ]) ]),
    signature([ unquoted(), subcommand([ 'NoDefault', 'Standard', 'NoStandard' ]) ]),
    signature([ subcommand('Tray'), unquoted(), path(), unquoted(), unquoted() ]),
    signature([ subcommand('Tray'), subcommand('Icon'), path(), unquoted(), unquoted() ]),
    signature([ subcommand('Tray'), subcommand('NoIcon') ]),
    signature([ subcommand('Tray'), subcommand([ 'Tip', 'Click' ]), unquoted() ]),
    signature([ subcommand('Tray'), subcommand([ 'Show', 'Color' ]), unquoted(), unquoted() ]),
    signature([ subcommand('Tray'), subcommand([ 'MainWindow', 'NoMainWindow' ]) ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/MouseClick.htm
  command('MouseClick', signature([ whichButton(), expression(), expression(), expression(), expression(), keyword([ 'D', 'U' ]), keyword([ 'R' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/MouseClickDrag.htm
  command('MouseClickDrag', signature([ whichButton(), expression(), expression(), expression(), expression(), expression(), keyword([ 'R' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/MouseGetPos.htm
  command('MouseGetPos', signature([ output(), output(), output(), output(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/MouseMove.htm
  command('MouseMove', signature([ expression(), expression(), expression(), keyword([ 'R' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/MsgBox.htm
  command('MsgBox', signature([ unquoted(), unquoted(), unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/OnExit.htm#command
  command('OnExit', signature([ unquoted() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/OutputDebug.htm
  command('OutputDebug', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/Pause.htm
  command('Pause', signature([ onOffToggle(), keyword([ 'Off', '0', '1' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/PixelGetColor.htm
  command('PixelGetColor', signature([ output(), expression(), expression(), keyword([ 'Alt', 'Slow', 'RGB' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/PixelSearch.htm
  command('PixelSearch', signature([ output(), output(), expression(), expression(), expression(), expression(), expression(), expression(), keyword([ 'Fast', 'RGB' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/PostMessage.htm
  command('PostMessage', signature([ expression(), expression(), expression(), control(), ...winParams ])),
  command('SendMessage', signature([ expression(), expression(), expression(), control(), ...winParams, expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/Process.htm
  command('Process', [
    signature([ subcommand([ 'Exist', 'Close' ]), unquoted() ]),
    signature([ subcommand([ 'Wait', 'WaitClose' ]), unquoted(), unquoted() ]),
    signature([ subcommand([ 'Priority' ]), unquoted(), keyword([ 'Low', 'L', 'BelowNormal', 'B', 'Normal', 'N', 'AboveNormal', 'A', 'High', 'H', 'Realtime', 'R' ]) ]),
    signature([ subcommand([ 'List' ]) ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/Progress.htm
  command('SplashImage', [
    signature([ keyword([ 'Off' ]) ]),
    signature([ imagePath(), options([ 'C<number>', 'ZH<number>', 'ZW<number>', 'ZX<number>', 'ZY<number>', 'FM<number>', 'FS<number>', 'WM<number>', 'WS<number>', 'CB<number>', 'CT<number>', 'CW<color>' ]), unquoted(), unquoted(), winTitle(), unquoted() ]),
  ], CommandFlag.Deprecated),
  command('Progress', [
    signature([ keyword([ 'Off' ]) ]),
    signature([ unquoted(), unquoted(), unquoted(), winTitle(), unquoted() ]),
  ], CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/Random.htm
  command('Random', signature([ output(), expression(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/RegDelete.htm
  command('RegDelete', [
    signature([ unquoted(), unquoted() ]),
    signature([ subcommand('RootKey'), unquoted(), unquoted() ], CommandSignatureFlag.Deprecated),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/RegRead.htm
  command('RegRead', [
    signature([ output(), unquoted(), unquoted() ]),
    signature([ output(), subcommand('RootKey'), unquoted(), unquoted() ], CommandSignatureFlag.Deprecated),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/RegWrite.htm
  command('RegWrite', [
    signature([ keyword([ 'REG_SZ', 'REG_EXPAND_SZ', 'REG_MULTI_SZ', 'REG_DWORD', 'REG_BINARY' ]), unquoted(), unquoted(), unquoted() ]),
    signature([ keyword([ 'REG_SZ', 'REG_EXPAND_SZ', 'REG_MULTI_SZ', 'REG_DWORD', 'REG_BINARY' ]), subcommand('RootKey'), unquoted(), unquoted(), unquoted() ], CommandSignatureFlag.Deprecated),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/Reload.htm
  command('Reload', signature([])),

  // https://www.autohotkey.com/docs/v1/lib/Run.htm
  ...commands([ 'Run', 'RunWait' ], signature([ unquoted(), path(), keyword([ 'Max', 'Min', 'Hide', 'UseErrorLevel' ]), output() ])),

  // https://www.autohotkey.com/docs/v1/lib/Send.htm
  ...commands([ 'Send', 'SendRaw', 'SendInput', 'SendPlay', 'SendEvent' ], signature([ sendKeys() ])),

  // https://www.autohotkey.com/docs/v1/lib/SendLevel.htm
  command('SendLevel', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SendMode.htm
  command('SendMode', signature([ keyword([ 'Event', 'Input', 'InputThenPlay', 'Play' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetBatchLines.htm
  command('SetBatchLines', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetNumScrollCapsLockState.htm
  ...commands([ 'SetCapsLockState', 'SetNumLockState', 'SetScrollLockState' ], signature([ onOff([ 'AlwaysOn', 'AlwaysOff' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetControlDelay.htm
  command('SetControlDelay', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetDefaultMouseSpeed.htm
  command('SetDefaultMouseSpeed', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetEnv.htm
  command('SetEnv', signature([ input(), unquoted() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/SetFormat.htm
  command('SetFormat', signature([ unquoted(), unquoted() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/SetKeyDelay.htm
  command('SetKeyDelay', signature([ expression(), expression(), keyword([ 'Play', '-1' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetMouseDelay.htm
  command('SetMouseDelay', signature([ expression(), keyword([ 'Play', '-1' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetRegView.htm
  command('SetRegView', signature([ keyword([ '32', '64', 'Default' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetStoreCapsLockMode.htm
  command('SetStoreCapsLockMode', signature([ onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetTimer.htm
  command('SetTimer', signature([ unquoted(), options([ 'On', 'Off', 'Delete' ]), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetTitleMatchMode.htm
  command('SetTitleMatchMode', signature([ keyword([ '1', '2', '3', 'RegEx', 'Fast', 'Slow' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetWinDelay.htm
  command('SetWinDelay', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetWorkingDir.htm
  command('SetWorkingDir', signature([ path() ])),

  // https://www.autohotkey.com/docs/v1/lib/Sleep.htm
  command('Sleep', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/Sort.htm
  command('Sort', signature([ input(), options([ 'C', 'CL', 'D<number>', 'F<name>', 'N', 'P<number>', 'R', 'Random', 'U', 'Z', '\\' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundBeep.htm
  command('SoundBeep', signature([ expression(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundGet.htm
  command('SoundGet', signature([ output(), soundComponent(), soundControlType(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundGetWaveVolume.htm
  command('SoundGetWaveVolume', signature([ output(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundPlay.htm
  command('SoundPlay', signature([ path(), keyword([ 'Wait', '1' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundSet.htm
  command('SoundSet', signature([ expression(), soundComponent(), soundControlType(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundSetWaveVolume.htm
  command('SoundSetWaveVolume', signature([ expression(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/SplashTextOn.htm
  command('SplashTextOn', signature([ expression(), expression(), unquoted(), unquoted() ]), CommandFlag.Deprecated),
  command('SplashTextOff', signature([]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/SplitPath.htm
  command('SplitPath', signature([ input(), output(), output(), output(), output(), output() ])),

  // https://www.autohotkey.com/docs/v1/lib/StatusBarGetText.htm
  command('StatusBarGetText', signature([ output(), expression(), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/StatusBarWait.htm
  command('StatusBarWait', signature([ unquoted(), expression(), expression(), winTitle(), unquoted(), expression(), winTitle(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/StringCaseSense.htm
  command('StringCaseSense', signature([ onOff([ 'Locale' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/StringGetPos.htm
  command('StringGetPos', signature([ output(), input(), unquoted(), options([ 'L<number>', 'R<number>' ]), expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringLeft.htm
  ...commands([ 'StringLeft', 'StringRight' ], signature([ output(), input(), expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringLen.htm
  command('StringLen', signature([ output(), input() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringLower.htm
  ...commands([ 'StringLower', 'StringUpper' ], signature([ output(), input(), keyword([ 'T' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/StringMid.htm
  command('StringMid', signature([ output(), input(), expression(), expression(), keyword([ 'L' ]) ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringReplace.htm
  command('StringReplace', signature([ output(), input(), unquoted(), unquoted(), keyword([ 'All', 'A', '1' ]) ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringSplit.htm
  command('StringSplit', signature([ output(), input(), unquoted(), unquotedShouldEscapeComma() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringTrimLeft.htm
  ...commands([ 'StringTrimLeft', 'StringTrimRight' ], signature([ output(), input(), expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/SysGet.htm
  command('SysGet', [
    signature([ output(), subcommand([ 'MonitorCount', 'MonitorPrimary' ]) ]),
    signature([ output(), subcommand([ 'Monitor', 'MonitorWorkArea', 'MonitorName' ]), unquoted() ]),
    signature([ output(), unquoted() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/Thread.htm
  command('Thread', [
    signature([ subcommand([ 'NoTimers', 'Priority' ]), expression() ]),
    signature([ subcommand('Interrupt'), unquoted(), unquoted() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/ToolTip.htm
  command('ToolTip', signature([ unquoted(), expression(), expression(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/Transform.htm
  command('Transform', [
    signature([ output(), subcommand([ 'Unicode', 'Deref', 'Asc', 'Chr', 'Exp', 'Sqrt', 'Log', 'Ln', 'Ceil', 'Floor', 'Abs', 'Sin', 'Cos', 'Tan', 'ASin', 'ACos', 'ATan', 'BitNot' ]), unquoted() ]),
    signature([ output(), subcommand([ 'HTML', 'Mod', 'Round', 'Pow', 'BitAnd', 'BitOr', 'BitXOr', 'BitShiftLeft', 'BitShiftRight' ]), unquoted(), unquoted() ]),
  ], CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/TrayTip.htm
  command('TrayTip', signature([ unquoted(), unquoted(), expression(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/URLDownloadToFile.htm
  command('UrlDownloadToFile', signature([ unquoted(), path() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinActivate.htm
  command('WinActivate', signature(winParams)),

  // https://www.autohotkey.com/docs/v1/lib/WinActivateBottom.htm
  command('WinActivateBottom', signature(winParams)),

  // https://www.autohotkey.com/docs/v1/lib/WinClose.htm
  command('WinClose', signature([ winTitle(), unquoted(), expression(), winTitle(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinGetActiveStats.htm
  command('WinGetActiveStats', signature([ output(), output(), output(), output(), output(), output() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinGetActiveTitle.htm
  command('WinGetActiveTitle', signature([ output() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinGetClass.htm
  command('WinGetClass', signature([ output(), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/WinGet.htm
  command('WinGet', signature([ output(), subcommand([ 'ID', 'IDLast', 'PID', 'ProcessName', 'ProcessPath', 'Count', 'List', 'MinMax', 'ControlList', 'ControlListHwnd', 'Transparent', 'TransColor', 'Style', 'ExStyle' ]), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/WinGetPos.htm
  command('WinGetPos', signature([ output(), output(), output(), output(), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/WinGetText.htm
  command('WinGetText', signature([ output(), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/WinGetTitle.htm
  command('WinGetTitle', signature([ output(), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/WinHide.htm
  command('WinHide', signature(winParams)),

  // https://www.autohotkey.com/docs/v1/lib/WinKill.htm
  command('WinKill', signature([ winTitle(), unquoted(), expression(), winTitle(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinMaximize.htm
  command('WinMaximize', signature(winParams)),

  // https://www.autohotkey.com/docs/v1/lib/WinMenuSelectItem.htm
  command('WinMenuSelectItem', signature([ winTitle(), unquoted(), unquoted(), unquoted(), unquoted(), unquoted(), unquoted(), unquoted(), winTitle(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinMinimize.htm
  command('WinMinimize', signature(winParams)),

  // https://www.autohotkey.com/docs/v1/lib/WinMinimizeAll.htm
  ...commands([ 'WinMinimizeAll', 'WinMinimizeAllUndo' ], signature([])),

  // https://www.autohotkey.com/docs/v1/lib/WinMove.htm
  command('WinMove', signature([ winTitle(), unquoted(), expression(), expression(), expression(), expression(), winTitle(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinRestore.htm
  command('WinRestore', signature(winParams)),

  // https://www.autohotkey.com/docs/v1/lib/WinSet.htm
  command('WinSet', [
    signature([ subcommand('AlwaysOnTop'), onOffToggle(), ...winParams ]),
    signature([ subcommand([ 'Transparent', 'TransColor' ]), unquoted(), ...winParams ]),
    signature([ subcommand([ 'Style', 'ExStyle' ]), style(), ...winParams ]),
    signature([ subcommand([ 'Bottom', 'Top', 'Disable', 'Enable', 'Redraw' ]), blank(), ...winParams ]),
    signature([ subcommand('Region'), options([ 'W<number>', 'H<number>', '<number>-<number>', 'E', 'R<number>-<number>' ]), ...winParams ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/WinSetTitle.htm
  command('WinSetTitle', signature([ winTitle(), unquoted(), unquoted(), winTitle(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinShow.htm
  command('WinShow', signature(winParams)),

  // https://www.autohotkey.com/docs/v1/lib/WinWait.htm
  command('WinWait', signature([ winTitle(), unquoted(), expression(), winTitle(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinWaitActive.htm
  ...commands([ 'WinWaitActive', 'WinWaitNotActive' ], signature([ winTitle(), unquoted(), expression(), winTitle(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinWaitClose.htm
  command('WinWaitClose', signature([ winTitle(), unquoted(), expression(), winTitle(), unquoted() ])),
] as const;
// #endregion commands

// #region helpers
export function command(name: string, signatureOrSignatures: CommandSignature | CommandSignature[], flags: CommandFlag = CommandFlag.None): CommandDefinition {
  const signatures = Array.isArray(signatureOrSignatures) ? signatureOrSignatures : [ signatureOrSignatures ];
  return { name, signatures, flags };
}
export function commands(names: string[], signatureOrSignatures: CommandSignature | CommandSignature[], flags: CommandFlag = CommandFlag.None): CommandDefinition[] {
  return names.map((name) => command(name, signatureOrSignatures, flags));
}
export function signature(parameters: CommandParameter[], flags: CommandSignatureFlag = CommandSignatureFlag.None): CommandSignature {
  return { flags, parameters };
}
export function subcommand(subcommand: string | string[], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  const subcommands = Array.isArray(subcommand) ? subcommand : [ subcommand ];
  return { type: HighlightType.SubCommand, flags, values: subcommands };
}
export function guiSubcommand(subcommand: string | string[], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  const subcommands = Array.isArray(subcommand) ? subcommand : [ subcommand ];
  return { type: HighlightType.GuiSubCommand, flags, values: subcommands };
}
export function blank(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.Blank, flags };
}
export function unquoted(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.UnquotedString, flags, values };
}
export function unquotedShouldEscapeComma(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.UnquotedStringShouldEscapeComma, flags, values };
}
export function expression(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.Expression, flags };
}
export function style(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.Style, flags };
}
export function options(values: string[], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.Options, flags, values };
}
export function combiOptions(values: string[], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.CombiOptions, flags, values };
}
export function guiOptions(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return options([ '<+|->AlwaysOnTop', '<+|->Border', '<+|->Caption', '<+|->DelimiterSpace', '<+|->DelimiterTab', '<+|->Delimiter<string>', '<+|->Disabled', '<+|->DPIScale', 'Hwnd<name>', '<+|->Label<name>', '<+|->LastFound<name>', '<+|->LastFoundExist', '<+|->MaximizeBox', '<+|->MinimizeBox', '<+|->MinSize<size>', '<+|->MaxSize<size>', '<+|->OwnDialogs', '<+|->Owner', '<+|->Parent', '<+|->Resize', '<+|->SysMenu', '<+|->Theme', '<+|->ToolWindow' ], flags);
}
export function keyword(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.Enum, flags, values };
}
export function input(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.Input, flags };
}
export function output(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.Output, flags };
}
export function menuOptions(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return options([ 'P<decimal>', '<+|->Radio', '<+|->Right', '<+|->Break', '<+|->BarBreak', ...values ], flags);
}
export function winTitle(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ 'ahk_class', 'ahk_id', 'ahk_pid', 'ahk_exe', 'ahk_group' ], flags);
}
export function control(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ 'ahk_id' ], flags);
}
export function controlOrPos(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return options([ 'ahk_id', 'X<decimal>', 'Y<decimal>' ], flags);
}
export function controlType(): CommandParameter {
  return keyword([ 'ActiveX', 'Button', 'CheckBox', 'ComboBox', 'Custom', 'DateTime', 'DropDownList', 'DDL', 'Edit', 'GroupBox', 'Hotkey', 'Link', 'ListBox', 'ListView', 'MonthCal', 'Picture', 'Pic', 'Progress', 'Radio', 'Slider', 'StatusBar', 'Tab', 'Tab2', 'Tab3', 'Text', 'TreeView', 'UpDown' ]);
}
export function controlOptions(): CommandParameter {
  return keyword([ 'R<number>', 'W<number>', 'H<number>', 'WP<number>', 'HP<number>', 'X<number>', 'Y<number>', 'X+<number>', 'Y+<number>', 'XP+<number>', 'YP+<number>', 'XM+<number>', 'YM+<number>', 'XS+<number>', 'YS+<number>', 'V<name>', 'G<name>', 'AltSubmit', 'C<hex>', 'CDefault', 'Choose<number>', 'Disabled<onoff>', 'Hidden<onoff>', 'Left', 'Right', 'Center', 'Section', '<+|->Tabstop', '<+|->Wrap', '<+|->VScroll<number>', '<+|->HScroll<number>', '<+|->BackgroundTrans', '<+|->Background', '<+|->Border', 'Hwnd<name>', '<+|->Theme' ]);
}
export function onOff(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return keyword([ 'On', 'Off', '1', '0', ...values ], flags);
}
export function onOffToggle(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return onOff([ 'Toggle', ...values ], flags);
}
export function whichButton(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ 'Left', 'L', 'Right', 'R', 'Middle', 'M', 'WheelUp', 'WU', 'WheelDown', 'WD', 'WheelLeft', 'WL', 'WheelRight', 'WR' ], flags);
}
export function path(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.UnquotedString, flags, values };
}
export function imagePath(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return path([ 'HBITMAP:' ], flags);
}
export function glob(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.UnquotedString, flags, values: [] };
}
export function encoding(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ 'CP0', 'UTF-8', 'UTF-8-RAW', 'UTF-16', 'UTF-16-RAW', 'CP<number>' ], flags);
}
export function keyName(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ ...values ], flags);
}
export function hotkeyName(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return keyName([ '#', '!', '^', '+', '^', '+', '&', '<', '>', '<^>!', '*', '~', '$', 'Up' ], flags);
}
export function sendKeys(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([], flags);
}
export function timeunit(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return keyword([ 'Seconds', 'S', 'Minutes', 'M', 'Hours', 'H', 'Days', 'D' ], flags);
}
export function formatTime(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ 'd', 'dd', 'ddd', 'dddd', 'M', 'MM', 'MMM', 'MMMM', 'y', 'yy', 'yyyy', 'gg', 'h', 'hh', 'H', 'HH', 'm', 'mm', 's', 'ss', 't', 'tt' ], CommandParameterFlag.IgnoreCase | flags);
}
export function color(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([], flags);
}
export function soundComponent(): CommandParameter {
  return options([ 'MASTER', 'SPEAKERS', 'DIGITAL', 'LINE', 'MICROPHONE', 'SYNTH', 'CD', 'TELEPHONE', 'PCSPEAKER', 'WAVE', 'AUX', 'ANALOG', 'HEADPHONES', 'N/A' ]);
}
export function soundControlType(): CommandParameter {
  return options([ 'VOLUME', 'VOL', 'ONOFF', 'MUTE', 'MONO', 'LOUDNESS', 'STEREOENH', 'BASSBOOST', 'PAN', 'QSOUNDPAN', 'BASS', 'TREBLE', 'EQUALIZER' ]);
}
// #endregion helpers
