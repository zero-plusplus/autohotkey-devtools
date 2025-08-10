import { isIntegerLike } from '@zero-plusplus/utilities/src';
import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData, ParsedResult } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';
import { createDereferenceInKeywordParameterExpectedDataList } from '../options/dereference';
import { createKeywordInvalidExpectedDataList } from '../options/invalid';
import { createPercentExpressionParameterExpectedDataList } from '../options/percentExpression';

export function $shouldSpacedKeyword(scopeName: ScopeName, keywords: string[][], placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...keywords.flatMap((options): ExpectedTestData[] => {
      return [
        createExpectedData(
          scopeName,
          options.join(' '),
          [
            ...options.map((option): ParsedResult => {
              return isIntegerLike(option)
                ? { text: option, scopes: name(scopeName, RuleName.Integer) }
                : { text: option, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) };
            }),
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
