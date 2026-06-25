import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createDereferenceInKeywordParameterExpectedDataList } from '../common/dereference.ts';
import { createKeywordInvalidExpectedDataList } from '../common/invalid.ts';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';

export function $onOff(scopeName: ScopeName, placeholder: CommandPlaceholder, additionalKeywords: string[] = []): ExpectedTestData[] {
  return [
    ...[ 'On', 'Off', '0', '1', ...additionalKeywords ].flatMap((value): ExpectedTestData[] => {
      return [
        createCommandExpectedData(
          scopeName,
          value,
          [ { text: value, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
          placeholder,
        ),
      ];
    }),
    ...createPercentExpressionParameterExpectedDataList(scopeName, placeholder),
    ...createDereferenceInKeywordParameterExpectedDataList(scopeName, placeholder),
    ...createKeywordInvalidExpectedDataList(scopeName, placeholder),
  ];
}
