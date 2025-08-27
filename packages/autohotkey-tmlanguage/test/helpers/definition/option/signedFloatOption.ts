import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';

export function signedFloatOption(scopeName: ScopeName, options: string[], placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...[ '+', '-' ].flatMap((sign) => {
      return [ '123', '123.123' ].flatMap((value): ExpectedTestData[] => {
        return options.flatMap((option): ExpectedTestData[] => {
          return [
            createExpectedData(
              scopeName,
              `${option}${sign}${value}`,
              [ { text: `${option}${sign}${value}`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
              placeholder,
            ),
            createExpectedData(
              scopeName,
              `${option}${sign}%var%`,
              [
                { text: `${option}${sign}`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
                { text: 'var', scopes: name(scopeName, RuleName.Variable) },
                { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
              ],
              placeholder,
            ),
            createExpectedData(
              scopeName,
              `${option}${sign}%a%b%c%`,
              [
                { text: `${option}${sign}`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
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
      });
    }),
  ];
}
