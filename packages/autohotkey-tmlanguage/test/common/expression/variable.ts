import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../src/constants';
import type { ElementName, ScopeName } from '../../../src/types';
import { name } from '../../../src/utils';
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
