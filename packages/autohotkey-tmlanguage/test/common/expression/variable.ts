import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ElementName, type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

interface Placeholder {
  ruleName: ElementName;
  variables: readonly string[];
}
export function createVariableExpectedData(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...placeholder.variables.flatMap((variable): ExpectedTestData[] => {
      return [
        [
          `(${variable})`, [
            { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
            { text: variable, scopes: name(scopeName, placeholder.ruleName) },
            { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
          ],
        ],
        [
          dedent`
            a := b
              ? c
              : ${variable}
          `,
          [
            { text: 'a', scopes: name(scopeName, RuleName.Variable) },
            { text: ':=', scopes: name(scopeName, RuleName.Operator) },
            { text: 'b', scopes: name(scopeName, RuleName.Variable) },
            { text: '?', scopes: name(scopeName, RuleName.Operator) },
            { text: 'c', scopes: name(scopeName, RuleName.Variable) },
            { text: ':', scopes: name(scopeName, RuleName.Operator) },
            { text: variable, scopes: name(scopeName, placeholder.ruleName) },
          ],
        ],
      ];
    }),
  ];
}
