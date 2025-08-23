import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';
import { hexOption } from './hexOption';

export function flagedHexOption(scopeName: ScopeName, options: string[], placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...hexOption(scopeName, options, placeholder),
    ...[ '+', '-' ].flatMap((flag): ExpectedTestData[] => {
      return options.flatMap((option): ExpectedTestData[] => {
        return [
          createExpectedData(
            scopeName,
            `${option}0x123FF`,
            [ { text: `${option}0x123FF`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
            placeholder,
          ),
        ];
      });
    }),
  ];
}
