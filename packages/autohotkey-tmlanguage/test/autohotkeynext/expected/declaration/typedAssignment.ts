import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
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
  ];
}
