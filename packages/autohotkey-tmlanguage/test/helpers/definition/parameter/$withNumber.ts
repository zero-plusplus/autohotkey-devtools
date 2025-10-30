import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';
import { $ } from './$';

export function $withNumber(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    createCommandExpectedData(
      scopeName,
      `123`,
      [ { text: '123', scopes: name(scopeName, RuleName.Integer) } ],
      placeholder,
    ),
    ...[ '+', '-' ].flatMap((operator): ExpectedTestData[] => {
      return [
        createCommandExpectedData(
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
