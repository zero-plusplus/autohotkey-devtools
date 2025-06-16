import { dedent } from '@zero-plusplus/utilities/src';
import * as definitions_v2 from '../../../../src/autohotkey2/definitions';
import { quotableEncoding, quotableUnquoted, unquotedAndBoolean, unquotedInteger } from '../../../../src/definition';
import {
  name, RuleDescriptor, RuleName, StyleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createDirectiveStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createDirectiveStatementExpectedData(scopeName, {
      directiveDefinitions: definitions_v2.directiveDefinitions,
    }),

    // directives
    ...((): ExpectedTestData[] => {
      return [
        // https://www.autohotkey.com/docs/v2/lib/_ClipboardTimeout.htm
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                #ClipboardTimeout           ; comment
                #ClipboardTimeout 123       ; comment
              `,
              [
                { text: '#ClipboardTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '#ClipboardTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '123', scopes: name(scopeName, RuleName.Integer) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
          ];
        })(),

        // https://www.autohotkey.com/docs/v2/lib/_DllLoad.htm
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                #DllLoad                              ; comment
              `,
              [
                { text: '#DllLoad', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                #DllLoad "*i path\\to\\file.exe"      ; comment
              `,
              [
                { text: '#DllLoad', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '*i', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: 'path\\to\\file.exe', scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                #DllLoad '*i path\\to\\file.exe'      ; comment
              `,
              [
                { text: '#DllLoad', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: `'`, scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '*i', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: 'path\\to\\file.exe', scopes: name(scopeName, RuleName.UnquotedString) },
                { text: `'`, scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
          ];
        })(),

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
              `,
              [
                { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: 'UTF-8', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                #ErrorStdOut "UTF-8"        ; comment
              `,
              [
                { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
                { text: 'UTF-8', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                #ErrorStdOut 'UTF-8'        ; comment
              `,
              [
                { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: `'`, scopes: name(scopeName, RuleName.UnquotedString) },
                { text: 'UTF-8', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: `'`, scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
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
          ];
        })(),

        // https://www.autohotkey.com/docs/v2/lib/_HotIf.htm
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                #HotIf                                          ; comment
                #HotIf WinActive('ahk_exe xxx.exe')             ; comment
              `,
              [
                { text: '#HotIf', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

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
          ];
        })(),

        // https://www.autohotkey.com/docs/v2/lib/_HotIfTimeout.htm
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                #HotIfTimeout                 ; comment
                #HotIfTimeout 123             ; comment
              `,
              [
                { text: '#HotIfTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '#HotIfTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '123', scopes: name(scopeName, RuleName.Integer) },
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
            [
              dedent`
                #Hotstring B0 C1            ; comment
              `,
              [
                { text: '#Hotstring', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: 'B0', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: 'C1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
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
                ${directive} %A_ScriptDir%\\lib\\example.ahk              ; comment
                ${directive} "%A_ScriptDir%\\lib\\example.ahk"            ; comment
              `,
              [
                { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
                { text: 'A_ScriptDir', scopes: name(scopeName, RuleName.BuiltInVariable) },
                { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
                { text: '\\lib\\example.ahk', scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
                { text: 'A_ScriptDir', scopes: name(scopeName, RuleName.BuiltInVariable) },
                { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
                { text: '\\lib\\example.ahk', scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
            [
              dedent`
                ${directive} <lib>                      ; comment
                ${directive} <lib\\example>             ; comment
              `,
              [
                { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '<', scopes: name(scopeName, RuleName.OpenAngleBracket) },
                { text: 'lib', scopes: name(scopeName, RuleName.IncludeLibrary) },
                { text: '>', scopes: name(scopeName, RuleName.CloseAngleBracket) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '<', scopes: name(scopeName, RuleName.OpenAngleBracket) },
                { text: 'lib\\example', scopes: name(scopeName, RuleName.IncludeLibrary) },
                { text: '>', scopes: name(scopeName, RuleName.CloseAngleBracket) },
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
                #InputLevel 50            ; comment
              `,
              [
                { text: '#InputLevel', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '#InputLevel', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '50', scopes: name(scopeName, RuleName.Integer) },
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
                #MaxThreads 255             ; comment
              `,
              [
                { text: '#MaxThreads', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '#MaxThreads', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '255', scopes: name(scopeName, RuleName.Integer) },
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
                #MaxThreadsBuffer true          ; comment
                #MaxThreadsBuffer false         ; comment
                #MaxThreadsBuffer 1             ; comment
                #MaxThreadsBuffer 0             ; comment

                #MaxThreadsBuffer abc           ; comment
                #MaxThreadsBuffer 9             ; comment
              `,
              [
                { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: 'false', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '1', scopes: name(scopeName, RuleName.Integer) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '0', scopes: name(scopeName, RuleName.Integer) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: 'abc', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '9', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
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
                #MaxThreadsPerHotkey 255            ; comment
              `,
              [
                { text: '#MaxThreadsPerHotkey', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

                { text: '#MaxThreadsPerHotkey', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '255', scopes: name(scopeName, RuleName.Integer) },
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
                #NoTrayIcon invalid             ; comment
              `,
              [
                { text: '#NoTrayIcon', scopes: name(scopeName, RuleName.DirectiveName) },
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
          ];
        })(),

        // https://www.autohotkey.com/docs/v2/lib/_SuspendExempt.htm
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                #SuspendExempt              ; comment
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
                #SuspendExempt invalid          ; comment
              `,
              [
                { text: '#SuspendExempt', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
                { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
              ],
            ],
          ];
        })(),
      ];
    })(),

    // param
    ...((): ExpectedTestData[] => {
      unquotedInteger;

      return [
        [
          dedent`
            #ClipboardTimeout             ; comment
            #ClipboardTimeout 123        ; comment
            #ClipboardTimeout invalid    ; comment
          `,
          [
            { text: '#ClipboardTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#ClipboardTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#ClipboardTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    ...((): ExpectedTestData[] => {
      quotableUnquoted;

      return [
        [
          dedent`
            #DllLoad "abc"        ; comment
          `,
          [
            { text: '#DllLoad', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: 'abc', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    ...((): ExpectedTestData[] => {
      quotableEncoding;

      return [
        [
          dedent`
            #ErrorStdOut UTF-8        ; comment
            #ErrorStdOut "UTF-8"      ; comment
            #ErrorStdOut "CP65001"    ; comment
          `,
          [
            { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'UTF-8', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: 'UTF-8', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: 'CP65001', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),
    ...((): ExpectedTestData[] => {
      unquotedAndBoolean;

      return [
        [
          dedent`
            #MaxThreadsBuffer true          ; comment
            #MaxThreadsBuffer false         ; comment
            #MaxThreadsBuffer 1             ; comment
            #MaxThreadsBuffer 0             ; comment

            #MaxThreadsBuffer abc           ; comment
            #MaxThreadsBuffer 9             ; comment
          `,
          [
            { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'false', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '0', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'abc', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '9', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
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
