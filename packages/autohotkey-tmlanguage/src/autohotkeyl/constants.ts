import * as constants_common from '../common/constants';

// #region [Escape Sequences](https://www.autohotkey.com/docs/v1/misc/EscapeChar.htm)
export const unquoteEscapeSequences = [ '``', '`,', '`%', '``', '`;', '`::', '`r', '`n', '`b', '`t', '`v', '`a', '`f' ] as const;
export const doubleQuoteEscapeSequences: [ '""', ...typeof unquoteEscapeSequences] = [ '""', ...unquoteEscapeSequences ] as const;
// #endregion Escape Sequences

// #region [Operators](https://www.autohotkey.com/docs/v1/Variables.htm#Operators)
export const expressionOperators: [
  ...typeof constants_common.expressionOperators,
  '<>',
] = [
  ...constants_common.expressionOperators,
  '<>', // e.g. `1 <> 1` Deprecated
] as const;
export const continuationOperators: string[] = [
  ...expressionOperators.filter((operator) => !(operator === '++' || operator == '--')),
  ...constants_common.expressionKeywords,
  ',',
];
// #endregion Operators

// #region [RegEx](https://www.autohotkey.com/docs/v1/misc/RegEx-QuickRef.htm)
export const regexpOptions: [ ...typeof constants_common.regexpOptions, 'O' ] = [ ...constants_common.regexpOptions, 'O' ];
// #endregion RegEx

// #region [BuiltIn](https://www.autohotkey.com/docs/v1/Variables.htm#BuiltIn)
export const keywordLikeBuiltinVariables = [
  'This',
  'Base',
  'True',
  'False',
] as const;
export const builtinVaribles = [
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
  // 'True',
  // 'False',
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
export const jumpStatementNames = [
  'Break',
  'Exit',
  'ExitApp',
  'Gosub',
  'Goto',
  'Return',
] as const;
// https://www.autohotkey.com/docs/v1/lib/index.htm
export const directiveNames = [
  '#ClipboardTimeout',
  '#CommentFlag', // Deprecated
  '#Delimiter', // Deprecated
  '#DerefChar', // Deprecated
  '#ErrorStdOut',
  '#EscapeChar', // Deprecated
  '#HotkeyInterval',
  '#HotkeyModifierTimeout',
  '#Hotstring',
  '#If',
  '#IfTimeout',
  '#IfWinActive',
  '#IfWinNotActive',
  '#IfWinExist',
  '#IfWinNotExist',
  '#Include',
  '#IncludeAgain',
  '#InputLevel',
  '#InstallKeybdHook',
  '#InstallMouseHook',
  '#KeyHistory',
  '#LTrim',
  '#MaxHotkeysPerInterval',
  '#MaxMem',
  '#MaxThreads',
  '#MaxThreadsBuffer',
  '#MaxThreadsPerHotkey',
  '#MenuMaskKey',
  '#NoEnv',
  '#NoTrayIcon',
  '#Persistent',
  '#Requires',
  '#SingleInstance',
  '#UseHook',
  '#Warn',
  '#WinActivateForce',
] as const;
// #endregion BuiltIn
