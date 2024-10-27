// #region constants
export const scopeNames = [ 'autohotkey', 'autohotkeynext', 'autohotkeyl', 'autohotkey2' ] as const;

// #region builtin-variables
export const builtinVaribles_v1 = [
  // #region [Special Characters](https://www.autohotkey.com/docs/v1/Variables.htm#Special_Characters)
  'A_Space',
  'A_Tab',
  // #endregion Special Characters

  // #region [Script Properties](https://www.autohotkey.com/docs/v1/Variables.htm#prop)
  'A_Args',
  'A_WorkingDir',
  'A_InitialWorkingDir',
  'A_ScriptDir',
  'A_ScriptName',
  'A_ScriptFullPath',
  'A_ScriptHwnd',
  'A_LineNumber',
  'A_LineFile',
  'A_ThisFunc',
  'A_ThisLabel',
  'A_AhkVersion',
  'A_AhkPath',
  'A_IsUnicode',
  'A_IsCompiled',
  'A_ExitReason',
  // #endregion Script Properties

  // #region [Date and Time](https://www.autohotkey.com/docs/v1/Variables.htm#date)
  'A_YYYY',
  'A_MM',
  'A_DD',
  'A_MMMM',
  'A_MMM',
  'A_DDDD',
  'A_DDD',
  'A_WDay',
  'A_YDay',
  'A_YWeek',
  'A_Hour',
  'A_Min',
  'A_Sec',
  'A_MSec',
  'A_Now',
  'A_NowUTC',
  'A_TickCount',
  // #endregion Date and Time

  // #region [Script Settings](https://www.autohotkey.com/docs/v1/Variables.htm#settings)
  'A_IsSuspended',
  'A_IsPaused',
  'A_IsCritical',
  'A_BatchLines',
  'A_ListLines',
  'A_TitleMatchMode',
  'A_TitleMatchModeSpeed',
  'A_DetectHiddenWindows',
  'A_DetectHiddenText',
  'A_AutoTrim',
  'A_StringCaseSense',
  'A_FileEncoding',
  'A_FormatInteger',
  'A_FormatFloat',
  'A_SendMode',
  'A_SendLevel',
  'A_StoreCapsLockMode',
  'A_KeyDelay',
  'A_KeyDuration',
  'A_KeyDelayPlay',
  'A_KeyDurationPlay',
  'A_WinDelay',
  'A_ControlDelay',
  'A_MouseDelay',
  'A_MouseDelayPlay',
  'A_DefaultMouseSpeed',
  'A_CoordModeToolTip',
  'A_CoordModePixel',
  'A_CoordModeMouse',
  'A_CoordModeCaret',
  'A_CoordModeMenu',
  'A_RegView',
  'A_IconHidden',
  'A_IconTip',
  'A_IconFile',
  'A_IconNumber',
  // #endregion Script Settings

  // #region [User Idle Time](https://www.autohotkey.com/docs/v1/Variables.htm#User_Idle_Time)
  'A_TimeIdle',
  'A_TimeIdlePhysical',
  'A_TimeIdleKeyboard',
  'A_TimeIdleMouse',
  // #endregion User Idle Time

  // #region [GUI Windows and Menu Bars](https://www.autohotkey.com/docs/v1/Variables.htm#gui)
  'A_DefaultGui',
  'A_DefaultListView',
  'A_DefaultTreeView',
  'A_Gui',
  'A_GuiControl',
  'A_GuiWidth',
  'A_GuiHeight',
  'A_GuiX',
  'A_GuiY',
  'A_GuiEvent',
  'A_GuiControlEvent',
  'A_EventInfo',
  // #endregion GUI Windows and Menu Bars

  // #region [Hotkeys, Hotstrings, and Custom Menu Items](https://www.autohotkey.com/docs/v1/Variables.htm#h)
  'A_ThisMenuItem',
  'A_ThisMenu',
  'A_ThisMenuItemPos',
  'A_ThisHotkey',
  'A_PriorHotkey',
  'A_PriorKey',
  'A_TimeSinceThisHotkey',
  'A_TimeSincePriorHotkey',
  'A_EndChar',
  // #endregion Hotkeys, Hotstrings, and Custom Menu Items

  // #region [Operating System and User Info](https://www.autohotkey.com/docs/v1/Variables.htm#os)
  'ComSpec',
  'A_ComSpec',
  'A_Temp',
  'A_OSType',
  'A_OSVersion',
  'A_Is64bitOS',
  'A_PtrSize',
  'A_Language',
  'A_ComputerName',
  'A_UserName',
  'A_WinDir',
  'A_ProgramFiles',
  'ProgramFiles',
  'A_AppData',
  'A_AppDataCommon',
  'A_Desktop',
  'A_DesktopCommon',
  'A_StartMenu',
  'A_StartMenuCommon',
  'A_Programs',
  'A_ProgramsCommon',
  'A_Startup',
  'A_StartupCommon',
  'A_MyDocuments',
  'A_IsAdmin',
  'A_ScreenWidth',
  'A_ScreenHeight',
  'A_ScreenDPI',
  'A_IPAddress1',
  'A_IPAddress2',
  'A_IPAddress3',
  'A_IPAddress4',
  // #endregion Operating System and User Info

  // #region [Misc.](https://www.autohotkey.com/docs/v1/Variables.htm#misc)
  'A_Cursor',
  'A_CaretX',
  'A_CaretY',
  'Clipboard',
  'A_Clipboard',
  'ClipboardAll',
  'ErrorLevel',
  'A_LastError',
  'True',
  'False',
  // #endregion Misc.

  // #region [Loop](https://www.autohotkey.com/docs/v1/Variables.htm#loop)
  'A_Index',

  // #region [Loop (files & folders)](https://www.autohotkey.com/docs/v1/lib/LoopFile.htm#Special_Variables)
  'A_LoopFileName',
  'A_LoopFileExt',
  'A_LoopFileFullPath',
  'A_LoopFilePath',
  'A_LoopFileLongPath',
  'A_LoopFileShortPath',
  'A_LoopFileShortName',
  'A_LoopFileDir',
  'A_LoopFileTimeModified',
  'A_LoopFileTimeCreated',
  'A_LoopFileTimeAccessed',
  'A_LoopFileAttrib',
  'A_LoopFileSize',
  'A_LoopFileSizeKB',
  'A_LoopFileSizeMB',
  // #endregion Loop (files & folders)

  // #region [Loop (registry)](https://www.autohotkey.com/docs/v1/lib/LoopReg.htm#Remarks)
  'A_LoopRegName',
  'A_LoopRegType',
  'A_LoopRegKey',
  'A_LoopRegSubKey',
  'A_LoopRegTimeModified',
  // #endregion Loop (registry)

  // #region [Loop (read file contents)](https://www.autohotkey.com/docs/v1/lib/LoopReadFile.htm#Remarks)
  'A_LoopReadLine',
  // #endregion Loop (read file contents)

  // #region [Loop (parse a string)](https://www.autohotkey.com/docs/v1/lib/LoopParse.htm#Remarks)
  'A_LoopField',
  // #endregion Loop (parse a string)
  // #endregion Loop
] as const;
export const builtinVaribles_v2 = [
  // #region [Special Characters](https://www.autohotkey.com/docs/v2/Variables.htm#Special_Characters)
  'A_Space',
  'A_Tab',
  // #endregion Special Characters

  // #region [Script Properties](https://www.autohotkey.com/docs/v2/Variables.htm#prop)
  'A_Args',
  'A_WorkingDir',
  'A_InitialWorkingDir',
  'A_ScriptDir',
  'A_ScriptName',
  'A_ScriptFullPath',
  'A_ScriptHwnd',
  'A_LineNumber',
  'A_LineFile',
  'A_ThisFunc',
  'A_AhkVersion',
  'A_AhkPath',
  'A_IsCompiled',
  // #endregion Script Properties

  // #region [Date and Time](https://www.autohotkey.com/docs/v2/Variables.htm#date)
  'A_YYYY',
  'A_MM',
  'A_DD',
  'A_MMMM',
  'A_MMM',
  'A_DDDD',
  'A_DDD',
  'A_WDay',
  'A_YDay',
  'A_YWeek',
  'A_Hour',
  'A_Min',
  'A_Sec',
  'A_MSec',
  'A_Now',
  'A_NowUTC',
  'A_TickCount',
  // #endregion Date and Time

  // #region [Script Settings](https://www.autohotkey.com/docs/v2/Variables.htm#settings)
  'A_IsSuspended',
  'A_IsPaused',
  'A_IsCritical',
  'A_ListLines',
  'A_TitleMatchMode',
  'A_TitleMatchModeSpeed',
  'A_DetectHiddenWindows',
  'A_DetectHiddenText',
  'A_FileEncoding',
  'A_SendMode',
  'A_SendLevel',
  'A_StoreCapsLockMode',
  'A_KeyDelay',
  'A_KeyDuration',
  'A_KeyDelayPlay',
  'A_KeyDurationPlay',
  'A_WinDelay',
  'A_ControlDelay',
  'A_MenuMaskKey',
  'A_MouseDelay',
  'A_MouseDelayPlay',
  'A_DefaultMouseSpeed',
  'A_CoordModeToolTip',
  'A_CoordModePixel',
  'A_CoordModeMouse',
  'A_CoordModeCaret',
  'A_CoordModeMenu',
  'A_RegView',
  'A_TrayMenu',
  'A_AllowMainWindow',
  'A_IconHidden',
  'A_IconTip',
  'A_IconFile',
  'A_IconNumber',
  // #endregion Script Settings

  // #region [User Idle Time](https://www.autohotkey.com/docs/v2/Variables.htm#User_Idle_Time)
  'A_TimeIdle',
  'A_TimeIdlePhysical',
  'A_TimeIdleKeyboard',
  'A_TimeIdleMouse',
  // #endregion User Idle Time

  // #region [Hotkeys, Hotstrings, and Custom Menu Items](https://www.autohotkey.com/docs/v2/Variables.htm#h)
  'A_ThisHotkey',
  'A_PriorHotkey',
  'A_PriorKey',
  'A_TimeSinceThisHotkey',
  'A_TimeSincePriorHotkey',
  'A_EndChar',
  'A_MaxHotkeysPerInterval',
  'A_HotkeyInterval',
  'A_HotkeyModifierTimeout',
  // #endregion Hotkeys, Hotstrings, and Custom Menu Items

  // #region [Operating System and User Info](https://www.autohotkey.com/docs/v2/Variables.htm#os)
  'A_ComSpec',
  'A_Temp',
  'A_OSVersion',
  'A_Is64bitOS',
  'A_PtrSize',
  'A_Language',
  'A_ComputerName',
  'A_UserName',
  'A_WinDir',
  'A_ProgramFiles',
  'A_AppData',
  'A_AppDataCommon',
  'A_Desktop',
  'A_DesktopCommon',
  'A_StartMenu',
  'A_StartMenuCommon',
  'A_Programs',
  'A_ProgramsCommon',
  'A_Startup',
  'A_StartupCommon',
  'A_MyDocuments',
  'A_IsAdmin',
  'A_ScreenWidth',
  'A_ScreenHeight',
  'A_ScreenDPI',
  // #endregion Operating System and User Info

  // #region [Misc.](https://www.autohotkey.com/docs/v2/Variables.htm#misc)
  'A_Clipboard',
  'A_Cursor',
  'A_EventInfo',
  'A_LastError',
  'True',
  'False',
  // #endregion Misc.

  // #region [Loop](https://www.autohotkey.com/docs/v2/Variables.htm#loop)
  'A_Index',

  // #region [Loop Files](https://www.autohotkey.com/docs/v2/lib/LoopFiles.htm#Special_Variables)
  'A_LoopFileName',
  'A_LoopFileExt',
  'A_LoopFilePath',
  'A_LoopFileFullPath',
  'A_LoopFileShortPath',
  'A_LoopFileShortName',
  'A_LoopFileDir',
  'A_LoopFileTimeModified',
  'A_LoopFileTimeCreated',
  'A_LoopFileTimeAccessed',
  'A_LoopFileAttrib',
  'A_LoopFileSize',
  'A_LoopFileSizeKB',
  'A_LoopFileSizeMB',
  // #endregion Loop Files

  // #region [Loop Reg](https://www.autohotkey.com/docs/v2/lib/LoopReg.htm#Remarks)
  'A_LoopRegName',
  'A_LoopRegType',
  'A_LoopRegKey',
  'A_LoopRegTimeModified',
  // #endregion Loop Reg

  // #region [Loop Read](https://www.autohotkey.com/docs/v2/lib/LoopRead.htm#Remarks)
  'A_LoopReadLine',
  // #endregion Loop Read

  // #region [Loop Parse](https://www.autohotkey.com/docs/v2/lib/LoopParse.htm#Remarks)
  'A_LoopField',
  // #endregion Loop Parse
  // #endregion Loop
] as const;
// #endregion builtin-variables

