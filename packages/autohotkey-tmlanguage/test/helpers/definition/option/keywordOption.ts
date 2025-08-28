import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';

export function keywordOption(scopeName: ScopeName, keywords: string[], placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...keywords.flatMap((keyword): ExpectedTestData[] => {
      return [
        createCommandExpectedData(
          scopeName,
          keyword,
          [ { text: keyword, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
          placeholder,
        ),
      ];
    }),
  ];
}
