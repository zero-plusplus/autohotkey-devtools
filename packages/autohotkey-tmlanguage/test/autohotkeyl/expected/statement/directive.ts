import { dedent } from '@zero-plusplus/utilities/src';
import { directiveDefinitions } from '../../../../src/autohotkeyl/definitions';
import {
  name, RuleDescriptor, RuleName, StyleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createDirectiveStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createDirectiveStatementExpectedData(scopeName, {
      directiveDefinitions,
    }),

    // https://www.autohotkey.com/docs/v1/lib/_AllowSameLineComments.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #AllowSameLineComments                ; comment
            #AllowSameLineComments,               ; comment
          `,
          [
            { text: '#AllowSameLineComments', scopes: name(scopeName, RuleName.DirectiveName, StyleName.Invalid, StyleName.Strikethrough) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#AllowSameLineComments', scopes: name(scopeName, RuleName.DirectiveName, StyleName.Invalid, StyleName.Strikethrough) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #AllowSameLineComments, invalid       ; comment
          `,
          [
            { text: '#AllowSameLineComments', scopes: name(scopeName, RuleName.DirectiveName, StyleName.Invalid, StyleName.Strikethrough) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v1/lib/_ClipboardTimeout.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #ClipboardTimeout           ; comment
            #ClipboardTimeout,          ; comment
          `,
          [
            { text: '#ClipboardTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#ClipboardTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #ClipboardTimeout 123         ; comment
          `,
          [
            { text: '#ClipboardTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #ClipboardTimeout, invalid     ; comment
          `,
          [
            { text: '#ClipboardTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v1/lib/_CommentFlag.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #CommentFlag          ; comment
            #CommentFlag,         ; comment
          `,
          [
            { text: '#CommentFlag', scopes: name(scopeName, RuleName.DirectiveName, StyleName.Strikethrough) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#CommentFlag', scopes: name(scopeName, RuleName.DirectiveName, StyleName.Strikethrough) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #CommentFlag //       ; comment
          `,
          [
            { text: '#CommentFlag', scopes: name(scopeName, RuleName.DirectiveName, StyleName.Strikethrough) },
            { text: '//', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v1/lib/_ErrorStdOut.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #ErrorStdOut          ; comment
            #ErrorStdOut,         ; comment
          `,
          [
            { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #ErrorStdOut x        ; comment
          `,
          [
            { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'x', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #ErrorStdOut UTF-8        ; comment
            #ErrorStdOut CP65001      ; comment
          `,
          [
            { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'UTF-8', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#ErrorStdOut', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'CP65001', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v1/lib/_EscapeChar.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #EscapeChar         ; comment
            #EscapeChar,        ; comment
          `,
          [
            { text: '#EscapeChar', scopes: name(scopeName, RuleName.DirectiveName, StyleName.Strikethrough) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#EscapeChar', scopes: name(scopeName, RuleName.DirectiveName, StyleName.Strikethrough) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #EscapeChar \\        ; comment
          `,
          [
            { text: '#EscapeChar', scopes: name(scopeName, RuleName.DirectiveName, StyleName.Strikethrough) },
            { text: '\\', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v1/lib/_HotkeyInterval.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #HotkeyInterval         ; comment
            #HotkeyInterval,        ; comment
          `,
          [
            { text: '#HotkeyInterval', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#HotkeyInterval', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #HotkeyInterval 123     ; comment
          `,
          [
            { text: '#HotkeyInterval', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #HotkeyInterval invalid     ; comment
          `,
          [
            { text: '#HotkeyInterval', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v1/lib/_HotkeyModifierTimeout.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #HotkeyModifierTimeout            ; comment
            #HotkeyModifierTimeout,           ; comment
          `,
          [
            { text: '#HotkeyModifierTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#HotkeyModifierTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #HotkeyModifierTimeout 123        ; comment
          `,
          [
            { text: '#HotkeyModifierTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #HotkeyModifierTimeout invalid    ; comment
          `,
          [
            { text: '#HotkeyModifierTimeout', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v1/lib/_Hotstring.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #Hotstring                    ; comment
            #Hotstring,                   ; comment
          `,
          [
            { text: '#Hotstring', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#Hotstring', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
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
      ];
    })(),

    // https://www.autohotkey.com/docs/v1/lib/_If.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #If                                     ; comment
            #If,                                    ; comment
          `,
          [
            { text: '#If', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#If', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #If WinActive("ahk_exe xxx.exe")        ; comment
          `,
          [
            { text: '#If', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'WinActive', scopes: name(scopeName, RuleName.FunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
            { text: `ahk_exe xxx.exe`, scopes: name(scopeName, RuleName.DoubleString) },
            { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

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
