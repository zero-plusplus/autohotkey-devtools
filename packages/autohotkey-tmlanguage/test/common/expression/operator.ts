import { RuleName } from '../../../src/constants';
import { name } from '../../../src/tmlanguage';
import type { ElementName, ScopeName } from '../../../src/types';
import type { ExpectedTestData } from '../../types';

interface Placeholder {
  name: ElementName;
  operators: readonly string[];
}
export function createOperatorInExpressionExpectedData(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...placeholder.operators.map((operator): ExpectedTestData => {
      return [
        `(a ${operator} b)`, [
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: 'a', scopes: name(scopeName, RuleName.Variable) },
          { text: operator, scopes: placeholder.name },
          { text: 'b', scopes: name(scopeName, RuleName.Variable) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        ],
      ];
    }),
  ];
}
