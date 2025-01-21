import { commonAssignmentOperators, commonExpressionOperatorsWithoutAssignment } from '../constants';

// #region [Escape Sequences](https://www.autohotkey.com/docs/v2/misc/EscapeChar.htm)
export const unquoteEscapeSequences = [ '``', '`;', '`:', '`{', '`n', '`r', '`b', '`t', '`s', '`v', '`a', '`f' ] as const;
export const doubleQuoteEscapeSequences: [ ...typeof unquoteEscapeSequences, '`"'] = [ ...unquoteEscapeSequences, '`"' ] as const;
export const singleQuoteEscapeSequences: [ ...typeof unquoteEscapeSequences, '`\''] = [ ...unquoteEscapeSequences, '`\'' ] as const;
// #endregion Escape Sequences

// #region [Operators](https://www.autohotkey.com/docs/v2/Variables.htm#Operators)
export const assignmentOperators: readonly [ ...typeof commonAssignmentOperators ] = [ ...commonAssignmentOperators ] as const;
export const expressionOperators: readonly [ ...typeof commonExpressionOperatorsWithoutAssignment, ... typeof commonAssignmentOperators, '=>', '??' ] = [
  ...commonExpressionOperatorsWithoutAssignment,
  ...assignmentOperators,
  '=>', // `(args*) => expression`
  '??', // `a ?? b`
] as const;
export const expressionKeywords = [
  'IS',         // e.g. var is Class
  'NOT',        // e.g. `not expression`
  'AND',        // e.g. `1 and 1`
  'OR',         // e.g. `1 or 1`

  // Keywords reserved for future use
  'IN',
  'CONTAINS',
] as const;
// #endregion Operators

