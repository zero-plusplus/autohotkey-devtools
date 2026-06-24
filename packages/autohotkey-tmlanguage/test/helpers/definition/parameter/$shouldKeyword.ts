import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createDereferenceInKeywordParameterExpectedDataList } from '../common/dereference.ts';
import { createKeywordInvalidExpectedDataList } from '../common/invalid.ts';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';

export function $shouldKeyword(scopeName: ScopeName, keywords: string[], placeholder: CommandPlaceholder, additionalExpectedTestDataBuilder = (placeholder: CommandPlaceholder): ExpectedTestData[] => ([])): ExpectedTestData[] {
  return [
    ...keywords.flatMap((keyword): ExpectedTestData[] => {
      return [
        createCommandExpectedData(
          scopeName,
          keyword,
          [ { text: keyword, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
          placeholder,
        ),
        createCommandExpectedData(
          scopeName,
          `${keyword} XXX`,
          [
            { text: keyword, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: 'XXX', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
          ],
          placeholder,
        ),
      ];
    }),
    ...additionalExpectedTestDataBuilder(placeholder),
    ...createPercentExpressionParameterExpectedDataList(scopeName, placeholder),
    ...createDereferenceInKeywordParameterExpectedDataList(scopeName, placeholder),
    ...createKeywordInvalidExpectedDataList(scopeName, placeholder),
  ];
}
