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
  '#ClipboardTimeout',                     // https://www.autohotkey.com/docs/v2/lib/_ClipboardTimeout.htm
  '#DllLoad',                              // https://www.autohotkey.com/docs/v2/lib/_DllLoad.htm
  '#ErrorStdOut',                          // https://www.autohotkey.com/docs/v2/lib/_ErrorStdOut.htm
  '#Hotstring',                            // https://www.autohotkey.com/docs/v2/lib/_Hotstring.htm
  '#HotIf',                                // https://www.autohotkey.com/docs/v2/lib/_HotIf.htm
  '#HotIfTimeout',                         // https://www.autohotkey.com/docs/v2/lib/_HotIfTimeout.htm
  // '#Include',                           // https://www.autohotkey.com/docs/v2/lib/_Include.htm
  // '#IncludeAgain',                      // https://www.autohotkey.com/docs/v2/lib/_IncludeAgain.htm            // 404 - File not found
  '#InputLevel',                           // https://www.autohotkey.com/docs/v2/lib/_InputLevel.htm
  '#MaxThreads',                           // https://www.autohotkey.com/docs/v2/lib/_MaxThreads.htm
  '#MaxThreadsBuffer',                     // https://www.autohotkey.com/docs/v2/lib/_MaxThreadsBuffer.htm
  '#MaxThreadsPerHotkey',                  // https://www.autohotkey.com/docs/v2/lib/_MaxThreadsPerHotkey.htm
  '#NoTrayIcon',                           // https://www.autohotkey.com/docs/v2/lib/_NoTrayIcon.htm
  '#Requires',                             // https://www.autohotkey.com/docs/v2/lib/_Requires.htm
  '#SingleInstance',                       // https://www.autohotkey.com/docs/v2/lib/_SingleInstance.htm
  '#SuspendExempt',                        // https://www.autohotkey.com/docs/v2/lib/_SuspendExempt.htm
  '#UseHook',                              // https://www.autohotkey.com/docs/v2/lib/_UseHook.htm
  '#Warn',                                 // https://www.autohotkey.com/docs/v2/lib/_Warn.htm
  '#WinActivateForce',                     // https://www.autohotkey.com/docs/v2/lib/_WinActivateForce.htm
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
  // 'Goto',                               // https://www.autohotkey.com/docs/v2/lib/Goto.htm
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
  'KeyHistory',                            // https://www.autohotkey.com/docs/v2/lib/KeyHistory.htm
  'KeyWait',                               // https://www.autohotkey.com/docs/v2/lib/KeyWait.htm
  'ListHotkeys',                           // https://www.autohotkey.com/docs/v2/lib/ListHotkeys.htm
  'ListLines',                             // https://www.autohotkey.com/docs/v2/lib/ListLines.htm
  'ListVars',                              // https://www.autohotkey.com/docs/v2/lib/ListVars.htm
  'ListViewGetContent',                    // https://www.autohotkey.com/docs/v2/lib/ListViewGetContent.htm
  'LoadPicture',                           // https://www.autohotkey.com/docs/v2/lib/LoadPicture.htm
  'Log',                                   // https://www.autohotkey.com/docs/v2/lib/Log.htm
  'Ln',                                    // https://www.autohotkey.com/docs/v2/lib/Ln.htm
  'Max',                                   // https://www.autohotkey.com/docs/v2/lib/Max.htm
  'MenuFromHandle',                        // https://www.autohotkey.com/docs/v2/lib/MenuFromHandle.htm
  'MenuSelect',                            // https://www.autohotkey.com/docs/v2/lib/MenuSelect.htm
  'Min',                                   // https://www.autohotkey.com/docs/v2/lib/Min.htm
  'Mod',                                   // https://www.autohotkey.com/docs/v2/lib/Mod.htm
  'MonitorGet',                            // https://www.autohotkey.com/docs/v2/lib/MonitorGet.htm
  'MonitorGetCount',                       // https://www.autohotkey.com/docs/v2/lib/MonitorGetCount.htm
  'MonitorGetName',                        // https://www.autohotkey.com/docs/v2/lib/MonitorGetName.htm
  'MonitorGetPrimary',                     // https://www.autohotkey.com/docs/v2/lib/MonitorGetPrimary.htm
  'MonitorGetWorkArea',                    // https://www.autohotkey.com/docs/v2/lib/MonitorGetWorkArea.htm
  'MouseClick',                            // https://www.autohotkey.com/docs/v2/lib/MouseClick.htm
  'MouseClickDrag',                        // https://www.autohotkey.com/docs/v2/lib/MouseClickDrag.htm
  'MouseGetPos',                           // https://www.autohotkey.com/docs/v2/lib/MouseGetPos.htm
  'MouseMove',                             // https://www.autohotkey.com/docs/v2/lib/MouseMove.htm
  'MsgBox',                                // https://www.autohotkey.com/docs/v2/lib/MsgBox.htm
  'NumGet',                                // https://www.autohotkey.com/docs/v2/lib/NumGet.htm
  'NumPut',                                // https://www.autohotkey.com/docs/v2/lib/NumPut.htm
  'ObjAddRef',                             // https://www.autohotkey.com/docs/v2/lib/ObjAddRef.htm
  'ObjRelease',                            // https://www.autohotkey.com/docs/v2/lib/ObjRelease.htm
  'ObjBindMethod',                         // https://www.autohotkey.com/docs/v2/lib/ObjBindMethod.htm
  'ObjHasOwnProp',                         // https://www.autohotkey.com/docs/v2/lib/ObjHasOwnProp.htm
  'ObjOwnProps',                           // https://www.autohotkey.com/docs/v2/lib/ObjOwnProps.htm
  'ObjGetBase',                            // https://www.autohotkey.com/docs/v2/lib/ObjGetBase.htm
  'ObjGetCapacity',                        // https://www.autohotkey.com/docs/v2/lib/ObjGetCapacity.htm
  'ObjOwnPropCount',                       // https://www.autohotkey.com/docs/v2/lib/ObjOwnPropCount.htm
  'ObjSetBase',                            // https://www.autohotkey.com/docs/v2/lib/ObjSetBase.htm
  'ObjSetCapacity',                        // https://www.autohotkey.com/docs/v2/lib/ObjSetCapacity.htm
  'OnClipboardChange',                     // https://www.autohotkey.com/docs/v2/lib/OnClipboardChange.htm
  'OnError',                               // https://www.autohotkey.com/docs/v2/lib/OnError.htm
  'OnExit',                                // https://www.autohotkey.com/docs/v2/lib/OnExit.htm
  'OnMessage',                             // https://www.autohotkey.com/docs/v2/lib/OnMessage.htm
  'Ord',                                   // https://www.autohotkey.com/docs/v2/lib/Ord.htm
  'OutputDebug',                           // https://www.autohotkey.com/docs/v2/lib/OutputDebug.htm
  'Pause',                                 // https://www.autohotkey.com/docs/v2/lib/Pause.htm
  'Persistent',                            // https://www.autohotkey.com/docs/v2/lib/Persistent.htm
  'PixelGetColor',                         // https://www.autohotkey.com/docs/v2/lib/PixelGetColor.htm
  'PixelSearch',                           // https://www.autohotkey.com/docs/v2/lib/PixelSearch.htm
  'PostMessage',                           // https://www.autohotkey.com/docs/v2/lib/PostMessage.htm
  'ProcessClose',                          // https://www.autohotkey.com/docs/v2/lib/ProcessClose.htm
  'ProcessExist',                          // https://www.autohotkey.com/docs/v2/lib/ProcessExist.htm
  'ProcessGetName',                        // https://www.autohotkey.com/docs/v2/lib/ProcessGetName.htm
  'ProcessGetParent',                      // https://www.autohotkey.com/docs/v2/lib/ProcessGetParent.htm
  'ProcessGetPath',                        // https://www.autohotkey.com/docs/v2/lib/ProcessGetPath.htm
  'ProcessSetPriority',                    // https://www.autohotkey.com/docs/v2/lib/ProcessSetPriority.htm
  'ProcessWait',                           // https://www.autohotkey.com/docs/v2/lib/ProcessWait.htm
  'ProcessWaitClose',                      // https://www.autohotkey.com/docs/v2/lib/ProcessWaitClose.htm
  'Random',                                // https://www.autohotkey.com/docs/v2/lib/Random.htm
  'RegExMatch',                            // https://www.autohotkey.com/docs/v2/lib/RegExMatch.htm
  'RegExReplace',                          // https://www.autohotkey.com/docs/v2/lib/RegExReplace.htm
  'RegCreateKey',                          // https://www.autohotkey.com/docs/v2/lib/RegCreateKey.htm
  'RegDelete',                             // https://www.autohotkey.com/docs/v2/lib/RegDelete.htm
  'RegDeleteKey',                          // https://www.autohotkey.com/docs/v2/lib/RegDeleteKey.htm
  'RegRead',                               // https://www.autohotkey.com/docs/v2/lib/RegRead.htm
  'RegWrite',                              // https://www.autohotkey.com/docs/v2/lib/RegWrite.htm
  'Reload',                                // https://www.autohotkey.com/docs/v2/lib/Reload.htm
  'Round',                                 // https://www.autohotkey.com/docs/v2/lib/Round.htm
  'Run',                                   // https://www.autohotkey.com/docs/v2/lib/Run.htm
  'RunAs',                                 // https://www.autohotkey.com/docs/v2/lib/RunAs.htm
  'RunWait',                               // https://www.autohotkey.com/docs/v2/lib/RunWait.htm
  'Send',                                  // https://www.autohotkey.com/docs/v2/lib/Send.htm
  'SendText',                              // https://www.autohotkey.com/docs/v2/lib/SendText.htm
  'SendInput',                             // https://www.autohotkey.com/docs/v2/lib/SendInput.htm
  'SendEvent',                             // https://www.autohotkey.com/docs/v2/lib/SendEvent.htm
  'SendLevel',                             // https://www.autohotkey.com/docs/v2/lib/SendLevel.htm
  'SendMessage',                           // https://www.autohotkey.com/docs/v2/lib/SendMessage.htm
  'SendMode',                              // https://www.autohotkey.com/docs/v2/lib/SendMode.htm
  'SetCapsLockState',                      // https://www.autohotkey.com/docs/v2/lib/SetCapsLockState.htm
  'SetControlDelay',                       // https://www.autohotkey.com/docs/v2/lib/SetControlDelay.htm
  'SetDefaultMouseSpeed',                  // https://www.autohotkey.com/docs/v2/lib/SetDefaultMouseSpeed.htm
  'SetKeyDelay',                           // https://www.autohotkey.com/docs/v2/lib/SetKeyDelay.htm
  'SetMouseDelay',                         // https://www.autohotkey.com/docs/v2/lib/SetMouseDelay.htm
  'SetNumLockState',                       // https://www.autohotkey.com/docs/v2/lib/SetNumLockState.htm
  'SetScrollLockState',                    // https://www.autohotkey.com/docs/v2/lib/SetScrollLockState.htm
  'SetRegView',                            // https://www.autohotkey.com/docs/v2/lib/SetRegView.htm
  'SetStoreCapsLockMode',                  // https://www.autohotkey.com/docs/v2/lib/SetStoreCapsLockMode.htm
  'SetTimer',                              // https://www.autohotkey.com/docs/v2/lib/SetTimer.htm
  'SetTitleMatchMode',                     // https://www.autohotkey.com/docs/v2/lib/SetTitleMatchMode.htm
  'SetWinDelay',                           // https://www.autohotkey.com/docs/v2/lib/SetWinDelay.htm
  'SetWorkingDir',                         // https://www.autohotkey.com/docs/v2/lib/SetWorkingDir.htm
  'Shutdown',                              // https://www.autohotkey.com/docs/v2/lib/Shutdown.htm
  'Sin',                                   // https://www.autohotkey.com/docs/v2/lib/Sin.htm
  'Sleep',                                 // https://www.autohotkey.com/docs/v2/lib/Sleep.htm
  'Sort',                                  // https://www.autohotkey.com/docs/v2/lib/Sort.htm
  'SoundBeep',                             // https://www.autohotkey.com/docs/v2/lib/SoundBeep.htm
  'SoundGetInterface',                     // https://www.autohotkey.com/docs/v2/lib/SoundGetInterface.htm
  'SoundGetMute',                          // https://www.autohotkey.com/docs/v2/lib/SoundGetMute.htm
  'SoundGetName',                          // https://www.autohotkey.com/docs/v2/lib/SoundGetName.htm
  'SoundGetVolume',                        // https://www.autohotkey.com/docs/v2/lib/SoundGetVolume.htm
  'SoundPlay',                             // https://www.autohotkey.com/docs/v2/lib/SoundPlay.htm
  'SoundSetMute',                          // https://www.autohotkey.com/docs/v2/lib/SoundSetMute.htm
  'SoundSetVolume',                        // https://www.autohotkey.com/docs/v2/lib/SoundSetVolume.htm
  'SplitPath',                             // https://www.autohotkey.com/docs/v2/lib/SplitPath.htm
  'Sqrt',                                  // https://www.autohotkey.com/docs/v2/lib/Sqrt.htm
  'StatusBarGetText',                      // https://www.autohotkey.com/docs/v2/lib/StatusBarGetText.htm
  'StatusBarWait',                         // https://www.autohotkey.com/docs/v2/lib/StatusBarWait.htm
  'StrCompare',                            // https://www.autohotkey.com/docs/v2/lib/StrCompare.htm
  'StrGet',                                // https://www.autohotkey.com/docs/v2/lib/StrGet.htm
  'StrLen',                                // https://www.autohotkey.com/docs/v2/lib/StrLen.htm
  'StrLower',                              // https://www.autohotkey.com/docs/v2/lib/StrLower.htm
  'StrPtr',                                // https://www.autohotkey.com/docs/v2/lib/StrPtr.htm
  'StrPut',                                // https://www.autohotkey.com/docs/v2/lib/StrPut.htm
  'StrReplace',                            // https://www.autohotkey.com/docs/v2/lib/StrReplace.htm
  'StrSplit',                              // https://www.autohotkey.com/docs/v2/lib/StrSplit.htm
  'StrTitle',                              // https://www.autohotkey.com/docs/v2/lib/StrTitle.htm
  'StrUpper',                              // https://www.autohotkey.com/docs/v2/lib/StrUpper.htm
  'SubStr',                                // https://www.autohotkey.com/docs/v2/lib/SubStr.htm
  'Suspend',                               // https://www.autohotkey.com/docs/v2/lib/Suspend.htm
  'SysGet',                                // https://www.autohotkey.com/docs/v2/lib/SysGet.htm
  'SysGetIPAddresses',                     // https://www.autohotkey.com/docs/v2/lib/SysGetIPAddresses.htm
  'Tan',                                   // https://www.autohotkey.com/docs/v2/lib/Tan.htm
  'Thread',                                // https://www.autohotkey.com/docs/v2/lib/Thread.htm
  'ToolTip',                               // https://www.autohotkey.com/docs/v2/lib/ToolTip.htm
  'TraySetIcon',                           // https://www.autohotkey.com/docs/v2/lib/TraySetIcon.htm
  'TrayTip',                               // https://www.autohotkey.com/docs/v2/lib/TrayTip.htm
  'Trim',                                  // https://www.autohotkey.com/docs/v2/lib/Trim.htm
  'LTrim',                                 // https://www.autohotkey.com/docs/v2/lib/LTrim.htm
  'RTrim',                                 // https://www.autohotkey.com/docs/v2/lib/RTrim.htm
  'Type',                                  // https://www.autohotkey.com/docs/v2/lib/Type.htm
  'VarSetStrCapacity',                     // https://www.autohotkey.com/docs/v2/lib/VarSetStrCapacity.htm
  'VerCompare',                            // https://www.autohotkey.com/docs/v2/lib/VerCompare.htm
  'WinActivate',                           // https://www.autohotkey.com/docs/v2/lib/WinActivate.htm
  'WinActivateBottom',                     // https://www.autohotkey.com/docs/v2/lib/WinActivateBottom.htm
  'WinActive',                             // https://www.autohotkey.com/docs/v2/lib/WinActive.htm
  'WinClose',                              // https://www.autohotkey.com/docs/v2/lib/WinClose.htm
  'WinExist',                              // https://www.autohotkey.com/docs/v2/lib/WinExist.htm
  'WinGetClass',                           // https://www.autohotkey.com/docs/v2/lib/WinGetClass.htm
  'WinGetClientPos',                       // https://www.autohotkey.com/docs/v2/lib/WinGetClientPos.htm
  'WinGetControls',                        // https://www.autohotkey.com/docs/v2/lib/WinGetControls.htm
  'WinGetControlsHwnd',                    // https://www.autohotkey.com/docs/v2/lib/WinGetControlsHwnd.htm
  'WinGetCount',                           // https://www.autohotkey.com/docs/v2/lib/WinGetCount.htm
  'WinGetID',                              // https://www.autohotkey.com/docs/v2/lib/WinGetID.htm
  'WinGetIDLast',                          // https://www.autohotkey.com/docs/v2/lib/WinGetIDLast.htm
  'WinGetList',                            // https://www.autohotkey.com/docs/v2/lib/WinGetList.htm
  'WinGetMinMax',                          // https://www.autohotkey.com/docs/v2/lib/WinGetMinMax.htm
  'WinGetPID',                             // https://www.autohotkey.com/docs/v2/lib/WinGetPID.htm
  'WinGetPos',                             // https://www.autohotkey.com/docs/v2/lib/WinGetPos.htm
  'WinGetProcessName',                     // https://www.autohotkey.com/docs/v2/lib/WinGetProcessName.htm
  'WinGetProcessPath',                     // https://www.autohotkey.com/docs/v2/lib/WinGetProcessPath.htm
  'WinGetStyle',                           // https://www.autohotkey.com/docs/v2/lib/WinGetStyle.htm
  'WinGetExStyle',                         // https://www.autohotkey.com/docs/v2/lib/WinGetExStyle.htm
  'WinGetText',                            // https://www.autohotkey.com/docs/v2/lib/WinGetText.htm
  'WinGetTitle',                           // https://www.autohotkey.com/docs/v2/lib/WinGetTitle.htm
  'WinGetTransColor',                      // https://www.autohotkey.com/docs/v2/lib/WinGetTransColor.htm
  'WinGetTransparent',                     // https://www.autohotkey.com/docs/v2/lib/WinGetTransparent.htm
  'WinHide',                               // https://www.autohotkey.com/docs/v2/lib/WinHide.htm
  'WinKill',                               // https://www.autohotkey.com/docs/v2/lib/WinKill.htm
  'WinMaximize',                           // https://www.autohotkey.com/docs/v2/lib/WinMaximize.htm
  'WinMinimize',                           // https://www.autohotkey.com/docs/v2/lib/WinMinimize.htm
  'WinMinimizeAll',                        // https://www.autohotkey.com/docs/v2/lib/WinMinimizeAll.htm
  'WinMinimizeAllUndo',                    // https://www.autohotkey.com/docs/v2/lib/WinMinimizeAllUndo.htm
  'WinMove',                               // https://www.autohotkey.com/docs/v2/lib/WinMove.htm
  'WinMoveBottom',                         // https://www.autohotkey.com/docs/v2/lib/WinMoveBottom.htm
  'WinMoveTop',                            // https://www.autohotkey.com/docs/v2/lib/WinMoveTop.htm
  'WinRedraw',                             // https://www.autohotkey.com/docs/v2/lib/WinRedraw.htm
  'WinRestore',                            // https://www.autohotkey.com/docs/v2/lib/WinRestore.htm
  'WinSetAlwaysOnTop',                     // https://www.autohotkey.com/docs/v2/lib/WinSetAlwaysOnTop.htm
  'WinSetEnabled',                         // https://www.autohotkey.com/docs/v2/lib/WinSetEnabled.htm
  'WinSetRegion',                          // https://www.autohotkey.com/docs/v2/lib/WinSetRegion.htm
  'WinSetStyle',                           // https://www.autohotkey.com/docs/v2/lib/WinSetStyle.htm
  'WinSetExStyle',                         // https://www.autohotkey.com/docs/v2/lib/WinSetExStyle.htm
  'WinSetTitle',                           // https://www.autohotkey.com/docs/v2/lib/WinSetTitle.htm
  'WinSetTransColor',                      // https://www.autohotkey.com/docs/v2/lib/WinSetTransColor.htm
  'WinSetTransparent',                     // https://www.autohotkey.com/docs/v2/lib/WinSetTransparent.htm
  'WinShow',                               // https://www.autohotkey.com/docs/v2/lib/WinShow.htm
  'WinWait',                               // https://www.autohotkey.com/docs/v2/lib/WinWait.htm
  'WinWaitActive',                         // https://www.autohotkey.com/docs/v2/lib/WinWaitActive.htm
  'WinWaitNotActive',                      // https://www.autohotkey.com/docs/v2/lib/WinWaitNotActive.htm
  'WinWaitClose',                          // https://www.autohotkey.com/docs/v2/lib/WinWaitClose.htm
] as const;
export const deprecatedBuiltinFunctionNames = [
  // https://www.autohotkey.com/docs/v2/lib/SendPlay.htm
  'SendPlay',
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
