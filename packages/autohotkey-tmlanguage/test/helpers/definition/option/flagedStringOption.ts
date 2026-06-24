import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';
import { stringOption } from './stringOption.ts';

export function flagedStringOption(scopeName: ScopeName, options: string[], placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...stringOption(scopeName, options, placeholder),
    ...[ '+', '-' ].flatMap((flag): ExpectedTestData[] => {
      return options.flatMap((option): ExpectedTestData[] => {
        return [
          createCommandExpectedData(
            scopeName,
            `${flag}${option}abc`,
            [ { text: `${flag}${option}abc`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
            placeholder,
          ),
        ];
      });
    }),
  ];
}
