import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

export function createExportDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // one line
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            export x                                  ; comment
            export default x                          ; comment
            export xxx() => yyy                       ; comment
          `,
          [
            ...[
              { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
              { text: 'x', scopes: name(scopeName, RuleName.Variable) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
            ],

            ...[
              { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
              { text: 'default', scopes: name(scopeName, RuleName.MetaKeyword) },
              { text: 'x', scopes: name(scopeName, RuleName.Variable) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
            ],

            ...[
              { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
              { text: 'xxx', scopes: name(scopeName, RuleName.FunctionName) },
              { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
              { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
              { text: '=>', scopes: name(scopeName, RuleName.Operator) },
              { text: 'yyy', scopes: name(scopeName, RuleName.Variable) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
            ],
          ],
        ],
      ];
    })(),

    // continuation
    ...((): ExpectedTestData[] => {
      return [
        // one true brace style
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                export yyy() {                            ; comment
                }                                         ; comment
                export class a {                          ; comment
                }                                         ; comment
                export class a extends b.c {              ; comment
                }                                         ; comment
              `,
              [
                ...[
                  { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
                  { text: 'yyy', scopes: name(scopeName, RuleName.FunctionName) },
                  { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
                  { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
                  { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
                ],

                ...[
                  { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
                  { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
                  { text: 'a', scopes: name(scopeName, RuleName.ClassName) },
                  { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
                ],

                ...[
                  { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
                  { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
                  { text: 'a', scopes: name(scopeName, RuleName.ClassName) },
                  { text: 'extends', scopes: name(scopeName, RuleName.ExtendsKeyword) },
                  { text: 'b', scopes: name(scopeName, RuleName.ClassName) },
                  { text: '.', scopes: name(scopeName, RuleName.Dot) },
                  { text: 'c', scopes: name(scopeName, RuleName.ClassName) },
                  { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
                ],
              ],
            ],
            [
              dedent`
                export default yyy() {                    ; comment
                }                                         ; comment
                export default class a {                  ; comment
                }                                         ; comment
                export default class a extends b.c {      ; comment
                }                                         ; comment
              `,
              [
                ...[
                  { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
                  { text: 'default', scopes: name(scopeName, RuleName.MetaKeyword) },
                  { text: 'yyy', scopes: name(scopeName, RuleName.FunctionName) },
                  { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
                  { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
                  { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
                ],

                ...[
                  { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
                  { text: 'default', scopes: name(scopeName, RuleName.MetaKeyword) },
                  { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
                  { text: 'a', scopes: name(scopeName, RuleName.ClassName) },
                  { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
                ],

                ...[
                  { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
                  { text: 'default', scopes: name(scopeName, RuleName.MetaKeyword) },
                  { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
                  { text: 'a', scopes: name(scopeName, RuleName.ClassName) },
                  { text: 'extends', scopes: name(scopeName, RuleName.ExtendsKeyword) },
                  { text: 'b', scopes: name(scopeName, RuleName.ClassName) },
                  { text: '.', scopes: name(scopeName, RuleName.Dot) },
                  { text: 'c', scopes: name(scopeName, RuleName.ClassName) },
                  { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
                ],
              ],
            ],
          ];
        })(),

        // K&R style
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                export yyy()                              ; comment
                {                                         ; comment
                }                                         ; comment
                export class a                            ; comment
                {                                         ; comment
                }                                         ; comment
                export class a extends b.c                ; comment
                {                                         ; comment
                }                                         ; comment
              `,
              [
                ...[
                  { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
                  { text: 'yyy', scopes: name(scopeName, RuleName.FunctionName) },
                  { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
                  { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
                ],

                ...[
                  { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
                  { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
                  { text: 'a', scopes: name(scopeName, RuleName.ClassName) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
                ],

                ...[
                  { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
                  { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
                  { text: 'a', scopes: name(scopeName, RuleName.ClassName) },
                  { text: 'extends', scopes: name(scopeName, RuleName.ExtendsKeyword) },
                  { text: 'b', scopes: name(scopeName, RuleName.ClassName) },
                  { text: '.', scopes: name(scopeName, RuleName.Dot) },
                  { text: 'c', scopes: name(scopeName, RuleName.ClassName) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
                ],
              ],
            ],
            [
              dedent`
                export default yyy()                      ; comment
                {                                         ; comment
                }                                         ; comment
                export default class a                    ; comment
                {                                         ; comment
                }                                         ; comment
                export default class a extends b.c        ; comment
                {                                         ; comment
                }                                         ; comment
              `,
              [
                ...[
                  { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
                  { text: 'default', scopes: name(scopeName, RuleName.MetaKeyword) },
                  { text: 'yyy', scopes: name(scopeName, RuleName.FunctionName) },
                  { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
                  { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
                ],

                ...[
                  { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
                  { text: 'default', scopes: name(scopeName, RuleName.MetaKeyword) },
                  { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
                  { text: 'a', scopes: name(scopeName, RuleName.ClassName) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
                ],

                ...[
                  { text: 'export', scopes: name(scopeName, RuleName.MetaKeyword) },
                  { text: 'default', scopes: name(scopeName, RuleName.MetaKeyword) },
                  { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
                  { text: 'a', scopes: name(scopeName, RuleName.ClassName) },
                  { text: 'extends', scopes: name(scopeName, RuleName.ExtendsKeyword) },
                  { text: 'b', scopes: name(scopeName, RuleName.ClassName) },
                  { text: '.', scopes: name(scopeName, RuleName.Dot) },
                  { text: 'c', scopes: name(scopeName, RuleName.ClassName) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
                ],
              ],
            ],
          ];
        })(),
      ];
    })(),
  ];
}
