import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';

export function colorOption(scopeName: ScopeName, options: string[], placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...[ 'black', 'FFFFFF', 'default' ].flatMap((value): ExpectedTestData[] => {
      return options.flatMap((option): ExpectedTestData[] => {
        return [
          createExpectedData(
            scopeName,
            `${option}${value}`,
            [ { text: `${option}${value}`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
            placeholder,
          ),
          createExpectedData(
            scopeName,
            `${option}%var%`,
            [
              { text: option, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
              { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
              { text: 'var', scopes: name(scopeName, RuleName.Variable) },
              { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            ],
            placeholder,
          ),
          createExpectedData(
            scopeName,
            `${option}%a%b%c%`,
            [
              { text: option, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
              { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
              { text: 'a', scopes: name(scopeName, RuleName.Variable) },
              { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
              { text: 'b', scopes: name(scopeName, RuleName.Variable) },
              { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
              { text: 'c', scopes: name(scopeName, RuleName.Variable) },
              { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
            ],
            placeholder,
          ),
        ];
      });
    }),
  ];
}
