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
    ...placeholder.variables.map((variable): ExpectedTestData => {
      return [
        `(${variable})`, [
          { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
          { text: variable, scopes: name(scopeName, placeholder.ruleName) },
          { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        ],
      ];
    }),
  ];
}
