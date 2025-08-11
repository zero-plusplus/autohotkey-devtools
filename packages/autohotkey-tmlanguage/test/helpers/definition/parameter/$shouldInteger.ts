import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createDereferenceInKeywordParameterExpectedDataList } from '../common/dereference';
import { createKeywordInvalidExpectedDataList } from '../common/invalid';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression';
import { createExpectedData, type Placeholder } from '../helpers';

export function $shouldInteger(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
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
    ...createPercentExpressionParameterExpectedDataList(scopeName, placeholder),
    ...createDereferenceInKeywordParameterExpectedDataList(scopeName, placeholder),
    ...createKeywordInvalidExpectedDataList(scopeName, placeholder),
  ];
}
