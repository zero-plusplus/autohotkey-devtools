import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';
import { $ } from './$';

export function $withNumber(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    createExpectedData(
      scopeName,
      `123`,
      [ { text: '123', scopes: name(scopeName, RuleName.Integer) } ],
      placeholder,
    ),
    ...[ '+', '-' ].flatMap((operator): ExpectedTestData[] => {
      return [
        createExpectedData(
          scopeName,
          `${operator}123`,
          [
            { text: operator, scopes: name(scopeName, RuleName.Operator) },
            { text: '123', scopes: name(scopeName, RuleName.Integer) },
          ],
          placeholder,
        ),
      ];
    }),
  ];
}
