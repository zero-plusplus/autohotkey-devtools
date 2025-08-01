import { dedent } from '@zero-plusplus/utilities/src';
import {
  name,
  RuleDescriptor,
  RuleName,
  StyleName,
  type ScopeName,
} from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';
import { createClipboardTimeoutExpectedDataList } from './#ClipboardTimeout';
import { createDllLoadExpectedDataList } from './#DllLoad';
import { createErrorStdOutExpectedDataList } from './#ErrorStdOut';
import { createHotIfExpectedDataList } from './#HotIf';

export function createDirectiveStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // #region directives
    ...createClipboardTimeoutExpectedDataList(scopeName),
    ...createDllLoadExpectedDataList(scopeName),
    ...createErrorStdOutExpectedDataList(scopeName),
    ...createHotIfExpectedDataList(scopeName),
    // #endregion directives

    // https://www.autohotkey.com/docs/v2/lib/_ErrorStdOut.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #ErrorStdOut                ; comment
          `,
          [
            { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #ErrorStdOut UTF-8          ; comment
            #ErrorStdOut "UTF-8"        ; comment
            #ErrorStdOut 'UTF-8'        ; comment
          `,
          [
            ...[
              { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
              { text: 'UTF-8', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
              { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
              { text: 'UTF-8', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
              { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
              { text: `'`, scopes: name(scopeName, RuleName.UnquotedString) },
              { text: 'UTF-8', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
              { text: `'`, scopes: name(scopeName, RuleName.UnquotedString) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ],
        ],
        [
          dedent`
            #ErrorStdOut XXX            ; comment
          `,
          [
            { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'XXX', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #ErrorStdOut,               ; comment
          `,
          [
            { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v2/lib/_HotIf.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #HotIf                                          ; comment
          `,
          [
            { text: '#HotIf', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #HotIf WinActive('ahk_exe xxx.exe')             ; comment
          `,
          [
            { text: '#HotIf', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'WinActive', scopes: name(scopeName, RuleName.FunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: `'`, scopes: name(scopeName, RuleName.SingleString, RuleDescriptor.Begin) },
            { text: `ahk_exe xxx.exe`, scopes: name(scopeName, RuleName.SingleString) },
            { text: `'`, scopes: name(scopeName, RuleName.SingleString, RuleDescriptor.End) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #HotIf,                       ; comment
          `,
          [
            { text: '#HotIf', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v2/lib/_HotIfTimeout.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #HotIfTimeout                 ; comment
          `,
          [
            { text: '#HotIfTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #HotIfTimeout 123             ; comment
          `,
          [
            { text: '#HotIfTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #HotIfTimeout,                ; comment
          `,
          [
            { text: '#HotIfTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v2/lib/_Hotstring.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #Hotstring                    ; comment
          `,
          [
            { text: '#Hotstring', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #Hotstring NoMouse              ; comment
            #Hotstring EndChars ,\`t        ; comment
            #Hotstring B0 C1                ; comment
          `,
          [
            ...[
              { text: '#Hotstring', scopes: name(scopeName, RuleName.DirectiveName) },
              { text: 'NoMouse', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: '#Hotstring', scopes: name(scopeName, RuleName.DirectiveName) },
              { text: 'EndChars', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
              { text: ',', scopes: name(scopeName, RuleName.UnquotedString) },
              { text: '`t', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Escape) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: '#Hotstring', scopes: name(scopeName, RuleName.DirectiveName) },
              { text: 'B0', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
              { text: 'C1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ],
        ],
        [
          dedent`
            #Hotstring,                   ; comment
          `,
          [
            { text: '#Hotstring', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v2/lib/_Include.htm
    ...[ '#Include', '#IncludeAgain' ].flatMap((directive): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${directive}                                              ; comment
          `,
          [
            { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${directive} %A_ScriptDir%\\lib\\example.ahk              ; comment
            ${directive} "%A_ScriptDir%\\lib\\example.ahk"            ; comment
            ${directive} '%A_ScriptDir%\\lib\\example.ahk'            ; comment
          `,
          [
            ...[
              { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
              { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
              { text: 'A_ScriptDir', scopes: name(scopeName, RuleName.BuiltInVariable) },
              { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
              { text: '\\lib\\example.ahk', scopes: name(scopeName, RuleName.UnquotedString) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
              { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
              { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
              { text: 'A_ScriptDir', scopes: name(scopeName, RuleName.BuiltInVariable) },
              { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
              { text: '\\lib\\example.ahk', scopes: name(scopeName, RuleName.UnquotedString) },
              { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
              { text: `'`, scopes: name(scopeName, RuleName.UnquotedString) },
              { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
              { text: 'A_ScriptDir', scopes: name(scopeName, RuleName.BuiltInVariable) },
              { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
              { text: '\\lib\\example.ahk', scopes: name(scopeName, RuleName.UnquotedString) },
              { text: `'`, scopes: name(scopeName, RuleName.UnquotedString) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ],
        ],
        [
          dedent`
            ${directive} <lib>                      ; comment
            ${directive} <lib\\example>             ; comment
          `,
          [
            ...[
              { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
              { text: '<', scopes: name(scopeName, RuleName.OpenAngleBracket) },
              { text: 'lib', scopes: name(scopeName, RuleName.IncludeLibrary) },
              { text: '>', scopes: name(scopeName, RuleName.CloseAngleBracket) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
              { text: '<', scopes: name(scopeName, RuleName.OpenAngleBracket) },
              { text: 'lib\\example', scopes: name(scopeName, RuleName.IncludeLibrary) },
              { text: '>', scopes: name(scopeName, RuleName.CloseAngleBracket) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ],
        ],
        [
          dedent`
            ${directive},                           ; comment
          `,
          [
            { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    }),

    // https://www.autohotkey.com/docs/v2/lib/_InputLevel.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #InputLevel               ; comment
          `,
          [
            { text: '#InputLevel', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #InputLevel 50            ; comment
          `,
          [
            { text: '#InputLevel', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '50', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #InputLevel,              ; comment
          `,
          [
            { text: '#InputLevel', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v2/lib/_MaxThreads.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #MaxThreads                 ; comment
          `,
          [
            { text: '#MaxThreads', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #MaxThreads 255             ; comment
          `,
          [
            { text: '#MaxThreads', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '255', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #MaxThreads,                ; comment
          `,
          [
            { text: '#MaxThreads', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v2/lib/_MaxThreadsBuffer.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #MaxThreadsBuffer               ; comment
          `,
          [
            { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #MaxThreadsBuffer true          ; comment
            #MaxThreadsBuffer false         ; comment
            #MaxThreadsBuffer 1             ; comment
            #MaxThreadsBuffer 0             ; comment
          `,
          [
            ...[
              { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
              { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
              { text: 'false', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
              { text: '1', scopes: name(scopeName, RuleName.Integer) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
              { text: '0', scopes: name(scopeName, RuleName.Integer) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ],
        ],
        [
          dedent`
            #MaxThreadsBuffer,              ; comment
            #MaxThreadsBuffer abc           ; comment
            #MaxThreadsBuffer 9             ; comment
          `,
          [
            ...[
              { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
              { text: ',', scopes: name(scopeName, RuleName.Comma, StyleName.Invalid) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
            ...[
              { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
              { text: 'abc', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],

            ...[
              { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
              { text: '9', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v2/lib/_MaxThreadsPerHotkey.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #MaxThreadsPerHotkey                ; comment
          `,
          [
            { text: '#MaxThreadsPerHotkey', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #MaxThreadsPerHotkey 255            ; comment
          `,
          [
            { text: '#MaxThreadsPerHotkey', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '255', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #MaxThreadsPerHotkey,               ; comment
          `,
          [
            { text: '#MaxThreadsPerHotkey', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v2/lib/_NoTrayIcon.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #NoTrayIcon                     ; comment
          `,
          [
            { text: '#NoTrayIcon', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #NoTrayIcon,                    ; comment
            #NoTrayIcon invalid             ; comment
          `,
          [
            { text: '#NoTrayIcon', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#NoTrayIcon', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v2/lib/_SingleInstance.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #SingleInstance             ; comment
          `,
          [
            { text: '#SingleInstance', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #SingleInstance Force       ; comment
            #SingleInstance Ignore      ; comment
            #SingleInstance Prompt      ; comment
            #SingleInstance Off         ; comment
          `,
          [
            { text: '#SingleInstance', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'Force', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#SingleInstance', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'Ignore', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#SingleInstance', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'Prompt', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#SingleInstance', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'Off', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #SingleInstance,            ; comment
          `,
          [
            { text: '#SingleInstance', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v2/lib/_SuspendExempt.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #SuspendExempt                ; comment
          `,
          [
            { text: '#SuspendExempt', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #SuspendExempt true           ; comment
            #SuspendExempt false          ; comment
            #SuspendExempt 0              ; comment
            #SuspendExempt 1              ; comment
          `,
          [
            { text: '#SuspendExempt', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#SuspendExempt', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'false', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#SuspendExempt', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '0', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#SuspendExempt', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #SuspendExempt,               ; comment
            #SuspendExempt invalid        ; comment
          `,
          [
            { text: '#SuspendExempt', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#SuspendExempt', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v2/lib/_UseHook.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #UseHook                ; comment
          `,
          [
            { text: '#UseHook', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #UseHook true           ; comment
            #UseHook false          ; comment
            #UseHook 0              ; comment
            #UseHook 1              ; comment
          `,
          [
            { text: '#UseHook', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#UseHook', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'false', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#UseHook', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '0', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#UseHook', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #UseHook,               ; comment
            #UseHook invalid        ; comment
          `,
          [
            { text: '#UseHook', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#UseHook', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v2/lib/_Warn.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #Warn         ; comment
          `,
          [
            { text: '#Warn', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                #Warn VarUnset                  ; comment
                #Warn LocalSameAsGlobal         ; comment
                #Warn Unreachable               ; comment
                #Warn All                       ; comment
              `,
              [
                ...[
                  { text: '#Warn', scopes: name(scopeName, RuleName.DirectiveName) },
                  { text: 'VarUnset', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                ],

                ...[
                  { text: '#Warn', scopes: name(scopeName, RuleName.DirectiveName) },
                  { text: 'LocalSameAsGlobal', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                ],

                ...[
                  { text: '#Warn', scopes: name(scopeName, RuleName.DirectiveName) },
                  { text: 'Unreachable', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                ],

                ...[
                  { text: '#Warn', scopes: name(scopeName, RuleName.DirectiveName) },
                  { text: 'All', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                ],
              ],
            ],
            [
              dedent`
                #Warn,                          ; comment
                #Warn invalid                   ; comment
              `,
              [
                ...[
                  { text: '#Warn', scopes: name(scopeName, RuleName.DirectiveName) },
                  { text: ',', scopes: name(scopeName, RuleName.Comma, StyleName.Invalid) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                ],

                ...[
                  { text: '#Warn', scopes: name(scopeName, RuleName.DirectiveName) },
                  { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                ],
              ],
            ],
          ];
        })(),

        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                #Warn ,                       ; comment
                #Warn , MsgBox                ; comment
                #Warn , StdOut                ; comment
                #Warn , OutputDebug           ; comment
                #Warn , Off                   ; comment
                #Warn , invalid               ; comment
              `,
              [
                ...[
                  { text: '#Warn', scopes: name(scopeName, RuleName.DirectiveName) },
                  { text: ',', scopes: name(scopeName, RuleName.Comma) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                ],

                ...[
                  { text: '#Warn', scopes: name(scopeName, RuleName.DirectiveName) },
                  { text: ',', scopes: name(scopeName, RuleName.Comma) },
                  { text: 'MsgBox', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                ],

                ...[
                  { text: '#Warn', scopes: name(scopeName, RuleName.DirectiveName) },
                  { text: ',', scopes: name(scopeName, RuleName.Comma) },
                  { text: 'StdOut', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                ],

                ...[
                  { text: '#Warn', scopes: name(scopeName, RuleName.DirectiveName) },
                  { text: ',', scopes: name(scopeName, RuleName.Comma) },
                  { text: 'OutputDebug', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                ],

                ...[
                  { text: '#Warn', scopes: name(scopeName, RuleName.DirectiveName) },
                  { text: ',', scopes: name(scopeName, RuleName.Comma) },
                  { text: 'Off', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                ],

                ...[
                  { text: '#Warn', scopes: name(scopeName, RuleName.DirectiveName) },
                  { text: ',', scopes: name(scopeName, RuleName.Comma) },
                  { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
                ],
              ],
            ],
          ];
        })(),
      ];
    })(),

    // https://www.autohotkey.com/docs/v2/lib/_WinActivateForce.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #WinActivateForce               ; comment
          `,
          [
            { text: '#WinActivateForce', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #WinActivateForce,              ; comment
            #WinActivateForce invalid       ; comment
          `,
          [
            { text: '#WinActivateForce', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#WinActivateForce', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

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
