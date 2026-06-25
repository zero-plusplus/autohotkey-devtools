import { dedent } from '@zero-plusplus/utilities/src/index.ts';
import {
  name,
  RuleName,
  StyleName,
  type ScopeName,
} from '../../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../../types.ts';
import { createAllowSameLineCommentsExpectedDataList } from './_AllowSameLineComments.ts';
import { createClipboardTimeoutExpectedDataList } from './_ClipboardTimeout.ts';
import { createCommentFlagExpectedDataList } from './_CommentFlag.ts';
import { createDelimiterExpectedDataList } from './_Delimiter.ts';
import { createDerefCharExpectedDataList } from './_DerefChar.ts';
import { createErrorStdOutExpectedDataList } from './_ErrorStdOut.ts';
import { createEscapeCharExpectedDataList } from './_EscapeChar.ts';
import { createHotkeyIntervalExpectedDataList } from './_HotkeyInterval.ts';
import { createHotkeyModifierTimeoutExpectedDataList } from './_HotkeyModifierTimeout.ts';
import { createHotstringExpectedDataList } from './_Hotstring.ts';
import { createIfExpectedDataList } from './_If.ts';
import { createIfTimeoutExpectedDataList } from './_IfTimeout.ts';
import { createIfWinActiveExpectedDataList } from './_IfWinActive.ts';
import { createIncludeExpectedDataList } from './_Include.ts';
import { createInputLevelExpectedDataList } from './_InputLevel.ts';
import { createInstallKeybdHookExpectedDataList } from './_InstallKeybdHook.ts';
import { createInstallMouseHookExpectedDataList } from './_InstallMouseHook.ts';
import { createKeyHistoryExpectedDataList } from './_KeyHistory.ts';
import { createLTrimExpectedDataList } from './_LTrim.ts';
import { createMaxHotkeysPerIntervalExpectedDataList } from './_MaxHotkeysPerInterval.ts';
import { createMaxMemExpectedDataList } from './_MaxMem.ts';
import { createMaxThreadsExpectedDataList } from './_MaxThreads.ts';
import { createMaxThreadsBufferExpectedDataList } from './_MaxThreadsBuffer.ts';
import { createMaxThreadsPerHotkeyExpectedDataList } from './_MaxThreadsPerHotkey.ts';
import { createMenuMaskKeyExpectedDataList } from './_MenuMaskKey.ts';
import { createNoEnvExpectedDataList } from './_NoEnv.ts';
import { createNoTrayIconExpectedDataList } from './_NoTrayIcon.ts';
import { createPersistentExpectedDataList } from './_Persistent.ts';
import { createRequiresExpectedDataList } from './_Requires.ts';
import { createSingleInstanceExpectedDataList } from './_SingleInstance.ts';
import { createUseHookBufferExpectedDataList } from './_UseHook.ts';
import { createWarnExpectedDataList } from './_Warn.ts';
import { createWinActivateForceExpectedDataList } from './_WinActivateForce.ts';

export function createDirectiveStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // #region commands
    ...createAllowSameLineCommentsExpectedDataList(scopeName),
    ...createClipboardTimeoutExpectedDataList(scopeName),
    ...createCommentFlagExpectedDataList(scopeName),
    ...createDelimiterExpectedDataList(scopeName),
    ...createDerefCharExpectedDataList(scopeName),
    ...createErrorStdOutExpectedDataList(scopeName),
    ...createEscapeCharExpectedDataList(scopeName),
    ...createHotkeyIntervalExpectedDataList(scopeName),
    ...createHotkeyModifierTimeoutExpectedDataList(scopeName),
    ...createHotstringExpectedDataList(scopeName),
    ...createIfExpectedDataList(scopeName),
    ...createIfTimeoutExpectedDataList(scopeName),
    ...createIfWinActiveExpectedDataList(scopeName),
    ...createIncludeExpectedDataList(scopeName),
    ...createInputLevelExpectedDataList(scopeName),
    ...createInstallKeybdHookExpectedDataList(scopeName),
    ...createInstallMouseHookExpectedDataList(scopeName),
    ...createKeyHistoryExpectedDataList(scopeName),
    ...createLTrimExpectedDataList(scopeName),
    ...createMaxHotkeysPerIntervalExpectedDataList(scopeName),
    ...createMaxMemExpectedDataList(scopeName),
    ...createMaxThreadsExpectedDataList(scopeName),
    ...createMaxThreadsBufferExpectedDataList(scopeName),
    ...createMaxThreadsPerHotkeyExpectedDataList(scopeName),
    ...createMenuMaskKeyExpectedDataList(scopeName),
    ...createNoEnvExpectedDataList(scopeName),
    ...createNoTrayIconExpectedDataList(scopeName),
    ...createPersistentExpectedDataList(scopeName),
    ...createRequiresExpectedDataList(scopeName),
    ...createSingleInstanceExpectedDataList(scopeName),
    ...createUseHookBufferExpectedDataList(scopeName),
    ...createWarnExpectedDataList(scopeName),
    ...createWinActivateForceExpectedDataList(scopeName),
    // #endregion commands

    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #Hotstring NoMouse            ; comment
          `,
          [
            { text: '#Hotstring', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'NoMouse', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #Hotstring EndChars ,\`t            ; comment
          `,
          [
            { text: '#Hotstring', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'EndChars', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: ',', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '`t', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Escape) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // Directives are not treated as expression
    [
      dedent`
        #ErrorStdOut += var              ; comment

        #NotDirective += var             ; comment
      `,
      [
        { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
        { text: '+=', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: 'var', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '#NotDirective', scopes: name(scopeName, RuleName.Variable) },
        { text: '+=', scopes: name(scopeName, RuleName.Operator) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],

    // (Fixed) Parenthesized expression containing directive names do not highlight subsequent statement correctly
    [
      dedent`
        (#Requires )                          ; comment
        local var := 1                        ; comment
      `,
      [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '#Requires', scopes: name(scopeName, RuleName.Variable) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'local', scopes: name(scopeName, RuleName.Modifier) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '1', scopes: name(scopeName, RuleName.Integer) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}
