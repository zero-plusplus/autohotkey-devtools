import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

export function createTypedAssignmentDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        class Point {         ; comment
          x: i32              ; comment
          y: i32 := zzz       ; comment
        }                     ; comment
      `,
      [
        { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
        { text: 'Point', scopes: name(scopeName, RuleName.ClassName) },
        { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'i32', scopes: name(scopeName, RuleName.Type) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'y', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'i32', scopes: name(scopeName, RuleName.Type) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: 'zzz', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
    [
      dedent`
        class Point {           ; comment
          X: I32                ; comment
          Y: I32 := zzz         ; comment
        }                       ; comment
      `,
      [
        { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
        { text: 'Point', scopes: name(scopeName, RuleName.ClassName) },
        { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'X', scopes: name(scopeName, RuleName.ConstantLikeVariable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'I32', scopes: name(scopeName, RuleName.Type) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: 'Y', scopes: name(scopeName, RuleName.ConstantLikeVariable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'I32', scopes: name(scopeName, RuleName.Type) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: 'zzz', scopes: name(scopeName, RuleName.Variable) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

        { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
      ],
    ],
  ];
}
