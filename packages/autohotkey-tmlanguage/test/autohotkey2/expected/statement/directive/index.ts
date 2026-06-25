import { dedent } from '@zero-plusplus/utilities/src/index.ts';
import {
  name,
  RuleName,
  StyleName,
  type ScopeName,
} from '../../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../../types.ts';
import { createClipboardTimeoutExpectedDataList } from './_ClipboardTimeout.ts';
import { createDllLoadExpectedDataList } from './_DllLoad.ts';
import { createErrorStdOutExpectedDataList } from './_ErrorStdOut.ts';
import { createHotIfExpectedDataList } from './_HotIf.ts';
import { createHotIfTimeoutExpectedDataList } from './_HotIfTimeout.ts';
import { createHotstringExpectedDataList } from './_Hotstring.ts';
import { createIncludeExpectedDataList } from './_Include.ts';
import { createInputLevelExpectedDataList } from './_InputLevel.ts';
import { createMaxThreadsExpectedDataList } from './_MaxThreads.ts';
import { createMaxThreadsBufferExpectedDataList } from './_MaxThreadsBuffer.ts';
import { createMaxThreadsPerHotkeyExpectedDataList } from './_MaxThreadsPerHotkey.ts';
import { createNoTrayIconExpectedDataList } from './_NoTrayIcon.ts';
import { createRequiresExpectedDataList } from './_Requires.ts';
import { createSingleInstanceExpectedDataList } from './_SingleInstance.ts';
import { createSuspendExemptExpectedDataList } from './_SuspendExempt.ts';
import { createUseHookExpectedDataList } from './_UseHook.ts';
import { createWarnExpectedDataList } from './_Warn.ts';
import { createWinActivateForceExpectedDataList } from './_WinActivateForce.ts';

export function createDirectiveStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // #region directives
    ...createClipboardTimeoutExpectedDataList(scopeName),
    ...createDllLoadExpectedDataList(scopeName),
    ...createErrorStdOutExpectedDataList(scopeName),
    ...createHotIfExpectedDataList(scopeName),
    ...createHotIfTimeoutExpectedDataList(scopeName),
    ...createHotstringExpectedDataList(scopeName),
    ...createIncludeExpectedDataList(scopeName),
    ...createInputLevelExpectedDataList(scopeName),
    ...createMaxThreadsExpectedDataList(scopeName),
    ...createMaxThreadsBufferExpectedDataList(scopeName),
    ...createMaxThreadsPerHotkeyExpectedDataList(scopeName),
    ...createNoTrayIconExpectedDataList(scopeName),
    ...createRequiresExpectedDataList(scopeName),
    ...createSingleInstanceExpectedDataList(scopeName),
    ...createSuspendExemptExpectedDataList(scopeName),
    ...createUseHookExpectedDataList(scopeName),
    ...createWarnExpectedDataList(scopeName),
    ...createWinActivateForceExpectedDataList(scopeName),
    // #endregion directives

    // Example of highlighting invalid directive syntax
    [
      dedent`
        #ClipboardTimeout,        ; comment

        # invalid                 ; comment

        #NotDirective invalid     ; comment
      `,
      [
        { text: '#ClipboardTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '#', scopes: name(scopeName, RuleName.DirectiveName) },
        { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '#NotDirective', scopes: name(scopeName, RuleName.DirectiveName) },
        { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}
