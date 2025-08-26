import {
  dedent,
  hasFlag,
} from '@zero-plusplus/utilities/src';
import * as definitions_v1 from '../../../../../src/autohotkeyl/definitions';
import {
  CommandFlag,
} from '../../../../../src/definition';
import {
  name,
  RuleName,
  StyleName,
  type ScopeName,
} from '../../../../../src/tmlanguage';
import type {
  ExpectedTestData,
} from '../../../../types';
import { createAutoTrimExpectedDataList } from './AutoTrim';
import { createBlockInputExpectedDataList } from './BlockInput';
import { createClickExpectedDataList } from './Click';
import { createClipWaitExpectedDataList } from './ClipWait';
import { createControlExpectedDataList } from './Control';
import { createControlClickExpectedDataList } from './ControlClick';
import { createControlFocusExpectedDataList } from './ControlFocus';
import { createControlGetExpectedDataList } from './ControlGet';
import { createControlGetFocusExpectedDataList } from './ControlGetFocus';
import { createControlGetPosExpectedDataList } from './ControlGetPos';
import { createControlGetTextPosExpectedDataList } from './ControlGetText';
import { createControlMoveExpectedDataList } from './ControlMove';
import { createControlSendExpectedDataList } from './ControlSend';
import { createControlSendRawExpectedDataList } from './ControlSendRaw';
import { createControlSetTextExpectedDataList } from './ControlSetText';
import { createCoordModeExpectedDataList } from './CoordMode';
import { createCriticalExpectedDataList } from './Critical';
import { createDetectHiddenTextExpectedDataList } from './DetectHiddenText';
import { createDetectHiddenWindowsExpectedDataList } from './DetectHiddenWindows';
import { createDriveExpectedDataList } from './Drive';
import { createDriveGetExpectedDataList } from './DriveGet';
import { createDriveSpaceFreeExpectedDataList } from './DriveSpaceFree';
import { createEditExpectedDataList } from './Edit';
import { createEnvAddExpectedDataList } from './EnvAdd';
import { createEnvDivExpectedDataList } from './EnvDiv';
import { createEnvGetExpectedDataList } from './EnvGet';
import { createEnvMultExpectedDataList } from './EnvMult';
import { createEnvSetExpectedDataList } from './EnvSet';
import { createEnvSubExpectedDataList } from './EnvSub';
import { createEnvUpdateExpectedDataList } from './EnvUpdate';
import { createFileAppendExpectedDataList } from './FileAppend';
import { createFileCopyExpectedDataList } from './FileCopy';
import { createFileCopyDirExpectedDataList } from './FileCopyDir';
import { createFileCreateDirExpectedDataList } from './FileCreateDir';
import { createFileCreateShortcutExpectedDataList } from './FileCreateShortcut';
import { createFileDeleteExpectedDataList } from './FileDelete';
import { createFileEncodingExpectedDataList } from './FileEncoding';
import { createFileGetAttribExpectedDataList } from './FileGetAttrib';
import { createFileGetShortcutExpectedDataList } from './FileGetShortcut';
import { createFileGetSizeExpectedDataList } from './FileGetSize';
import { createFileGetTimeExpectedDataList } from './FileGetTime';
import { createFileGetVersionExpectedDataList } from './FileGetVersion';
import { createFileInstallExpectedDataList } from './FileInstall';
import { createFileMoveExpectedDataList } from './FileMove';
import { createFileMoveDirExpectedDataList } from './FileMoveDir';
import { createFileReadExpectedDataList } from './FileRead';
import { createFileReadLineExpectedDataList } from './FileReadLine';
import { createFileRecycleExpectedDataList } from './FileRecycle';
import { createFileRecycleEmptyExpectedDataList } from './FileRecycleEmpty';
import { createFileRemoveDirExpectedDataList } from './FileRemoveDir';
import { createFileSelectFileExpectedDataList } from './FileSelectFile';
import { createFileSelectFolderExpectedDataList } from './FileSelectFolder';
import { createFileSetAttribExpectedDataList } from './FileSetAttrib';
import { createFileSetTimeExpectedDataList } from './FileSetTime';
import { createFormatTimeExpectedDataList } from './FormatTime';
import { createGetKeyStateExpectedDataList } from './GetKeyState';
import { createGroupActivateExpectedDataList } from './GroupActivate';
import { createGroupAddExpectedDataList } from './GroupAdd';
import { createGroupCloseExpectedDataList } from './GroupClose';
import { createGroupDeactivateExpectedDataList } from './GroupDeactivate';
import { createGuiExpectedDataList } from './Gui';
import { createGuiControlExpectedDataList } from './GuiControl';
import { createGuiControlGetExpectedDataList } from './GuiControlGet';
import { createHotkeyExpectedDataList } from './Hotkey';
import { createImageSearchExpectedDataList } from './ImageSearch';
import { createIniDeleteExpectedDataList } from './IniDelete';
import { createIniReadExpectedDataList } from './IniRead';
import { createIniWriteExpectedDataList } from './IniWrite';
import { createInputExpectedDataList } from './Input';
import { createInputBoxExpectedDataList } from './InputBox';
import { createKeyHistoryExpectedDataList } from './KeyHistory';
import { createKeyWaitExpectedDataList } from './KeyWait';
import { createListHotkeysExpectedDataList } from './ListHotkeys';
import { createListLinesExpectedDataList } from './ListLines';
import { createListVarsExpectedDataList } from './ListVars';
import { createMenuExpectedDataList } from './Menu';
import { createMouseClickExpectedDataList } from './MouseClick';
import { createMouseClickDragExpectedDataList } from './MouseClickDrag';
import { createMouseGetPosExpectedDataList } from './MouseGetPos';
import { createMouseMoveExpectedDataList } from './MouseMove';
import { createMsgBoxExpectedDataList } from './MsgBox';
import { createOnExitExpectedDataList } from './OnExit';
import { createOutputDebugExpectedDataList } from './OutputDebug';
import { createPauseExpectedDataList } from './Pause';
import { createPixelGetColorExpectedDataList } from './PixelGetColor';
import { createPixelSearchExpectedDataList } from './PixelSearch';
import { createPostMessageExpectedDataList } from './PostMessage';
import { createProcessExpectedDataList } from './Process';
import { createProgressExpectedDataList } from './Progress';
import { createRandomExpectedDataList } from './Random';
import { createRegDeleteExpectedDataList } from './RegDelete';
import { createRegReadExpectedDataList } from './RegRead';
import { createRegWriteExpectedDataList } from './RegWrite';
import { createReloadExpectedDataList } from './Reload';
import { createRunExpectedDataList } from './Run';
import { createRunWaitExpectedDataList } from './RunWait';
import { createSendExpectedDataList } from './Send';
import { createSendEventExpectedDataList } from './SendEvent';
import { createSendInputExpectedDataList } from './SendInput';
import { createSendLevelExpectedDataList } from './SendLevel';
import { createSendMessageExpectedDataList } from './SendMessage';
import { createSendModeExpectedDataList } from './SendMode';
import { createSendPlayExpectedDataList } from './SendPlay';
import { createSendRawExpectedDataList } from './SendRaw';
import { createSetBatchLinesExpectedDataList } from './SetBatchLines';
import { createSetCapsLockStateExpectedDataList } from './SetCapsLockState';
import { createSetControlDelayExpectedDataList } from './SetControlDelay';
import { createSetDefaultMouseSpeedExpectedDataList } from './SetDefaultMouseSpeed';
import { createSetEnvExpectedDataList } from './SetEnv';
import { createSetFormatExpectedDataList } from './SetFormat';
import { createSetKeyDelayExpectedDataList } from './SetKeyDelay';
import { createSetMouseDelayExpectedDataList } from './SetMouseDelay';
import { createSetNumLockStateExpectedDataList } from './SetNumLockState';
import { createSetRegViewExpectedDataList } from './SetRegView';
import { createSetScrollLockStateExpectedDataList } from './SetScrollLockState';
import { createSetStoreCapsLockModeExpectedDataList } from './SetStoreCapsLockMode';
import { createSetTimerExpectedDataList } from './SetTimer';
import { createSetTitleMatchModeExpectedDataList } from './SetTitleMatchMode';
import { createSetWinDelayExpectedDataList } from './SetWinDelay';
import { createSetWorkingDirExpectedDataList } from './SetWorkingDir';

