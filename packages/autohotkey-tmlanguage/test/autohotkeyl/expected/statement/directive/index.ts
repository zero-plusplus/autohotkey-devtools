import { dedent } from '@zero-plusplus/utilities/src';
import {
  name,
  RuleName,
  StyleName,
  type ScopeName,
} from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';
import { createAllowSameLineCommentsExpectedDataList } from './#AllowSameLineComments';
import { createClipboardTimeoutExpectedDataList } from './#ClipboardTimeout';
import { createCommentFlagExpectedDataList } from './#CommentFlag';
import { createDelimiterExpectedDataList } from './#Delimiter';
import { createDerefCharExpectedDataList } from './#DerefChar';
import { createErrorStdOutExpectedDataList } from './#ErrorStdOut';
import { createEscapeCharExpectedDataList } from './#EscapeChar';
import { createHotkeyIntervalExpectedDataList } from './#HotkeyInterval';
import { createHotkeyModifierTimeoutExpectedDataList } from './#HotkeyModifierTimeout';
import { createHotstringExpectedDataList } from './#Hotstring';
import { createIfExpectedDataList } from './#If';
import { createIfTimeoutExpectedDataList } from './#IfTimeout';
import { createIfWinActiveExpectedDataList } from './#IfWinActive';
import { createIncludeExpectedDataList } from './#Include';
import { createInputLevelExpectedDataList } from './#InputLevel';
import { createInstallKeybdHookExpectedDataList } from './#InstallKeybdHook';
import { createInstallMouseHookExpectedDataList } from './#InstallMouseHook';
import { createKeyHistoryExpectedDataList } from './#KeyHistory';
import { createLTrimExpectedDataList } from './#LTrim';
import { createMaxHotkeysPerIntervalExpectedDataList } from './#MaxHotkeysPerInterval';
import { createMaxMemExpectedDataList } from './#MaxMem';
import { createMaxThreadsExpectedDataList } from './#MaxThreads';
import { createMaxThreadsBufferExpectedDataList } from './#MaxThreadsBuffer';
import { createMaxThreadsPerHotkeyExpectedDataList } from './#MaxThreadsPerHotkey';
import { createMenuMaskKeyExpectedDataList } from './#MenuMaskKey';
import { createNoEnvExpectedDataList } from './#NoEnv';
import { createNoTrayIconExpectedDataList } from './#NoTrayIcon';
import { createPersistentExpectedDataList } from './#Persistent';
import { createRequiresExpectedDataList } from './#Requires';
import { createSingleInstanceExpectedDataList } from './#SingleInstance';
import { createUseHookBufferExpectedDataList } from './#UseHook';
import { createWarnExpectedDataList } from './#Warn';
import { createWinActivateForceExpectedDataList } from './#WinActivateForce';

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
