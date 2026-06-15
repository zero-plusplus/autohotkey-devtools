import { dedent } from '@zero-plusplus/utilities/src';
import {
  name,
  RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

// https://www.autohotkey.com/docs/alpha/Structs.htm#classdef
export function createStructPackExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        struct xyz {
          x: Int32 := 123
          y: Int64, z: UInt32
        }
      `,
      [
        { text: 'struct', scopes: name(scopeName, RuleName.ClassKeyword) },
        { text: 'xyz', scopes: name(scopeName, RuleName.ClassName) },
        { text: '{', scopes: name(scopeName, RuleName.ClassBlockBegin) },

        { text: 'x', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'Int32', scopes: name(scopeName, RuleName.Type) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },

        { text: 'y', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'Int64', scopes: name(scopeName, RuleName.Type) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'z', scopes: name(scopeName, RuleName.Variable) },
        { text: ':', scopes: name(scopeName, RuleName.Colon) },
        { text: 'UInt32', scopes: name(scopeName, RuleName.Type) },

        { text: '}', scopes: name(scopeName, RuleName.ClassBlockEnd) },
      ],
    ],
  ];
}