export function createCommandStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // command names
    ...((): ExpectedTestData[] => {
      return definitions_v1.commandDefinitions.slice(0, 1).flatMap((definition): ExpectedTestData[] => {
        const commandElementScopes = hasFlag(definition.flags, CommandFlag.Deprecated) ? name(scopeName, RuleName.CommandName, StyleName.Strikethrough) : name(scopeName, RuleName.CommandName);
        return [
          [
            dedent`
              ${definition.name}      ; comment
            `,
            [
              { text: definition.name, scopes: commandElementScopes },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ],
          [
            dedent`
              ${definition.name},     ; comment
            `,
            [
              { text: definition.name, scopes: commandElementScopes },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ],
          [
            dedent`
              ${definition.name},     ; comment
                , text                ; comment
            `,
            [
              { text: definition.name, scopes: commandElementScopes },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: 'text', scopes: name(scopeName, RuleName.UnquotedString) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ],
        ];
      });
    })(),

    // #region commands
    ...createAutoTrimExpectedDataList(scopeName),
    ...createBlockInputExpectedDataList(scopeName),
    ...createClickExpectedDataList(scopeName),
    ...createClipWaitExpectedDataList(scopeName),
    ...createControlExpectedDataList(scopeName),
    ...createControlClickExpectedDataList(scopeName),
    ...createControlFocusExpectedDataList(scopeName),
    ...createControlGetExpectedDataList(scopeName),
    ...createControlGetFocusExpectedDataList(scopeName),
    ...createControlGetPosExpectedDataList(scopeName),
    ...createControlGetTextPosExpectedDataList(scopeName),
    ...createControlMoveExpectedDataList(scopeName),
    ...createControlSendExpectedDataList(scopeName),
    ...createControlSendRawExpectedDataList(scopeName),
    ...createControlSetTextExpectedDataList(scopeName),
    ...createCoordModeExpectedDataList(scopeName),
    ...createCriticalExpectedDataList(scopeName),
    ...createDetectHiddenTextExpectedDataList(scopeName),
    ...createDetectHiddenWindowsExpectedDataList(scopeName),
    ...createDriveExpectedDataList(scopeName),
    ...createDriveGetExpectedDataList(scopeName),
    ...createDriveSpaceFreeExpectedDataList(scopeName),
    ...createEditExpectedDataList(scopeName),
    ...createEnvAddExpectedDataList(scopeName),
    ...createEnvDivExpectedDataList(scopeName),
    ...createEnvGetExpectedDataList(scopeName),
    ...createEnvMultExpectedDataList(scopeName),
    ...createEnvSetExpectedDataList(scopeName),
    ...createEnvSubExpectedDataList(scopeName),
    ...createEnvUpdateExpectedDataList(scopeName),
    ...createFileAppendExpectedDataList(scopeName),
    ...createFileCopyExpectedDataList(scopeName),
    ...createFileCopyDirExpectedDataList(scopeName),
    ...createFileCreateDirExpectedDataList(scopeName),
    ...createFileCreateShortcutExpectedDataList(scopeName),
    ...createFileDeleteExpectedDataList(scopeName),
    ...createFileEncodingExpectedDataList(scopeName),
    ...createFileInstallExpectedDataList(scopeName),
    ...createFileGetAttribExpectedDataList(scopeName),
    ...createFileGetShortcutExpectedDataList(scopeName),
    ...createFileGetSizeExpectedDataList(scopeName),
    ...createFileGetTimeExpectedDataList(scopeName),
    ...createFileGetVersionExpectedDataList(scopeName),
    ...createFileMoveExpectedDataList(scopeName),
    ...createFileMoveDirExpectedDataList(scopeName),
    ...createFileReadExpectedDataList(scopeName),
    ...createFileReadLineExpectedDataList(scopeName),
    ...createFileRecycleExpectedDataList(scopeName),
    ...createFileRecycleEmptyExpectedDataList(scopeName),
    ...createFileRemoveDirExpectedDataList(scopeName),
    ...createFileSelectFileExpectedDataList(scopeName),
    ...createFileSelectFolderExpectedDataList(scopeName),
    ...createFileSetAttribExpectedDataList(scopeName),
    ...createFileSetTimeExpectedDataList(scopeName),
    ...createFormatTimeExpectedDataList(scopeName),
    ...createGetKeyStateExpectedDataList(scopeName),
    ...createGroupActivateExpectedDataList(scopeName),
    ...createGroupAddExpectedDataList(scopeName),
    ...createGroupCloseExpectedDataList(scopeName),
    ...createGroupDeactivateExpectedDataList(scopeName),
    ...createGuiExpectedDataList(scopeName),
    ...createGuiControlExpectedDataList(scopeName),
    ...createGuiControlGetExpectedDataList(scopeName),
    ...createHotkeyExpectedDataList(scopeName),
    ...createImageSearchExpectedDataList(scopeName),
    ...createIniDeleteExpectedDataList(scopeName),
    ...createIniReadExpectedDataList(scopeName),
    ...createIniWriteExpectedDataList(scopeName),
    ...createInputExpectedDataList(scopeName),
    ...createInputBoxExpectedDataList(scopeName),
    ...createKeyHistoryExpectedDataList(scopeName),
    ...createKeyWaitExpectedDataList(scopeName),
    ...createListHotkeysExpectedDataList(scopeName),
    ...createListLinesExpectedDataList(scopeName),
    ...createListVarsExpectedDataList(scopeName),
    ...createMenuExpectedDataList(scopeName),
    ...createMouseClickExpectedDataList(scopeName),
    ...createMouseClickDragExpectedDataList(scopeName),
    ...createMouseGetPosExpectedDataList(scopeName),
    ...createMouseMoveExpectedDataList(scopeName),
    ...createMsgBoxExpectedDataList(scopeName),
    ...createOnExitExpectedDataList(scopeName),
    ...createOutputDebugExpectedDataList(scopeName),
    ...createPauseExpectedDataList(scopeName),
    ...createPixelGetColorExpectedDataList(scopeName),
    ...createPixelSearchExpectedDataList(scopeName),
    ...createPostMessageExpectedDataList(scopeName),
    ...createSendMessageExpectedDataList(scopeName),
    ...createProcessExpectedDataList(scopeName),
    ...createProgressExpectedDataList(scopeName),
    ...createRandomExpectedDataList(scopeName),
    ...createRegDeleteExpectedDataList(scopeName),
    ...createRegReadExpectedDataList(scopeName),
    ...createRegWriteExpectedDataList(scopeName),
    ...createReloadExpectedDataList(scopeName),
    ...createRunExpectedDataList(scopeName),
    ...createRunWaitExpectedDataList(scopeName),
    ...createSendExpectedDataList(scopeName),
    ...createSendRawExpectedDataList(scopeName),
    ...createSendInputExpectedDataList(scopeName),
    ...createSendPlayExpectedDataList(scopeName),
    ...createSendEventExpectedDataList(scopeName),
    ...createSendLevelExpectedDataList(scopeName),
    ...createSendModeExpectedDataList(scopeName),
    ...createSetBatchLinesExpectedDataList(scopeName),
    ...createSetScrollLockStateExpectedDataList(scopeName),
    ...createSetControlDelayExpectedDataList(scopeName),
    ...createSetDefaultMouseSpeedExpectedDataList(scopeName),
    ...createSetEnvExpectedDataList(scopeName),
    ...createSetFormatExpectedDataList(scopeName),
    ...createSetKeyDelayExpectedDataList(scopeName),
    ...createSetMouseDelayExpectedDataList(scopeName),
    ...createSetCapsLockStateExpectedDataList(scopeName),
    ...createSetNumLockStateExpectedDataList(scopeName),
    ...createSetRegViewExpectedDataList(scopeName),
    ...createSetStoreCapsLockModeExpectedDataList(scopeName),
    ...createSetTimerExpectedDataList(scopeName),
    ...createSetTitleMatchModeExpectedDataList(scopeName),
    ...createSetWinDelayExpectedDataList(scopeName),
    ...createSetWorkingDirExpectedDataList(scopeName),
    // #endregion commands

    // #region continuation
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            Control               ; comment
              , arg1              ; comment
              , arg2, arg3        ; comment

            {                     ; comment
              Control             ; comment
                , arg1            ; comment
                , arg2, arg3      ; comment
            }                     ; comment

            F() {                 ; comment
              Control             ; comment
                , arg1            ; comment
                , arg2, arg3      ; comment
            }                     ; comment

            class {               ; comment
              M() {               ; comment
                Control           ; comment
                  , arg1          ; comment
                  , arg2, arg3    ; comment
              }                   ; comment
            }                     ; comment
          `,
          [
            // global
            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg1', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg2', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg3', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            // block
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg1', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg2', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg3', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            // function block
            { text: 'F', scopes: name(scopeName, RuleName.FunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg1', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg2', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg3', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            // method block
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'M', scopes: name(scopeName, RuleName.FunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg1', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg2', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg3', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            Control               ; comment
              , arg1              ; comment
              , arg2, arg3,       ; comment
              (                   ; comment
                arg4              ; text
              )                   ; comment

            {                     ; comment
              Control             ; comment
                , arg1            ; comment
                , arg2, arg3,     ; comment
                (                 ; comment
                  arg4            ; text
                )                 ; comment
            }                     ; comment

            F() {                 ; comment
              Control             ; comment
                , arg1            ; comment
                , arg2, arg3,     ; comment
                (                 ; comment
                  arg4            ; text
                )                 ; comment
            }                     ; comment

            class {               ; comment
              M() {               ; comment
                Control           ; comment
                  , arg1          ; comment
                  , arg2, arg3,   ; comment
                  (               ; comment
                    arg4          ; text
                  )               ; comment
              }                   ; comment
            }                     ; comment
          `,
          [
            // global
            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg1', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg2', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg3', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'arg4              ; text', scopes: name(scopeName, RuleName.UnquotedString) },

            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            // block
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg1', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg2', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg3', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'arg4            ; text', scopes: name(scopeName, RuleName.UnquotedString) },

            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            // function block
            { text: 'F', scopes: name(scopeName, RuleName.FunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg1', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg2', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg3', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'arg4            ; text', scopes: name(scopeName, RuleName.UnquotedString) },

            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            // method block
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'M', scopes: name(scopeName, RuleName.FunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg1', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg2', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'arg3', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'arg4          ; text', scopes: name(scopeName, RuleName.UnquotedString) },

            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),
    // #endregion continuation

    // command or expression
    [
      dedent`
        Control += var                  ; comment
        Control, += var                 ; comment
      `,
      [
        { text: 'Control', scopes: name(scopeName, RuleName.Variable) },
        { text: '+=', scopes: name(scopeName, RuleName.Operator) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'Control', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '+=', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: 'var', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],

    // Fix: If the last argument is a percent expression, the comma after is highlighted as a string
    [
      dedent`
        Click, % abc, d           ; comment
      `,
      [
        { text: 'Click', scopes: name(scopeName, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'd', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}
