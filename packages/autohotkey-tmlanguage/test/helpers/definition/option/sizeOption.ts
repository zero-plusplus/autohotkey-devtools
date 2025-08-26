import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';

export function sizeOption(scopeName: ScopeName, options: string[], placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...options.flatMap((option): ExpectedTestData[] => {
      return [
        createExpectedData(
          scopeName,
          `${option}100-100`,
          [ { text: `${option}100-100`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
          placeholder,
        ),
      ];
    }),
  ];
}
