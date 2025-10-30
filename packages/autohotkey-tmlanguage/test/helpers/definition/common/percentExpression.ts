import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';

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
