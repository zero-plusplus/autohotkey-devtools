import { commonOperators } from '../constants';
import { alt, asciiChar, char, group, negChar } from '../oniguruma';

// #region [Names](https://www.autohotkey.com/docs/v2/Concepts.htm#names)
const letter = '[a-zA-Z]';
const numberChar = '\\d';
const nonAsciiChar = negChar(asciiChar());
const sign = char('_');
export const nameStart: string = group(alt(letter, nonAsciiChar, sign));
export const nameBody: string = group(alt(letter, nonAsciiChar, sign, numberChar));
// #endregion Names

// #region [Escape Sequences](https://www.autohotkey.com/docs/v2/misc/EscapeChar.htm)
export const unquoteEscapeSequences = [ '``', '`;', '`:', '`{', '`n', '`r', '`b', '`t', '`s', '`v', '`a', '`f' ] as const;
export const doubleQuoteEscapeSequences: [ ...typeof unquoteEscapeSequences, '`"'] = [ ...unquoteEscapeSequences, '`"' ] as const;
export const singleQuoteEscapeSequences: [ ...typeof unquoteEscapeSequences, '`\''] = [ ...unquoteEscapeSequences, '`\'' ] as const;
// #endregion Escape Sequences

// #region [Operators](https://www.autohotkey.com/docs/v2/Variables.htm#Operators)
export const operators: readonly [ ...typeof commonOperators, '=>', '??' ] = [
  ...commonOperators,
  '=>', // `(args*) => expression`
  '??', // `a ?? b`
] as const;
// #endregion Operators

// #region [BuiltIn](https://www.autohotkey.com/docs/v2/Variables.htm#BuiltIn)
export const builtinVaribles = [
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
// #endregion BuiltIn
