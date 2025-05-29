import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import { name } from '../../../../src/tmlanguage';
import type { ScopeName } from '../../../../src/types';
import type { ExpectedTestData } from '../../../types';

export function createTypedAssignmentDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        class Point {
          x: i32
          y: i32 := zzz
        }
      `,
      [
        { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
        { text: 'Point', scopes: name(scopeName, RuleName.ClassName) },
        { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'i32', scopes: name(scopeName, RuleName.Type) },
        { text: 'y', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'i32', scopes: name(scopeName, RuleName.Type) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: 'zzz', scopes: name(scopeName, RuleName.Variable) },
        { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
      ],
    ],
    [
      dedent`
        class Point {
          X: i32
          Y: i32 := zzz
        }
      `,
      [
        { text: 'class', scopes: name(scopeName, RuleName.ClassKeyword) },
        { text: 'Point', scopes: name(scopeName, RuleName.ClassName) },
        { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },
        { text: 'X', scopes: name(scopeName, RuleName.ConstantLikeVariable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'i32', scopes: name(scopeName, RuleName.Type) },
        { text: 'Y', scopes: name(scopeName, RuleName.ConstantLikeVariable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'i32', scopes: name(scopeName, RuleName.Type) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: 'zzz', scopes: name(scopeName, RuleName.Variable) },
        { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
      ],
    ],
  ];
}
