import { dedent } from '@zero-plusplus/utilities/src';
import { directiveDefinitions, quotableUnquoted, unquotedAndBoolean, unquotedInteger } from '../../../../src/autohotkey2/definition';
import {
  name, RuleName, StyleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createDirectiveStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createDirectiveStatementExpectedData(scopeName, {
      directiveDefinitions,
    }),

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
            { text: '"UTF-8"', scopes: name(scopeName, RuleName.UnquotedString) },
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
