import {
  dedent,
  hasFlag,
} from '@zero-plusplus/utilities/src';
import * as definitions_v1 from '../../../../../src/autohotkeyl/definitions';
import {
  $flagedGuiControlOptions,
  $guiControlOptions,
  $guiOptions,
  $rest,
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

export function createCommandStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // command names
    ...((): ExpectedTestData[] => {
      return definitions_v1.commandDefinitions.flatMap((definition): ExpectedTestData[] => {
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

    // https://www.autohotkey.com/docs/v1/lib/SetTimer.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            SetTimer, , 100         ; comment
            SetTimer, , -100        ; comment
            SetTimer, , on          ; comment
            SetTimer, , off         ; comment
            SetTimer, , delete      ; comment
            SetTimer, , %var%       ; comment
            SetTimer, , -%var%      ; comment
          `,
          [
            ...[
              { text: 'SetTimer', scopes: name(scopeName, RuleName.CommandName) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: '100', scopes: name(scopeName, RuleName.Integer) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: 'SetTimer', scopes: name(scopeName, RuleName.CommandName) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: '-', scopes: name(scopeName, RuleName.Operator) },
              { text: '100', scopes: name(scopeName, RuleName.Integer) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: 'SetTimer', scopes: name(scopeName, RuleName.CommandName) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: 'on', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: 'SetTimer', scopes: name(scopeName, RuleName.CommandName) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: 'off', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: 'SetTimer', scopes: name(scopeName, RuleName.CommandName) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: 'delete', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: 'SetTimer', scopes: name(scopeName, RuleName.CommandName) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
              { text: 'var', scopes: name(scopeName, RuleName.Variable) },
              { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: 'SetTimer', scopes: name(scopeName, RuleName.CommandName) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: '-', scopes: name(scopeName, RuleName.Operator) },
              { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
              { text: 'var', scopes: name(scopeName, RuleName.Variable) },
              { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ],
        ],
      ];
    })(),
    // #endregion commands

    // signatures
    ...((_ = $rest): ExpectedTestData[] => {
      return [
        [
          dedent`
            Gui, Cancel, a, b, c      ; comment
            Gui, Cancel, % a, b, c    ; comment
          `,
          [
            { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'Cancel', scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'a', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'b', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'c', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'Cancel', scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
            { text: 'a', scopes: name(scopeName, RuleName.Variable) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'b', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'c', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    ...((_ = $guiOptions): ExpectedTestData[] => {
      return [
        [
          dedent`
            Gui, GuiName:New, +AlwaysOnTop Delimiter\`,   ; comment
            Gui, GuiName: +AlwaysOnTop Delimiter,         ; comment
          `,
          [
            { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'GuiName', scopes: name(scopeName, RuleName.LabelName) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: 'New', scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '+AlwaysOnTop', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'Delimiter`,', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'GuiName', scopes: name(scopeName, RuleName.LabelName) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '+AlwaysOnTop', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'Delimiter,', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    ...((_ = $guiControlOptions, __ = $flagedGuiControlOptions): ExpectedTestData[] => {
      return [
        [
          dedent`
            Gui, Add, ActiveX, X+M            ; comment
            GuiControl, +X+M                  ; comment
            GuiControl, GuiName:+X+M          ; comment
          `,
          [
            { text: 'Gui', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'Add', scopes: name(scopeName, RuleName.SubCommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'ActiveX', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'X+M', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'GuiControl', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '+X+M', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'GuiControl', scopes: name(scopeName, RuleName.CommandName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'GuiName', scopes: name(scopeName, RuleName.LabelName) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '+X+M', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),
    // #endregion highlight types

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
