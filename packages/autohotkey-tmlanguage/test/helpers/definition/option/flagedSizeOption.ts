import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';
import { sizeOption } from './sizeOption';

export function flagedSizeOption(scopeName: ScopeName, options: string[], placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...sizeOption(scopeName, options, placeholder),
    ...[ '+', '-' ].flatMap((flag): ExpectedTestData[] => {
      return options.flatMap((option): ExpectedTestData[] => {
        return [
          createExpectedData(
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
