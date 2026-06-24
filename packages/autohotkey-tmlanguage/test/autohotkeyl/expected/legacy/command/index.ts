import {
  dedent,
  hasFlag,
} from '@zero-plusplus/utilities/src/index.ts';
import * as definitions_v1 from '../../../../../src/autohotkeyl/definitions.ts';
import {
  CommandFlag,
} from '../../../../../src/definition.ts';
import {
  name,
  RuleName,
  StyleName,
  type ScopeName,
} from '../../../../../src/tmlanguage.ts';
import type {
  ExpectedTestData,
} from '../../../../types.ts';
import { createAutoTrimExpectedDataList } from './AutoTrim.ts';
import { createBlockInputExpectedDataList } from './BlockInput.ts';
import { createClickExpectedDataList } from './Click.ts';
import { createClipWaitExpectedDataList } from './ClipWait.ts';
import { createControlExpectedDataList } from './Control.ts';
import { createControlClickExpectedDataList } from './ControlClick.ts';
import { createControlFocusExpectedDataList } from './ControlFocus.ts';
import { createControlGetExpectedDataList } from './ControlGet.ts';
import { createControlGetFocusExpectedDataList } from './ControlGetFocus.ts';
import { createControlGetPosExpectedDataList } from './ControlGetPos.ts';
import { createControlGetTextPosExpectedDataList } from './ControlGetText.ts';
import { createControlMoveExpectedDataList } from './ControlMove.ts';
import { createControlSendExpectedDataList } from './ControlSend.ts';
import { createControlSendRawExpectedDataList } from './ControlSendRaw.ts';
import { createControlSetTextExpectedDataList } from './ControlSetText.ts';
import { createCoordModeExpectedDataList } from './CoordMode.ts';
import { createCriticalExpectedDataList } from './Critical.ts';
import { createDetectHiddenTextExpectedDataList } from './DetectHiddenText.ts';
import { createDetectHiddenWindowsExpectedDataList } from './DetectHiddenWindows.ts';
import { createDriveExpectedDataList } from './Drive.ts';
import { createDriveGetExpectedDataList } from './DriveGet.ts';
import { createDriveSpaceFreeExpectedDataList } from './DriveSpaceFree.ts';
import { createEditExpectedDataList } from './Edit.ts';
import { createEnvAddExpectedDataList } from './EnvAdd.ts';
import { createEnvDivExpectedDataList } from './EnvDiv.ts';
import { createEnvGetExpectedDataList } from './EnvGet.ts';
import { createEnvMultExpectedDataList } from './EnvMult.ts';
import { createEnvSetExpectedDataList } from './EnvSet.ts';
import { createEnvSubExpectedDataList } from './EnvSub.ts';
import { createEnvUpdateExpectedDataList } from './EnvUpdate.ts';
import { createFileAppendExpectedDataList } from './FileAppend.ts';
import { createFileCopyExpectedDataList } from './FileCopy.ts';
import { createFileCopyDirExpectedDataList } from './FileCopyDir.ts';
import { createFileCreateDirExpectedDataList } from './FileCreateDir.ts';
import { createFileCreateShortcutExpectedDataList } from './FileCreateShortcut.ts';
import { createFileDeleteExpectedDataList } from './FileDelete.ts';
import { createFileEncodingExpectedDataList } from './FileEncoding.ts';
import { createFileGetAttribExpectedDataList } from './FileGetAttrib.ts';
import { createFileGetShortcutExpectedDataList } from './FileGetShortcut.ts';
import { createFileGetSizeExpectedDataList } from './FileGetSize.ts';
import { createFileGetTimeExpectedDataList } from './FileGetTime.ts';
import { createFileGetVersionExpectedDataList } from './FileGetVersion.ts';
import { createFileInstallExpectedDataList } from './FileInstall.ts';
import { createFileMoveExpectedDataList } from './FileMove.ts';
import { createFileMoveDirExpectedDataList } from './FileMoveDir.ts';
import { createFileReadExpectedDataList } from './FileRead.ts';
import { createFileReadLineExpectedDataList } from './FileReadLine.ts';
import { createFileRecycleExpectedDataList } from './FileRecycle.ts';
import { createFileRecycleEmptyExpectedDataList } from './FileRecycleEmpty.ts';
import { createFileRemoveDirExpectedDataList } from './FileRemoveDir.ts';
import { createFileSelectFileExpectedDataList } from './FileSelectFile.ts';
import { createFileSelectFolderExpectedDataList } from './FileSelectFolder.ts';
import { createFileSetAttribExpectedDataList } from './FileSetAttrib.ts';
import { createFileSetTimeExpectedDataList } from './FileSetTime.ts';
import { createFormatTimeExpectedDataList } from './FormatTime.ts';
import { createGetKeyStateExpectedDataList } from './GetKeyState.ts';
import { createGroupActivateExpectedDataList } from './GroupActivate.ts';
import { createGroupAddExpectedDataList } from './GroupAdd.ts';
import { createGroupCloseExpectedDataList } from './GroupClose.ts';
import { createGroupDeactivateExpectedDataList } from './GroupDeactivate.ts';
import { createGuiExpectedDataList } from './Gui.ts';
import { createGuiControlExpectedDataList } from './GuiControl.ts';
import { createGuiControlGetExpectedDataList } from './GuiControlGet.ts';
import { createHotkeyExpectedDataList } from './Hotkey.ts';
import { createImageSearchExpectedDataList } from './ImageSearch.ts';
import { createIniDeleteExpectedDataList } from './IniDelete.ts';
import { createIniReadExpectedDataList } from './IniRead.ts';
import { createIniWriteExpectedDataList } from './IniWrite.ts';
import { createInputExpectedDataList } from './Input.ts';
import { createInputBoxExpectedDataList } from './InputBox.ts';
import { createKeyHistoryExpectedDataList } from './KeyHistory.ts';
import { createKeyWaitExpectedDataList } from './KeyWait.ts';
import { createListHotkeysExpectedDataList } from './ListHotkeys.ts';
import { createListLinesExpectedDataList } from './ListLines.ts';
import { createListVarsExpectedDataList } from './ListVars.ts';
import { createMenuExpectedDataList } from './Menu.ts';
import { createMouseClickExpectedDataList } from './MouseClick.ts';
import { createMouseClickDragExpectedDataList } from './MouseClickDrag.ts';
import { createMouseGetPosExpectedDataList } from './MouseGetPos.ts';
import { createMouseMoveExpectedDataList } from './MouseMove.ts';
import { createMsgBoxExpectedDataList } from './MsgBox.ts';
import { createOnExitExpectedDataList } from './OnExit.ts';
import { createOutputDebugExpectedDataList } from './OutputDebug.ts';
import { createPauseExpectedDataList } from './Pause.ts';
import { createPixelGetColorExpectedDataList } from './PixelGetColor.ts';
import { createPixelSearchExpectedDataList } from './PixelSearch.ts';
import { createPostMessageExpectedDataList } from './PostMessage.ts';
import { createProcessExpectedDataList } from './Process.ts';
import { createProgressExpectedDataList } from './Progress.ts';
import { createRandomExpectedDataList } from './Random.ts';
import { createRegDeleteExpectedDataList } from './RegDelete.ts';
import { createRegReadExpectedDataList } from './RegRead.ts';
import { createRegWriteExpectedDataList } from './RegWrite.ts';
import { createReloadExpectedDataList } from './Reload.ts';
import { createRunExpectedDataList } from './Run.ts';
import { createRunWaitExpectedDataList } from './RunWait.ts';
import { createSendExpectedDataList } from './Send.ts';
import { createSendEventExpectedDataList } from './SendEvent.ts';
import { createSendInputExpectedDataList } from './SendInput.ts';
import { createSendLevelExpectedDataList } from './SendLevel.ts';
import { createSendMessageExpectedDataList } from './SendMessage.ts';
import { createSendModeExpectedDataList } from './SendMode.ts';
import { createSendPlayExpectedDataList } from './SendPlay.ts';
import { createSendRawExpectedDataList } from './SendRaw.ts';
import { createSetBatchLinesExpectedDataList } from './SetBatchLines.ts';
import { createSetCapsLockStateExpectedDataList } from './SetCapsLockState.ts';
import { createSetControlDelayExpectedDataList } from './SetControlDelay.ts';
import { createSetDefaultMouseSpeedExpectedDataList } from './SetDefaultMouseSpeed.ts';
import { createSetEnvExpectedDataList } from './SetEnv.ts';
import { createSetFormatExpectedDataList } from './SetFormat.ts';
import { createSetKeyDelayExpectedDataList } from './SetKeyDelay.ts';
import { createSetMouseDelayExpectedDataList } from './SetMouseDelay.ts';
import { createSetNumLockStateExpectedDataList } from './SetNumLockState.ts';
import { createSetRegViewExpectedDataList } from './SetRegView.ts';
import { createSetScrollLockStateExpectedDataList } from './SetScrollLockState.ts';
import { createSetStoreCapsLockModeExpectedDataList } from './SetStoreCapsLockMode.ts';
import { createSetTimerExpectedDataList } from './SetTimer.ts';
import { createSetTitleMatchModeExpectedDataList } from './SetTitleMatchMode.ts';
import { createSetWinDelayExpectedDataList } from './SetWinDelay.ts';
import { createSetWorkingDirExpectedDataList } from './SetWorkingDir.ts';
import { createSleepExpectedDataList } from './Sleep.ts';
import { createSortExpectedDataList } from './Sort.ts';
import { createSoundBeepExpectedDataList } from './SoundBeep.ts';
import { createSoundGetExpectedDataList } from './SoundGet.ts';
import { createSoundGetWaveVolumeExpectedDataList } from './SoundGetWaveVolume.ts';
import { createSoundPlayExpectedDataList } from './SoundPlay.ts';
import { createSoundSetExpectedDataList } from './SoundSet.ts';
import { createSoundSetWaveVolumeExpectedDataList } from './SoundSetWaveVolume.ts';
import { createSplashImageExpectedDataList } from './SplashImage.ts';
import { createSplashTextOffExpectedDataList } from './SplashTextOff.ts';
import { createSplashTextOnExpectedDataList } from './SplashTextOn.ts';
import { createSplitPathExpectedDataList } from './SplitPath.ts';
import { createStatusBarGetTextExpectedDataList } from './StatusBarGetText.ts';
import { createStatusBarWaitExpectedDataList } from './StatusBarWait.ts';
import { createStringCaseSenseExpectedDataList } from './StringCaseSense.ts';
import { createStringGetPosExpectedDataList } from './StringGetPos.ts';
import { createStringLeftExpectedDataList } from './StringLeft.ts';
import { createStringLenExpectedDataList } from './StringLen.ts';
import { createStringLowerExpectedDataList } from './StringLower.ts';
import { createStringMidExpectedDataList } from './StringMid.ts';
import { createStringReplaceExpectedDataList } from './StringReplace.ts';
import { createStringRightExpectedDataList } from './StringRight.ts';
import { createStringSplitExpectedDataList } from './StringSplit.ts';
import { createStringTrimLeftExpectedDataList } from './StringTrimLeft.ts';
import { createStringTrimRightExpectedDataList } from './StringTrimRight.ts';
import { createStringUpperExpectedDataList } from './StringUpper.ts';
import { createSysGetExpectedDataList } from './SysGet.ts';
import { createThreadExpectedDataList } from './Thread.ts';
import { createToolTipExpectedDataList } from './ToolTip.ts';
import { createTransformExpectedDataList } from './Transform.ts';
import { createTrayTipExpectedDataList } from './TrayTip.ts';
import { createUrlDownloadToFileExpectedDataList } from './UrlDownloadToFile.ts';
import { createWinActivateExpectedDataList } from './WinActivate.ts';
import { createWinActivateBottomExpectedDataList } from './WinActivateBottom.ts';
import { createWinCloseExpectedDataList } from './WinClose.ts';
import { createWinGetExpectedDataList } from './WinGet.ts';
import { createWinGetActiveStatsExpectedDataList } from './WinGetActiveStats.ts';
import { createWinGetActiveTitleExpectedDataList } from './WinGetActiveTitle.ts';
import { createWinGetClassExpectedDataList } from './WinGetClass.ts';
import { createWinGetPosExpectedDataList } from './WinGetPos.ts';
import { createWinGetTextExpectedDataList } from './WinGetText.ts';
import { createWinGetTitleExpectedDataList } from './WinGetTitle.ts';
import { createWinHideExpectedDataList } from './WinHide.ts';
import { createWinKillExpectedDataList } from './WinKill.ts';
import { createWinMaximizeExpectedDataList } from './WinMaximize.ts';
import { createWinMenuSelectItemExpectedDataList } from './WinMenuSelectItem.ts';
import { createWinMinimizeExpectedDataList } from './WinMinimize.ts';
import { createWinMinimizeAllExpectedDataList } from './WinMinimizeAll.ts';
import { createWinMinimizeAllUndoExpectedDataList } from './WinMinimizeAllUndo.ts';
import { createWinRestoreExpectedDataList } from './WinRestore.ts';
import { createWinSetExpectedDataList } from './WinSet.ts';
import { createWinSetTitleExpectedDataList } from './WinSetTitle.ts';
import { createWinShowExpectedDataList } from './WinShow.ts';
import { createWinWaitExpectedDataList } from './WinWait.ts';
import { createWinWaitActiveExpectedDataList } from './WinWaitActive.ts';
import { createWinWaitCloseExpectedDataList } from './WinWaitClose.ts';
import { createWinWaitNotActiveExpectedDataList } from './WinWaitNotActive.ts';

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
    ...createSleepExpectedDataList(scopeName),
    ...createSortExpectedDataList(scopeName),
    ...createSoundBeepExpectedDataList(scopeName),
    ...createSoundGetExpectedDataList(scopeName),
    ...createSoundGetWaveVolumeExpectedDataList(scopeName),
    ...createSoundPlayExpectedDataList(scopeName),
    ...createSoundSetExpectedDataList(scopeName),
    ...createSoundSetWaveVolumeExpectedDataList(scopeName),
    ...createSplashImageExpectedDataList(scopeName),
    ...createSplashTextOnExpectedDataList(scopeName),
    ...createSplashTextOffExpectedDataList(scopeName),
    ...createSplitPathExpectedDataList(scopeName),
    ...createStatusBarGetTextExpectedDataList(scopeName),
    ...createStatusBarWaitExpectedDataList(scopeName),
    ...createStringCaseSenseExpectedDataList(scopeName),
    ...createStringGetPosExpectedDataList(scopeName),
    ...createStringLeftExpectedDataList(scopeName),
    ...createStringLenExpectedDataList(scopeName),
    ...createStringLowerExpectedDataList(scopeName),
    ...createStringMidExpectedDataList(scopeName),
    ...createStringReplaceExpectedDataList(scopeName),
    ...createStringRightExpectedDataList(scopeName),
    ...createStringSplitExpectedDataList(scopeName),
    ...createStringTrimLeftExpectedDataList(scopeName),
    ...createStringTrimRightExpectedDataList(scopeName),
    ...createStringUpperExpectedDataList(scopeName),
    ...createSysGetExpectedDataList(scopeName),
    ...createThreadExpectedDataList(scopeName),
    ...createToolTipExpectedDataList(scopeName),
    ...createTransformExpectedDataList(scopeName),
    ...createTrayTipExpectedDataList(scopeName),
    ...createUrlDownloadToFileExpectedDataList(scopeName),
    ...createWinActivateExpectedDataList(scopeName),
    ...createWinActivateBottomExpectedDataList(scopeName),
    ...createWinCloseExpectedDataList(scopeName),
    ...createWinGetActiveStatsExpectedDataList(scopeName),
    ...createWinGetActiveTitleExpectedDataList(scopeName),
    ...createWinGetClassExpectedDataList(scopeName),
    ...createWinGetExpectedDataList(scopeName),
    ...createWinGetPosExpectedDataList(scopeName),
    ...createWinGetTextExpectedDataList(scopeName),
    ...createWinGetTitleExpectedDataList(scopeName),
    ...createWinHideExpectedDataList(scopeName),
    ...createWinKillExpectedDataList(scopeName),
    ...createWinMaximizeExpectedDataList(scopeName),
    ...createWinMenuSelectItemExpectedDataList(scopeName),
    ...createWinMinimizeExpectedDataList(scopeName),
    ...createWinMinimizeAllExpectedDataList(scopeName),
    ...createWinMinimizeAllUndoExpectedDataList(scopeName),
    ...createWinRestoreExpectedDataList(scopeName),
    ...createWinSetExpectedDataList(scopeName),
    ...createWinSetTitleExpectedDataList(scopeName),
    ...createWinShowExpectedDataList(scopeName),
    ...createWinWaitExpectedDataList(scopeName),
    ...createWinWaitActiveExpectedDataList(scopeName),
    ...createWinWaitNotActiveExpectedDataList(scopeName),
    ...createWinWaitCloseExpectedDataList(scopeName),
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
