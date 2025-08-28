import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createDereferenceInKeywordParameterExpectedDataList } from '../common/dereference';
import { createKeywordInvalidExpectedDataList } from '../common/invalid';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';

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
