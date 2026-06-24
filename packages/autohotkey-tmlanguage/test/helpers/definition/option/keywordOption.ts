import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';

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
