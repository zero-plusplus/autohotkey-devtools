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
import { createIfWinActiveExpectedDataList } from './#IfWinActive';
import { createIncludeExpectedDataList } from './#Include';
import { createInputLevelExpectedDataList } from './#InputLevel';
import { createInstallKeybdHookExpectedDataList } from './#InstallKeybdHook';
import { createInstallMouseHookExpectedDataList } from './#InstallMouseHook';
import { createKeyHistoryExpectedDataList } from './#KeyHistory';
import { createLTrimExpectedDataList } from './#LTrim';
import { createMaxHotkeysPerIntervalExpectedDataList } from './#MaxHotkeysPerInterval';
import { createMaxMemExpectedDataList } from './#MaxMem';

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
    ...createIfWinActiveExpectedDataList(scopeName),
    ...createIncludeExpectedDataList(scopeName),
    ...createInputLevelExpectedDataList(scopeName),
    ...createInstallKeybdHookExpectedDataList(scopeName),
    ...createInstallMouseHookExpectedDataList(scopeName),
    ...createKeyHistoryExpectedDataList(scopeName),
    ...createLTrimExpectedDataList(scopeName),
    ...createMaxHotkeysPerIntervalExpectedDataList(scopeName),
    ...createMaxMemExpectedDataList(scopeName),

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
