import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';

export function createPercentExpressionParameterExpectedDataList(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    createExpectedData(
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
          createExpectedData(
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
