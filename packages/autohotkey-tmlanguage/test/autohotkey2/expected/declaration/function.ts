import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import * as common from '../../../common/declaration/function';
import type { ExpectedTestData } from '../../../types';

export function createFunctionDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createFunctionDeclarationExpectedData(scopeName),

    [
      dedent`
        abc(&a, b := 123, c*) {
        }
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
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
  ];
}
