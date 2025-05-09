import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createFieldDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        class {
          field
          field := 123
          static field := 123
        }
      `,
      [
        { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },

        { text: 'field', scopes: name(scopeName, RuleName.Variable) },

        { text: 'field', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },

        { text: 'static', scopes: name(scopeName, RuleName.Modifier) },
        { text: 'field', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },

        { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
      ],
    ],
    [
      dedent`
        class {
          FIELD
          FIELD := 123
          static FIELD := 123
        }
      `,
      [
        { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },

        { text: 'FIELD', scopes: name(scopeName, RuleName.ConstantLikeVariable) },

        { text: 'FIELD', scopes: name(scopeName, RuleName.ConstantLikeVariable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },

        { text: 'static', scopes: name(scopeName, RuleName.Modifier) },
        { text: 'FIELD', scopes: name(scopeName, RuleName.ConstantLikeVariable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },

        { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
      ],
    ],

    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            class {
              field := 1,   ; comment
                       2,   ; comment
                       3,   ; comment
            }
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },

            { text: 'field', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
            { text: '2', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
            { text: '3', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
          ],
        ],
        [
          dedent`
            class {
              field := 1    ; comment
                     , 2    ; comment
                     , 3    ; comment
            }
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },

            { text: 'field', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '1', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '2', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '3', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
          ],
        ],
      ];
    })(),

    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            class {
              field := {        ; comment
                  key: 123,     ; comment
                , key: 123      ; comment
              }                 ; comment
            }
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },

            { text: 'field', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: 'key', scopes: name(scopeName, RuleName.Variable) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: 'key', scopes: name(scopeName, RuleName.Variable) },
            { text: ':', scopes: name(scopeName, RuleName.Colon) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
          ],
        ],
        [
          dedent`
            class {
              field := [    ; comment
                  123,      ; comment
                , 123       ; comment
              ]             ; comment
            }
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },

            { text: 'field', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
          ],
        ],
        [
          dedent`
            class {
              field := Func(    ; comment
                  123,          ; comment
                , 123           ; comment
              )                 ; comment
            }
          `,
          [
            { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
            { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },

            { text: 'field', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: 'Func', scopes: name(scopeName, RuleName.FunctionName) },
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ',', scopes: name(scopeName, RuleName.Comma) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
            { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

            { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
          ],
        ],
      ];
    })(),

    // Field in nested class
    [
      dedent`
        class {
          class {
            field
            field := 123
            static field := 123
          }
        }
      `,
      [
        { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },

        { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },

        { text: 'field', scopes: name(scopeName, RuleName.Variable) },

        { text: 'field', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },

        { text: 'static', scopes: name(scopeName, RuleName.Modifier) },
        { text: 'field', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },

        { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },

        { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
      ],
    ],
  ];
}