// #region [BuiltIn](https://www.autohotkey.com/docs/v2/Variables.htm#BuiltIn)
export const keywordLikeBuiltinVariables = [
  'This',
  'Base',
  'True',
  'False',
] as const;
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
// https://www.autohotkey.com/docs/v2/lib/index.htm
export const directiveNames = [
  '#ClipboardTimeout',
  '#DllLoad',
  '#ErrorStdOut',
  '#Hotstring',
  '#HotIf',
  '#HotIfTimeout',
  '#Include',
  '#IncludeAgain',
  '#InputLevel',
  '#MaxThreads',
  '#MaxThreadsBuffer',
  '#MaxThreadsPerHotkey',
  '#NoTrayIcon',
  '#Requires',
  '#SingleInstance',
  '#SuspendExempt',
  '#UseHook',
  '#Warn',
  '#WinActivateForce',
] as const;
export const builtInFunctionNames = [
  'Abs',                                   // https://www.autohotkey.com/docs/v2/lib/Abs.htm
  'ASin',                                  // https://www.autohotkey.com/docs/v2/lib/ASin.htm
  'ACos',                                  // https://www.autohotkey.com/docs/v2/lib/ACos.htm
  'ATan',                                  // https://www.autohotkey.com/docs/v2/lib/ATan.htm
  'BlockInput',                            // https://www.autohotkey.com/docs/v2/lib/BlockInput.htm
  'CallbackCreate',                        // https://www.autohotkey.com/docs/v2/lib/CallbackCreate.htm
  'CallbackFree',                          // https://www.autohotkey.com/docs/v2/lib/CallbackFree.htm
  'CaretGetPos',                           // https://www.autohotkey.com/docs/v2/lib/CaretGetPos.htm
  'Ceil',                                  // https://www.autohotkey.com/docs/v2/lib/Ceil.htm
  'Chr',                                   // https://www.autohotkey.com/docs/v2/lib/Chr.htm
  'Click',                                 // https://www.autohotkey.com/docs/v2/lib/Click.htm
  'ClipWait',                              // https://www.autohotkey.com/docs/v2/lib/ClipWait.htm
  'ComCall',                               // https://www.autohotkey.com/docs/v2/lib/ComCall.htm
  'ComObjActive',                          // https://www.autohotkey.com/docs/v2/lib/ComObjActive.htm
  'ComObjConnect',                         // https://www.autohotkey.com/docs/v2/lib/ComObjConnect.htm
  'ComObjFlags',                           // https://www.autohotkey.com/docs/v2/lib/ComObjFlags.htm
  'ComObjFromPtr',                         // https://www.autohotkey.com/docs/v2/lib/ComObjFromPtr.htm
  'ComObjGet',                             // https://www.autohotkey.com/docs/v2/lib/ComObjGet.htm
  'ComObjQuery',                           // https://www.autohotkey.com/docs/v2/lib/ComObjQuery.htm
  'ComObjType',                            // https://www.autohotkey.com/docs/v2/lib/ComObjType.htm
  'ComObjValue',                           // https://www.autohotkey.com/docs/v2/lib/ComObjValue.htm
  'ControlAddItem',                        // https://www.autohotkey.com/docs/v2/lib/ControlAddItem.htm
  'ControlChooseIndex',                    // https://www.autohotkey.com/docs/v2/lib/ControlChooseIndex.htm
  'ControlChooseString',                   // https://www.autohotkey.com/docs/v2/lib/ControlChooseString.htm
  'ControlClick',                          // https://www.autohotkey.com/docs/v2/lib/ControlClick.htm
  'ControlDeleteItem',                     // https://www.autohotkey.com/docs/v2/lib/ControlDeleteItem.htm
  'ControlFindItem',                       // https://www.autohotkey.com/docs/v2/lib/ControlFindItem.htm
  'ControlFocus',                          // https://www.autohotkey.com/docs/v2/lib/ControlFocus.htm
  'ControlGetChecked',                     // https://www.autohotkey.com/docs/v2/lib/ControlGetChecked.htm
  'ControlGetChoice',                      // https://www.autohotkey.com/docs/v2/lib/ControlGetChoice.htm
  'ControlGetClassNN',                     // https://www.autohotkey.com/docs/v2/lib/ControlGetClassNN.htm
  'ControlGetEnabled',                     // https://www.autohotkey.com/docs/v2/lib/ControlGetEnabled.htm
  'ControlGetFocus',                       // https://www.autohotkey.com/docs/v2/lib/ControlGetFocus.htm
  'ControlGetHwnd',                        // https://www.autohotkey.com/docs/v2/lib/ControlGetHwnd.htm
  'ControlGetIndex',                       // https://www.autohotkey.com/docs/v2/lib/ControlGetIndex.htm
  'ControlGetItems',                       // https://www.autohotkey.com/docs/v2/lib/ControlGetItems.htm
  'ControlGetPos',                         // https://www.autohotkey.com/docs/v2/lib/ControlGetPos.htm
  'ControlGetStyle',                       // https://www.autohotkey.com/docs/v2/lib/ControlGetStyle.htm
  'ControlGetExStyle',                     // https://www.autohotkey.com/docs/v2/lib/ControlGetExStyle.htm
  'ControlGetText',                        // https://www.autohotkey.com/docs/v2/lib/ControlGetText.htm
  'ControlGetVisible',                     // https://www.autohotkey.com/docs/v2/lib/ControlGetVisible.htm
  'ControlHide',                           // https://www.autohotkey.com/docs/v2/lib/ControlHide.htm
  'ControlHideDropDown',                   // https://www.autohotkey.com/docs/v2/lib/ControlHideDropDown.htm
  'ControlMove',                           // https://www.autohotkey.com/docs/v2/lib/ControlMove.htm
  'ControlSend',                           // https://www.autohotkey.com/docs/v2/lib/ControlSend.htm
  'ControlSendText',                       // https://www.autohotkey.com/docs/v2/lib/ControlSendText.htm
  'ControlSetChecked',                     // https://www.autohotkey.com/docs/v2/lib/ControlSetChecked.htm
  'ControlSetEnabled',                     // https://www.autohotkey.com/docs/v2/lib/ControlSetEnabled.htm
  'ControlSetStyle',                       // https://www.autohotkey.com/docs/v2/lib/ControlSetStyle.htm
  'ControlSetExStyle',                     // https://www.autohotkey.com/docs/v2/lib/ControlSetExStyle.htm
  'ControlSetText',                        // https://www.autohotkey.com/docs/v2/lib/ControlSetText.htm
  'ControlShow',                           // https://www.autohotkey.com/docs/v2/lib/ControlShow.htm
  'ControlShowDropDown',                   // https://www.autohotkey.com/docs/v2/lib/ControlShowDropDown.htm
  'CoordMode',                             // https://www.autohotkey.com/docs/v2/lib/CoordMode.htm
  'Cos',                                   // https://www.autohotkey.com/docs/v2/lib/Cos.htm
  'Critical',                              // https://www.autohotkey.com/docs/v2/lib/Critical.htm
  'DateAdd',                               // https://www.autohotkey.com/docs/v2/lib/DateAdd.htm
  'DateDiff',                              // https://www.autohotkey.com/docs/v2/lib/DateDiff.htm
  'DetectHiddenText',                      // https://www.autohotkey.com/docs/v2/lib/DetectHiddenText.htm
  'DetectHiddenWindows',                   // https://www.autohotkey.com/docs/v2/lib/DetectHiddenWindows.htm
  'DirCopy',                               // https://www.autohotkey.com/docs/v2/lib/DirCopy.htm
  'DirCreate',                             // https://www.autohotkey.com/docs/v2/lib/DirCreate.htm
  'DirDelete',                             // https://www.autohotkey.com/docs/v2/lib/DirDelete.htm
  'DirExist',                              // https://www.autohotkey.com/docs/v2/lib/DirExist.htm
  'DirMove',                               // https://www.autohotkey.com/docs/v2/lib/DirMove.htm
  'DirSelect',                             // https://www.autohotkey.com/docs/v2/lib/DirSelect.htm
  'DllCall',                               // https://www.autohotkey.com/docs/v2/lib/DllCall.htm
  'Download',                              // https://www.autohotkey.com/docs/v2/lib/Download.htm
  'DriveEject',                            // https://www.autohotkey.com/docs/v2/lib/DriveEject.htm
  'DriveGetCapacity',                      // https://www.autohotkey.com/docs/v2/lib/DriveGetCapacity.htm
  'DriveGetFileSystem',                    // https://www.autohotkey.com/docs/v2/lib/DriveGetFileSystem.htm
  'DriveGetLabel',                         // https://www.autohotkey.com/docs/v2/lib/DriveGetLabel.htm
  'DriveGetList',                          // https://www.autohotkey.com/docs/v2/lib/DriveGetList.htm
  'DriveGetSerial',                        // https://www.autohotkey.com/docs/v2/lib/DriveGetSerial.htm
  'DriveGetSpaceFree',                     // https://www.autohotkey.com/docs/v2/lib/DriveGetSpaceFree.htm
  'DriveGetStatus',                        // https://www.autohotkey.com/docs/v2/lib/DriveGetStatus.htm
  'DriveGetStatusCD',                      // https://www.autohotkey.com/docs/v2/lib/DriveGetStatusCD.htm
  'DriveGetType',                          // https://www.autohotkey.com/docs/v2/lib/DriveGetType.htm
  'DriveLock',                             // https://www.autohotkey.com/docs/v2/lib/DriveLock.htm
  'DriveRetract',                          // https://www.autohotkey.com/docs/v2/lib/DriveRetract.htm
  'DriveSetLabel',                         // https://www.autohotkey.com/docs/v2/lib/DriveSetLabel.htm
  'DriveUnlock',                           // https://www.autohotkey.com/docs/v2/lib/DriveUnlock.htm
  'Edit',                                  // https://www.autohotkey.com/docs/v2/lib/Edit.htm
  'EditGetCurrentCol',                     // https://www.autohotkey.com/docs/v2/lib/EditGetCurrentCol.htm
  'EditGetCurrentLine',                    // https://www.autohotkey.com/docs/v2/lib/EditGetCurrentLine.htm
  'EditGetLine',                           // https://www.autohotkey.com/docs/v2/lib/EditGetLine.htm
  'EditGetLineCount',                      // https://www.autohotkey.com/docs/v2/lib/EditGetLineCount.htm
  'EditGetSelectedText',                   // https://www.autohotkey.com/docs/v2/lib/EditGetSelectedText.htm
  'EditPaste',                             // https://www.autohotkey.com/docs/v2/lib/EditPaste.htm
  'EnvGet',                                // https://www.autohotkey.com/docs/v2/lib/EnvGet.htm
  'EnvSet',                                // https://www.autohotkey.com/docs/v2/lib/EnvSet.htm
  'Exp',                                   // https://www.autohotkey.com/docs/v2/lib/Exp.htm
  'FileAppend',                            // https://www.autohotkey.com/docs/v2/lib/FileAppend.htm
  'FileCopy',                              // https://www.autohotkey.com/docs/v2/lib/FileCopy.htm
  'FileCreateShortcut',                    // https://www.autohotkey.com/docs/v2/lib/FileCreateShortcut.htm
  'FileDelete',                            // https://www.autohotkey.com/docs/v2/lib/FileDelete.htm
  'FileEncoding',                          // https://www.autohotkey.com/docs/v2/lib/FileEncoding.htm
  'FileExist',                             // https://www.autohotkey.com/docs/v2/lib/FileExist.htm
  'FileInstall',                           // https://www.autohotkey.com/docs/v2/lib/FileInstall.htm
  'FileGetAttrib',                         // https://www.autohotkey.com/docs/v2/lib/FileGetAttrib.htm
  'FileGetShortcut',                       // https://www.autohotkey.com/docs/v2/lib/FileGetShortcut.htm
  'FileGetSize',                           // https://www.autohotkey.com/docs/v2/lib/FileGetSize.htm
  'FileGetTime',                           // https://www.autohotkey.com/docs/v2/lib/FileGetTime.htm
  'FileGetVersion',                        // https://www.autohotkey.com/docs/v2/lib/FileGetVersion.htm
  'FileMove',                              // https://www.autohotkey.com/docs/v2/lib/FileMove.htm
  'FileOpen',                              // https://www.autohotkey.com/docs/v2/lib/FileOpen.htm
  'FileRead',                              // https://www.autohotkey.com/docs/v2/lib/FileRead.htm
  'FileRecycle',                           // https://www.autohotkey.com/docs/v2/lib/FileRecycle.htm
  'FileRecycleEmpty',                      // https://www.autohotkey.com/docs/v2/lib/FileRecycleEmpty.htm
  'FileSelect',                            // https://www.autohotkey.com/docs/v2/lib/FileSelect.htm
  'FileSetAttrib',                         // https://www.autohotkey.com/docs/v2/lib/FileSetAttrib.htm
  'Float',                                 // https://www.autohotkey.com/docs/v2/lib/Float.htm
  'Floor',                                 // https://www.autohotkey.com/docs/v2/lib/Floor.htm
  'Format',                                // https://www.autohotkey.com/docs/v2/lib/Format.htm
  'FormatTime',                            // https://www.autohotkey.com/docs/v2/lib/FormatTime.htm
  'GetKeyName',                            // https://www.autohotkey.com/docs/v2/lib/GetKeyName.htm
  'GetKeyVK',                              // https://www.autohotkey.com/docs/v2/lib/GetKeyVK.htm
  'GetKeySC',                              // https://www.autohotkey.com/docs/v2/lib/GetKeySC.htm
  'GetKeyState',                           // https://www.autohotkey.com/docs/v2/lib/GetKeyState.htm
  'GetMethod',                             // https://www.autohotkey.com/docs/v2/lib/GetMethod.htm
  'Goto',                                  // https://www.autohotkey.com/docs/v2/lib/Goto.htm
  'GroupActivate',                         // https://www.autohotkey.com/docs/v2/lib/GroupActivate.htm
  'GroupAdd',                              // https://www.autohotkey.com/docs/v2/lib/GroupAdd.htm
  'GroupClose',                            // https://www.autohotkey.com/docs/v2/lib/GroupClose.htm
  'GroupDeactivate',                       // https://www.autohotkey.com/docs/v2/lib/GroupDeactivate.htm
  'GuiCtrlFromHwnd',                       // https://www.autohotkey.com/docs/v2/lib/GuiCtrlFromHwnd.htm
  'GuiFromHwnd',                           // https://www.autohotkey.com/docs/v2/lib/GuiFromHwnd.htm
  'HasBase',                               // https://www.autohotkey.com/docs/v2/lib/HasBase.htm
  'HasMethod',                             // https://www.autohotkey.com/docs/v2/lib/HasMethod.htm
  'HasProp',                               // https://www.autohotkey.com/docs/v2/lib/HasProp.htm
  'HotIf',                                 // https://www.autohotkey.com/docs/v2/lib/HotIf.htm
  'HotIfWinActive',                        // https://www.autohotkey.com/docs/v2/lib/HotIfWinActive.htm
  'HotIfWinExist',                         // https://www.autohotkey.com/docs/v2/lib/HotIfWinExist.htm
  'HotIfWinNotActive',                     // https://www.autohotkey.com/docs/v2/lib/HotIfWinNotActive.htm
  'HotIfWinNotExist',                      // https://www.autohotkey.com/docs/v2/lib/HotIfWinNotExist.htm
  'Hotkey',                                // https://www.autohotkey.com/docs/v2/lib/Hotkey.htm
  'Hotstring',                             // https://www.autohotkey.com/docs/v2/lib/Hotstring.htm
  'IL_Create',                             // https://www.autohotkey.com/docs/v2/lib/IL_Create.htm
  'IL_Add',                                // https://www.autohotkey.com/docs/v2/lib/IL_Add.htm
  'IL_Destroy',                            // https://www.autohotkey.com/docs/v2/lib/IL_Destroy.htm
  'ImageSearch',                           // https://www.autohotkey.com/docs/v2/lib/ImageSearch.htm
  'IniDelete',                             // https://www.autohotkey.com/docs/v2/lib/IniDelete.htm
  'IniRead',                               // https://www.autohotkey.com/docs/v2/lib/IniRead.htm
  'IniWrite',                              // https://www.autohotkey.com/docs/v2/lib/IniWrite.htm
  'InputBox',                              // https://www.autohotkey.com/docs/v2/lib/InputBox.htm
  'InstallKeybdHook',                      // https://www.autohotkey.com/docs/v2/lib/InstallKeybdHook.htm
  'InstallMouseHook',                      // https://www.autohotkey.com/docs/v2/lib/InstallMouseHook.htm
  'InStr',                                 // https://www.autohotkey.com/docs/v2/lib/InStr.htm
  'IsLabel',                               // https://www.autohotkey.com/docs/v2/lib/IsLabel.htm
  'IsObject',                              // https://www.autohotkey.com/docs/v2/lib/IsObject.htm
  'IsSet',                                 // https://www.autohotkey.com/docs/v2/lib/IsSet.htm
  'IsSetRef',                              // https://www.autohotkey.com/docs/v2/lib/IsSetRef.htm
] as const;

