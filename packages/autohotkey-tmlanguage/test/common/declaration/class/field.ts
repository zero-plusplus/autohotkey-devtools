import { dedent } from '@zero-plusplus/utilities/src';
import {
  name,
  RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import { createMultiLineExpectedData } from '../../../helpers/definition/helpers';
import type { ExpectedTestData } from '../../../types';

export function createFieldDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    createMultiLineExpectedData(
      scopeName,
      dedent`
        class {
          field
          FIELD
        }
      `,
      [
        [
          { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },

        ],
        [
          { text: 'field', scopes: name(scopeName, RuleName.Variable) },
        ],
        [
          { text: 'FIELD', scopes: name(scopeName, RuleName.ConstantLikeVariable) },
        ],
        [
          { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        ],
      ],
    ),
    createMultiLineExpectedData(
      scopeName,
      dedent`
        class {
          field := 123
          static field := 123

          FIELD := 123
          STATIC FIELD := 123
        }
      `,
      [
        [
          { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
        ],
        [
          { text: 'field', scopes: name(scopeName, RuleName.Variable) },
          { text: ':=', scopes: name(scopeName, RuleName.Operator) },
          { text: '123', scopes: name(scopeName, RuleName.Integer) },
        ],
        [
          { text: 'static', scopes: name(scopeName, RuleName.Modifier) },
          { text: 'field', scopes: name(scopeName, RuleName.Variable) },
          { text: ':=', scopes: name(scopeName, RuleName.Operator) },
          { text: '123', scopes: name(scopeName, RuleName.Integer) },
        ],
        [
          { text: 'FIELD', scopes: name(scopeName, RuleName.ConstantLikeVariable) },
          { text: ':=', scopes: name(scopeName, RuleName.Operator) },
          { text: '123', scopes: name(scopeName, RuleName.Integer) },
        ],
        [
          { text: 'STATIC', scopes: name(scopeName, RuleName.Modifier) },
          { text: 'FIELD', scopes: name(scopeName, RuleName.ConstantLikeVariable) },
          { text: ':=', scopes: name(scopeName, RuleName.Operator) },
          { text: '123', scopes: name(scopeName, RuleName.Integer) },
        ],
        [
          { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        ],
      ],
    ),
    createMultiLineExpectedData(
      scopeName,
      dedent`
        class {
          field := 1,
                   2,
                   3,
           FIELD := 1
                  , 2
                  , 3
        }
      `,
      [
        [
          { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
        ],
        [
          { text: 'field', scopes: name(scopeName, RuleName.Variable) },
          { text: ':=', scopes: name(scopeName, RuleName.Operator) },
          { text: '1', scopes: name(scopeName, RuleName.Integer) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
        ],
        [
          { text: '2', scopes: name(scopeName, RuleName.Integer) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
        ],
        [
          { text: '3', scopes: name(scopeName, RuleName.Integer) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
        ],
        [
          { text: 'FIELD', scopes: name(scopeName, RuleName.ConstantLikeVariable) },
          { text: ':=', scopes: name(scopeName, RuleName.Operator) },
          { text: '1', scopes: name(scopeName, RuleName.Integer) },
        ],
        [
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
          { text: '2', scopes: name(scopeName, RuleName.Integer) },
        ],
        [
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
          { text: '3', scopes: name(scopeName, RuleName.Integer) },
        ],
        [
          { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        ],
      ],
    ),
    createMultiLineExpectedData(
      scopeName,
      dedent`
        class {
          static
            field
               :=
                [
                  1,
                ]
        }
      `,
      [
        [
          { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
        ],
        [
          { text: 'static', scopes: name(scopeName, RuleName.Modifier) },
        ],
        [
          { text: 'field', scopes: name(scopeName, RuleName.Variable) },
        ],
        [
          { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        ],
        [
          { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },
        ],
        [
          { text: '1', scopes: name(scopeName, RuleName.Integer) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
        ],
        [
          { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
        ],
        [
          { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        ],
      ],
    ),
    createMultiLineExpectedData(
      scopeName,
      dedent`
        class {
          field := {
            key1: 1, key2: 2
            , key3: 3,
          }
        }
      `,
      [
        [
          { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
        ],
        [
          { text: 'field', scopes: name(scopeName, RuleName.Variable) },
          { text: ':=', scopes: name(scopeName, RuleName.Operator) },
          { text: '{', scopes: name(scopeName, RuleName.OpenBrace) },
        ],
        [
          { text: 'key1', scopes: name(scopeName, RuleName.Variable) },
          { text: ':', scopes: name(scopeName, RuleName.Colon) },
          { text: '1', scopes: name(scopeName, RuleName.Integer) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
          { text: 'key2', scopes: name(scopeName, RuleName.Variable) },
          { text: ':', scopes: name(scopeName, RuleName.Colon) },
          { text: '2', scopes: name(scopeName, RuleName.Integer) },
        ],
        [
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
          { text: 'key3', scopes: name(scopeName, RuleName.Variable) },
          { text: ':', scopes: name(scopeName, RuleName.Colon) },
          { text: '3', scopes: name(scopeName, RuleName.Integer) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
        ],
        [
          { text: '}', scopes: name(scopeName, RuleName.CloseBrace) },
        ],
        [
          { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        ],
      ],
    ),
    createMultiLineExpectedData(
      scopeName,
      dedent`
        class {
          field := [
            1, 2
            , 3,
          ]
        }
      `,
      [
        [
          { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },

        ],
        [
          { text: 'field', scopes: name(scopeName, RuleName.Variable) },
          { text: ':=', scopes: name(scopeName, RuleName.Operator) },
          { text: '[', scopes: name(scopeName, RuleName.OpenBracket) },

        ],
        [
          { text: '1', scopes: name(scopeName, RuleName.Integer) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
          { text: '2', scopes: name(scopeName, RuleName.Integer) },
        ],
        [
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
          { text: '3', scopes: name(scopeName, RuleName.Integer) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
        ],
        [
          { text: ']', scopes: name(scopeName, RuleName.CloseBracket) },
        ],
        [
          { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        ],
      ],
    ),
    createMultiLineExpectedData(
      scopeName,
      dedent`
        class {
          field := Func(
              123,
            , 123
          )
        }
      `,
      [
        [
          { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
        ],
        [
          { text: 'field', scopes: name(scopeName, RuleName.Variable) },
          { text: ':=', scopes: name(scopeName, RuleName.Operator) },
          { text: 'Func', scopes: name(scopeName, RuleName.FunctionName) },
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        ],
        [
          { text: '123', scopes: name(scopeName, RuleName.Integer) },
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
        ],
        [
          { text: ',', scopes: name(scopeName, RuleName.Comma) },
          { text: '123', scopes: name(scopeName, RuleName.Integer) },
        ],
        [
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        ],
        [
          { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        ],
      ],
    ),
    createMultiLineExpectedData(
      scopeName,
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
        [
          { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
        ],
        [
          { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
          { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
        ],
        [
          { text: 'field', scopes: name(scopeName, RuleName.Variable) },
        ],
        [
          { text: 'field', scopes: name(scopeName, RuleName.Variable) },
          { text: ':=', scopes: name(scopeName, RuleName.Operator) },
          { text: '123', scopes: name(scopeName, RuleName.Integer) },
        ],
        [
          { text: 'static', scopes: name(scopeName, RuleName.Modifier) },
          { text: 'field', scopes: name(scopeName, RuleName.Variable) },
          { text: ':=', scopes: name(scopeName, RuleName.Operator) },
          { text: '123', scopes: name(scopeName, RuleName.Integer) },
        ],
        [
          { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        ],
        [
          { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        ],
      ],
    ),
  ];
}
