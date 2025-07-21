import { dedent } from '@zero-plusplus/utilities/src';
import {
  name,
  RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

export function createFieldDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // one line
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            class {                 ; comment
              field                 ; comment
              FIELD                 ; comment
            }                       ; comment
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'field', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'FIELD', scopes: name(scopeName, RuleName.ConstantLikeVariable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            class {                 ; comment
              field := 123          ; comment
              FIELD := 123          ; comment
            }                       ; comment
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'field', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'FIELD', scopes: name(scopeName, RuleName.ConstantLikeVariable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],

        [
          dedent`
            class {                 ; comment
              static field := 123   ; comment
              STATIC FIELD := 123   ; comment
            }                       ; comment
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'static', scopes: name(scopeName, RuleName.Modifier) },
            { text: 'field', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'STATIC', scopes: name(scopeName, RuleName.Modifier) },
            { text: 'FIELD', scopes: name(scopeName, RuleName.ConstantLikeVariable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // continuation
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            class {         ; comment
              field := 1,   ; comment
                       2,   ; comment
                       3,   ; comment
            }               ; comment
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'field', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            { text: '2', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            { text: '3', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            class {         ; comment
              field := 1    ; comment
                     , 2    ; comment
                     , 3    ; comment
            }               ; comment
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'field', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '2', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '3', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            class {           ; comment
              static          ; comment
                field         ; comment
                   :=         ; comment
                    [         ; comment
                      1,      ; comment
                    ]         ; comment
            }                 ; comment
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'static', scopes: name(scopeName, RuleName.Modifier) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'field', scopes: name(scopeName, RuleName.Variable) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            class {                   ; comment
              field := {              ; comment
                key1: 1, key2: 2      ; comment
                , key3: 3,            ; comment
              }                       ; comment
            }                         ; comment
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'field', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'key1', scopes: name(scopeName, RuleName.Variable) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'key2', scopes: name(scopeName, RuleName.Variable) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '2', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'key3', scopes: name(scopeName, RuleName.Variable) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '3', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            class {       ; comment
              field := [  ; comment
                1, 2      ; comment
                , 3,      ; comment
              ]           ; comment
            }             ; comment
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'field', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '2', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '3', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
        [
          dedent`
            class {             ; comment
              field := Func(    ; comment
                  123,          ; comment
                , 123           ; comment
              )                 ; comment
            }                   ; comment
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: 'field', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: 'Func', scopes: name(scopeName, RuleName.FunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
            { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
          ],
        ],
      ];
    })(),

    // Field in nested class
    [
      dedent`
        class {                           ; comment
          class {                         ; comment
            field                         ; comment
            field := 123                  ; comment
            static field := 123           ; comment
          }                               ; comment
        }                                 ; comment
      `,
      [
        { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'field', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'field', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: 'static', scopes: name(scopeName, RuleName.Modifier) },
        { text: 'field', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}
