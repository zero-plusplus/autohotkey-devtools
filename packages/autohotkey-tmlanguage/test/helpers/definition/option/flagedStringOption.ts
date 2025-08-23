import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';
import { stringOption } from './stringOption';

export function flagedStringOption(scopeName: ScopeName, options: string[], placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...stringOption(scopeName, options, placeholder),
    ...[ '+', '-' ].flatMap((flag): ExpectedTestData[] => {
      return options.flatMap((option): ExpectedTestData[] => {
        return [
          createExpectedData(
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
