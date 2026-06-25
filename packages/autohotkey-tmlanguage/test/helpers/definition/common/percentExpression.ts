import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';

export function createPercentExpressionParameterExpectedDataList(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    createCommandExpectedData(
      scopeName,
      `% var`,
      [
        { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
        { text: 'var', scopes: name(scopeName, RuleName.Variable) },
      ],
      placeholder,
    ),

    ...(
      placeholder.isLastParameter
        ? [
          createCommandExpectedData(
            scopeName,
            `% var,`,
            [
              { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
              { text: 'var', scopes: name(scopeName, RuleName.Variable) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
            ],
            placeholder,
          ),
        ]
        : []
    ),
  ];
}
