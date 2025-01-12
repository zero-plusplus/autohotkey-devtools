import { CommandFlag, CommandParameterFlag, CommandSignatureFlag, HighlightType } from '../constants';
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
  command('#Hotstring', signature([ unquoted([ 'NoMouse', 'EndChars' ]) ])),

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
  command('#LTrim', signature([ keywordOnly([ 'Off' ]) ])),

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
  command('#SingleInstance', signature([ keywordOnly([ 'Force', 'Ignore', 'Prompt', 'Off' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/_UseHook.htm
  command('#UseHook', signature([ onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/_Warn.htm
  command('#Warn', signature([ keywordOnly([ 'UseUnsetLocal', 'UseUnsetGlobal', 'UseEnv', 'LocalSameAsGlobal', 'ClassOverwrite', 'Unreachable' ]), keywordOnly([ 'MsgBox', 'StdOut', 'OutputDebug', 'Off' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/_WinActivateForce.htm
  command('#WinActivateForce', signature([])),
];
// #endregion directives

// #region loop
export const loopCommandDefenitions: CommandDefinition[] = [
  command('Loop', [
    // https://www.autohotkey.com/docs/v1/lib/LoopFile.htm
    signature([ flowSubcommand('Files'), path(), keywordsOnly([ optionItem('D'), optionItem('F'), optionItem('R') ]) ]),

    // https://www.autohotkey.com/docs/v1/lib/LoopParse.htm
    signature([ flowSubcommand('Parse'), input(), unquotedOrKeywords([ optionItem('CSV') ]), unquotedShouldEscapeComma() ]),

    // https://www.autohotkey.com/docs/v1/lib/LoopReadFile.htm
    signature([ flowSubcommand('Read'), path(), unquotedShouldEscapeComma() ]),

    // https://www.autohotkey.com/docs/v1/lib/LoopReg.htm#new
    signature([ flowSubcommand('Reg'), unquoted(), keywordsOnly([ optionItem('K'), optionItem('V'), optionItem('R') ]) ]),
  ]),
];
// #endregion loop

// #region commands
export const commandDefinitions: CommandDefinition[] = [
  // https://www.autohotkey.com/docs/v1/lib/AutoTrim.htm
  command('AutoTrim', signature([ onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/BlockInput.htm
  command('BlockInput', signature([ onOff([ optionItem('Send'), optionItem('Mouse'), optionItem('SendAndMouse'), optionItem('Default'), optionItem('MouseMove'), optionItem('MouseMoveOff') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/Click.htm
  command('Click', signature([ unquoted([ optionItem('Left'), optionItem('L'), optionItem('Right'), optionItem('R'), optionItem('Middle'), optionItem('M'), optionItem('X1'), optionItem('X2'), optionItem('Up'), optionItem('U'), optionItem('Down'), optionItem('D') ]) ])),

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
  command('ControlClick', signature([ controlOrPos(), winTitle(), unquoted(), whichButton(), expression(), unquotedOrKeywords([ optionItem('NA'), optionItem('D'), optionItem('U'), optionItem('Pos'), decimalOptionItem('X'), decimalOptionItem('Y') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlFocus.htm
  command('ControlFocus', signature([ control(), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlGet.htm
  command('ControlGet', [
    signature([ output(), subcommand('List'), unquotedOrKeywords([ optionItem('Selected'), optionItem('Focused'), optionItem('Col'), optionItem('Count') ]), control(), ...winParams ]),
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
  command('ControlSendRaw', signature([ control(), sendKeys(), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlSetText.htm
  command('ControlSetText', signature([ control(), unquoted(), ...winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/CoordMode.htm
  command('CoordMode', signature([ keywordsOnly([ optionItem('ToolTip'), optionItem('Pixel'), optionItem('Mouse'), optionItem('Caret'), optionItem('Menu') ]), keywordsOnly([ optionItem('Screen'), optionItem('Relative'), optionItem('Window'), optionItem('Client') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/Critical.htm
  command('Critical', signature([ unquoted([ optionItem('On'), optionItem('Off') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/DetectHiddenText.htm
  command('DetectHiddenText', signature([ onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/DetectHiddenWindows.htm
  command('DetectHiddenWindows', signature([ onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/Drive.htm
  command('Drive', [
    signature([ subcommand('Eject'), unquoted(), keywordsOnly([ optionItem('1') ]) ]),
    signature([ subcommand('Label'), unquoted(), unquoted() ]),
    signature([ subcommand([ 'Lock', 'Unlock' ]), unquoted() ]),
    signature([ restParams() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/DriveGet.htm
  command('DriveGet', [
    signature([ output(), subcommand('List'), keywordsOnly([ optionItem('CDROM'), optionItem('REMOVABLE'), optionItem('FIXED'), optionItem('NETWORK'), optionItem('RAMDISK'), optionItem('UNKNOWN') ]) ]),
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
  command('FileGetSize', signature([ output(), path(), keywordOnly([ optionItem('B'), optionItem('K'), optionItem('M') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/FileGetTime.htm
  command('FileGetTime', signature([ output(), path(), keywordOnly([ optionItem('M'), optionItem('C'), optionItem('A') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/FileGetVersion.htm
  command('FileGetVersion', signature([ output(), path() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileMove.htm
  command('FileMove', signature([ glob(), glob(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileMoveDir.htm
  command('FileMoveDir', signature([ path(), path(), keywordOnly([ optionItem('0'), optionItem('1'), optionItem('2'), optionItem('R') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/FileRead.htm
  command('FileRead', signature([ output(), path([ optionItem('*c'), decimalOptionItem('*m'), optionItem('*t'), decimalOptionItem('*P') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/FileReadLine.htm
  command('FileReadLine', signature([ output(), path(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileRecycle.htm
  command('FileRecycle', signature([ glob() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileRecycleEmpty.htm
  command('FileRecycleEmpty', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileRemoveDir.htm
  command('FileRemoveDir', signature([ path(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileSelectFile.htm
  command('FileSelectFile', signature([ output(), unquotedOrKeywords([ optionItem('M'), optionItem('S') ]), path(), unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileSelectFolder.htm
  command('FileSelectFolder', signature([ output(), unquoted(), expression(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileSetAttrib.htm
  command('FileSetAttrib', signature([ combiOptions([ optionItem('R'), optionItem('A'), optionItem('S'), optionItem('H'), optionItem('N'), optionItem('O'), optionItem('T') ]), glob(), expression(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileSetTime.htm
  command('FileSetTime', signature([ expression(), glob(), keywordsOnly([ optionItem('M'), optionItem('C'), optionItem('A') ]), expression(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FormatTime.htm
  command('FormatTime', [
    signature([ output(), unquoted(), keywordsOnly([ optionItem('Time'), optionItem('ShortDate'), optionItem('LongDate'), optionItem('YearMonth'), optionItem('YDay'), optionItem('YDay0'), optionItem('WDay'), optionItem('YWeek') ]) ]),
    signature([ output(), unquoted(), formatTime() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/GetKeyState.htm#command
  command('GetKeyState', signature([ output(), keywordsOnly([ optionItem('P'), optionItem('T') ]) ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/GroupActivate.htm
  command('GroupActivate', signature([ unquoted(), keywordsOnly([ optionItem('R') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/GroupAdd.htm
  command('GroupAdd', signature([ unquoted(), winTitle(), unquoted(), unquoted(), winTitle(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/GroupClose.htm
  command('GroupClose', signature([ unquoted(), keywordsOnly([ optionItem('R'), optionItem('A') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/GroupDeactivate.htm
  command('GroupDeactivate', signature([ unquoted(), keywordsOnly([ optionItem('R') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/Gui.htm
  command('Gui', [
    signature([ guiSubcommand('New'), guiOptions(), unquoted() ]),
    signature([ guiSubcommand('Add'), guiControlType(), guiControlOptions(), unquoted() ]),
    signature([ guiSubcommand('Show'), unquotedOrKeywords([ numberOptionItem('W'), numberOptionItem('H'), numberOptionItem('X'), numberOptionItem('Y'), optionItem('Center'), optionItem('xCenter'), optionItem('yCenter'), optionItem('AutoSize'), optionItem('Minimize'), optionItem('Maximize'), optionItem('Restore'), optionItem('NoActivate'), optionItem('NA'), optionItem('Hide') ]), unquoted() ]),
    signature([ guiSubcommand('Submit'), keywordsOnly([ optionItem('NoHide') ]) ]),
    signature([ guiSubcommand([ 'Cancel', 'Hide', 'Destroy', 'Minimize', 'Maximize', 'Restore', 'Default' ]), restParams() ]),
    signature([ guiSubcommand('Font'), unquotedOrKeywords([ colorOptionItem('C'), numberOptionItem('S'), numberOptionItem('W'), numberOptionItem('Q') ]), unquoted() ]),
    signature([ guiSubcommand('Color'), color(), color() ]),
    signature([ guiSubcommand('Margin'), unquoted(), unquoted() ]),
    signature([ guiSubcommand('Menu'), unquoted() ]),
    signature([ guiSubcommand('Flash'), keywordOnly([ 'Off' ]) ]),
    signature([ guiOptions() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/GuiControl.htm
  command('GuiControl', [
    signature([ guiSubcommand([ 'Text', 'Choose', 'ChooseString' ]), control(), unquoted() ]),
    signature([ guiSubcommand([ 'Move', 'MoveDraw' ]), control(), controlMoveOptions() ]),
    signature([ guiSubcommand([ 'Focus', 'Disable', 'Enable', 'Hide', 'Show', 'Font' ]), control() ]),
    signature([ guiControlOptions(), control(), unquoted() ]),
    signature([ blankOrGuiName(), control(), unquoted() ]),
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
    signature([ hotkeyName(), unquotedOrKeywords([ 'On', 'Off', 'Toggle', 'AltTab' ]), unquotedOrKeywords([ optionItem('UseErrorLevel'), optionItem('On'), optionItem('Off'), optionItem('B'), optionItem('B0'), numberOptionItem('P'), numberOptionItem('T'), numberOptionItem('I') ]) ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/ImageSearch.htm
  command('ImageSearch', signature([ output(), output(), expression(), expression(), expression(), expression(), unquoted([ numberOptionItem('*Icon'), numberOptionItem('*'), numberOptionItem('*Trans'), numberOptionItem('*w'), numberOptionItem('*h'), stringOptionItem('HBITMAP:') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/IniDelete.htm
  command('IniDelete', signature([ path(), unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/IniRead.htm
  command('IniRead', signature([ output(), path(), unquoted(), unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/IniWrite.htm
  command('IniWrite', signature([ unquoted(), unquoted(), path(), unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/Input.htm
  command('Input', signature([ output(), unquotedOrKeywords([ optionItem('B'), optionItem('C'), numberOptionItem('I'), numberOptionItem('L'), 'M', numberOptionItem('T'), optionItem('V'), optionItem('*'), optionItem('E') ]), sendKeys(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/InputBox.htm
  command('InputBox', signature([ output(), unquoted(), unquoted(), unquoted(), expression(), expression(), expression(), expression(), unquoted(), expression(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/KeyHistory.htm
  command('KeyHistory', signature([])),

  // https://www.autohotkey.com/docs/v1/lib/KeyWait.htm
  command('KeyWait', signature([ keyName(), unquotedOrKeywords([ optionItem('D'), optionItem('L'), optionItem('T') ]) ])),

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
    signature([ unquoted(), subcommand('UseErrorLevel'), keywordOnly([ 'Off' ]) ]),
    signature([ unquoted(), subcommand([ 'Show', 'Color' ]), unquoted(), unquoted() ]),
    signature([ restParams() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/MouseClick.htm
  command('MouseClick', signature([ whichButton(), expression(), expression(), expression(), expression(), keywordsOnly([ optionItem('D'), optionItem('U') ]), keywordsOnly([ optionItem('R') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/MouseClickDrag.htm
  command('MouseClickDrag', signature([ whichButton(), expression(), expression(), expression(), expression(), expression(), keywordsOnly([ optionItem('R') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/MouseGetPos.htm
  command('MouseGetPos', signature([ output(), output(), output(), output(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/MouseMove.htm
  command('MouseMove', signature([ expression(), expression(), expression(), keywordsOnly([ optionItem('R') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/MsgBox.htm
  command('MsgBox', signature([ unquoted(), unquoted(), unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/OnExit.htm#command
  command('OnExit', signature([ unquoted() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/OutputDebug.htm
  command('OutputDebug', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/Pause.htm
  command('Pause', signature([ onOffToggle(), keywordsOnly([ optionItem('Off'), optionItem('0'), optionItem('1') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/PixelGetColor.htm
  command('PixelGetColor', signature([ output(), expression(), expression(), keywordsOnly([ optionItem('Alt'), optionItem('Slow'), optionItem('RGB') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/PixelSearch.htm
  command('PixelSearch', signature([ output(), output(), expression(), expression(), expression(), expression(), expression(), expression(), keywordsOnly([ optionItem('Fast'), optionItem('RGB') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/PostMessage.htm
  command('PostMessage', signature([ expression(), expression(), expression(), control(), ...winParams ])),
  command('SendMessage', signature([ expression(), expression(), expression(), control(), ...winParams, expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/Process.htm
  command('Process', [
    signature([ subcommand([ 'Exist', 'Close' ]), unquoted() ]),
    signature([ subcommand([ 'Wait', 'WaitClose' ]), unquoted(), unquoted() ]),
    signature([ subcommand([ 'Priority' ]), unquoted(), keywordOnly([ optionItem('Low'), optionItem('L'), optionItem('BelowNormal'), optionItem('B'), optionItem('Normal'), optionItem('N'), optionItem('AboveNormal'), optionItem('A'), optionItem('High'), optionItem('H'), optionItem('Realtime'), optionItem('R') ]) ]),
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
  command('RegWrite', signature([ keywordOnly([ optionItem('REG_SZ'), optionItem('REG_EXPAND_SZ'), optionItem('REG_MULTI_SZ'), optionItem('REG_DWORD'), optionItem('REG_BINARY') ]), unquoted(), unquoted(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/Reload.htm
  command('Reload', signature([])),

  // https://www.autohotkey.com/docs/v1/lib/Run.htm
  command('Run', signature([ unquoted(), path(), keywordsOnly([ optionItem('Max'), optionItem('Min'), optionItem('Hide'), optionItem('UseErrorLevel') ]), output() ])),

  // https://www.autohotkey.com/docs/v1/lib/RunWait.htm
  command('RunWait', signature([ unquoted(), path(), keywordsOnly([ optionItem('Max'), optionItem('Min'), optionItem('Hide'), optionItem('UseErrorLevel') ]), output() ])),

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
  command('SendMode', signature([ keywordsOnly([ optionItem('Event'), optionItem('Input'), optionItem('InputThenPlay'), optionItem('Play') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetBatchLines.htm
  command('SetBatchLines', signature([ unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetNumScrollCapsLockState.htm
  command('SetCapsLockState', signature([ onOff([ optionItem('AlwaysOn'), optionItem('AlwaysOff') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetControlDelay.htm
  command('SetControlDelay', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetDefaultMouseSpeed.htm
  command('SetDefaultMouseSpeed', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetEnv.htm
  command('SetEnv', signature([ input(), unquoted() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/SetFormat.htm
  command('SetFormat', signature([ unquoted(), unquoted() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/SetKeyDelay.htm
  command('SetKeyDelay', signature([ expression(), expression(), keywordsOnly([ optionItem('Play'), optionItem('-1') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetMouseDelay.htm
  command('SetMouseDelay', signature([ expression(), keywordsOnly([ optionItem('Play'), optionItem('-1') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetNumLockState.htm
  command('SetNumLockState', signature([ onOff([ optionItem('AlwaysOn'), optionItem('AlwaysOff') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetScrollLockState.htm
  command('SetScrollLockState', signature([ onOff([ optionItem('AlwaysOn'), optionItem('AlwaysOff') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetRegView.htm
  command('SetRegView', signature([ keywordsOnly([ optionItem('32'), optionItem('64'), optionItem('Default') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetStoreCapsLockMode.htm
  command('SetStoreCapsLockMode', signature([ onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetTimer.htm
  command('SetTimer', signature([ unquoted(), unquotedOrKeywords([ optionItem('On'), optionItem('Off'), optionItem('Delete') ]), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetTitleMatchMode.htm
  command('SetTitleMatchMode', signature([ keywordsOnly([ optionItem('1'), optionItem('2'), optionItem('3'), optionItem('RegEx'), optionItem('Fast'), optionItem('Slow') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetWinDelay.htm
  command('SetWinDelay', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetWorkingDir.htm
  command('SetWorkingDir', signature([ path() ])),

  // https://www.autohotkey.com/docs/v1/lib/Sleep.htm
  command('Sleep', signature([ expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/Sort.htm
  command('Sort', signature([ input(), unquotedOrKeywords([ optionItem('C'), optionItem('CL'), numberOptionItem('D'), wordOptionItem('F'), optionItem('N'), numberOptionItem('P'), optionItem('R'), optionItem('Random'), optionItem('U'), optionItem('Z'), optionItem('\\') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundBeep.htm
  command('SoundBeep', signature([ expression(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundGet.htm
  command('SoundGet', signature([ output(), soundComponent(), soundControlType(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundGetWaveVolume.htm
  command('SoundGetWaveVolume', signature([ output(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundPlay.htm
  command('SoundPlay', signature([ path(), keywordsOnly([ optionItem('Wait'), optionItem('1') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundSet.htm
  command('SoundSet', signature([ expression(), soundComponent(), soundControlType(), expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundSetWaveVolume.htm
  command('SoundSetWaveVolume', signature([ expression(), unquoted() ])),

  // https://www.autohotkey.com/docs/v1/lib/SplashImage.htm
  command('SplashImage', [
    signature([ subcommandlike('Off'), restParams() ]),
    signature([
      imagePath(), unquotedOrKeywords([
        optionItem('A'),
        numberOptionItem('B'),
        numberOptionItem('M'),
        numberOptionItem('P'),
        sizeOptionItem('R'),
        optionItem('T'),
        numberOptionItem('H'),
        numberOptionItem('W'),
        numberOptionItem('X'),
        numberOptionItem('Y'),
        optionItem('Hide'),
        numberOptionItem('C'),
        numberOptionItem('ZH'),
        numberOptionItem('ZW'),
        numberOptionItem('ZX'),
        numberOptionItem('ZY'),
        numberOptionItem('FM'),
        numberOptionItem('FS'),
        numberOptionItem('WM'),
        numberOptionItem('WS'),
        colorOptionItem('CB'),
        colorOptionItem('CT'),
        colorOptionItem('CW'),
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
  command('StringGetPos', signature([ output(), input(), unquoted(), unquotedOrKeywords([ numberOptionItem('L'), numberOptionItem('R') ]), expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringLeft.htm
  command('StringLeft', signature([ output(), input(), expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringLen.htm
  command('StringLen', signature([ output(), input() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringLower.htm
  command('StringLower', signature([ output(), input(), keywordsOnly([ optionItem('T') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/StringMid.htm
  command('StringMid', signature([ output(), input(), expression(), expression(), keywordsOnly([ optionItem('L') ]) ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringReplace.htm
  command('StringReplace', signature([ output(), input(), unquoted(), unquoted(), keywordsOnly([ optionItem('All'), optionItem('A'), optionItem('1') ]) ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringRight.htm
  command('StringRight', signature([ output(), input(), expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringSplit.htm
  command('StringSplit', signature([ output(), input(), unquoted(), unquotedShouldEscapeComma() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringTrimLeft.htm
  command('StringTrimLeft', signature([ output(), input(), expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringTrimRight.htm
  command('StringTrimRight', signature([ output(), input(), expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringUpper.htm
  command('StringUpper', signature([ output(), input(), keywordsOnly([ 'T' ]) ])),

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
    signature([
      subcommand('Region'), unquotedOrKeywords([
        numberOptionItem('W'),
        numberOptionItem('H'),
        rangeOptionItem(),
        optionItem('E'),
        rangeOptionItem('R'),
      ]), ...winParams,
    ]),
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
export interface ParameterValue {
  prefix: string | undefined;
  suffix: string | undefined;
  value: string;
}
export function parseParameterValue(value: string): ParameterValue {
  if (value.startsWith('<') && value.endsWith('>')) {
    // e.g. `'<range>' -> 10-10`
    return { prefix: undefined, value: '', suffix: value.slice(1, -1) };
  }

  const match = value.match(/(<(?<prefix>[a-zA-Z_-]+)>)?(?<value>[^<]*)(<(?<suffix>[a-zA-Z_-]+)>)?/);
  return {
    prefix: match?.groups?.['prefix'],
    suffix: match?.groups?.['suffix'],
    value: String(match!.groups!['value']),
  };
}
export function isSubCommandParameter(parameter: CommandParameter): parameter is SubCommandParameter {
  switch (parameter.type) {
    case HighlightType.SubCommand:
    case HighlightType.SubCommandLike:
    case HighlightType.FlowSubCommand:
    case HighlightType.GuiSubCommand: {
      if (parameter.values && 0 < parameter.values.length) {
        return true;
      }
      break;
    }
    default: break;
  }
  return false;
}
export function optionItem(optionText: string): string {
  return `${optionText}<keyword>`;
}
export function flagOptionItem(optionText: string): string {
  // e.g. `+Resize`, `-MixmizeBox`
  return `<flag>${optionText}`;
}
export function toggleOptionItem(optionText: string): string {
  // e.g. `Disabled0`, `Hidden1`
  return `${optionText}<toggle>`;
}
export function rangeOptionItem(optionText?: string): string {
  return `${optionText ?? ''}<range>`;
}
export function sizeOptionItem(optionText: string): string {
  return `${optionText}<size>`;
}
export function stringOptionItem(optionText: string): string {
  return `${optionText}<string>`;
}
export function wordOptionItem(optionText: string): string {
  return `${optionText}<word>`;
}
export function numberOptionItem(optionText: string): string {
  return `${optionText}<number>`;
}
export function signedNumberOptionItem(optionText: string): string {
  return `${optionText}<signed-number>`;
}
export function hexOptionItem(optionText: string): string {
  return `${optionText}<hex>`;
}
export function decimalOptionItem(optionText: string): string {
  return `${optionText}<decimal>`;
}
export function colorOptionItem(optionText: string): string {
  return `${optionText}<color>`;
}
export function command(name: string, signatureOrSignatures: CommandSignature | CommandSignature[], flags: CommandFlag = CommandFlag.None): CommandDefinition {
  const signatures = Array.isArray(signatureOrSignatures) ? signatureOrSignatures : [ signatureOrSignatures ];
  return { name, signatures, flags };
}
export function signature(parameters: CommandParameter[], flags: CommandSignatureFlag = CommandSignatureFlag.None): CommandSignature {
  return { flags, parameters };
}
export function subcommand(values: string | string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.SubCommand, flags, values: Array.isArray(values) ? values : [ values ] };
}
export function subcommandlike(values: string | string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.SubCommandLike, flags, values: Array.isArray(values) ? values : [ values ] };
}
export function flowSubcommand(values: string | string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.FlowSubCommand, flags, values: Array.isArray(values) ? values : [ values ] };
}
export function guiSubcommand(values: string | string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.GuiSubCommand, flags, values: Array.isArray(values) ? values : [ values ] };
}
export function blank(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.Blank, flags };
}
export function blankOrGuiName(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.BlankOrGuiName, flags };
}
export function unquoted(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.UnquotedString, flags, values };
}
export function unquotedShouldEscapeComma(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.UnquotedStringShouldEscapeComma, flags, values };
}
export function restParams(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquotedShouldEscapeComma(values, flags);
}
export function labelName(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.LabelName, flags, values };
}
export function expression(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.Expression, flags };
}
export function style(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.Style, flags };
}
export function unquotedOrKeywords(values: string[], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.UnquotedOrKeywords, flags, values };
}
export function combiOptions(values: string[], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.CombiOptions, flags, values };
}
export function guiOptions(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    type: HighlightType.GuiOptions,
    flags,
    values: [
      flagOptionItem('AlwaysOnTop'),
      flagOptionItem('Border'),
      flagOptionItem('Caption'),
      flagOptionItem('DelimiterSpace'),
      flagOptionItem('DelimiterTab'),
      flagOptionItem(stringOptionItem('Delimiter')),
      flagOptionItem('Disabled'),
      flagOptionItem('DPIScale'),
      wordOptionItem('Hwnd'),
      flagOptionItem(wordOptionItem('Label')),
      flagOptionItem(wordOptionItem('LastFound')),
      flagOptionItem('LastFoundExist'),
      flagOptionItem('MaximizeBox'),
      flagOptionItem('MinimizeBox'),
      flagOptionItem(sizeOptionItem('MinSize')),
      flagOptionItem(sizeOptionItem('MaxSize')),
      flagOptionItem('OwnDialogs'),
      flagOptionItem('Owner'),
      flagOptionItem('Parent'),
      flagOptionItem('Resize'),
      flagOptionItem('SysMenu'),
      flagOptionItem('Theme'),
      flagOptionItem('ToolWindow'),
    ],
  };
}
export function keywordOnly(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.KeywordOnly, flags, values };
}
export function keywordsOnly(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.KeywordsOnly, flags, values };
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
  return unquotedOrKeywords([
    decimalOptionItem('P'),
    flagOptionItem('Radio'),
    flagOptionItem('Right'),
    flagOptionItem('Break'),
    flagOptionItem('BarBreak'),
    ...values,
  ], flags);
}
export function winTitle(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquotedOrKeywords([
    optionItem('ahk_class'),
    optionItem('ahk_id'),
    optionItem('ahk_pid'),
    optionItem('ahk_exe'),
    optionItem('ahk_group'),
  ], flags);
  //
  // return {
  //   type: HighlightType.WinTitle,
  //   flags,
  // };
}
export function control(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ optionItem('ahk_id') ], flags);
}
export function controlOrPos(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquotedOrKeywords([
    optionItem('ahk_id'),
    decimalOptionItem(optionItem('X')),
    decimalOptionItem(optionItem('Y')),
  ], flags);
}
export function guiControlType(): CommandParameter {
  return keywordOnly([
    optionItem('ActiveX'),
    optionItem('Button'),
    optionItem('CheckBox'),
    optionItem('ComboBox'),
    optionItem('Custom'),
    optionItem('DateTime'),
    optionItem('DropDownList'),
    optionItem('DDL'),
    optionItem('Edit'),
    optionItem('GroupBox'),
    optionItem('Hotkey'),
    optionItem('Link'),
    optionItem('ListBox'),
    optionItem('ListView'),
    optionItem('MonthCal'),
    optionItem('Picture'),
    optionItem('Pic'),
    optionItem('Progress'),
    optionItem('Radio'),
    optionItem('Slider'),
    optionItem('StatusBar'),
    optionItem('Tab'),
    optionItem('Tab2'),
    optionItem('Tab3'),
    optionItem('Text'),
    optionItem('TreeView'),
    optionItem('UpDown'),
  ]);
}
export function controlMoveOptions(): CommandParameter {
  return unquotedOrKeywords([
    numberOptionItem('X'),
    numberOptionItem('Y'),
    numberOptionItem('W'),
    numberOptionItem('H'),
  ]);
}
export function guiControlOptions(): CommandParameter {
  return {
    type: HighlightType.GuiOptions,
    flags: CommandParameterFlag.None,
    values: [
      numberOptionItem('R'),
      numberOptionItem('W'),
      numberOptionItem('H'),
      numberOptionItem('WP'),
      numberOptionItem('HP'),
      optionItem('X+M'),
      optionItem('X-M'),
      optionItem('Y+M'),
      optionItem('Y-M'),
      signedNumberOptionItem('X'),
      signedNumberOptionItem('Y'),
      signedNumberOptionItem('XP'),
      signedNumberOptionItem('YP'),
      signedNumberOptionItem('XM'),
      signedNumberOptionItem('YM'),
      signedNumberOptionItem('XS'),
      signedNumberOptionItem('YS'),
      wordOptionItem('V'),
      wordOptionItem('G'),
      optionItem('AltSubmit'),
      hexOptionItem('C'),
      optionItem('CDefault'),
      numberOptionItem('Choose'),
      toggleOptionItem('Disabled'),
      toggleOptionItem('Hidden'),
      optionItem('Left'),
      optionItem('Right'),
      optionItem('Center'),
      optionItem('Section'),
      flagOptionItem('Tabstop'),
      flagOptionItem('Wrap'),
      flagOptionItem(numberOptionItem('VScroll')),
      flagOptionItem(numberOptionItem('HScroll')),
      flagOptionItem('BackgroundTrans'),
      flagOptionItem('Background'),
      flagOptionItem('Border'),
      wordOptionItem('Hwnd'),
      flagOptionItem('Theme'),
    ],
  };
}
export function onOff(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return keywordsOnly([
    optionItem('On'),
    optionItem('Off'),
    optionItem('1'),
    optionItem('0'),
    ...values,
  ], flags);
}
export function onOffToggle(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return onOff([ optionItem('Toggle'), ...values ], flags);
}
export function whichButton(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([
    optionItem('Left'),
    optionItem('L'),
    optionItem('Right'),
    optionItem('R'),
    optionItem('Middle'),
    optionItem('M'),
    optionItem('WheelUp'),
    optionItem('WU'),
    optionItem('WheelDown'),
    optionItem('WD'),
    optionItem('WheelLeft'),
    optionItem('WL'),
    optionItem('WheelRight'),
    optionItem('WR'),
  ], flags);
}
export function path(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquotedOrKeywords(values, flags);
}
export function imagePath(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return path([
    stringOptionItem('HICON:'),
    stringOptionItem('HBITMAP:'),
  ], flags);
}
export function glob(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.UnquotedString, flags, values: [] };
}
export function encoding(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([
    optionItem('CP0'),
    optionItem('UTF-8'),
    optionItem('UTF-8-RAW'),
    optionItem('UTF-16'),
    optionItem('UTF-16-RAW'),
    numberOptionItem('CP'),
  ], flags);
}
export function keyName(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ ...values ], flags);
}
export function hotkeyName(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([], flags);
  //   return {
  //     type: HighlightType.HotkeyName,
  //     flags,
  //     values: [
  //     optionItem('#'),
  //     optionItem('!'),
  //     optionItem('^'),
  //     optionItem('+'),
  //     optionItem('^'),
  //     optionItem('+'),
  //     optionItem('&'),
  //     optionItem('<'),
  //     optionItem('>'),
  //     optionItem('<^>!'),
  //     optionItem('*'),
  //     optionItem('~'),
  //     optionItem('$'),
  //     // https://www.autohotkey.com/docs/v1/KeyList.htm
  //     optionItem('LButton'),
  //     optionItem('RButton'),
  //     optionItem('MButton'),
  //     optionItem('XButton1'),
  //     optionItem('XButton2'),
  //     optionItem('WheelDown'),
  //     optionItem('WheelUp'),
  //     optionItem('WheelLeft'),
  //     optionItem('WheelRight'),
  //     optionItem('CapsLock'),
  //     optionItem('Space'),
  //     optionItem('Tab'),
  //     optionItem('Enter'),
  //     optionItem('Escape'),
  //     optionItem('Esc'),
  //     optionItem('Backspace'),
  //     optionItem('BS'),
  //     optionItem('ScrollLock'),
  //     optionItem('Delete'),
  //     optionItem('Del'),
  //     optionItem('Insert'),
  //     optionItem('Ins'),
  //     optionItem('Home'),
  //     optionItem('End'),
  //     optionItem('PgUp'),
  //     optionItem('PgDn'),
  //     optionItem('Up'),
  //     optionItem('Down'),
  //     optionItem('Left'),
  //     optionItem('Right'),
  //     optionItem('Numpad0'),
  //     optionItem('Numpad1'),
  //     optionItem('Numpad2'),
  //     optionItem('Numpad3'),
  //     optionItem('Numpad4'),
  //     optionItem('Numpad5'),
  //     optionItem('Numpad6'),
  //     optionItem('Numpad7'),
  //     optionItem('Numpad8'),
  //     optionItem('Numpad9'),
  //     optionItem('NumpadDot'),
  //     optionItem('NumpadIns'),
  //     optionItem('NumpadEnd'),
  //     optionItem('NumpadDown'),
  //     optionItem('NumpadPgDn'),
  //     optionItem('NumpadLeft'),
  //     optionItem('NumpadClear'),
  //     optionItem('NumpadRight'),
  //     optionItem('NumpadHome'),
  //     optionItem('NumpadUp'),
  //     optionItem('NumpadPgUp'),
  //     optionItem('NumpadDel'),
  //     optionItem('NumLock'),
  //     optionItem('NumpadDiv'),
  //     optionItem('NumpadMult'),
  //     optionItem('NumpadAdd'),
  //     optionItem('NumpadSub'),
  //     optionItem('NumpadEnter'),
  //     ...times(24, (index) => optionItem(`F${index + 1}`)),
  //     optionItem('LWin'),
  //     optionItem('RWin'),
  //     optionItem('Control'),
  //     optionItem('Ctrl'),
  //     optionItem('Alt'),
  //     optionItem('Shift'),
  //     optionItem('LControl'),
  //     optionItem('LCtrl'),
  //     optionItem('RControl'),
  //     optionItem('RCtrl'),
  //     optionItem('LShift'),
  //     optionItem('RShift'),
  //     optionItem('LAlt'),
  //     optionItem('RAlt'),
  //     optionItem('Browser_Back'),
  //     optionItem('Browser_Forward'),
  //     optionItem('Browser_Refresh'),
  //     optionItem('Browser_Stop'),
  //     optionItem('Browser_Search'),
  //     optionItem('Browser_Favorites'),
  //     optionItem('Browser_Home'),
  //     optionItem('Volume_Mute'),
  //     optionItem('Volume_Down'),
  //     optionItem('Volume_Up'),
  //     optionItem('Media_Next'),
  //     optionItem('Media_Prev'),
  //     optionItem('Media_Stop'),
  //     optionItem('Media_Play_Pause'),
  //     optionItem('Launch_Mail'),
  //     optionItem('Launch_Media'),
  //     optionItem('Launch_App1'),
  //     optionItem('Launch_App2'),
  //     optionItem('AppsKey'),
  //     optionItem('PrintScreen'),
  //     optionItem('CtrlBreak'),
  //     optionItem('Pause'),
  //     optionItem('Break'),
  //     optionItem('Help'),
  //     optionItem('Sleep'),
  //     decimalOptionItem('SC'),
  //     decimalOptionItem('VK'),
  //     ...times(32, (index) => optionItem(`Joy${index + 1}`)),
  //   ];
  // }
}
export function sendKeys(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([], flags);
}
export function timeunit(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return keywordsOnly([
    optionItem('Seconds'),
    optionItem('S'),
    optionItem('Minutes'),
    optionItem('M'),
    optionItem('Hours'),
    optionItem('H'),
    optionItem('Days'),
    optionItem('D'),
  ], flags);
}
export function formatTime(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([
    optionItem('d'),
    optionItem('dd'),
    optionItem('ddd'),
    optionItem('dddd'),
    optionItem('M'),
    optionItem('MM'),
    optionItem('MMM'),
    optionItem('MMMM'),
    optionItem('y'),
    optionItem('yy'),
    optionItem('yyyy'),
    optionItem('gg'),
    optionItem('h'),
    optionItem('hh'),
    optionItem('H'),
    optionItem('HH'),
    optionItem('m'),
    optionItem('mm'),
    optionItem('s'),
    optionItem('ss'),
    optionItem('t'),
    optionItem('tt'),
  ], CommandParameterFlag.IgnoreCase | flags);
}
export function color(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquotedOrKeywords([
    optionItem('Default'),
    optionItem('Black'),
    optionItem('Silver'),
    optionItem('Gray'),
    optionItem('White'),
    optionItem('Maroon'),
    optionItem('Red'),
    optionItem('Purple'),
    optionItem('Fuchsia'),
    optionItem('Green'),
    optionItem('Lime'),
    optionItem('Olive'),
    optionItem('Yellow'),
    optionItem('Navy'),
    optionItem('Blue'),
    optionItem('Teal'),
    optionItem('Aqua'),
  ], flags);
}
export function soundComponent(): CommandParameter {
  return unquotedOrKeywords([
    optionItem('MASTER'),
    optionItem('SPEAKERS'),
    optionItem('DIGITAL'),
    optionItem('LINE'),
    optionItem('MICROPHONE'),
    optionItem('SYNTH'),
    optionItem('CD'),
    optionItem('TELEPHONE'),
    optionItem('PCSPEAKER'),
    optionItem('WAVE'),
    optionItem('AUX'),
    optionItem('ANALOG'),
    optionItem('HEADPHONES'),
    optionItem('N/A'),
  ]);
}
export function soundControlType(): CommandParameter {
  return unquotedOrKeywords([
    optionItem('VOLUME'),
    optionItem('VOL'),
    optionItem('ONOFF'),
    optionItem('MUTE'),
    optionItem('MONO'),
    optionItem('LOUDNESS'),
    optionItem('STEREOENH'),
    optionItem('BASSBOOST'),
    optionItem('PAN'),
    optionItem('QSOUNDPAN'),
    optionItem('BASS'),
    optionItem('TREBLE'),
    optionItem('EQUALIZER'),
  ]);
}
// #endregion helpers
