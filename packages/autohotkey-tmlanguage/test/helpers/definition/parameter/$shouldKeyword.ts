import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';
import { createDereferenceInKeywordParameterExpectedDataList } from '../options/dereference';
import { createKeywordInvalidExpectedDataList } from '../options/invalid';
import { createPercentExpressionParameterExpectedDataList } from '../options/percentExpression';

export function $shouldKeyword(scopeName: ScopeName, keywords: string[], placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...keywords.flatMap((param): ExpectedTestData[] => {
      return [
        createExpectedData(
          scopeName,
          param,
          [ { text: param, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
          placeholder,
        ),
      ];
    }),
    ...createPercentExpressionParameterExpectedDataList(scopeName, placeholder),
    ...createDereferenceInKeywordParameterExpectedDataList(scopeName, placeholder),
    ...createKeywordInvalidExpectedDataList(scopeName, placeholder),
  ];
}
