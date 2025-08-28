import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';

export function decimalOption(scopeName: ScopeName, options: string[], placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...[ '123' ].flatMap((value): ExpectedTestData[] => {
      return options.flatMap((option): ExpectedTestData[] => {
        return [
          createCommandExpectedData(
            scopeName,
            `${option}${value}`,
            [ { text: `${option}${value}`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
            placeholder,
          ),
          createCommandExpectedData(
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
          createCommandExpectedData(
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