// https://www.autohotkey.com/docs/v1/lib/index.htm
export const commandNames = [
  'AutoTrim',
  'BlockInput',
  'Click',
  'ClipWait',
  'Control',
  'ControlClick',
  'ControlFocus',
  'ControlGet',
  'ControlGetFocus',
  'ControlGetPos',
  'ControlGetText',
  'ControlMove',
  'ControlSend',
  'ControlSendRaw',
  'ControlSetText',
  'CoordMode',
  'Critical',
  'DetectHiddenText',
  'DetectHiddenWindows',
  'Drive',
  'DriveGet',
  'DriveSpaceFree',
  'Edit',
  'EnvAdd',
  'EnvDiv', // Deprecated
  'EnvGet',
  'EnvMult', // Deprecated
  'EnvSet',
  'EnvSub',
  'EnvUpdate',
  'FileAppend',
  'FileCopy',
  'FileCopyDir',
  'FileCreateDir',
  'FileCreateShortcut',
  'FileDelete',
  'FileEncoding',
  'FileInstall',
  'FileGetAttrib',
  'FileGetShortcut',
  'FileGetSize',
  'FileGetTime',
  'FileGetVersion',
  'FileMove',
  'FileMoveDir',
  'FileRead',
  'FileReadLine',
  'FileRecycle',
  'FileRecycleEmpty',
  'FileRemoveDir',
  'FileSelectFile',
  'FileSelectFolder',
  'FileSetAttrib',
  'FileSetTime',
  'FormatTime',
  'GetKeyState', // Deprecated
  'Gosub',
  'Goto',
  'GroupActivate',
  'GroupAdd',
  'GroupClose',
  'GroupDeactivate',
  'Gui',
  'GuiControl',
  'GuiControlGet',
  'Hotkey',
  'ImageSearch',
  'IniDelete',
  'IniRead',
  'IniWrite',
  'Input',
  'InputBox',
  'KeyHistory',
  'KeyWait',
  'ListHotkeys',
  'ListLines',
  'ListVars',
  'Menu',
  'MouseClick',
  'MouseClickDrag',
  'MouseGetPos',
  'MouseMove',
  'MsgBox',
  'OnExit', // Deprecated
  'OutputDebug',
  'PixelGetColor',
  'PixelSearch',
  'PostMessage',
  'Process',
  'Progress', // Deprecated
  'Random',
  'RegDelete',
  'RegRead',
  'RegWrite',
  'Reload',
  'Run',
  'RunAs',
  'RunWait',
  'Send',
  'SendRaw',
  'SendInput',
  'SendPlay',
  'SendEvent',
  'SendLevel',
  'SendMessage',
  'SendMode',
  'SetBatchLines',
  'SetCapsLockState',
  'SetControlDelay',
  'SetDefaultMouseSpeed',
  'SetEnv', // Deprecated
  'SetFormat', // Deprecated
  'SetKeyDelay',
  'SetMouseDelay',
  'SetNumLockState',
  'SetScrollLockState',
  'SetRegView',
  'SetStoreCapsLockMode',
  'SetTimer',
  'SetTitleMatchMode',
  'SetWinDelay',
  'SetWorkingDir',
  'Sleep',
  'Sort',
  'SoundBeep',
  'SoundGet',
  'SoundGetWaveVolume',
  'SoundPlay',
  'SoundSet',
  'SoundSetWaveVolume',
  'SplashImage',
  'SplashTextOn',
  'SplashTextOff',
  'SplitPath',
  'StatusBarGetText',
  'StatusBarWait',
  'StringCaseSense',
  'StringGetPos', // Deprecated
  'StringLeft', // Deprecated
  'StringLen', // Deprecated
  'StringLower',
  'StringMid', // Deprecated
  'StringReplace', // Deprecated
  'StringRight', // Deprecated
  'StringSplit', // Deprecated
  'StringTrimLeft', // Deprecated
  'StringTrimRight', // Deprecated
  'StringUpper',
  'SysGet',
  'Thread',
  'ToolTip',
  'Transform', // Deprecated
  'TrayTip',
  'UrlDownloadToFile',
  'WinActivate',
  'WinActivateBottom',
  'WinClose',
  'WinGetActiveStats',
  'WinGetActiveTitle',
  'WinGetClass',
  'WinGet',
  'WinGetPos',
  'WinGetText',
  'WinGetTitle',
  'WinHide',
  'WinKill',
  'WinMaximize',
  'WinMenuSelectItem',
  'WinMinimize',
  'WinMinimizeAll',
  'WinMinimizeAllUndo',
  'WinMove',
  'WinRestore',
  'WinSet',
  'WinSetTitle',
  'WinShow',
  'WinWait',
  'WinWaitActive',
  'WinWaitNotActive',
  'WinWaitClose',
] as const;