// https://www.autohotkey.com/docs/v2/ObjList.htm
export const builtInClassNames = [
  /* > */ 'Any',                                    // https://www.autohotkey.com/docs/v2/lib/Any.htm
  /* ==> */ 'Object',                               // https://www.autohotkey.com/docs/v2/lib/Object.htm
  /* ====> */ 'Array',                              // https://www.autohotkey.com/docs/v2/lib/Array.htm
  /* ====> */ 'Buffer',                             // https://www.autohotkey.com/docs/v2/lib/Buffer.htm
  /* ======> */ 'ClipboardAll',                     // https://www.autohotkey.com/docs/v2/lib/ClipboardAll.htm
  /* ====> */ 'Class',                              // https://www.autohotkey.com/docs/v2/lib/Class.htm
  /* ====> */ 'Error',                              // https://www.autohotkey.com/docs/v2/lib/Error.htm
  /* ======> */ 'MemoryError',                      // https://www.autohotkey.com/docs/v2/lib/MemoryError.htm
  /* ======> */ 'OSError',                          // https://www.autohotkey.com/docs/v2/lib/OSError.htm
  /* ======> */ 'TargetError',                      // https://www.autohotkey.com/docs/v2/lib/TargetError.htm
  /* ======> */ 'TimeoutError',                     // https://www.autohotkey.com/docs/v2/lib/TimeoutError.htm
  /* ======> */ 'TypeError',                        // https://www.autohotkey.com/docs/v2/lib/TypeError.htm
  /* ======> */ 'UnsetError',                       // https://www.autohotkey.com/docs/v2/lib/UnsetError.htm
  /* ========> */ 'MemberError',                    // https://www.autohotkey.com/docs/v2/lib/MemberError.htm
  /* ==========> */ 'PropertyError',                // https://www.autohotkey.com/docs/v2/lib/PropertyError.htm
  /* ==========> */ 'MethodError',                  // https://www.autohotkey.com/docs/v2/lib/MethodError.htm
  /* ========> */ 'UnsetItemError',                 // https://www.autohotkey.com/docs/v2/lib/UnsetItemError.htm
  /* ======> */ 'ValueError',                       // https://www.autohotkey.com/docs/v2/lib/ValueError.htm
  /* ========> */ 'IndexError',                     // https://www.autohotkey.com/docs/v2/lib/IndexError.htm
  /* ======> */ 'ZeroDivisionError',                // https://www.autohotkey.com/docs/v2/lib/ZeroDivisionError.htm
  /* ====> */ 'File',                               // https://www.autohotkey.com/docs/v2/lib/File.htm
  /* ====> */ 'Func',                               // https://www.autohotkey.com/docs/v2/lib/Func.htm
  /* ======> */ 'BoundFunc',                        // https://www.autohotkey.com/docs/v2/lib/BoundFunc.htm
  /* ======> */ 'Closure',                          // https://www.autohotkey.com/docs/v2/lib/Closure.htm
  /* ======> */ 'Enumerator',                       // https://www.autohotkey.com/docs/v2/lib/Enumerator.htm
  /* ====> */ 'Gui',                                // https://www.autohotkey.com/docs/v2/lib/Gui.htm
  /* ====> */ 'InputHook',                          // https://www.autohotkey.com/docs/v2/lib/InputHook.htm
  /* ====> */ 'Map',                                // https://www.autohotkey.com/docs/v2/lib/Map.htm
  /* ====> */ 'Menu',                               // https://www.autohotkey.com/docs/v2/lib/Menu.htm
  /* ======> */ 'MenuBar',                          // https://www.autohotkey.com/docs/v2/lib/MenuBar.htm
  /* ====> */ 'RegExMatchInfo',                     // https://www.autohotkey.com/docs/v2/lib/RegExMatchInfo.htm
  /* ==> */ 'Primitive',                            // https://www.autohotkey.com/docs/v2/lib/Primitive.htm
  /* ====> */ 'Number',                             // https://www.autohotkey.com/docs/v2/lib/Number.htm
  /* ======> */ 'Float',                            // https://www.autohotkey.com/docs/v2/lib/Float.htm
  /* ======> */ 'Integer',                          // https://www.autohotkey.com/docs/v2/lib/Integer.htm
  /* ====> */ 'String',                             // https://www.autohotkey.com/docs/v2/lib/String.htm
  /* ==> */ 'VarRef',                               // https://www.autohotkey.com/docs/v2/lib/VarRef.htm
  /* ==> */ 'ComValue',                             // https://www.autohotkey.com/docs/v2/lib/ComValue.htm
  /* ====> */ 'ComObjArray',                        // https://www.autohotkey.com/docs/v2/lib/ComObjArray.htm
  /* ====> */ 'ComObject',                          // https://www.autohotkey.com/docs/v2/lib/ComObject.htm
  /* ====> */ 'ComValueRef',                        // https://www.autohotkey.com/docs/v2/lib/ComValueRef.htm
] as const;
// #endregion BuiltIn
