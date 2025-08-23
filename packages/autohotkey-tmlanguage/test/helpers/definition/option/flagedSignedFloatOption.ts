import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';
import { floatOption } from './floatOption';

export function flagedSignedFloatOption(scopeName: ScopeName, options: string[], placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...floatOption(scopeName, options, placeholder),
    ...[ '+', '-' ].flatMap((flag): ExpectedTestData[] => {
      return options.flatMap((option): ExpectedTestData[] => {
        return [
          createExpectedData(
            scopeName,
            `${flag}${option}+123.123`,
            [ { text: `${flag}${option}+123.123`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
            placeholder,
          ),
          createExpectedData(
            scopeName,
            `${flag}${option}-123.123`,
            [ { text: `${flag}${option}-123.123`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
            placeholder,
          ),
        ];
      });
    }),
  ];
}