// #region operators
// https://www.autohotkey.com/docs/v2/Variables.htm#Operators
// https://www.autohotkey.com/docs/v1/Variables.htm#Operators
export const commonOperators = [
  '+',    // e.g. `+1`, `1 + 1`
  '++',   // e.g. `++1`, `1++`
  '-',    // e.g. `-1`, `1 - 1`
  '--',   // e.g. `--1`, `1--`
  '*',    // e.g. `1 * 1`, `*expression`
  '**',   // e.g. `1 ** 1`
  '/',    // e.g. `1 / 1`
  '//',   // e.g. `1 // 1`
  '.',    // e.g. `1 . 1`, `obj.member`
  '~',    // e.g. `~1`
  '&',    // e.g. `&var`, `1 & 1`
  '|',    // e.g. `1 | 1`
  '^',    // e.g. `1 ^ 1`
  '<<',   // e.g. `1 << 1`
  '>>',   // e.g. `1 >> 1`
  '>>>',  // e.g. `1 >>> 1`
  '%',    // e.g. `%var%`, `a%b%c`
  '!',    // e.g. `!expression`
  'NOT',  // e.g. `not expression`
  '&&',   // e.g. `1 && 1`
  'AND',  // e.g. `1 and 1`
  '||',   // e.g. `1 || 1`
  'OR',   // e.g. `1 or 1`
  '>',    // e.g. `1 > 1`
  '>=',   // e.g. `1 >= 1`
  '<',    // e.g. `1 < 1`
  '<=',   // e.g. `1 <= 1`
  '=',    // e.g. `1 = 1`
  '==',   // e.g. `1 == 1`
  '?',    // e.g. `a ? b : c`, `a?.b`
  ':',    // e.g. `a ? b : c`
  ':=',   // e.g. `a := 1`
  '+=',   // e.g. `a += 1`
  '-=',   // e.g. `a -= 1`
  '*=',   // e.g. `a *= 1`
  '/=',   // e.g. `a /= 1`
  '//=',  // e.g. `a //= 1`
  '.=',   // e.g. `a .= 1`
  '|=',   // e.g. `a |= 1`
  '&=',   // e.g. `a &= 1`
  '^=',   // e.g. `a ^= 1`
  '>>=',  // e.g. `a >>= 1`
  '<<=',  // e.g. `a <<= 1`
  '>>>=', // e.g. `a >>>= 1`
] as const;
export const operators_v1: [ ...typeof commonOperators, '<>' ] = [
  ...commonOperators,
  '<>', // e.g. `1 <> 1` Deprecated
] as const;
export const operators_v2: [ ...typeof commonOperators, '=>', '??' ] = [
  ...commonOperators,
  '=>', // `(args*) => expression`
  '??', // `a ?? b`
] as const;
// #endregion operators
// #endregion constants

