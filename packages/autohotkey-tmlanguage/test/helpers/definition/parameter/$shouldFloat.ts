import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createDereferenceInKeywordParameterExpectedDataList } from '../common/dereference.ts';
import { createKeywordInvalidExpectedDataList } from '../common/invalid.ts';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';

export function $shouldFloat(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    createCommandExpectedData(
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
        createCommandExpectedData(
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
