import { dedent } from '@zero-plusplus/utilities/src';
import * as constant_v1 from '../../../../src/autohotkeyl/constants';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createOperatorInExpressionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...constant_v1.assignmentOperators.map((operator): ExpectedTestData => {
      return [
        dedent`
          a ${operator} b
        `, [
          { text: 'a', scopes: name(scopeName, RuleName.Variable) },
          { text: operator, scopes: name(scopeName, RuleName.Operator) },
          { text: 'b', scopes: name(scopeName, RuleName.Variable) },
        ],
      ];
    }),

    ...constant_v1.expressionOperators.map((operator): ExpectedTestData => {
      return [
        dedent`
          (a ${operator} b)
        `, [
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: 'a', scopes: name(scopeName, RuleName.Variable) },
          { text: operator, scopes: name(scopeName, RuleName.Operator) },
          { text: 'b', scopes: name(scopeName, RuleName.Variable) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        ],
      ];
    }),

    ...constant_v1.expressionKeywords.map((operator): ExpectedTestData => {
      return [
        dedent`
          (a ${operator} b)
        `, [
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: 'a', scopes: name(scopeName, RuleName.Variable) },
          { text: operator, scopes: name(scopeName, RuleName.KeywordInExpression) },
          { text: 'b', scopes: name(scopeName, RuleName.Variable) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        ],
      ];
    }),
  ];
}
