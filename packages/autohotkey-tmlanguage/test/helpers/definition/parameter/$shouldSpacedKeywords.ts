import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createDereferenceInKeywordParameterExpectedDataList } from '../common/dereference';
import { createKeywordInvalidExpectedDataList } from '../common/invalid';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression';
import { createExpectedData, type Placeholder } from '../helpers';

export function $shouldSpacedKeywords(scopeName: ScopeName, keywords: string[], placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...keywords.flatMap((keyword): ExpectedTestData[] => {
      return [
        createExpectedData(
          scopeName,
          keyword,
          [ { text: keyword, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
          placeholder,
        ),
      ];
    }),
    createExpectedData(
      scopeName,
      keywords.join(' '),
      keywords.map((keyword) => ({ text: keyword, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) })),
      placeholder,
    ),
    createExpectedData(
      scopeName,
      `XXX`,
      [ { text: 'XXX', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) } ],
      placeholder,
    ),
    ...createPercentExpressionParameterExpectedDataList(scopeName, placeholder),
    ...createDereferenceInKeywordParameterExpectedDataList(scopeName, placeholder),
    ...createKeywordInvalidExpectedDataList(scopeName, placeholder),
  ];
}
