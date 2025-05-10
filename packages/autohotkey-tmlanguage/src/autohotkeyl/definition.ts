import * as patterns_v1 from '../autohotkeyl/patterns';
import * as constants_common from '../common/constants';
import { CommandFlag, CommandParameterFlag, CommandSignatureFlag, HighlightType } from '../constants';
import { alt, char, endAnchor, group, groupMany1, ignoreCase, inlineSpace, inlineSpaces0, lookahead, lookbehind, negChars0, negChars1, numbers0, numbers1, optional, optseq, ordalt, seq, textalt } from '../oniguruma';
import type { CommandDefinition, CommandParameter, CommandSignature, SubCommandParameter } from '../types';

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
  command('#Hotstring', signature([ unquoted([ optionItem('NoMouse', 'EndChars', 'SI', 'SP', 'SE', 'X'), toggleOptionItem('*', '?', 'B', 'C', 'O', 'R', 'T', 'Z'), decimalOptionItem('P'), signedNumberOptionItem('K') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/_If.htm
  command('#If', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/_IfTimeout.htm
  command('#IfTimeout', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/_IfWinActive.htm
  command('#IfWinActive', signature([ winTitle(), unquoted() ])),
  command('#IfWinNotActive', signature([ winTitle(), unquoted() ])),
  command('#IfWinExist', signature([ winTitle(), unquoted() ])),
  command('#IfWinNotExist', signature([ winTitle(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/_InputLevel.htm
  command('#InputLevel', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/_InstallKeybdHook.htm
  command('#InstallKeybdHook', signature([])),

  // https://www.autohotkey.com/docs/v1/lib/_InstallMouseHook.htm
  command('#InstallMouseHook', signature([])),

  // https://www.autohotkey.com/docs/v1/lib/_KeyHistory.htm
  command('#KeyHistory', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/Scripts.htm#LTrim
  command('#LTrim', signature([ keywordOnly([ optionItem('Off') ]) ])),

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
  command('#SingleInstance', signature([ keywordOnly([ optionItem('Force', 'Ignore', 'Prompt', 'Off') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/_UseHook.htm
  command('#UseHook', signature([ onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/_Warn.htm
  command('#Warn', signature([ keywordOnly([ optionItem('UseUnsetLocal', 'UseUnsetGlobal', 'UseEnv', 'LocalSameAsGlobal', 'ClassOverwrite', 'Unreachable', 'All') ]), keywordOnly([ optionItem('MsgBox', 'StdOut', 'OutputDebug', 'Off') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/_WinActivateForce.htm
  command('#WinActivateForce', signature([])),
];
// #endregion directives

// #region loop
export const loopCommandDefenitions: CommandDefinition[] = [
  command('Loop', [
    // https://www.autohotkey.com/docs/v1/lib/LoopFile.htm
    signature([ flowSubcommand('Files'), path(), letterOptions([ letterOptionItem('D', 'F', 'R') ]) ]),

    // https://www.autohotkey.com/docs/v1/lib/LoopParse.htm
    signature([ flowSubcommand('Parse'), input(), unquoted([ optionItem('CSV') ]), unquotedShouldEscapeComma() ]),

    // https://www.autohotkey.com/docs/v1/lib/LoopReadFile.htm
    signature([ flowSubcommand('Read'), path(), unquotedShouldEscapeComma() ]),

    // https://www.autohotkey.com/docs/v1/lib/LoopReg.htm#new
    signature([ flowSubcommand('Reg'), unquoted(), letterOptions([ letterOptionItem('K', 'V', 'R') ]) ]),
  ]),
];
// #endregion loop

// #region commands
export const commandDefinitions: CommandDefinition[] = [
  // https://www.autohotkey.com/docs/v1/lib/AutoTrim.htm
  command('AutoTrim', signature([ onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/BlockInput.htm
  command('BlockInput', signature([ onOff([ optionItem('Send', 'Mouse', 'SendAndMouse', 'Default', 'MouseMove', 'MouseMoveOff') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/Click.htm
  command('Click', signature([ unquotedWithNumber([ optionItem('Left', 'L', 'Right', 'R', 'Middle', 'M', 'X1', 'X2', 'Up', 'U', 'Down', 'D') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/ClipWait.htm
  command('ClipWait', signature([ expression(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/Control.htm
  command(
    'Control',
    [
      signature([ subcommand([ 'Check', 'UnCheck', 'Enable', 'Disable', 'Show', 'Hide', 'ShowDropDown', 'HideDropDown' ]), blank(), control(), ...winParams ]),
      signature([ subcommand([ 'Style', 'ExStyle' ]), style(), control(), ...winParams ]),
      signature([ subcommand([ 'TabLeft', 'TabRight', 'Add', 'Delete', 'Choose', 'ChooseString', 'EditPaste' ]), unquoted(), control(), ...winParams ]),
      signature([ restParams() ]),
    ],
  ),

  // https://www.autohotkey.com/docs/v1/lib/ControlClick.htm
  command('ControlClick', signature([ controlOrPos(), winTitle(), unquoted(), whichButton(), expression(), unquoted([ optionItem('NA', 'D', 'U', 'Pos'), decimalOptionItem('X', 'Y') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlFocus.htm
  command('ControlFocus', signature([ control(), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlGet.htm
  command('ControlGet', [
    signature([ output(), subcommand('List'), unquoted([ optionItem('Selected'), optionItem('Focused'), optionItem('Col'), optionItem('Count') ]), control(), ...winParams ]),
    signature([ output(), subcommand([ 'Checked', 'Enabled', 'Visible', 'Tab', 'Choice', 'LineCount', 'CurrentLine', 'CurrentCol', 'Selected', 'Style', 'ExStyle', 'Hwnd' ]), blank(), control(), ...winParams ]),
    signature([ output(), subcommand([ 'FindString', 'Line' ]), unquoted(), control(), ...winParams ]),
    signature([ output(), restParams() ]),
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
  command('ControlSend', signature([ control(), sendKeys(), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlSendRaw.htm
  command('ControlSendRaw', signature([ control(), unquoted(), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlSetText.htm
  command('ControlSetText', signature([ control(), unquoted(), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/CoordMode.htm
  command('CoordMode', signature([ keywordOnly([ optionItem('ToolTip', 'Pixel', 'Mouse', 'Caret', 'Menu') ]), keywordOnly([ optionItem('Screen', 'Relative', 'Window', 'Client') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/Critical.htm
  command('Critical', signature([ unquoted([ optionItem('On', 'Off') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/DetectHiddenText.htm
  command('DetectHiddenText', signature([ onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/DetectHiddenWindows.htm
  command('DetectHiddenWindows', signature([ onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/Drive.htm
  command('Drive', [
    signature([ subcommand('Eject'), unquoted(), keywordOnly([ optionItem('1') ]) ]),
    signature([ subcommand('Label'), unquoted(), unquoted() ]),
    signature([ subcommand([ 'Lock', 'Unlock' ]), unquoted() ]),
    signature([ restParams() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/DriveGet.htm
  command('DriveGet', [
    signature([ output(), subcommand('List'), keywordOnly([ optionItem('CDROM', 'REMOVABLE', 'FIXED', 'NETWORK', 'RAMDISK', 'UNKNOWN') ]) ]),
    signature([ output(), subcommand([ 'Capacity', 'Cap', 'FileSystem', 'FS', 'Label', 'Serial', 'Type', 'Status', 'StatusCD' ]), unquoted() ]),
    signature([ output(), restParams() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/DriveSpaceFree.htm
  command('DriveSpaceFree', signature([ output(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/Edit.htm
  command('Edit', signature([])),

  // https://www.autohotkey.com/docs/v1/lib/EnvAdd.htm
  command('EnvAdd', signature([ input(), expression(), timeunit() ])),

  // https://www.autohotkey.com/docs/v1/lib/EnvDiv.htm
  command('EnvDiv', signature([ input(), expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/EnvGet.htm
  command('EnvGet', signature([ input(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/EnvMult.htm
  command('EnvMult', signature([ input(), expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/EnvSet.htm
  command('EnvSet', signature([ unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/EnvSub.htm
  command('EnvSub', signature([ input(), expression(), timeunit() ])),

  // https://www.autohotkey.com/docs/v1/lib/EnvUpdate.htm
  command('EnvUpdate', signature([])),

  // https://www.autohotkey.com/docs/v1/lib/FileAppend.htm
  command('FileAppend', signature([ unquoted(), path(), encoding() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileCopy.htm
  command('FileCopy', signature([ glob(), glob(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileCopyDir.htm
  command('FileCopyDir', signature([ path(), path(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileCreateDir.htm
  command('FileCreateDir', signature([ path() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileCreateShortcut.htm
  command('FileCreateShortcut', signature([ path(), path(), path(), unquoted(), unquoted(), path(), unquoted(), expression(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileDelete.htm
  command('FileDelete', signature([ glob() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileEncoding.htm
  command('FileEncoding', signature([ encoding() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileInstall.htm
  command('FileInstall', signature([ path(), path(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileGetAttrib.htm
  command('FileGetAttrib', signature([ output(), path() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileGetShortcut.htm
  command('FileGetShortcut', signature([ path(), output(), output(), output(), output(), output(), output(), output() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileGetSize.htm
  command('FileGetSize', signature([ output(), path(), keywordOnly([ optionItem('B', 'K', 'M') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/FileGetTime.htm
  command('FileGetTime', signature([ output(), path(), keywordOnly([ optionItem('M', 'C', 'A') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/FileGetVersion.htm
  command('FileGetVersion', signature([ output(), path() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileMove.htm
  command('FileMove', signature([ glob(), glob(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileMoveDir.htm
  command('FileMoveDir', signature([ path(), path(), keywordOnly([ optionItem('0', '1', '2', 'R') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/FileRead.htm
  command('FileRead', signature([ output(), path([ optionItem('*c', '*t'), decimalOptionItem('*m', '*P') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/FileReadLine.htm
  command('FileReadLine', signature([ output(), path(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileRecycle.htm
  command('FileRecycle', signature([ glob() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileRecycleEmpty.htm
  command('FileRecycleEmpty', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileRemoveDir.htm
  command('FileRemoveDir', signature([ path(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileSelectFile.htm
  command('FileSelectFile', signature([ output(), unquoted([ optionItem('M', 'S') ]), path(), unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileSelectFolder.htm
  command('FileSelectFolder', signature([ output(), unquoted(), expression(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileSetAttrib.htm
  command('FileSetAttrib', signature([ fileAttributes(), glob(), expression(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileSetTime.htm
  command('FileSetTime', signature([ expression(), glob(), keywordOnly([ letterOptionItem('M', 'C', 'A') ]), expression(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FormatTime.htm
  command('FormatTime', [
    signature([ output(), unquoted(), subcommandlike([ optionItem('Time', 'ShortDate', 'LongDate', 'YearMonth', 'YDay', 'YDay0', 'WDay', 'YWeek') ]), restParams() ]),
    signature([ output(), unquoted(), formatTime() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/GetKeyState.htm#command
  command('GetKeyState', signature([ output(), keywordOnly([ optionItem('P', 'T') ]) ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/GroupActivate.htm
  command('GroupActivate', signature([ unquoted(), keywordOnly([ optionItem('R') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/GroupAdd.htm
  command('GroupAdd', signature([ unquoted(), winTitle(), unquoted(), unquoted(), winTitle(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/GroupClose.htm
  command('GroupClose', signature([ unquoted(), keywordOnly([ optionItem('R', 'A') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/GroupDeactivate.htm
  command('GroupDeactivate', signature([ unquoted(), keywordOnly([ optionItem('R') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/Gui.htm
  command('Gui', [
    signature([ guiSubcommand('New'), guiOptions(), unquoted() ]),
    signature([ guiSubcommand('Add'), guiControlType(), guiControlOptions(), unquoted() ]),
    signature([ guiSubcommand('Show'), unquoted([ optionItem('xCenter', 'yCenter', 'AutoSize', 'Minimize', 'Maximize', 'Restore', 'NoActivate', 'NA', 'Hide', 'Center'), numberOptionItem('W', 'H', 'X', 'Y') ]), unquoted() ]),
    signature([ guiSubcommand('Submit'), keywordOnly([ optionItem('NoHide') ]) ]),
    signature([ guiSubcommand([ 'Cancel', 'Hide', 'Destroy', 'Minimize', 'Maximize', 'Restore', 'Default' ]), restParams() ]),
    signature([ guiSubcommand('Font'), unquoted([ colorOptionItem('C'), numberOptionItem('S', 'W', 'Q') ]), unquoted() ]),
    signature([ guiSubcommand('Color'), color(), color() ]),
    signature([ guiSubcommand('Margin'), unquotedWithNumber(), unquotedWithNumber() ]),
    signature([ guiSubcommand('Menu'), unquoted() ]),
    signature([ guiSubcommand('Flash'), keywordOnly([ 'Off' ]) ]),
    signature([ guiOptions() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/GuiControl.htm
  command('GuiControl', [
    signature([ guiSubcommand([ 'Text', 'Choose', 'ChooseString' ]), control(), unquoted() ]),
    signature([ guiSubcommand([ 'Move', 'MoveDraw' ]), control(), controlMoveOptions() ]),
    signature([ guiSubcommand([ 'Focus', 'Disable', 'Enable', 'Hide', 'Show', 'Font' ]), control() ]),
    signature([ flagedGuiControlOptions(), control(), unquoted() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/GuiControlGet.htm
  command('GuiControlGet', [
    signature([ output(), guiSubcommand([ 'Pos', 'Focus', 'FocusV', 'Visible', 'Hwnd', 'Name' ]), control() ]),
    signature([ output(), blank(), control(), unquoted() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/Hotkey.htm
  command('Hotkey', [
    signature([ subcommand([ 'IfWinActive', 'IfWinExist' ]), winTitle(), unquoted() ]),
    signature([ subcommand('If'), expression(), restParams() ]),
    signature([ hotkeyName(), unquoted([ optionItem('On', 'Off', 'Toggle', 'AltTab') ]), unquoted([ optionItem('UseErrorLevel', 'On', 'Off', 'B', 'B0'), numberOptionItem('P', 'T', 'I') ]) ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/ImageSearch.htm
  command('ImageSearch', signature([ output(), output(), expression(), expression(), expression(), expression(), unquoted([ stringOptionItem('HBITMAP:'), numberOptionItem('*Icon', '*', '*Trans', '*w', '*h') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/IniDelete.htm
  command('IniDelete', signature([ path(), unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/IniRead.htm
  command('IniRead', signature([ output(), path(), unquoted(), unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/IniWrite.htm
  command('IniWrite', signature([ unquoted(), unquoted(), path(), unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/Input.htm
  command('Input', signature([ output(), unquoted([ optionItem('B', 'C', 'V', '*', 'E', 'M'), numberOptionItem('I', 'L', 'T') ]), unquoted([ endKeyOptionItem() ]), unquoted([ matchKeyOptionItem() ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/InputBox.htm
  command('InputBox', signature([ output(), unquoted(), unquoted(), unquoted(), expression(), expression(), expression(), expression(), unquoted(), expression(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/KeyHistory.htm
  command('KeyHistory', signature([])),

  // https://www.autohotkey.com/docs/v1/lib/KeyWait.htm
  command('KeyWait', signature([ keyName(), unquoted([ optionItem('D', 'L'), decimalOptionItem('T') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/ListHotkeys.htm
  command('ListHotkeys', signature([])),

  // https://www.autohotkey.com/docs/v1/lib/ListLines.htm
  command('ListLines', signature([ onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/ListVars.htm
  command('ListVars', signature([])),

  // https://www.autohotkey.com/docs/v1/lib/Menu.htm
  command('Menu', [
    signature([ subcommand('Tray'), subcommand('Icon'), imagePath(), unquoted(), unquoted() ]),
    signature([ subcommand('Tray'), subcommand([ 'Tip', 'Click' ]), unquoted() ]),
    signature([ subcommand('Tray'), subcommand([ 'MainWindow', 'NoMainWindow', 'NoIcon' ]), restParams() ]),
    signature([ subcommand('Tray'), unquoted(), path(), unquoted(), unquoted() ]),
    signature([ unquoted(), subcommand('Add'), menuItemName(), unquoted(), menuOptions() ]),
    signature([ unquoted(), subcommand('Insert'), menuItemName(), unquoted(), unquoted(), menuOptions() ]),
    signature([ unquoted(), subcommand([ 'DeleteAll', 'NoDefault', 'Standard', 'NoStandard' ]), restParams() ]),
    signature([ unquoted(), subcommand([ 'Delete', 'Check', 'Uncheck', 'ToggleCheck', 'Enable', 'Disable', 'ToggleEnable', 'Default', 'NoIcon' ]), menuItemName() ]),
    signature([ unquoted(), subcommand('Rename'), menuItemName(), menuItemName() ]),
    signature([ unquoted(), subcommand('Icon'), unquoted(), path(), unquoted(), imagePath() ]),
    signature([ unquoted(), subcommand('UseErrorLevel'), keywordOnly([ optionItem('Off') ]) ]),
    signature([ unquoted(), subcommand([ 'Show', 'Color' ]), unquoted(), unquoted() ]),
    signature([ restParams() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/MouseClick.htm
  command('MouseClick', signature([ whichButton(), expression(), expression(), expression(), expression(), keywordOnly([ optionItem('D', 'U') ]), keywordOnly([ optionItem('R') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/MouseClickDrag.htm
  command('MouseClickDrag', signature([ whichButton(), expression(), expression(), expression(), expression(), expression(), keywordOnly([ optionItem('R') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/MouseGetPos.htm
  command('MouseGetPos', signature([ output(), output(), output(), output(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/MouseMove.htm
  command('MouseMove', signature([ expression(), expression(), expression(), keywordOnly([ optionItem('R') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/MsgBox.htm
  command('MsgBox', signature([ unquoted(), unquoted(), unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/OnExit.htm#command
  command('OnExit', signature([ unquoted() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/OutputDebug.htm
  command('OutputDebug', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/Pause.htm
  command('Pause', signature([ onOffToggle(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/PixelGetColor.htm
  command('PixelGetColor', signature([ output(), expression(), expression(), spacedKeywordsOnly([ optionItem('Alt', 'Slow', 'RGB') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/PixelSearch.htm
  command('PixelSearch', signature([ output(), output(), expression(), expression(), expression(), expression(), expression(), expression(), spacedKeywordsOnly([ optionItem('Fast', 'RGB') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/PostMessage.htm
  command('PostMessage', signature([ expression(), expression(), expression(), control(), ...winParams ])),
  command('SendMessage', signature([ expression(), expression(), expression(), control(), ...winParams, expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/Process.htm
  command('Process', [
    signature([ subcommand([ 'Exist', 'Close' ]), unquoted() ]),
    signature([ subcommand([ 'Wait', 'WaitClose' ]), unquoted(), unquoted() ]),
    signature([ subcommand([ 'Priority' ]), unquoted(), keywordOnly([ optionItem('Low', 'L', 'BelowNormal', 'B', 'Normal', 'N', 'AboveNormal', 'A', 'High', 'H', 'Realtime', 'R') ]) ]),
    signature([ subcommand([ 'List' ]), restParams() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/Progress.htm
  command('Progress', [
    signature([ subcommandlike('Off'), restParams() ]),
    signature([ unquoted(), unquoted(), unquoted(), winTitle(), unquoted() ]),
  ], CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/Random.htm
  command('Random', signature([ output(), expression(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/RegDelete.htm
  command('RegDelete', signature([ unquoted(), unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/RegRead.htm
  command('RegRead', signature([ output(), unquoted(), unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/RegWrite.htm
  command('RegWrite', signature([ keywordOnly([ optionItem('REG_SZ', 'REG_EXPAND_SZ', 'REG_MULTI_SZ', 'REG_DWORD', 'REG_BINARY') ]), unquoted(), unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/Reload.htm
  command('Reload', signature([])),

  // https://www.autohotkey.com/docs/v1/lib/Run.htm
  command('Run', signature([ unquoted(), path(), spacedKeywordsOnly([ optionItem('Max', 'Min', 'Hide', 'UseErrorLevel') ]), output() ])),

  // https://www.autohotkey.com/docs/v1/lib/RunWait.htm
  command('RunWait', signature([ unquoted(), path(), spacedKeywordsOnly([ optionItem('Max', 'Min', 'Hide', 'UseErrorLevel') ]), output() ])),

  // https://www.autohotkey.com/docs/v1/lib/Send.htm
  command('Send', signature([ sendKeys() ])),

  // https://www.autohotkey.com/docs/v1/lib/SendRaw.htm
  command('SendRaw', signature([ sendKeys() ])),

  // https://www.autohotkey.com/docs/v1/lib/SendInput.htm
  command('SendInput', signature([ sendKeys() ])),

  // https://www.autohotkey.com/docs/v1/lib/SendPlay.htm
  command('SendPlay', signature([ sendKeys() ])),

  // https://www.autohotkey.com/docs/v1/lib/SendEvent.htm
  command('SendEvent', signature([ sendKeys() ])),

  // https://www.autohotkey.com/docs/v1/lib/SendLevel.htm
  command('SendLevel', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SendMode.htm
  command('SendMode', signature([ keywordOnly([ optionItem('Event', 'Input', 'InputThenPlay', 'Play') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetBatchLines.htm
  command('SetBatchLines', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetNumScrollCapsLockState.htm
  command('SetCapsLockState', signature([ onOff([ optionItem('AlwaysOn', 'AlwaysOff') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetControlDelay.htm
  command('SetControlDelay', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetDefaultMouseSpeed.htm
  command('SetDefaultMouseSpeed', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetEnv.htm
  command('SetEnv', signature([ input(), unquoted() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/SetFormat.htm
  command('SetFormat', signature([ unquoted(), unquoted() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/SetKeyDelay.htm
  command('SetKeyDelay', signature([ expression(), expression(), keywordOnly([ optionItem('Play', '-1') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetMouseDelay.htm
  command('SetMouseDelay', signature([ expression(), keywordOnly([ optionItem('Play', '-1') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetNumLockState.htm
  command('SetNumLockState', signature([ onOff([ optionItem('AlwaysOn', 'AlwaysOff') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetScrollLockState.htm
  command('SetScrollLockState', signature([ onOff([ optionItem('AlwaysOn', 'AlwaysOff') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetRegView.htm
  command('SetRegView', signature([ keywordOnly([ optionItem('32', '64', 'Default') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetStoreCapsLockMode.htm
  command('SetStoreCapsLockMode', signature([ onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetTimer.htm
  command('SetTimer', signature([ unquoted(), keywordOnly([ optionItem('On', 'Off', 'Delete') ]), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetTitleMatchMode.htm
  command('SetTitleMatchMode', signature([ keywordOnly([ optionItem('1', '2', '3', 'RegEx', 'Fast', 'Slow') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetWinDelay.htm
  command('SetWinDelay', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetWorkingDir.htm
  command('SetWorkingDir', signature([ path() ])),

  // https://www.autohotkey.com/docs/v1/lib/Sleep.htm
  command('Sleep', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/Sort.htm
  command('Sort', signature([ input(), unquoted([ optionItem('C', 'CL', 'N', 'R', 'Random', 'U', 'Z', '\\'), numberOptionItem('D', 'P'), identifierOptionItem('F') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundBeep.htm
  command('SoundBeep', signature([ expression(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundGet.htm
  command('SoundGet', signature([ output(), soundComponent(), soundControlType(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundGetWaveVolume.htm
  command('SoundGetWaveVolume', signature([ output(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundPlay.htm
  command('SoundPlay', signature([ path(), keywordOnly([ optionItem('Wait', '1') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundSet.htm
  command('SoundSet', signature([ expression(), soundComponent(), soundControlType(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundSetWaveVolume.htm
  command('SoundSetWaveVolume', signature([ expression(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/SplashImage.htm
  command('SplashImage', [
    signature([ subcommandlike('Off'), restParams() ]),
    signature([
      imagePath(), unquoted([
        optionItem('A', 'T', 'Hide'),
        numberOptionItem('B', 'M', 'P', 'H', 'W', 'X', 'Y', 'C', 'ZH', 'ZW', 'ZX', 'ZY', 'FM', 'FS', 'WM', 'WS'),
        colorOptionItem('CB', 'CT', 'CW'),
        sizeOptionItem('R'),
      ]), unquoted(), unquoted(), winTitle(), unquoted(),
    ]),
  ], CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/SplashTextOn.htm
  command('SplashTextOn', signature([ expression(), expression(), unquoted(), unquoted() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/SplashTextOff.htm
  command('SplashTextOff', signature([]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/SplitPath.htm
  command('SplitPath', signature([ input(), output(), output(), output(), output(), output() ])),

  // https://www.autohotkey.com/docs/v1/lib/StatusBarGetText.htm
  command('StatusBarGetText', signature([ output(), expression(), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/StatusBarWait.htm
  command('StatusBarWait', signature([ unquoted(), expression(), expression(), winTitle(), unquoted(), expression(), winTitle(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/StringCaseSense.htm
  command('StringCaseSense', signature([ onOff([ optionItem('Locale') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/StringGetPos.htm
  command('StringGetPos', signature([ output(), input(), unquoted(), keywordOnly([ numberOptionItem('L', 'R') ]), expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringLeft.htm
  command('StringLeft', signature([ output(), input(), expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringLen.htm
  command('StringLen', signature([ output(), input() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringLower.htm
  command('StringLower', signature([ output(), input(), keywordOnly([ optionItem('T') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/StringMid.htm
  command('StringMid', signature([ output(), input(), expression(), expression(), keywordOnly([ optionItem('L') ]) ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringReplace.htm
  command('StringReplace', signature([ output(), input(), unquoted(), unquoted(), keywordOnly([ optionItem('All', 'A', '1') ]) ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringRight.htm
  command('StringRight', signature([ output(), input(), expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringSplit.htm
  command('StringSplit', signature([ output(), input(), unquoted(), unquotedShouldEscapeComma() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringTrimLeft.htm
  command('StringTrimLeft', signature([ output(), input(), expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringTrimRight.htm
  command('StringTrimRight', signature([ output(), input(), expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringUpper.htm
  command('StringUpper', signature([ output(), input(), keywordOnly([ 'T' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SysGet.htm
  command('SysGet', [
    signature([ output(), subcommand([ 'MonitorCount', 'MonitorPrimary' ]), restParams() ]),
    signature([ output(), subcommand([ 'Monitor', 'MonitorWorkArea', 'MonitorName' ]), unquoted() ]),
    signature([ output(), restParams() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/Thread.htm
  command('Thread', [
    signature([ subcommand([ 'NoTimers', 'Priority' ]), expression() ]),
    signature([ subcommand('Interrupt'), unquoted(), unquoted() ]),
    signature([ restParams() ]),
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
  command('WinMinimizeAll', signature([])),

  // https://www.autohotkey.com/docs/v1/lib/WinMinimizeAllUndo.htm
  command('WinMinimizeAllUndo', signature([])),

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
    signature([ subcommand('Region'), unquoted([ optionItem('E'), numberOptionItem('W', 'H'), rangeOptionItem('R', '') ]), ...winParams ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/WinSetTitle.htm
  command('WinSetTitle', signature([ winTitle(), unquoted(), unquoted(), winTitle(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinShow.htm
  command('WinShow', signature(winParams)),

  // https://www.autohotkey.com/docs/v1/lib/WinWait.htm
  command('WinWait', signature([ winTitle(), unquoted(), expression(), winTitle(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinWaitActive.htm
  command('WinWaitActive', signature([ winTitle(), unquoted(), expression(), winTitle(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinWaitNotActive.htm
  command('WinWaitNotActive', signature([ winTitle(), unquoted(), expression(), winTitle(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinWaitClose.htm
  command('WinWaitClose', signature([ winTitle(), unquoted(), expression(), winTitle(), unquoted() ])),
] as const;
// #endregion commands

// #region jump
export const jumpCommandDefenitions: CommandDefinition[] = [
  // https://www.autohotkey.com/docs/v1/lib/Break.htm
  command('Break', signature([ labelName() ])),

  // https://www.autohotkey.com/docs/v1/lib/Exit.htm
  command('Exit', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/ExitApp.htm
  command('ExitApp', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/Gosub.htm
  command('Gosub', signature([ labelName() ])),

  // https://www.autohotkey.com/docs/v1/lib/Goto.htm
  command('Goto', signature([ labelName() ])),

  // https://www.autohotkey.com/docs/v1/lib/Return.htm
  command('Return', signature([ expression() ])),
];
// #endregion jump

// #region helpers
function decimalPattern(): string {
  return numbers1();
}
function numberPattern(): string {
  return seq(
    decimalPattern(),
    optseq(
      char('.'),
      numbers0(),
    ),
  );
}
export function hexPattern(): string {
  return seq(
    optional(ignoreCase('0x')),
    groupMany1('[0-9a-fA-F]'),
  );
}
function createOptionItemPattern(pattern: string): string {
  return seq(
    lookbehind(alt(
      inlineSpace(),
      char(',', ':'),
    )),
    pattern,
    lookahead(alt(
      inlineSpace(),
      char(',', '%'),
      endAnchor(),
    )),
  );
}
export function isSubCommandParameter(parameter: CommandParameter): parameter is SubCommandParameter {
  switch (parameter.type) {
    case HighlightType.SubCommand:
    case HighlightType.SubCommandLike:
    case HighlightType.FlowSubCommand:
    case HighlightType.GuiSubCommand: {
      if (parameter.itemPatterns && 0 < parameter.itemPatterns.length) {
        return true;
      }
      break;
    }
    default: break;
  }
  return false;
}
export function optionItem(...options: string[]): string {
  return createOptionItemPattern(ignoreCase(textalt(...options)));
}
export function flagedOptionItem(...options: string[]): string {
  return createOptionItemPattern(seq(
    optional(char('+', '-', '^')),
    ignoreCase(textalt(...options)),
  ));
}
export function endKeyOptionItem(): string {
  return seq(
    char('{'),
    inlineSpaces0(),
    negChars1(inlineSpace()),
    inlineSpaces0(),
    char('}'),
  );
}
export function matchKeyOptionItem(): string {
  return createOptionItemPattern(negChars1(','));
}
export function letterOptionItem(...options: string[]): string {
  return ignoreCase(textalt(...options));
}
export function flagedLetterOptionItem(...options: string[]): string {
  return seq(
    optional(char('+', '-', '^')),
    ignoreCase(textalt(...options)),
  );
}
export function toggleOptionItem(...options: string[]): string {
  // e.g. `Disabled0`, `Hidden1`
  return createOptionItemPattern(seq(
    ignoreCase(textalt(...options)),
    optional(char('0', '1')),
  ));
}
export function flagedToggleOptionItem(...options: string[]): string {
  // e.g. `Disabled0`, `Hidden1`
  return createOptionItemPattern(seq(
    optional(char('+', '-')),
    ignoreCase(textalt(...options)),
    optional(char('0', '1')),
  ));
}
export function rangeOptionItem(...options: string[]): string {
  return createOptionItemPattern(seq(
    ignoreCase(textalt(...options)),
    optseq(
      numberPattern(),
      optseq(
        ignoreCase(char('-')),
        optional(numberPattern()),
      ),
    ),
  ));
}
export function sizeOptionItem(...options: string[]): string {
  return createOptionItemPattern(seq(
    ignoreCase(textalt(...options)),
    optseq(
      numberPattern(),
      optseq(
        char('x'),
        optional(numberPattern()),
      ),
    ),
  ));
}
export function flagedSizeOptionItem(...options: string[]): string {
  return createOptionItemPattern(seq(
    optional(char('+', '-')),
    ignoreCase(textalt(...options)),
    optseq(
      numberPattern(),
      optseq(
        char('-'),
        optional(numberPattern()),
      ),
    ),
  ));
}
export function stringOptionItem(...options: string[]): string {
  return createOptionItemPattern(seq(
    ignoreCase(textalt(...options)),
    negChars0(inlineSpace()),
  ));
}
export function flagedStringOptionItem(...options: string[]): string {
  return createOptionItemPattern(seq(
    optional(char('+', '-')),
    ignoreCase(textalt(...options)),
    negChars0(inlineSpace()),
  ));
}
export function identifierOptionItem(...options: string[]): string {
  return createOptionItemPattern(seq(
    ignoreCase(textalt(...options)),
    optional(patterns_v1.identifierPattern),
  ));
}
export function flagedIdentifierOptionItem(...options: string[]): string {
  return createOptionItemPattern(seq(
    optional(char('+', '-')),
    ignoreCase(textalt(...options)),
    optional(patterns_v1.identifierPattern),
  ));
}
export function decimalOptionItem(...options: string[]): string {
  return createOptionItemPattern(seq(
    ignoreCase(textalt(...options)),
    optional(decimalPattern()),
  ));
}
export function numberOptionItem(...options: string[]): string {
  return createOptionItemPattern(seq(
    ignoreCase(textalt(...options)),
    optional(numberPattern()),
  ));
}
export function flagedNumberOptionItem(...options: string[]): string {
  return createOptionItemPattern(seq(
    optional(char('+', '-')),
    ignoreCase(textalt(...options)),
    optional(numberPattern()),
  ));
}
export function signedNumberOptionItem(...options: string[]): string {
  return createOptionItemPattern(seq(
    ignoreCase(textalt(...options)),
    optseq(
      optional(char('+', '-')),
      optional(numberPattern()),
    ),
  ));
}
export function flagedSignedNumberOptionItem(...options: string[]): string {
  return createOptionItemPattern(seq(
    optional(char('+', '-')),
    ignoreCase(textalt(...options)),
    optseq(
      optional(char('+', '-')),
      optional(numberPattern()),
    ),
  ));
}
export function hexOptionItem(...options: string[]): string {
  return createOptionItemPattern(seq(
    ignoreCase(ordalt(...options)),
    optional(hexPattern()),
  ));
}
export function flagedHexOptionItem(...options: string[]): string {
  return createOptionItemPattern(seq(
    optional(char('+', '-')),
    ignoreCase(ordalt(...options)),
    optional(hexPattern()),
  ));
}
export function colorOptionItem(...options: string[]): string {
  return createOptionItemPattern(seq(
    ignoreCase(textalt(...options)),
    group(alt(
      group(textalt(...constants_common.colorNames, 'Default')),
      group(hexPattern()),
    )),
  ));
}
export function command(name: string, signatureOrSignatures: CommandSignature | CommandSignature[], flags: CommandFlag = CommandFlag.None): CommandDefinition {
  const signatures = Array.isArray(signatureOrSignatures) ? signatureOrSignatures : [ signatureOrSignatures ];
  return { name, signatures, flags };
}
export function signature(parameters: CommandParameter[], flags: CommandSignatureFlag = CommandSignatureFlag.None): CommandSignature {
  return { flags, parameters };
}
export function subcommand(values: string | string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.SubCommand, flags, itemPatterns: Array.isArray(values) ? values : [ values ] };
}
export function subcommandlike(values: string | string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.SubCommandLike, flags, itemPatterns: Array.isArray(values) ? values : [ values ] };
}
export function flowSubcommand(values: string | string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): SubCommandParameter {
  return { type: HighlightType.FlowSubCommand, flags, itemPatterns: Array.isArray(values) ? values : [ values ] };
}
export function guiSubcommand(values: string | string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.GuiSubCommand, flags, itemPatterns: Array.isArray(values) ? values : [ values ] };
}
export function blank(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.Blank, flags };
}
export function unquoted(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.UnquotedString, flags, itemPatterns: values };
}
export function unquotedShouldEscapeComma(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.UnquotedStringShouldEscapeComma, flags, itemPatterns: values };
}
export function unquotedWithNumber(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.UnquotedStringWithNumber, flags, itemPatterns: values };
}
export function restParams(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.RestParams, flags, itemPatterns: values };
}
export function labelName(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.LabelName, flags, itemPatterns: values };
}
export function expression(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.Expression, flags };
}
export function style(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.Style, flags };
}
export function letterOptions(values: string[], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.LetterOptions, flags, itemPatterns: values };
}
export function fileAttributes(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return letterOptions([ flagedLetterOptionItem('R', 'A', 'S', 'H', 'N', 'O', 'T') ]);
}
export function guiOptions(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    type: HighlightType.GuiOptions,
    flags,
    itemPatterns: [
      flagedOptionItem('AlwaysOnTop', 'Border', 'Caption', 'DelimiterSpace', 'DelimiterTab', 'Disabled', 'DPIScale', 'LastFoundExist', 'MaximizeBox', 'MinimizeBox', 'OwnDialogs', 'Owner', 'Parent', 'Resize', 'SysMenu', 'Theme', 'ToolWindow'),
      flagedStringOptionItem('Delimiter'),
      flagedIdentifierOptionItem('Hwnd', 'Label', 'LastFound'),
      flagedSizeOptionItem('MinSize', 'MaxSize'),
    ],
  };
}
export function keywordOnly(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.KeywordOnly, flags, itemPatterns: values };
}
export function spacedKeywordsOnly(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.SpacedKeywordsOnly, flags, itemPatterns: values };
}
export function input(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.Input, flags };
}
export function output(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.Output, flags };
}
export function menuItemName(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.MenuItemName, flags };
}
export function menuOptions(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([
    decimalOptionItem('P'),
    flagedOptionItem('Radio', 'Right', 'Break', 'BarBreak'),
    ...values,
  ], flags);
}
export function winTitle(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ optionItem('ahk_class', 'ahk_id', 'ahk_pid', 'ahk_exe', 'ahk_group') ], flags);
}
export function control(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ optionItem('ahk_id') ], flags);
}
export function controlOrPos(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ optionItem('ahk_id'), decimalOptionItem('X', 'Y') ], flags);
}
export function guiControlType(): CommandParameter {
  return keywordOnly([ optionItem('ActiveX', 'Button', 'CheckBox', 'ComboBox', 'Custom', 'DateTime', 'DropDownList', 'DDL', 'Edit', 'GroupBox', 'Hotkey', 'Link', 'ListBox', 'ListView', 'MonthCal', 'Picture', 'Pic', 'Progress', 'Radio', 'Slider', 'StatusBar', 'Tab', 'Tab2', 'Tab3', 'Text', 'TreeView', 'UpDown') ]);
}
export function controlMoveOptions(): CommandParameter {
  return unquoted([ numberOptionItem('X', 'Y', 'W', 'H') ]);
}
export function guiControlOptions(_flaged = false): CommandParameter {
  return {
    type: HighlightType.GuiOptions,
    flags: CommandParameterFlag.None,
    itemPatterns: [
      (_flaged ? flagedSignedNumberOptionItem : signedNumberOptionItem)('R', 'W', 'H', 'WP', 'HP', 'X', 'Y', 'XP', 'YP', 'XM', 'YM', 'XS', 'YS', 'Choose', 'VScroll', 'HScroll'),
      (_flaged ? flagedOptionItem : optionItem)('X+M', 'X-M', 'Y+M', 'Y-M', 'Left', 'Right', 'Center', 'Section', 'Tabstop', 'Wrap', 'AltSubmit', 'CDefault', 'BackgroundTrans', 'Background', 'Border', 'Theme'),
      (_flaged ? flagedIdentifierOptionItem : identifierOptionItem)('V', 'G', 'Hwnd'),
      (_flaged ? flagedHexOptionItem : hexOptionItem)('C'),
      (_flaged ? flagedToggleOptionItem : toggleOptionItem)('Disabled', 'Hidden'),
    ],
  };
}
export function flagedGuiControlOptions(): CommandParameter {
  return guiControlOptions(true);
}
export function onOff(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return keywordOnly([ optionItem('On', 'Off', '1', '0'), ...values ], flags);
}
export function onOffToggle(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return onOff([ optionItem('Toggle'), ...values ], flags);
}
export function whichButton(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ optionItem('Left', 'L', 'Right', 'R', 'Middle', 'M', 'WheelUp', 'WU', 'WheelDown', 'WD', 'WheelLeft', 'WL', 'WheelRight', 'WR') ], flags);
}
export function path(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted(values, flags);
}
export function imagePath(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return path([ stringOptionItem('HICON:', 'HBITMAP:') ], flags);
}
export function glob(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.UnquotedString, flags, itemPatterns: [] };
}
export function encoding(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ optionItem('CP0', 'UTF-8', 'UTF-8-RAW', 'UTF-16', 'UTF-16-RAW'), numberOptionItem('CP') ], flags);
}
export function keyName(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ optionItem(...constants_common.keyNameList), hexOptionItem('sc', 'vk') ], flags);
}
export function hotkeyName(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([], flags);
  //   return {
  //     type: HighlightType.HotkeyName,
  //     flags,
  //     values: [
  //   ];
  // }
}
export function sendKeys(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.SendKeyName, flags };
}
export function timeunit(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return keywordOnly([ optionItem('Seconds', 'S', 'Minutes', 'M', 'Hours', 'H', 'Days', 'D') ], flags);
}
export function formatTime(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ letterOptionItem('d', 'dd', 'ddd', 'dddd', 'M', 'MM', 'MMM', 'MMMM', 'y', 'yy', 'yyyy', 'gg', 'h', 'hh', 'H', 'HH', 'm', 'mm', 's', 'ss', 't', 'tt') ], CommandParameterFlag.IgnoreCase | flags);
}
export function color(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ optionItem('Default', 'Black', 'Silver', 'Gray', 'White', 'Maroon', 'Red', 'Purple', 'Fuchsia', 'Green', 'Lime', 'Olive', 'Yellow', 'Navy', 'Blue', 'Teal', 'Aqua') ], flags);
}
export function soundComponent(): CommandParameter {
  return unquoted([ optionItem('MASTER', 'SPEAKERS', 'DIGITAL', 'LINE', 'MICROPHONE', 'SYNTH', 'CD', 'TELEPHONE', 'PCSPEAKER', 'WAVE', 'AUX', 'ANALOG', 'HEADPHONES', 'N/A') ]);
}
export function soundControlType(): CommandParameter {
  return unquoted([ optionItem('VOLUME', 'VOL', 'ONOFF', 'MUTE', 'MONO', 'LOUDNESS', 'STEREOENH', 'BASSBOOST', 'PAN', 'QSOUNDPAN', 'BASS', 'TREBLE', 'EQUALIZER') ]);
}
// #endregion helpers
