import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';
import { keywordOption } from './keywordOption';

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
