import {
  $,
  $blank,
  $click,
  $color,
  $control,
  $controlMoveOptions,
  $controlOrPos,
  $encoding,
  $expression,
  $fileAttributes,
  $flagedGuiControlOptions,
  $flowsubcommand,
  $formatTime,
  $glob,
  $guiControlOptions,
  $guiControlType,
  $guiOptions,
  $guisubcommand,
  $hotkeyName,
  $imagePath,
  $includeLib,
  $input,
  $invalid,
  $keyName,
  $menuItemName,
  $menuOptions,
  $onOff,
  $onOffToggle,
  $output,
  $parameterless,
  $path,
  $requiresVersion,
  $rest,
  $sendKeyName,
  $shouldEscapeComma,
  $shouldInteger,
  $shouldKeyword,
  $shouldLabel,
  $shouldNumber,
  $shouldSpacedKeywords,
  $soundComponent,
  $soundControlType,
  $style,
  $subcommand,
  $subcommandlike,
  $timeunit,
  $whichButton,
  $winParams,
  $winTitle,
  $withNumber,
  colorOption,
  command,
  CommandFlag,
  decimalOption,
  endKeyOption,
  identifierOption,
  keywordOption,
  letterOption,
  matchKeyOption,
  numberOption,
  rangeOption,
  signature,
  signedNumberOption,
  sizeOption,
  stringOption,
  toggleOption,
  type CommandDefinition,
} from '../definition';

