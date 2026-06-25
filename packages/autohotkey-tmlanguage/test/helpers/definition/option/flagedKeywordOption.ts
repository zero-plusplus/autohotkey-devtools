import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';
import { keywordOption } from './keywordOption.ts';

export function flagedKeywordOption(scopeName: ScopeName, keywords: string[], placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...keywordOption(scopeName, keywords, placeholder),
    ...keywords.flatMap((keyword): ExpectedTestData[] => {
      return [ '+', '-' ].flatMap((flag) => {
        return [
          createCommandExpectedData(
            scopeName,
            `${flag}${keyword}`,
            [ { text: `${flag}${keyword}`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
            placeholder,
          ),
        ];
      });
    }),
  ];
}
