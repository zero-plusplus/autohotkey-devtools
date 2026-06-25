import { dedent } from '@zero-plusplus/utilities/src/index.ts';
import {
  name,
  RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage.ts';
import * as common from '../../../common/declaration/function.ts';
import type { ExpectedTestData } from '../../../types.ts';

export function createFunctionDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createFunctionDeclarationExpectedData(scopeName),

    // byref parameter (&)
    [
      dedent`
        abc(&a, b := 123, c*) {   ; comment
        }                         ; comment
      `, [
        { text: 'abc', scopes: name(scopeName, RuleName.FunctionName) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '&', scopes: name(scopeName, RuleName.Operator) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'c', scopes: name(scopeName, RuleName.Variable) },
        { text: '*', scopes: name(scopeName, RuleName.Operator) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}
