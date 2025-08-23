import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';
import { toggleOption } from './toggleOption';

export function flagedToggleOption(scopeName: ScopeName, options: string[], placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...toggleOption(scopeName, options, placeholder),
    ...[ '+', '-' ].flatMap((flag): ExpectedTestData[] => {
      return options.flatMap((option): ExpectedTestData[] => {
        return [
          createExpectedData(
            scopeName,
            `${flag}${option}0`,
            [ { text: `${flag}${option}0`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
            placeholder,
          ),
        ];
      });
    }),
  ];
}
