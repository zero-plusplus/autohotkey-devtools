import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';

export function stringOption(scopeName: ScopeName, options: string[], placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...options.flatMap((option): ExpectedTestData[] => {
      return [
        createExpectedData(
          scopeName,
          `${option}abc`,
          [ { text: `${option}abc`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
          placeholder,
        ),
      ];
    }),
  ];
}