// #region enum
export const enum Repository {
  Self = '$self',

  // #region trivas
  Comment = 'repository.comment',
  SingleLineComment = 'repository.comment.single-line',
  InLineComment = 'repository.comment.in-line',
  // #endregion trivas

  // #region statements
  Statement = 'repository.statement',
  ExpressionStatement = 'repository.statement.expression',
  DirecitiveStatement = 'repository.statement.directive',
  CommandStatement = 'repository.statement.command',
  LegacyStatement = 'repository.statement.legacy.expression',
  // #endregion statements

  // #region expressions
  Expression = 'repository.expression',
  ParenthesizedExpression = 'repository.expression.parenthesized',

  // #region literal
  Literal = 'repository.expression.literal',

  // #region string
  String = 'repository.expression.string',
  InvalidStringContent = 'repository.expression.string.content.invalid',
  DoubleString = 'repository.expression.string.double-quote',
  DoubleStringEscapeSequence = 'repository.expression.string.content.escape-sequence.double-quote',
  SingleString = 'repository.expression.string.single-quote',
  SingleStringEscapeSequence = 'repository.expression.string.content.escape-sequence.single-quote',
  // #endregion string
  // #region number
  Number = 'repository.expression.number',
  Integer = 'repository.expression.number.integer',
  Float = 'repository.expression.number.float',
  InvalidFloat = 'repository.expression.number.float.invalid',
  Hex = 'repository.expression.number.hex',
  InvalidHex = 'repository.expression.number.hex.invalid',
  ScientificNotation = 'repository.expression.number.scientific-notation',
  InvalidScientificNotation = 'repository.expression.number.scientific-notation.invalid',
  // #endregion number
  // #endregion literal

  // #region variable
  Variable = 'repository.expression.variable',
  BuiltInVariable = 'repository.expression.variable.built-in',
  InvalidVariable = 'repository.expression.variable.invalid',
  // #endregion variable

  // #region access
  Dereference = 'repository.expression.dereference',
  InvalidDereference = 'repository.expression.dereference.invalid',
  // #endregion access
  // #endregion expressions

  // #region operators
  Operator = 'repository.operator.without-comma',
  Comma = 'repository.operator.comma',
  // #endregion operators

  // #region v1 syntax
  Command = 'repository.command',
  CommonCommand = 'repository.common-command',
  CommandArgument = 'repository.command.argument',
  CommandArgumentText = 'repository.command.argument.text',
  CommandArgumentControlStyleText = 'repository.command.argument.text.control-style',
  // #endregion v1 syntax

  // #region legacy
  Legacy = 'repository.legacy',
  LegacyAssignment = 'repository.legacy.expression.assignment',
  LegacyTextEscapeSequence = 'repository.legacy.expression.content.escape-sequence.unquote',
  PercentExpression = 'repository.legacy.expression.percent',
  // #endregion legacy
}

