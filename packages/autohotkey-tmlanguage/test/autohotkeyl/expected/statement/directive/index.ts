import { dedent, hasFlag } from '@zero-plusplus/utilities/src';
import * as definitions_v2 from '../../../../../src/autohotkeyl/definitions';
import { CommandFlag } from '../../../../../src/definition';
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
import { createErrorStdOutExpectedDataList } from './#ErrorStdOut';
import { createEscapeCharExpectedDataList } from './#EscapeChar';
import { createHotkeyIntervalExpectedDataList } from './#HotkeyInterval';
import { createHotkeyModifierTimeoutExpectedDataList } from './#HotkeyModifierTimeout';
import { createHotstringExpectedDataList } from './#Hotstring';
import { createIfExpectedDataList } from './#If';

export function createDirectiveStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...definitions_v2.directiveDefinitions.flatMap((definition): ExpectedTestData[] => {
      const directiveScopes = ((): string => {
        if (hasFlag(definition.flags, CommandFlag.Removed)) {
          return name(scopeName, RuleName.DirectiveName, StyleName.Invalid, StyleName.Strikethrough);
        }
        if (hasFlag(definition.flags, CommandFlag.Deprecated)) {
          return name(scopeName, RuleName.DirectiveName, StyleName.Strikethrough);
        }
        return name(scopeName, RuleName.DirectiveName);
      })();
      return [
        [
          dedent`
            ${definition.name}      ; comment
            ${definition.name},     ; comment
          `,
          [
            { text: definition.name, scopes: directiveScopes },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: definition.name, scopes: directiveScopes },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],

        // continuation
        [
          dedent`
            ${definition.name}      ; comment
              , invalid             ; comment
          `,
          [
            { text: definition.name, scopes: directiveScopes },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ', invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    }),

    // #region commands
    ...createAllowSameLineCommentsExpectedDataList(scopeName),
    ...createClipboardTimeoutExpectedDataList(scopeName),
    ...createCommentFlagExpectedDataList(scopeName),
    ...createErrorStdOutExpectedDataList(scopeName),
    ...createEscapeCharExpectedDataList(scopeName),
    ...createHotkeyIntervalExpectedDataList(scopeName),
    ...createHotkeyModifierTimeoutExpectedDataList(scopeName),
    ...createHotstringExpectedDataList(scopeName),
    ...createIfExpectedDataList(scopeName),

    // https://www.autohotkey.com/docs/v1/lib/_IfWinActive.htm
    ...[ '#IfWinActive', '#IfWinExist', '#IfWinNotActive', '#IfWinNotExist' ].flatMap((directiveName): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${directiveName} ahk_exe Code.exe           ; comment
            ${directiveName}, ahk_exe Code.exe           ; comment
          `,
          [
            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'ahk_exe', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'Code.exe', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'ahk_exe', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'Code.exe', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${directiveName}, % var                 ; comment
            ${directiveName}, %var%                 ; comment
            ${directiveName}, %var%var%var%         ; comment
          `,
          [
            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    }),

    // https://www.autohotkey.com/docs/v1/lib/_Include.htm
    ...[ '#Include', '#IncludeAgain' ].flatMap((directive): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${directive} <LIBRARY>      ; comment
          `,
          [
            { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '<', scopes: name(scopeName, RuleName.OpenAngleBracket) },
            { text: 'LIBRARY', scopes: name(scopeName, RuleName.IncludeLibrary) },
            { text: '>', scopes: name(scopeName, RuleName.CloseAngleBracket) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${directive} path\\to\\, file .ahk      ; comment
          `,
          [
            { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'path\\to\\,', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: 'file', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '.ahk', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${directive} .\\path\\to\\, file .ahk       ; comment
          `,
          [
            { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '.\\path\\to\\,', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: 'file', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '.ahk', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${directive} %A_LineFile%\\..\\file.ahk     ; comment
          `,
          [
            { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'A_LineFile', scopes: name(scopeName, RuleName.BuiltInVariable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '\\..\\file.ahk', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    }),

    // https://www.autohotkey.com/docs/v1/lib/_InputLevel.htm
    ...((directiveName = '#InputLevel'): ExpectedTestData[] => {
      return [
        ...[ '0', '50', '100' ].map((param): ExpectedTestData => {
          return [
            dedent`
              ${directiveName} ${param}        ; comment
              ${directiveName}, ${param}       ; comment
            `,
            [
              { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
              { text: param, scopes: name(scopeName, RuleName.Integer) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: param, scopes: name(scopeName, RuleName.Integer) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ];
        }),
        // Allow values outside the range
        [
          dedent`
            ${directiveName}, -10       ; comment
            ${directiveName}, 101       ; comment
          `,
          [
            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '-', scopes: name(scopeName, RuleName.Operator) },
            { text: '10', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '101', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${directiveName}, % var                 ; comment
            ${directiveName}, %var%                 ; comment
            ${directiveName}, %var%var%var%         ; comment
          `,
          [
            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v1/lib/_InstallKeybdHook.htm
    ...((directiveName = '#InstallKeybdHook'): ExpectedTestData[] => {
      return [
        [
          dedent`
            ${directiveName}  invalid       ; comment
            ${directiveName}, invalid       ; comment
          `,
          [
            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${directiveName}, % var               ; comment
            ${directiveName}, %var%               ; comment
            ${directiveName}, %var%var%var%       ; comment
          `,
          [
            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: 'var', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%var%', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '%var%var%var%', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // https://www.autohotkey.com/docs/v1/lib/_Requires.htm
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            #Requires                         ; comment
            #Requires AutoHotkey v2.1         ; comment
          `,
          [
            { text: '#Requires', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '#Requires', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'AutoHotkey', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'v2.1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            #Requires AutoHotkey v2.1 64-bit         ; comment
          `,
          [
            { text: '#Requires', scopes: name(scopeName, RuleName.DirectiveName) },
            { text: 'AutoHotkey', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'v2.1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '64-bit', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),
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
