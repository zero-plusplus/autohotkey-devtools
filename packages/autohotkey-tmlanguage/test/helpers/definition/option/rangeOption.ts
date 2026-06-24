import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';

export function rangeOption(scopeName: ScopeName, options: string[], placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...options.flatMap((option): ExpectedTestData[] => {
      return [
        createCommandExpectedData(
          scopeName,
          `${option}100x100`,
          [ { text: `${option}100x100`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
          placeholder,
        ),
      ];
    }),
  ];
}
