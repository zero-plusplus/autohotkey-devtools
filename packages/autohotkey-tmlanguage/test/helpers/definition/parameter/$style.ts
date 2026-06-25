import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createDereferenceInKeywordParameterExpectedDataList } from '../common/dereference.ts';
import { createKeywordInvalidExpectedDataList } from '../common/invalid.ts';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';

export function $style(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...[ '+', '-', '^' ].flatMap((operator): ExpectedTestData[] => {
      return [
        createCommandExpectedData(
          scopeName,
          `${operator}0x123 ${operator}LV0x123`,
          [
            { text: operator, scopes: name(scopeName, RuleName.Operator) },
            { text: '0x', scopes: name(scopeName, RuleName.Hex, RuleName.HexPrefix) },
            { text: '123', scopes: name(scopeName, RuleName.Hex, RuleName.HexValue) },

            { text: operator, scopes: name(scopeName, RuleName.Operator) },
            { text: 'LV', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '0x', scopes: name(scopeName, RuleName.Hex, RuleName.HexPrefix) },
            { text: '123', scopes: name(scopeName, RuleName.Hex, RuleName.HexValue) },
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
