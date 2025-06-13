import { dedent } from '@zero-plusplus/utilities/src';
import * as definitions_v2 from '../../../../src/autohotkey2/definitions';
import { quotableUnquoted, unquotedAndBoolean, unquotedInteger } from '../../../../src/definition';
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
                #ClipboardTimeout 123       ; comment
              `,
              [
                { text: '#ClipboardTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '123', scopes: name(scopeName, RuleName.Integer) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
          ];
        })(),

        // https://www.autohotkey.com/docs/v2/lib/_DllLoad.htm
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                #DllLoad "*i path\\to\\file.exe"       ; comment
              `,
              [
                { text: '#DllLoad', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '*i', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: 'path\\to\\file.exe', scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                #DllLoad '*i path\\to\\file.exe'       ; comment
              `,
              [
                { text: '#DllLoad', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: `'`, scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '*i', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: 'path\\to\\file.exe', scopes: name(scopeName, RuleName.UnquotedString) },
                { text: `'`, scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
          ];
        })(),

        // https://www.autohotkey.com/docs/v2/lib/_ErrorStdOut.htm
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                #ErrorStdOut UTF-8          ; comment
              `,
              [
                { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: 'UTF-8', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
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
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
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
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                #ErrorStdOut XXX            ; comment
              `,
              [
                { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: 'XXX', scopes: name(scopeName, RuleName.UnquotedString) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
          ];
        })(),

        // https://www.autohotkey.com/docs/v2/lib/_HotIf.htm
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                #HotIf WinActive('ahk_exe xxx.exe')            ; comment
              `,
              [
                { text: '#HotIf', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: 'WinActive', scopes: name(scopeName, RuleName.FunctionName) },
                { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
                { text: `'`, scopes: name(scopeName, RuleName.SingleString, RuleDescriptor.Begin) },
                { text: `ahk_exe xxx.exe`, scopes: name(scopeName, RuleName.SingleString) },
                { text: `'`, scopes: name(scopeName, RuleName.SingleString, RuleDescriptor.End) },
                { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
          ];
        })(),

        // https://www.autohotkey.com/docs/v2/lib/_HotIfTimeout.htm
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                #HotIfTimeout 123            ; comment
              `,
              [
                { text: '#HotIfTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: '123', scopes: name(scopeName, RuleName.Integer) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
          ];
        })(),

        // https://www.autohotkey.com/docs/v2/lib/_Hotstring.htm
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                #Hotstring NoMouse            ; comment
              `,
              [
                { text: '#Hotstring', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: 'NoMouse', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
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
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
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
            #ClipboardTimeout, 123        ; comment
            #ClipboardTimeout, invalid    ; comment
          `,
          [
            { text: '#ClipboardTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '#ClipboardTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '#ClipboardTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
      ];
    })(),
    ...((): ExpectedTestData[] => {
      quotableUnquoted;

      return [
        [
          dedent`
            #ErrorStdOut, UTF-8     ; comment
            #ErrorStdOut, "UTF-8"   ; comment
          `,
          [
            { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'UTF-8', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: 'UTF-8', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
          ],
        ],
      ];
    })(),
    ...((): ExpectedTestData[] => {
      unquotedAndBoolean;

      return [
        [
          dedent`
            #MaxThreadsBuffer, 1      ; comment
            #MaxThreadsBuffer, 0      ; comment

            #MaxThreadsBuffer, true   ; comment
            #MaxThreadsBuffer, false  ; comment
          `,
          [
            ...[ '1', '0', 'true', 'false' ].flatMap((value) => {
              return [
                { text: '#MaxThreadsBuffer', scopes: name(scopeName, RuleName.DirectiveName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: value, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ];
            }),
          ],
        ],
      ];
    })(),

    // Example of highlighting invalid directive syntax
    [
      dedent`
        # invalid                 ; comment

        #NotDirective invalid     ; comment
      `,
      [
        { text: '#', scopes: name(scopeName, RuleName.DirectiveName) },
        { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '#NotDirective', scopes: name(scopeName, RuleName.DirectiveName) },
        { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}
