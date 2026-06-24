import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';
import { sizeOption } from './sizeOption.ts';

export function flagedSizeOption(scopeName: ScopeName, options: string[], placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...sizeOption(scopeName, options, placeholder),
    ...[ '+', '-' ].flatMap((flag): ExpectedTestData[] => {
      return options.flatMap((option): ExpectedTestData[] => {
        return [
          createCommandExpectedData(
            scopeName,
            `${flag}${option}100-100`,
            [ { text: `${flag}${option}100-100`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
            placeholder,
          ),
        ];
      });
    }),
  ];
}
