import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createDereferenceInKeywordParameterExpectedDataList } from '../common/dereference';
import { createKeywordInvalidExpectedDataList } from '../common/invalid';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';

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
