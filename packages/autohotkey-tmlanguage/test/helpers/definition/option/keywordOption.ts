import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';

export function keywordOption(scopeName: ScopeName, keywords: string[], placeholder: Placeholder): ExpectedTestData[] {
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
  ];
}
