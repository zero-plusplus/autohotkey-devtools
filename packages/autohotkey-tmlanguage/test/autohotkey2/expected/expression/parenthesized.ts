import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import { name } from '../../../../src/tmlanguage';
import type { ScopeName } from '../../../../src/types';
import * as common from '../../../common/expression/parenthesized';
import type { ExpectedTestData } from '../../../types';

export function createParenthesizedExpressionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createParenthesizedExpressionExpectedData(scopeName),

    [
      dedent`
        (
          a + b
        )
      `,
      [
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'a', scopes: name(scopeName, RuleName.Variable) },
        { text: '+', scopes: name(scopeName, RuleName.Operator) },
        { text: 'b', scopes: name(scopeName, RuleName.Variable) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
      ],
    ],
  ];
}
