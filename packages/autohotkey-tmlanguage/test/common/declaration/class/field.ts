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