// #region directives
export const directiveDefinitions: CommandDefinition[] = [
  // https://www.autohotkey.com/docs/v1/lib/_AllowSameLineComments.htm
  command('#AllowSameLineComments', signature([ $invalid() ]), CommandFlag.Removed),

  // https://www.autohotkey.com/docs/v1/lib/_ClipboardTimeout.htm
  command('#ClipboardTimeout', signature([ $shouldInteger() ])),

  // https://www.autohotkey.com/docs/v1/lib/_CommentFlag.htm
  command('#CommentFlag', signature([ $() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/_EscapeChar.htm#Delimiter
  command('#Delimiter', signature([ $() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/_EscapeChar.htm#DerefChar
  command('#DerefChar', signature([ $() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/_ErrorStdOut.htm
  command('#ErrorStdOut', signature([ $encoding() ])),

  // https://www.autohotkey.com/docs/v1/lib/_EscapeChar.htm
  command('#EscapeChar', signature([ $() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/_HotkeyInterval.htm
  command('#HotkeyInterval', signature([ $shouldInteger() ])),

  // https://www.autohotkey.com/docs/v1/lib/_HotkeyModifierTimeout.htm
  command('#HotkeyModifierTimeout', signature([ $shouldInteger() ])),

  // https://www.autohotkey.com/docs/v1/lib/_Hotstring.htm
  command('#Hotstring', signature([ $([ keywordOption('NoMouse', 'EndChars', 'SI', 'SP', 'SE', 'X'), toggleOption('*', '?', 'B', 'C', 'O', 'R', 'T', 'Z'), decimalOption('P'), signedNumberOption('K') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/_If.htm
  command('#If', signature([ $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/_IfTimeout.htm
  command('#IfTimeout', signature([ $() ])),

  // https://www.autohotkey.com/docs/v1/lib/_Include.htm
  command('#Include', signature([ $includeLib() ])),
  command('#IncludeAgain', signature([ $includeLib() ])),

  // https://www.autohotkey.com/docs/v1/lib/_IfWinActive.htm
  command('#IfWinActive', signature([ $winTitle(), $() ])),
  command('#IfWinNotActive', signature([ $winTitle(), $() ])),
  command('#IfWinExist', signature([ $winTitle(), $() ])),
  command('#IfWinNotExist', signature([ $winTitle(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/_InputLevel.htm
  command('#InputLevel', signature([ $shouldInteger() ])),

  // https://www.autohotkey.com/docs/v1/lib/_InstallKeybdHook.htm
  command('#InstallKeybdHook', signature($parameterless)),

  // https://www.autohotkey.com/docs/v1/lib/_InstallMouseHook.htm
  command('#InstallMouseHook', signature($parameterless)),

  // https://www.autohotkey.com/docs/v1/lib/_KeyHistory.htm
  command('#KeyHistory', signature([ $shouldInteger() ])),

  // https://www.autohotkey.com/docs/v1/Scripts.htm#LTrim
  command('#LTrim', signature([ $shouldKeyword([ keywordOption('Off') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/_MaxHotkeysPerInterval.htm
  command('#MaxHotkeysPerInterval', signature([ $shouldInteger() ])),

  // https://www.autohotkey.com/docs/v1/lib/_MaxMem.htm
  command('#MaxMem', signature([ $shouldInteger() ])),

  // https://www.autohotkey.com/docs/v1/lib/_MaxThreads.htm
  command('#MaxThreads', signature([ $shouldInteger() ])),

  // https://www.autohotkey.com/docs/v1/lib/_MaxThreadsBuffer.htm
  command('#MaxThreadsBuffer', signature([ $shouldKeyword([ keywordOption('On', 'Off') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/_MaxThreadsPerHotkey.htm
  command('#MaxThreadsPerHotkey', signature([ $shouldInteger() ])),

  // https://www.autohotkey.com/docs/v1/lib/_MenuMaskKey.htm
  command('#MenuMaskKey', signature([ $keyName() ])),

  // https://www.autohotkey.com/docs/v1/lib/_NoEnv.htm
  command('#NoEnv', signature($parameterless)),

  // https://www.autohotkey.com/docs/v1/lib/_NoTrayIcon.htm
  command('#NoTrayIcon', signature($parameterless)),

  // https://www.autohotkey.com/docs/v1/lib/_Persistent.htm
  command('#Persistent', signature($parameterless)),

  // https://www.autohotkey.com/docs/v1/lib/_Requires.htm
  command('#Requires', signature([ $requiresVersion() ])),

  // https://www.autohotkey.com/docs/v1/lib/_SingleInstance.htm
  command('#SingleInstance', signature([ $shouldKeyword([ keywordOption('Force', 'Ignore', 'Prompt', 'Off') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/_UseHook.htm
  command('#UseHook', signature([ $shouldKeyword([ keywordOption('On', 'Off') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/_Warn.htm
  command('#Warn', signature([ $shouldKeyword([ keywordOption('UseUnsetLocal', 'UseUnsetGlobal', 'UseEnv', 'LocalSameAsGlobal', 'ClassOverwrite', 'Unreachable', 'All') ]), $shouldKeyword([ keywordOption('MsgBox', 'StdOut', 'OutputDebug', 'Off') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/_WinActivateForce.htm
  command('#WinActivateForce', signature($parameterless)),
];
// #endregion directives

// #region loop
export const loopCommandDefenitions: CommandDefinition[] = [
  command('Loop', [
    // https://www.autohotkey.com/docs/v1/lib/LoopFile.htm
    signature([ $flowsubcommand('Files'), $path(), $shouldKeyword([ letterOption('D', 'F', 'R') ]) ]),

    // https://www.autohotkey.com/docs/v1/lib/LoopParse.htm
    signature([ $flowsubcommand('Parse'), $input(), $([ keywordOption('CSV') ]), $shouldEscapeComma() ]),

    // https://www.autohotkey.com/docs/v1/lib/LoopReadFile.htm
    signature([ $flowsubcommand('Read'), $path(), $shouldEscapeComma() ]),

    // https://www.autohotkey.com/docs/v1/lib/LoopReg.htm#new
    signature([ $flowsubcommand('Reg'), $(), $shouldKeyword([ letterOption('K', 'V', 'R') ]) ]),
  ]),
];
// #endregion loop

// #region commands
export const commandDefinitions: CommandDefinition[] = [
  // https://www.autohotkey.com/docs/v1/lib/AutoTrim.htm
  command('AutoTrim', signature([ $onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/BlockInput.htm
  command('BlockInput', signature([ $onOff([ keywordOption('Send', 'Mouse', 'SendAndMouse', 'Default', 'MouseMove', 'MouseMoveOff') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/Click.htm
  command('Click', signature([ $click() ])),

  // https://www.autohotkey.com/docs/v1/lib/ClipWait.htm
  command('ClipWait', signature([ $expression(), $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/Control.htm
  command(
    'Control',
    [
      signature([ $subcommand([ 'Check', 'UnCheck', 'Enable', 'Disable', 'Show', 'Hide', 'ShowDropDown', 'HideDropDown' ]), $blank(), $control(), ...$winParams ]),
      signature([ $subcommand([ 'Style', 'ExStyle' ]), $style(), $control(), ...$winParams ]),
      signature([ $subcommand([ 'Add', 'ChooseString', 'EditPaste' ]), $(), $control(), ...$winParams ]),
      signature([ $subcommand([ 'TabLeft', 'TabRight', 'Delete', 'Choose' ]), $shouldInteger(), $control(), ...$winParams ]),
      signature($parameterless),
    ],
  ),

  // https://www.autohotkey.com/docs/v1/lib/ControlClick.htm
  command('ControlClick', signature([ $controlOrPos(), $winTitle(), $(), $whichButton(), $expression(), $([ keywordOption('NA', 'D', 'U', 'Pos'), decimalOption('X', 'Y') ]), $winTitle(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlFocus.htm
  command('ControlFocus', signature([ $control(), ...$winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlGet.htm
  command('ControlGet', [
    signature([ $output(), $subcommand('List'), $shouldSpacedKeywords([ keywordOption('Selected', 'Focused', 'Col', 'Count') ]), $control(), ...$winParams ]),
    signature([ $output(), $subcommand([ 'Checked', 'Enabled', 'Visible', 'Tab', 'Choice', 'LineCount', 'CurrentLine', 'CurrentCol', 'Selected', 'Style', 'ExStyle', 'Hwnd' ]), $blank(), $control(), ...$winParams ]),
    signature([ $output(), $subcommand([ 'FindString', 'Line' ]), $(), $control(), ...$winParams ]),
    signature([ $output(), $invalid() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/ControlGetFocus.htm
  command('ControlGetFocus', signature([ $output(), ...$winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlGetPos.htm
  command('ControlGetPos', signature([ $output(), $output(), $output(), $output(), $control(), ...$winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlGetText.htm
  command('ControlGetText', signature([ $output(), $control(), ...$winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlMove.htm
  command('ControlMove', signature([ $control(), $expression(), $expression(), $expression(), $expression(), ...$winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlSend.htm
  command('ControlSend', signature([ $control(), $sendKeyName(), ...$winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlSendRaw.htm
  command('ControlSendRaw', signature([ $control(), $(), ...$winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/ControlSetText.htm
  command('ControlSetText', signature([ $control(), $(), ...$winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/CoordMode.htm
  command('CoordMode', signature([ $shouldKeyword([ keywordOption('ToolTip', 'Pixel', 'Mouse', 'Caret', 'Menu') ]), $shouldKeyword([ keywordOption('Screen', 'Relative', 'Window', 'Client') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/Critical.htm
  command('Critical', signature([ $([ keywordOption('On', 'Off') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/DetectHiddenText.htm
  command('DetectHiddenText', signature([ $onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/DetectHiddenWindows.htm
  command('DetectHiddenWindows', signature([ $onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/Drive.htm
  command('Drive', [
    signature([ $subcommand('Eject'), $(), $shouldKeyword([ keywordOption('1') ]) ]),
    signature([ $subcommand('Label'), $(), $() ]),
    signature([ $subcommand([ 'Lock', 'Unlock' ]), $() ]),
    signature([ $invalid() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/DriveGet.htm
  command('DriveGet', [
    signature([ $output(), $subcommand('List'), $shouldKeyword([ keywordOption('CDROM', 'REMOVABLE', 'FIXED', 'NETWORK', 'RAMDISK', 'UNKNOWN') ]) ]),
    signature([ $output(), $subcommand([ 'Capacity', 'Cap', 'FileSystem', 'FS', 'Label', 'Serial', 'Type', 'Status', 'StatusCD' ]), $() ]),
    signature([ $output(), $invalid() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/DriveSpaceFree.htm
  command('DriveSpaceFree', signature([ $output(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/Edit.htm
  command('Edit', signature($parameterless)),

  // https://www.autohotkey.com/docs/v1/lib/EnvAdd.htm
  command('EnvAdd', signature([ $input(), $expression(), $timeunit() ])),

  // https://www.autohotkey.com/docs/v1/lib/EnvDiv.htm
  command('EnvDiv', signature([ $input(), $expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/EnvGet.htm
  command('EnvGet', signature([ $input(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/EnvMult.htm
  command('EnvMult', signature([ $input(), $expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/EnvSet.htm
  command('EnvSet', signature([ $(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/EnvSub.htm
  command('EnvSub', signature([ $input(), $expression(), $timeunit() ])),

  // https://www.autohotkey.com/docs/v1/lib/EnvUpdate.htm
  command('EnvUpdate', signature($parameterless)),

  // https://www.autohotkey.com/docs/v1/lib/FileAppend.htm
  command('FileAppend', signature([ $(), $path(), $encoding() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileCopy.htm
  command('FileCopy', signature([ $glob(), $glob(), $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileCopyDir.htm
  command('FileCopyDir', signature([ $path(), $path(), $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileCreateDir.htm
  command('FileCreateDir', signature([ $path() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileCreateShortcut.htm
  command('FileCreateShortcut', signature([ $path(), $path(), $path(), $(), $(), $path(), $(), $expression(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileDelete.htm
  command('FileDelete', signature([ $glob() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileEncoding.htm
  command('FileEncoding', signature([ $encoding() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileInstall.htm
  command('FileInstall', signature([ $path(), $path(), $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileGetAttrib.htm
  command('FileGetAttrib', signature([ $output(), $path() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileGetShortcut.htm
  command('FileGetShortcut', signature([ $path(), $output(), $output(), $output(), $output(), $output(), $output(), $output() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileGetSize.htm
  command('FileGetSize', signature([ $output(), $path(), $shouldKeyword([ keywordOption('B', 'K', 'M') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/FileGetTime.htm
  command('FileGetTime', signature([ $output(), $path(), $shouldKeyword([ keywordOption('M', 'C', 'A') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/FileGetVersion.htm
  command('FileGetVersion', signature([ $output(), $path() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileMove.htm
  command('FileMove', signature([ $glob(), $glob(), $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileMoveDir.htm
  command('FileMoveDir', signature([ $path(), $path(), $shouldKeyword([ keywordOption('0', '1', '2', 'R') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/FileRead.htm
  command('FileRead', signature([ $output(), $path([ keywordOption('*c', '*t'), decimalOption('*m', '*P') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/FileReadLine.htm
  command('FileReadLine', signature([ $output(), $path(), $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileRecycle.htm
  command('FileRecycle', signature([ $glob() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileRecycleEmpty.htm
  command('FileRecycleEmpty', signature([ $() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileRemoveDir.htm
  command('FileRemoveDir', signature([ $path(), $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileSelectFile.htm
  command('FileSelectFile', signature([ $output(), $([ keywordOption('M', 'S') ]), $path(), $(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileSelectFolder.htm
  command('FileSelectFolder', signature([ $output(), $(), $expression(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileSetAttrib.htm
  command('FileSetAttrib', signature([ $fileAttributes(), $glob(), $expression(), $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FileSetTime.htm
  command('FileSetTime', signature([ $expression(), $glob(), $shouldKeyword([ letterOption('M', 'C', 'A') ]), $expression(), $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/FormatTime.htm
  command('FormatTime', [
    signature([ $output(), $(), $subcommandlike([ 'Time', 'ShortDate', 'LongDate', 'YearMonth', 'YDay', 'YDay0', 'WDay', 'YWeek' ]), $rest() ]),
    signature([ $output(), $(), $formatTime() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/GetKeyState.htm#command
  command('GetKeyState', signature([ $output(), $shouldKeyword([ keywordOption('P', 'T') ]) ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/GroupActivate.htm
  command('GroupActivate', signature([ $(), $shouldKeyword([ keywordOption('R') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/GroupAdd.htm
  command('GroupAdd', signature([ $(), $winTitle(), $(), $(), $winTitle(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/GroupClose.htm
  command('GroupClose', signature([ $(), $shouldKeyword([ keywordOption('R', 'A') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/GroupDeactivate.htm
  command('GroupDeactivate', signature([ $(), $shouldKeyword([ keywordOption('R') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/Gui.htm
  command('Gui', [
    signature([ $guisubcommand('New'), $guiOptions(), $() ]),
    signature([ $guisubcommand('Add'), $guiControlType(), $guiControlOptions(), $() ]),
    signature([ $guisubcommand('Show'), $([ keywordOption('xCenter', 'yCenter', 'AutoSize', 'Minimize', 'Maximize', 'Restore', 'NoActivate', 'NA', 'Hide', 'Center'), numberOption('W', 'H', 'X', 'Y') ]), $() ]),
    signature([ $guisubcommand('Submit'), $shouldKeyword([ keywordOption('NoHide') ]) ]),
    signature([ $guisubcommand([ 'Cancel', 'Hide', 'Destroy', 'Minimize', 'Maximize', 'Restore', 'Default' ]), $rest() ]),
    signature([ $guisubcommand('Font'), $([ colorOption('C'), numberOption('S', 'W', 'Q') ]), $() ]),
    signature([ $guisubcommand('Color'), $color(), $color() ]),
    signature([ $guisubcommand('Margin'), $withNumber(), $withNumber() ]),
    signature([ $guisubcommand('Menu'), $() ]),
    signature([ $guisubcommand('Flash'), $shouldKeyword([ 'Off' ]) ]),
    signature([ $guiOptions() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/GuiControl.htm
  command('GuiControl', [
    signature([ $guisubcommand([ 'Text', 'Choose', 'ChooseString' ]), $control(), $() ]),
    signature([ $guisubcommand([ 'Move', 'MoveDraw' ]), $control(), $controlMoveOptions() ]),
    signature([ $guisubcommand([ 'Focus', 'Disable', 'Enable', 'Hide', 'Show', 'Font' ]), $control() ]),
    signature([ $flagedGuiControlOptions(), $control(), $() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/GuiControlGet.htm
  command('GuiControlGet', [
    signature([ $output(), $guisubcommand([ 'Pos', 'Focus', 'FocusV', 'Visible', 'Hwnd', 'Name' ]), $control() ]),
    signature([ $output(), $blank(), $control(), $() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/Hotkey.htm
  command('Hotkey', [
    signature([ $subcommand([ 'IfWinActive', 'IfWinExist' ]), $winTitle(), $() ]),
    signature([ $subcommand('If'), $expression(), $rest() ]),
    signature([ $hotkeyName(), $([ keywordOption('On', 'Off', 'Toggle', 'AltTab') ]), $([ keywordOption('UseErrorLevel', 'On', 'Off', 'B', 'B0'), numberOption('P', 'T', 'I') ]) ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/ImageSearch.htm
  command('ImageSearch', signature([ $output(), $output(), $expression(), $expression(), $expression(), $expression(), $([ stringOption('HBITMAP:'), numberOption('*Icon', '*', '*Trans', '*w', '*h') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/IniDelete.htm
  command('IniDelete', signature([ $path(), $(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/IniRead.htm
  command('IniRead', signature([ $output(), $path(), $(), $(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/IniWrite.htm
  command('IniWrite', signature([ $(), $(), $path(), $(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/Input.htm
  command('Input', signature([ $output(), $([ keywordOption('B', 'C', 'V', 'E', 'M'), keywordOption('*'), numberOption('I', 'L', 'T') ]), $([ endKeyOption() ]), $([ matchKeyOption() ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/InputBox.htm
  command('InputBox', signature([ $output(), $(), $(), $(), $expression(), $expression(), $expression(), $expression(), $(), $expression(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/KeyHistory.htm
  command('KeyHistory', signature($parameterless)),

  // https://www.autohotkey.com/docs/v1/lib/KeyWait.htm
  command('KeyWait', signature([ $keyName(), $([ keywordOption('D', 'L'), decimalOption('T') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/ListHotkeys.htm
  command('ListHotkeys', signature($parameterless)),

  // https://www.autohotkey.com/docs/v1/lib/ListLines.htm
  command('ListLines', signature([ $onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/ListVars.htm
  command('ListVars', signature($parameterless)),

  // https://www.autohotkey.com/docs/v1/lib/Menu.htm
  command('Menu', [
    signature([ $subcommand('Tray'), $subcommand('Icon'), $imagePath(), $(), $() ]),
    signature([ $subcommand('Tray'), $subcommand([ 'Tip', 'Click' ]), $() ]),
    signature([ $subcommand('Tray'), $subcommand([ 'MainWindow', 'NoMainWindow', 'NoIcon' ]), $rest() ]),
    signature([ $subcommand('Tray'), $(), $path(), $(), $() ]),
    signature([ $(), $subcommand('Add'), $menuItemName(), $(), $menuOptions() ]),
    signature([ $(), $subcommand('Insert'), $menuItemName(), $(), $(), $menuOptions() ]),
    signature([ $(), $subcommand([ 'DeleteAll', 'NoDefault', 'Standard', 'NoStandard' ]), $rest() ]),
    signature([ $(), $subcommand([ 'Delete', 'Check', 'Uncheck', 'ToggleCheck', 'Enable', 'Disable', 'ToggleEnable', 'Default', 'NoIcon' ]), $menuItemName() ]),
    signature([ $(), $subcommand('Rename'), $menuItemName(), $menuItemName() ]),
    signature([ $(), $subcommand('Icon'), $(), $path(), $(), $imagePath() ]),
    signature([ $(), $subcommand('UseErrorLevel'), $shouldKeyword([ keywordOption('Off') ]) ]),
    signature([ $(), $subcommand([ 'Show', 'Color' ]), $(), $() ]),
    signature([ $rest() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/MouseClick.htm
  command('MouseClick', signature([ $whichButton(), $expression(), $expression(), $expression(), $expression(), $shouldKeyword([ keywordOption('D', 'U') ]), $shouldKeyword([ keywordOption('R') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/MouseClickDrag.htm
  command('MouseClickDrag', signature([ $whichButton(), $expression(), $expression(), $expression(), $expression(), $expression(), $shouldKeyword([ keywordOption('R') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/MouseGetPos.htm
  command('MouseGetPos', signature([ $output(), $output(), $output(), $output(), $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/MouseMove.htm
  command('MouseMove', signature([ $expression(), $expression(), $expression(), $shouldKeyword([ keywordOption('R') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/MsgBox.htm
  command('MsgBox', signature([ $(), $(), $(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/OnExit.htm#command
  command('OnExit', signature([ $() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/OutputDebug.htm
  command('OutputDebug', signature([ $() ])),

  // https://www.autohotkey.com/docs/v1/lib/Pause.htm
  command('Pause', signature([ $onOffToggle(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/PixelGetColor.htm
  command('PixelGetColor', signature([ $output(), $expression(), $expression(), $shouldSpacedKeywords([ keywordOption('Alt', 'Slow', 'RGB') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/PixelSearch.htm
  command('PixelSearch', signature([ $output(), $output(), $expression(), $expression(), $expression(), $expression(), $expression(), $expression(), $shouldSpacedKeywords([ keywordOption('Fast', 'RGB') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/PostMessage.htm
  command('PostMessage', signature([ $expression(), $expression(), $expression(), $control(), ...$winParams ])),
  command('SendMessage', signature([ $expression(), $expression(), $expression(), $control(), ...$winParams, $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/Process.htm
  command('Process', [
    signature([ $subcommand([ 'Exist', 'Close' ]), $() ]),
    signature([ $subcommand([ 'Wait', 'WaitClose' ]), $(), $() ]),
    signature([ $subcommand([ 'Priority' ]), $(), $shouldKeyword([ keywordOption('Low', 'L', 'BelowNormal', 'B', 'Normal', 'N', 'AboveNormal', 'A', 'High', 'H', 'Realtime', 'R') ]) ]),
    signature([ $subcommand([ 'List' ]), $rest() ]),
    signature($parameterless),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/Progress.htm
  command('Progress', [
    signature([ $subcommandlike('Off'), $rest() ]),
    signature([ $(), $(), $(), $winTitle(), $() ]),
  ], CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/Random.htm
  command('Random', signature([ $output(), $expression(), $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/RegDelete.htm
  command('RegDelete', signature([ $(), $(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/RegRead.htm
  command('RegRead', signature([ $output(), $(), $(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/RegWrite.htm
  command('RegWrite', signature([ $shouldKeyword([ keywordOption('REG_SZ', 'REG_EXPAND_SZ', 'REG_MULTI_SZ', 'REG_DWORD', 'REG_BINARY') ]), $(), $(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/Reload.htm
  command('Reload', signature($parameterless)),

  // https://www.autohotkey.com/docs/v1/lib/Run.htm
  command('Run', signature([ $(), $path(), $shouldSpacedKeywords([ keywordOption('Max', 'Min', 'Hide', 'UseErrorLevel') ]), $output() ])),

  // https://www.autohotkey.com/docs/v1/lib/RunWait.htm
  command('RunWait', signature([ $(), $path(), $shouldSpacedKeywords([ keywordOption('Max', 'Min', 'Hide', 'UseErrorLevel') ]), $output() ])),

  // https://www.autohotkey.com/docs/v1/lib/Send.htm
  command('Send', signature([ $sendKeyName() ])),

  // https://www.autohotkey.com/docs/v1/lib/SendRaw.htm
  command('SendRaw', signature([ $sendKeyName() ])),

  // https://www.autohotkey.com/docs/v1/lib/SendInput.htm
  command('SendInput', signature([ $sendKeyName() ])),

  // https://www.autohotkey.com/docs/v1/lib/SendPlay.htm
  command('SendPlay', signature([ $sendKeyName() ])),

  // https://www.autohotkey.com/docs/v1/lib/SendEvent.htm
  command('SendEvent', signature([ $sendKeyName() ])),

  // https://www.autohotkey.com/docs/v1/lib/SendLevel.htm
  command('SendLevel', signature([ $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SendMode.htm
  command('SendMode', signature([ $shouldKeyword([ keywordOption('Event', 'Input', 'InputThenPlay', 'Play') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetBatchLines.htm
  command('SetBatchLines', signature([ $() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetNumScrollCapsLockState.htm
  command('SetCapsLockState', signature([ $onOff([ keywordOption('AlwaysOn', 'AlwaysOff') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetControlDelay.htm
  command('SetControlDelay', signature([ $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetDefaultMouseSpeed.htm
  command('SetDefaultMouseSpeed', signature([ $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetEnv.htm
  command('SetEnv', signature([ $input(), $() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/SetFormat.htm
  command('SetFormat', signature([ $(), $() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/SetKeyDelay.htm
  command('SetKeyDelay', signature([ $expression(), $expression(), $shouldKeyword([ keywordOption('Play', '-1') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetMouseDelay.htm
  command('SetMouseDelay', signature([ $expression(), $shouldKeyword([ keywordOption('Play', '-1') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetNumLockState.htm
  command('SetNumLockState', signature([ $onOff([ keywordOption('AlwaysOn', 'AlwaysOff') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetScrollLockState.htm
  command('SetScrollLockState', signature([ $onOff([ keywordOption('AlwaysOn', 'AlwaysOff') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetRegView.htm
  command('SetRegView', signature([ $shouldKeyword([ keywordOption('32', '64', 'Default') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetStoreCapsLockMode.htm
  command('SetStoreCapsLockMode', signature([ $onOff() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetTimer.htm
  command('SetTimer', signature([ $(), $shouldNumber(keywordOption('On', 'Off', 'Delete')), $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetTitleMatchMode.htm
  command('SetTitleMatchMode', signature([ $shouldKeyword([ keywordOption('1', '2', '3', 'RegEx', 'Fast', 'Slow') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SetWinDelay.htm
  command('SetWinDelay', signature([ $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SetWorkingDir.htm
  command('SetWorkingDir', signature([ $path() ])),

  // https://www.autohotkey.com/docs/v1/lib/Sleep.htm
  command('Sleep', signature([ $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/Sort.htm
  command('Sort', signature([ $input(), $([ keywordOption('C', 'CL', 'N', 'R', 'Random', 'U', 'Z', '\\'), numberOption('D', 'P'), identifierOption('F') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundBeep.htm
  command('SoundBeep', signature([ $expression(), $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundGet.htm
  command('SoundGet', signature([ $output(), $soundComponent(), $soundControlType(), $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundGetWaveVolume.htm
  command('SoundGetWaveVolume', signature([ $output(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundPlay.htm
  command('SoundPlay', signature([ $path(), $shouldKeyword([ keywordOption('Wait', '1') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundSet.htm
  command('SoundSet', signature([ $expression(), $soundComponent(), $soundControlType(), $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/SoundSetWaveVolume.htm
  command('SoundSetWaveVolume', signature([ $expression(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/SplashImage.htm
  command('SplashImage', [
    signature([ $subcommandlike('Off'), $rest() ]),
    signature([
      $imagePath(), $([
        keywordOption('A', 'T', 'Hide'),
        numberOption('B', 'M', 'P', 'H', 'W', 'X', 'Y', 'C', 'ZH', 'ZW', 'ZX', 'ZY', 'FM', 'FS', 'WM', 'WS'),
        colorOption('CB', 'CT', 'CW'),
        sizeOption('R'),
      ]), $(), $(), $winTitle(), $(),
    ]),
  ], CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/SplashTextOn.htm
  command('SplashTextOn', signature([ $expression(), $expression(), $(), $() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/SplashTextOff.htm
  command('SplashTextOff', signature($parameterless), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/SplitPath.htm
  command('SplitPath', signature([ $input(), $output(), $output(), $output(), $output(), $output() ])),

  // https://www.autohotkey.com/docs/v1/lib/StatusBarGetText.htm
  command('StatusBarGetText', signature([ $output(), $expression(), ...$winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/StatusBarWait.htm
  command('StatusBarWait', signature([ $(), $expression(), $expression(), $winTitle(), $(), $expression(), $winTitle(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/StringCaseSense.htm
  command('StringCaseSense', signature([ $onOff([ keywordOption('Locale') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/StringGetPos.htm
  command('StringGetPos', signature([ $output(), $input(), $(), $shouldKeyword([ numberOption('L', 'R') ]), $expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringLeft.htm
  command('StringLeft', signature([ $output(), $input(), $expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringLen.htm
  command('StringLen', signature([ $output(), $input() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringLower.htm
  command('StringLower', signature([ $output(), $input(), $shouldKeyword([ keywordOption('T') ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/StringMid.htm
  command('StringMid', signature([ $output(), $input(), $expression(), $expression(), $shouldKeyword([ keywordOption('L') ]) ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringReplace.htm
  command('StringReplace', signature([ $output(), $input(), $(), $(), $shouldKeyword([ keywordOption('All', 'A', '1') ]) ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringRight.htm
  command('StringRight', signature([ $output(), $input(), $expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringSplit.htm
  command('StringSplit', signature([ $output(), $input(), $(), $shouldEscapeComma() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringTrimLeft.htm
  command('StringTrimLeft', signature([ $output(), $input(), $expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringTrimRight.htm
  command('StringTrimRight', signature([ $output(), $input(), $expression() ]), CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/StringUpper.htm
  command('StringUpper', signature([ $output(), $input(), $shouldKeyword([ 'T' ]) ])),

  // https://www.autohotkey.com/docs/v1/lib/SysGet.htm
  command('SysGet', [
    signature([ $output(), $subcommand([ 'MonitorCount', 'MonitorPrimary' ]) ]),
    signature([ $output(), $subcommand([ 'Monitor', 'MonitorWorkArea', 'MonitorName' ]), $withNumber() ]),
    signature([ $output(), $shouldNumber() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/Thread.htm
  command('Thread', [
    signature([ $subcommand([ 'NoTimers', 'Priority' ]), $expression() ]),
    signature([ $subcommand('Interrupt'), $shouldNumber(), $shouldNumber() ]),
    signature($parameterless),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/ToolTip.htm
  command('ToolTip', signature([ $(), $expression(), $expression(), $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/Transform.htm
  command('Transform', [
    signature([ $output(), $subcommand([ 'Unicode', 'Deref', 'Asc', 'Chr', 'Exp', 'Sqrt', 'Log', 'Ln', 'Ceil', 'Floor', 'Abs', 'Sin', 'Cos', 'Tan', 'ASin', 'ACos', 'ATan', 'BitNot' ]), $() ]),
    signature([ $output(), $subcommand([ 'HTML', 'Mod', 'Round', 'Pow', 'BitAnd', 'BitOr', 'BitXOr', 'BitShiftLeft', 'BitShiftRight' ]), $(), $() ]),
    signature([ $output(), $invalid() ]),
  ], CommandFlag.Deprecated),

  // https://www.autohotkey.com/docs/v1/lib/TrayTip.htm
  command('TrayTip', signature([ $(), $(), $expression(), $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/URLDownloadToFile.htm
  command('UrlDownloadToFile', signature([ $(), $path() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinActivate.htm
  command('WinActivate', signature($winParams)),

  // https://www.autohotkey.com/docs/v1/lib/WinActivateBottom.htm
  command('WinActivateBottom', signature($winParams)),

  // https://www.autohotkey.com/docs/v1/lib/WinClose.htm
  command('WinClose', signature([ $winTitle(), $(), $expression(), $winTitle(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinGetActiveStats.htm
  command('WinGetActiveStats', signature([ $output(), $output(), $output(), $output(), $output(), $output() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinGetActiveTitle.htm
  command('WinGetActiveTitle', signature([ $output() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinGetClass.htm
  command('WinGetClass', signature([ $output(), ...$winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/WinGet.htm
  command('WinGet', [
    signature([ $output(), $subcommand([ 'ID', 'IDLast', 'PID', 'ProcessName', 'ProcessPath', 'Count', 'List', 'MinMax', 'ControlList', 'ControlListHwnd', 'Transparent', 'TransColor', 'Style', 'ExStyle' ]), ...$winParams ]),
    signature([ $output(), $invalid() ]),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/WinGetPos.htm
  command('WinGetPos', signature([ $output(), $output(), $output(), $output(), ...$winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/WinGetText.htm
  command('WinGetText', signature([ $output(), ...$winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/WinGetTitle.htm
  command('WinGetTitle', signature([ $output(), ...$winParams ])),

  // https://www.autohotkey.com/docs/v1/lib/WinHide.htm
  command('WinHide', signature($winParams)),

  // https://www.autohotkey.com/docs/v1/lib/WinKill.htm
  command('WinKill', signature([ $winTitle(), $(), $expression(), $winTitle(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinMaximize.htm
  command('WinMaximize', signature($winParams)),

  // https://www.autohotkey.com/docs/v1/lib/WinMenuSelectItem.htm
  command('WinMenuSelectItem', signature([ $winTitle(), $(), $(), $(), $(), $(), $(), $(), $winTitle(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinMinimize.htm
  command('WinMinimize', signature($winParams)),

  // https://www.autohotkey.com/docs/v1/lib/WinMinimizeAll.htm
  command('WinMinimizeAll', signature($parameterless)),

  // https://www.autohotkey.com/docs/v1/lib/WinMinimizeAllUndo.htm
  command('WinMinimizeAllUndo', signature($parameterless)),

  // https://www.autohotkey.com/docs/v1/lib/WinMove.htm
  command('WinMove', signature([ $winTitle(), $(), $expression(), $expression(), $expression(), $expression(), $winTitle(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinRestore.htm
  command('WinRestore', signature($winParams)),

  // https://www.autohotkey.com/docs/v1/lib/WinSet.htm
  command('WinSet', [
    signature([ $subcommand('AlwaysOnTop'), $onOffToggle(), ...$winParams ]),
    signature([ $subcommand([ 'Transparent', 'TransColor' ]), $(), ...$winParams ]),
    signature([ $subcommand([ 'Style', 'ExStyle' ]), $style(), ...$winParams ]),
    signature([ $subcommand([ 'Bottom', 'Top', 'Disable', 'Enable', 'Redraw' ]), $blank(), ...$winParams ]),
    signature([ $subcommand('Region'), $([ keywordOption('E'), numberOption('W', 'H'), rangeOption('R', '') ]), ...$winParams ]),
    signature($parameterless),
  ]),

  // https://www.autohotkey.com/docs/v1/lib/WinSetTitle.htm
  command('WinSetTitle', signature([ $winTitle(), $(), $(), $winTitle(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinShow.htm
  command('WinShow', signature($winParams)),

  // https://www.autohotkey.com/docs/v1/lib/WinWait.htm
  command('WinWait', signature([ $winTitle(), $(), $expression(), $winTitle(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinWaitActive.htm
  command('WinWaitActive', signature([ $winTitle(), $(), $expression(), $winTitle(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinWaitNotActive.htm
  command('WinWaitNotActive', signature([ $winTitle(), $(), $expression(), $winTitle(), $() ])),

  // https://www.autohotkey.com/docs/v1/lib/WinWaitClose.htm
  command('WinWaitClose', signature([ $winTitle(), $(), $expression(), $winTitle(), $() ])),
] as const;
// #endregion commands

// #region jump
export const jumpCommandDefenitions: CommandDefinition[] = [
  // https://www.autohotkey.com/docs/v1/lib/Break.htm
  command('Break', signature([ $shouldLabel() ])),

  // https://www.autohotkey.com/docs/v1/lib/Exit.htm
  command('Exit', signature([ $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/ExitApp.htm
  command('ExitApp', signature([ $expression() ])),

  // https://www.autohotkey.com/docs/v1/lib/Gosub.htm
  command('Gosub', signature([ $shouldLabel() ])),

  // https://www.autohotkey.com/docs/v1/lib/Goto.htm
  command('Goto', signature([ $shouldLabel() ])),

  // https://www.autohotkey.com/docs/v1/lib/Return.htm
  command('Return', signature([ $expression() ])),
];
// #endregion jump
