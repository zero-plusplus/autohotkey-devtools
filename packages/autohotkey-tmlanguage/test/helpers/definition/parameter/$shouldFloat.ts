import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createDereferenceInKeywordParameterExpectedDataList } from '../common/dereference';
import { createKeywordInvalidExpectedDataList } from '../common/invalid';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression';
import { createExpectedData, type Placeholder } from '../helpers';

export function $shouldFloat(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    createExpectedData(
      scopeName,
      `123.123`,
      [
        { text: '123', scopes: name(scopeName, RuleName.Float, RuleName.Integer) },
        { text: '.', scopes: name(scopeName, RuleName.Float, RuleName.DecimalPoint) },
        { text: '123', scopes: name(scopeName, RuleName.Float, RuleName.DecimalPart) },
      ],
      placeholder,
    ),
    ...[ '+', '-' ].flatMap((operator): ExpectedTestData[] => {
      return [
        createExpectedData(
          scopeName,
          `${operator}123.123`,
          [
            { text: operator, scopes: name(scopeName, RuleName.Operator) },
            { text: '123', scopes: name(scopeName, RuleName.Float, RuleName.Integer) },
            { text: '.', scopes: name(scopeName, RuleName.Float, RuleName.DecimalPoint) },
            { text: '123', scopes: name(scopeName, RuleName.Float, RuleName.DecimalPart) },
          ],
          placeholder,
        ),
      ];
    }),
    ...createPercentExpressionParameterExpectedDataList(scopeName, placeholder),
    ...createDereferenceInKeywordParameterExpectedDataList(scopeName, placeholder),
    ...createKeywordInvalidExpectedDataList(scopeName, placeholder),
  ];
}
