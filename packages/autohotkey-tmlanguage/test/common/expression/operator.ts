import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ElementName, type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

interface Placeholder {
  name: ElementName;
  operators: readonly string[];
}
export function createOperatorInExpressionExpectedData(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...placeholder.operators.map((operator): ExpectedTestData => {
      return [
        dedent`
          (a ${operator} b)       ; comment
        `, [
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: 'a', scopes: name(scopeName, RuleName.Variable) },
          { text: operator, scopes: placeholder.name },
          { text: 'b', scopes: name(scopeName, RuleName.Variable) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
        ],
      ];
    }),
  ];
}
