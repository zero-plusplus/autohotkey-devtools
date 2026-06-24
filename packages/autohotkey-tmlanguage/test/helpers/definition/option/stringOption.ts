import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';

export function stringOption(scopeName: ScopeName, options: string[], placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...options.flatMap((option): ExpectedTestData[] => {
      return [
        createCommandExpectedData(
          scopeName,
          `${option}abc`,
          [ { text: `${option}abc`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
          placeholder,
        ),
      ];
    }),
  ];
}
