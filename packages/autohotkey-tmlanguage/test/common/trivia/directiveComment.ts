import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleDescriptor, RuleName, StyleName, TokenType,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

export function createDirectiveCommentExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        ; @Ahk2Exe-AddResource *2 file\\to\\path, X         ; comment
      `,
      [
        { text: ';', scopes: name(scopeName, RuleName.DirectiveComment) },
        { text: '@Ahk2Exe-AddResource', scopes: name(scopeName, RuleName.DirectiveCommentName) },
        { text: '*2 file\\to\\path', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'X', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        ; @Ahk2Exe-Bin path\\name, exePath\\name, 65001         ; comment
        ; @Ahk2Exe-Base path\\name, exePath\\name, 65001        ; comment
      `,
      [
        { text: ';', scopes: name(scopeName, RuleName.DirectiveComment) },
        { text: '@Ahk2Exe-Bin', scopes: name(scopeName, RuleName.DirectiveCommentName, StyleName.Strikethrough) },
        { text: 'path\\name', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'exePath\\name', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '65001', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: ';', scopes: name(scopeName, RuleName.DirectiveComment) },
        { text: '@Ahk2Exe-Base', scopes: name(scopeName, RuleName.DirectiveCommentName) },
        { text: 'path\\name', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'exePath\\name', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '65001', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        ; @Ahk2Exe-ConsoleApp      ; comment
      `,
      [
        { text: ';', scopes: name(scopeName, RuleName.DirectiveComment) },
        { text: '@Ahk2Exe-ConsoleApp', scopes: name(scopeName, RuleName.DirectiveCommentName) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        ; @Ahk2Exe-Cont text       ; comment
        ; @Ahk2Exe-Debug text      ; comment
      `,
      [
        ...[ 'Cont', 'Debug' ].flatMap((directiveName) => {
          return [
            { text: ';', scopes: name(scopeName, RuleName.DirectiveComment) },
            { text: `@Ahk2Exe-${directiveName}`, scopes: name(scopeName, RuleName.DirectiveCommentName) },
            { text: 'text', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ];
        }),
      ],
    ],
    [
      dedent`
        ; @Ahk2Exe-ExeName path\\name       ; comment
      `,
      [
        { text: ';', scopes: name(scopeName, RuleName.DirectiveComment) },
        { text: `@Ahk2Exe-ExeName`, scopes: name(scopeName, RuleName.DirectiveCommentName) },
        { text: 'path\\name', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        ; @Ahk2Exe-Let Name = "%Path~(.*)\\.ahk~$1.exe%"         ; comment
      `,
      [
        { text: ';', scopes: name(scopeName, RuleName.DirectiveComment) },
        { text: '@Ahk2Exe-Let', scopes: name(scopeName, RuleName.DirectiveCommentName) },
        { text: 'Name', scopes: name(scopeName, RuleName.Variable) },
        { text: '=', scopes: name(scopeName, RuleName.Operator) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: '%', scopes: name(scopeName, TokenType.Other, RuleName.PercentBegin) },
        { text: 'Path', scopes: name(scopeName, RuleName.Variable) },
        { text: '~', scopes: name(scopeName, TokenType.Other, RuleName.Operator) },
        { text: '(', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.Begin) },
        { text: '.', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClass) },
        { text: '*', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpQuantifier) },
        { text: ')', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.End) },
        { text: '\\.', scopes: name(scopeName, RuleName.RegExpString, StyleName.Escape) },
        { text: 'ahk', scopes: name(scopeName, RuleName.RegExpString) },
        { text: '~', scopes: name(scopeName, TokenType.Other, RuleName.Operator) },
        { text: '$1', scopes: name(scopeName, RuleName.DoubleString, StyleName.Strong) },
        { text: '.exe', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '%', scopes: name(scopeName, TokenType.Other, RuleName.PercentEnd) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        ; @Ahk2Exe-Nop text       ; comment
      `,
      [
        { text: ';', scopes: name(scopeName, RuleName.DirectiveComment) },
        { text: `@Ahk2Exe-Nop`, scopes: name(scopeName, RuleName.DirectiveCommentName) },
        { text: 'text       ; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        ; @Ahk2Exe-Obey U_Name, = "%Path~(.*)\\.ahk~$1.exe%", 2         ; comment
      `,
      [
        { text: ';', scopes: name(scopeName, RuleName.DirectiveComment) },
        { text: `@Ahk2Exe-Obey`, scopes: name(scopeName, RuleName.DirectiveCommentName) },
        { text: 'U_Name', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '=', scopes: name(scopeName, RuleName.Operator) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: '%', scopes: name(scopeName, TokenType.Other, RuleName.PercentBegin) },
        { text: 'Path', scopes: name(scopeName, RuleName.Variable) },
        { text: '~', scopes: name(scopeName, TokenType.Other, RuleName.Operator) },
        { text: '(', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.Begin) },
        { text: '.', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpCharacterClass) },
        { text: '*', scopes: name(scopeName, RuleName.RegExpString, RuleName.RegExpQuantifier) },
        { text: ')', scopes: name(scopeName, RuleName.RegExpString, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.End) },
        { text: '\\.', scopes: name(scopeName, RuleName.RegExpString, StyleName.Escape) },
        { text: 'ahk', scopes: name(scopeName, RuleName.RegExpString) },
        { text: '~', scopes: name(scopeName, TokenType.Other, RuleName.Operator) },
        { text: '$1', scopes: name(scopeName, RuleName.DoubleString, StyleName.Strong) },
        { text: '.exe', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '%', scopes: name(scopeName, TokenType.Other, RuleName.PercentEnd) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '2', scopes: name(scopeName, RuleName.Integer) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        ; @Ahk2Exe-PostExec "%exePath%" /flag, 1, path\\to, 1, 1        ; comment
      `,
      [
        { text: ';', scopes: name(scopeName, RuleName.DirectiveComment) },
        { text: `@Ahk2Exe-PostExec`, scopes: name(scopeName, RuleName.DirectiveCommentName) },
        { text: '"', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
        { text: 'exePath', scopes: name(scopeName, RuleName.Variable) },
        { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
        { text: '" /flag', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'path\\to', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        ; @Ahk2Exe-ResourceID #00000        ; comment
      `,
      [
        { text: ';', scopes: name(scopeName, RuleName.DirectiveComment) },
        { text: `@Ahk2Exe-ResourceID`, scopes: name(scopeName, RuleName.DirectiveCommentName) },
        { text: '#00000', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        ; @Ahk2Exe-SetMainIcon IconFile        ; comment
      `,
      [
        { text: ';', scopes: name(scopeName, RuleName.DirectiveComment) },
        { text: `@Ahk2Exe-SetMainIcon`, scopes: name(scopeName, RuleName.DirectiveCommentName) },
        { text: 'IconFile', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        ; @Ahk2Exe-SetCompanyName value                ; comment
        ; @Ahk2Exe-SetCopyright value                  ; comment
        ; @Ahk2Exe-SetDescription value                ; comment
        ; @Ahk2Exe-SetFileVersion value                ; comment
        ; @Ahk2Exe-SetInternalName value               ; comment
        ; @Ahk2Exe-SetLanguage value                   ; comment
        ; @Ahk2Exe-SetLegalTrademarks value            ; comment
        ; @Ahk2Exe-SetName value                       ; comment
        ; @Ahk2Exe-SetOrigFilename value               ; comment
        ; @Ahk2Exe-SetProductName value                ; comment
        ; @Ahk2Exe-SetProductVersion value             ; comment
        ; @Ahk2Exe-SetVersion value                    ; comment
      `,
      [
        ...[ 'SetCompanyName', 'SetCopyright', 'SetDescription', 'SetFileVersion', 'SetInternalName', 'SetLanguage', 'SetLegalTrademarks', 'SetName', 'SetOrigFilename', 'SetProductName', 'SetProductVersion', 'SetVersion' ].flatMap((directiveName) => {
          return [
            { text: ';', scopes: name(scopeName, RuleName.DirectiveComment) },
            { text: `@Ahk2Exe-${directiveName}`, scopes: name(scopeName, RuleName.DirectiveCommentName) },
            { text: 'value', scopes: name(scopeName, RuleName.UnquotedString) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ];
        }),
      ],
    ],
    [
      dedent`
        ; @Ahk2Exe-Set prop, value        ; comment
      `,
      [
        { text: ';', scopes: name(scopeName, RuleName.DirectiveComment) },
        { text: `@Ahk2Exe-Set`, scopes: name(scopeName, RuleName.DirectiveCommentName) },
        { text: 'prop', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'value', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        ; @Ahk2Exe-UpdateManifest 1, name, 1.0.0, 1        ; comment
      `,
      [
        { text: ';', scopes: name(scopeName, RuleName.DirectiveComment) },
        { text: `@Ahk2Exe-UpdateManifest`, scopes: name(scopeName, RuleName.DirectiveCommentName) },
        { text: '1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'name', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '1.0.0', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '1', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        ; @Ahk2Exe-UseResourceLang 0x123        ; comment
      `,
      [
        { text: ';', scopes: name(scopeName, RuleName.DirectiveComment) },
        { text: `@Ahk2Exe-UseResourceLang`, scopes: name(scopeName, RuleName.DirectiveCommentName) },
        { text: '0x', scopes: name(scopeName, RuleName.Hex, RuleName.HexPrefix) },
        { text: '123', scopes: name(scopeName, RuleName.Hex, RuleName.HexValue) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
    [
      dedent`
        ; @ahk2exe
      `,
      [
        { text: ';', scopes: name(scopeName, RuleName.DirectiveComment) },
        { text: '@ahk2exe', scopes: name(scopeName, RuleName.DirectiveCommentName) },
      ],
    ],
  ];
}
