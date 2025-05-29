import {
  name, RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

interface Placeholder {
  modifiers: readonly string[];
  operators: readonly string[];
}
export function createAssignmentDeclarationExpectedData(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...placeholder.modifiers.flatMap((modifier): ExpectedTestData[] => {
      return placeholder.operators.map((operator): ExpectedTestData => {
        return [
          `${modifier} var ${operator} 123`,
          [
            { text: modifier, scopes: name(scopeName, RuleName.Modifier) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: operator, scopes: name(scopeName, RuleName.Operator) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
          ],
        ];
      });
    }),
  ];
}
