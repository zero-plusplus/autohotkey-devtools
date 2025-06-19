import { dedent, hasFlag } from '@zero-plusplus/utilities/src';
import {
  CommandFlag,
  type CommandDefinition,
} from '../../../src/definition';
import {
  name, RuleName, StyleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

interface Placeholder {
  directiveDefinitions: CommandDefinition[];
}
export function createDirectiveStatementExpectedData(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...placeholder.directiveDefinitions.map((definition): ExpectedTestData => {
      return [
        dedent`
          ${definition.name}      ; comment
        `,
        [
          {
            text: definition.name,
            scopes: ((): string => {
              if (hasFlag(definition.flags, CommandFlag.Removed)) {
                return name(scopeName, RuleName.DirectiveName, StyleName.Invalid, StyleName.Strikethrough);
              }
              if (hasFlag(definition.flags, CommandFlag.Deprecated)) {
                return name(scopeName, RuleName.DirectiveName, StyleName.Strikethrough);
              }
              return name(scopeName, RuleName.DirectiveName);
            })(),
          },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
        ],
      ];
    }),

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
            { text: 'path\\to\\, file .ahk', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            ${directive} .\\path\\to\\, file .ahk       ; comment
          `,
          [
            { text: directive, scopes: name(scopeName, RuleName.DirectiveName) },
            { text: '.\\path\\to\\, file .ahk', scopes: name(scopeName, RuleName.UnquotedString) },
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
  ];
}
