import { dedent } from '@zero-plusplus/utilities/src';
import {
  name,
  RuleName,
  StyleName,
  type ScopeName,
} from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';
import { createClipboardTimeoutExpectedDataList } from './#ClipboardTimeout';
import { createDllLoadExpectedDataList } from './#DllLoad';
import { createErrorStdOutExpectedDataList } from './#ErrorStdOut';
import { createHotIfExpectedDataList } from './#HotIf';
import { createHotIfTimeoutExpectedDataList } from './#HotIfTimeout';
import { createHotstringExpectedDataList } from './#Hotstring';
import { createIncludeExpectedDataList } from './#Include';
import { createInputLevelExpectedDataList } from './#InputLevel';
import { createMaxThreadsExpectedDataList } from './#MaxThreads';
import { createMaxThreadsBufferExpectedDataList } from './#MaxThreadsBuffer';
import { createMaxThreadsPerHotkeyExpectedDataList } from './#MaxThreadsPerHotkey';
import { createNoTrayIconExpectedDataList } from './#NoTrayIcon';
import { createRequiresExpectedDataList } from './#Requires';
import { createSingleInstanceExpectedDataList } from './#SingleInstance';
import { createSuspendExemptExpectedDataList } from './#SuspendExempt';
import { createUseHookExpectedDataList } from './#UseHook';
import { createWarnExpectedDataList } from './#Warn';
import { createWinActivateForceExpectedDataList } from './#WinActivateForce';

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
