import { CommandArgsType, CommandInfo, EscapeSequencesInfo, IncludeRule, NameRule, Repository, RuleName, ScopeName, Utilities, VariableParts } from './types';

export function getCommandInfos(): CommandInfo[] {
  // https://www.autohotkey.com/docs/v1/lib/index.htm
  const commandInfos: CommandInfo[] = [
    [ 'AutoTrim', [ CommandArgsType.Enum, 'On', 'Off', '1', '0' ] ],
    [ 'BlockInput', [ CommandArgsType.Legacy, 'On', 'Off', 'SendMouse', 'MouseMove' ] ],
    [ 'Click', [ CommandArgsType.Legacy, 'Left', 'L', 'Right', 'R', 'Middle', 'M', 'X1', 'X2', 'Up', 'U', 'Down', 'D' ] ],
    [ 'ClipWait', CommandArgsType.Expression, CommandArgsType.Expression ],
    // TODO: Need to implement and test highlighting of each parameter
    [ 'Control' ],
    // [ 'Control', 'Check', CommandArgsType.None, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'UnCheck', CommandArgsType.None, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'Enable', CommandArgsType.None, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'Disable', CommandArgsType.None, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'Show', CommandArgsType.None, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'Hide', CommandArgsType.None, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'Style', CommandArgsType.ControlStyle, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'ExStyle', CommandArgsType.ControlStyle, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'ShowDropDown', CommandArgsType.None, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'HideDropDown', CommandArgsType.None, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'TabLeft', CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'TabRight', CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'Add', CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'Delete', CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'Choose', CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'ChooseString', CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'EditPaste', CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // TODO: Done here so far
    [ 'ControlClick' ],
    [ 'ControlFocus' ],
    [ 'ControlGet' ],
    [ 'ControlGetFocus' ],
    [ 'ControlGetPos' ],
    [ 'ControlGetText' ],
    [ 'ControlMove' ],
    [ 'ControlSend' ],
    [ 'ControlSendRaw' ],
    [ 'ControlSetText' ],
    [ 'CoordMode' ],
    [ 'Critical' ],
    [ 'DetectHiddenText' ],
    [ 'DetectHiddenWindows' ],
    [ 'Drive' ],
    [ 'DriveGet' ],
    [ 'DriveSpaceFree' ],
    [ 'Edit' ],
    [ 'EnvAdd' ],
    [ 'EnvDiv' ], // Deprecated
    [ 'EnvGet' ],
    [ 'EnvMult' ], // Deprecated
    [ 'EnvSet' ],
    [ 'EnvSub' ],
    [ 'EnvUpdate' ],
    [ 'FileAppend' ],
    [ 'FileCopy' ],
    [ 'FileCopyDir' ],
    [ 'FileCreateDir' ],
    [ 'FileCreateShortcut' ],
    [ 'FileDelete' ],
    [ 'FileEncoding' ],
    [ 'FileInstall' ],
    [ 'FileGetAttrib' ],
    [ 'FileGetShortcut' ],
    [ 'FileGetSize' ],
    [ 'FileGetTime' ],
    [ 'FileGetVersion' ],
    [ 'FileMove' ],
    [ 'FileMoveDir' ],
    [ 'FileRead' ],
    [ 'FileReadLine' ],
    [ 'FileRecycle' ],
    [ 'FileRecycleEmpty' ],
    [ 'FileRemoveDir' ],
    [ 'FileSelectFile' ],
    [ 'FileSelectFolder' ],
    [ 'FileSetAttrib' ],
    [ 'FileSetTime' ],
    [ 'FormatTime' ],
    [ 'GetKeyState' ], // Deprecated
    [ 'Gosub' ],
    [ 'Goto' ],
    [ 'GroupActivate' ],
    [ 'GroupAdd' ],
    [ 'GroupClose' ],
    [ 'GroupDeactivate' ],
    [ 'Gui' ],
    [ 'GuiControl' ],
    [ 'GuiControlGet' ],
    [ 'Hotkey' ],
    [ 'ImageSearch' ],
    [ 'IniDelete' ],
    [ 'IniRead' ],
    [ 'IniWrite' ],
    [ 'Input' ],
    [ 'InputBox' ],
    [ 'KeyHistory' ],
    [ 'KeyWait' ],
    [ 'ListHotkeys' ],
    [ 'ListLines' ],
    [ 'ListVars' ],
    [ 'Menu' ],
    [ 'MouseClick' ],
    [ 'MouseClickDrag' ],
    [ 'MouseGetPos' ],
    [ 'MouseMove' ],
    [ 'MsgBox' ],
    [ 'OnExit' ], // Deprecated
    [ 'OutputDebug' ],
    [ 'PixelGetColor' ],
    [ 'PixelSearch' ],
    [ 'PostMessage' ],
    [ 'Process' ],
    [ 'Progress' ], // Deprecated
    [ 'Random' ],
    [ 'RegDelete' ],
    [ 'RegRead' ],
    [ 'RegWrite' ],
    [ 'Reload' ],
    [ 'Run' ],
    [ 'RunAs' ],
    [ 'RunWait' ],
    [ 'Send' ],
    [ 'SendRaw' ],
    [ 'SendInput' ],
    [ 'SendPlay' ],
    [ 'SendEvent' ],
    [ 'SendLevel' ],
    [ 'SendMessage' ],
    [ 'SendMode' ],
    [ 'SetBatchLines' ],
    [ 'SetCapsLockState' ],
    [ 'SetControlDelay' ],
    [ 'SetDefaultMouseSpeed' ],
    [ 'SetEnv' ], // Deprecated
    [ 'SetFormat' ], // Deprecated
    [ 'SetKeyDelay' ],
    [ 'SetMouseDelay' ],
    [ 'SetNumLockState' ],
    [ 'SetScrollLockState' ],
    [ 'SetRegView' ],
    [ 'SetStoreCapsLockMode' ],
    [ 'SetTimer' ],
    [ 'SetTitleMatchMode' ],
    [ 'SetWinDelay' ],
    [ 'SetWorkingDir' ],
    [ 'Sleep' ],
    [ 'Sort' ],
    [ 'SoundBeep' ],
    [ 'SoundGet' ],
    [ 'SoundGetWaveVolume' ],
    [ 'SoundPlay' ],
    [ 'SoundSet' ],
    [ 'SoundSetWaveVolume' ],
    [ 'SplashImage' ],
    [ 'SplashTextOn' ],
    [ 'SplashTextOff' ],
    [ 'SplitPath' ],
    [ 'StatusBarGetText' ],
    [ 'StatusBarWait' ],
    [ 'StringCaseSense' ],
    [ 'StringGetPos' ], // Deprecated
    [ 'StringLeft' ], // Deprecated
    [ 'StringLen' ], // Deprecated
    [ 'StringLower' ],
    [ 'StringMid' ], // Deprecated
    [ 'StringReplace' ], // Deprecated
    [ 'StringRight' ], // Deprecated
    [ 'StringSplit' ], // Deprecated
    [ 'StringTrimLeft' ], // Deprecated
    [ 'StringTrimRight' ], // Deprecated
    [ 'StringUpper' ],
    [ 'SysGet' ],
    [ 'Thread' ],
    [ 'ToolTip' ],
    [ 'Transform' ], // Deprecated
    [ 'TrayTip' ],
    [ 'UrlDownloadToFile' ],
    [ 'WinActivate' ],
    [ 'WinActivateBottom' ],
    [ 'WinClose' ],
    [ 'WinGetActiveStats' ],
    [ 'WinGetActiveTitle' ],
    [ 'WinGetClass' ],
    [ 'WinGet' ],
    [ 'WinGetPos' ],
    [ 'WinGetText' ],
    [ 'WinGetTitle' ],
    [ 'WinHide' ],
    [ 'WinKill' ],
    [ 'WinMaximize' ],
    [ 'WinMenuSelectItem' ],
    [ 'WinMinimize' ],
    [ 'WinMinimizeAll' ],
    [ 'WinMinimizeAllUndo' ],
    [ 'WinMove' ],
    [ 'WinRestore' ],
    [ 'WinSet' ],
    [ 'WinSetTitle' ],
    [ 'WinShow' ],
    [ 'WinWait' ],
    [ 'WinWaitActive' ],
    [ 'WinWaitNotActive' ],
    [ 'WinWaitClose' ],
  ];
  return commandInfos.sort((a, b): number => {
    return b[0].length - a[0].length;
  });
}
export function getLegacyText(): string {
  return '(?:(?<!`)[,%;:rRnNbBtTvVaAfF]|[^\\s,%`;:]|[^\\S\\r\\n](?!;))';
}
export function getVariableParts(scopeName: ScopeName): VariableParts {
  const letter = '[a-zA-Z]';
  const numberChar = '\\d';
  const nonAsciiChar = '[^[:ascii:]]';

  switch (scopeName) {
    // https://www.autohotkey.com/docs/v2/Concepts.htm#names
    case 'autohotkeynext':
    case 'autohotkey2': {
      const symbol = '[_]';
      const headChar = `${letter}|${nonAsciiChar}|${symbol}`;
      const tailChar = `${letter}|${nonAsciiChar}|${symbol}|${numberChar}`;
      return {
        headChar,
        tailChar,
      };
    }
    // https://www.autohotkey.com/docs/v1/Concepts.htm#names
    case 'autohotkeyl': {
      const symbol = '[_#@$]';
      const headChar = `${letter}|${nonAsciiChar}|${symbol}`;
      const tailChar = `${letter}|${nonAsciiChar}|${symbol}|${numberChar}`;
      return {
        headChar,
        tailChar,
      };
    }
  }
  throw Error(`Scope "${scopeName}" not found`);
}
export function getEscapeSequencesInfo(scopeName: ScopeName): EscapeSequencesInfo {
  switch (scopeName) {
    case 'autohotkeynext':
    case 'autohotkey2': {
      // [Escape Sequences](https://www.autohotkey.com/docs/v2/misc/EscapeChar.htm)
      const commonEscapeSequences: string[] = [ '``', '`;', '`:', '`{', '`n', '`r', '`b', '`t', '`s', '`v', '`a', '`f' ];
      return {
        doubleQuote: [ ...commonEscapeSequences, '`\"' ],
        singleQuote: [ ...commonEscapeSequences, `\`'` ],
        legacyText: [],
      };
    }
    case 'autohotkeyl': {
      // [Escape Sequences](https://www.autohotkey.com/docs/v1/misc/EscapeChar.htm)
      const commonEscapeSequences: string[] = [ '`,', '`%', '``', '`;', '`::', '`r', '`n', '`b', '`t', '`v', '`a', '`f' ];
      return {
        doubleQuote: [ ...commonEscapeSequences, `""` ],
        singleQuote: [],
        legacyText: commonEscapeSequences,
      };
    }
  }
  throw Error(`Scope "${scopeName}" not found`);
}
export function getStatementBegin(scopeName: ScopeName): string {
  switch (scopeName) {
    case 'autohotkeynext':
    case 'autohotkey2':
    case 'autohotkeyl': return '(?<=^\\s*|:\\s*)';
  }
  throw Error(`Scope "${scopeName}" not found`);
}
export function getExpressionBegin(scopeName: ScopeName): string {
  switch (scopeName) {
    case 'autohotkeynext':
    case 'autohotkey2':
    case 'autohotkeyl': return '(?<=^\\s*(?:,)?|:\\s*)';
  }
  throw Error(`Scope "${scopeName}" not found`);
}
export function getBuiltInVariableNames(scopeName: ScopeName): string[] {
  switch (scopeName) {
    case 'autohotkeynext':
    case 'autohotkey2': {
      return [
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
      ];
    }
    case 'autohotkeyl': {
      return [
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
      ];
    }
  }
  throw Error(`Scope "${scopeName}" not found`);
}
export function includeRule(repositoryName: Repository): IncludeRule {
  return { include: `#${repositoryName}` };
}
export function includeScope(scopeName: ScopeName): IncludeRule {
  return { include: `source.${scopeName}` };
}
export function name(scopeName: ScopeName, ...ruleNames: RuleName[]): string {
  return ruleNames.map((ruleName) => `${ruleName}.${scopeName}`).join(' ');
}
export function nameRule(scopeName: ScopeName, ...ruleNames: RuleName[]): NameRule {
  return { name: name(scopeName, ...ruleNames) };
}
export function createUtilities(scopeName: ScopeName): Utilities {
  return {
    getVariableParts: () => getVariableParts(scopeName),
    getEscapeSequencesInfo: () => getEscapeSequencesInfo(scopeName),
    getExpressionBegin: () => getExpressionBegin(scopeName),
    getStatementBegin: () => getStatementBegin(scopeName),
    getBuiltInVariableNames: () => getBuiltInVariableNames(scopeName),
    name: (...ruleNames: RuleName[]): string => name(scopeName, ...ruleNames),
    nameRule: (...ruleNames: RuleName[]): NameRule => ({ name: name(scopeName, ...ruleNames) }),
    includeRule: (repositoryName: Repository) => includeRule(repositoryName),
    includeScope: (scopeName: ScopeName) => includeScope(scopeName),
  };
}
