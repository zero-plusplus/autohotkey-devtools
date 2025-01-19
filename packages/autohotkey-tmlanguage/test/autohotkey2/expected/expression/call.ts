import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import * as common from '../../../common/expression/call';
import type { ExpectedTestData } from '../../../types';

export function createCallExpressionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createCallExpressionExpectedData(scopeName),

    [
      dedent`
        (() => 123)()
        ((&a, b := 10) => 123)()
      `,
      [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '=>', scopes: name(scopeName, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },

        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: '&', scopes: name(scopeName, RuleName.Operator) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '10', scopes: name(scopeName, RuleName.Integer) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '=>', scopes: name(scopeName, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.Integer) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
    ],
  ];
}