// https://macromates.com/manual/en/language_grammars#naming_conventions
// https://github.com/microsoft/vscode/blob/main/extensions/theme-defaults/themes/dark_vs.json
// https://github.com/microsoft/vscode/blob/main/extensions/theme-defaults/themes/dark_plus.json
export const enum RuleName {
  // #region trivias
  SingleLineComment = 'comment.single-line',
  InLineComment = 'comment.in-line',
  // #endregion trivias

  // #region statement
  DirectiveName = 'meta.preprocessor.directive',
  // #endregion statement

  // #region expressions
  // #region variable
  Variable = 'variable.other',
  BuiltInVariable = 'support.variable',
  // #endregion variable
  // #region string
  DoubleString = 'string.quoted.double',
  DoubleStringEscapeSequence = 'constant.character.escape.double',
  SingleStringEscapeSequence = 'constant.character.escape.single',
  SingleString = 'string.quoted.single',
  MultiLineString = 'string.quoted.unquoted',
  StringBegin = 'punctuation.definition.string.begin',
  StringEnd = 'punctuation.definition.string.end',
  EscapeSequence = 'constant.character.escape',
  // #endregion string
  // #region number
  Integer = 'constant.numeric.integer',
  DecimalPart = 'constant.numeric.decimal.part',
  Float = 'constant.numeric.float',
  DecimalPoint = 'constant.numeric.decimal.point',
  Hex = 'constant.numeric.hex',
  HexPrefix = 'constant.numeric.hex.prefix',
  HexValue = 'constant.numeric.hex.value',
  ScientificNotation = 'constant.numeric.scientificnotation',
  ENotation = 'constant.numeric.e-notation',
  ExponentPlusMinusSign = 'constant.numeric.exponent.plus-minus.sign',
  Exponent = 'constant.numeric.exponent',
  // #endregion number
  // #region operators
  Separator = 'punctuation.separator',
  Operator = 'keyword.operator',
  Equals = 'keyword.operator.equals',
  Comma = 'punctuation.separator.comma',
  // #endregion operators
  // #endregion expressions

  // #region token
  PercentBegin = 'meta.percent.begin',
  PercentEnd = 'meta.percent.end',
  OpenParen = 'meta.brace.round.begin',
  CloseParen = 'meta.brace.round.end',
  // #region tokens

  // #region extra rules
  Emphasis = 'emphasis',
  Strong = 'strong',
  Invalid = 'invalid.illegal',
  // #endregion extra rules

  // #region legacy
  LegacyAssignment = 'expression.legacy.assignment',
  LegacyText = 'string.legacy.text',
  LegacyTextEscapeSequence = 'constant.character.escape.legacy.text',
  CommandName = 'support.function.command',
  SubCommandName = 'strong string.legacy.subcommand',
  // #endregion legacy
}
export const enum CommandArgsType {
  None = 0,
  Expression,
  Enum,
  Legacy,
  SubCommand,
  Input,
  Output,

  Parameters, // e.g. `ControlClick x123 y123`, `Click, 100 100 LButton`
  ControlStyle,
}
// #endregion enum
