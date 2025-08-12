import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData, ParsedResult } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';

type OptionNameAndValue = [ string, string ];
export function decimalOption(scopeName: ScopeName, optionEntries: OptionNameAndValue[], placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...optionEntries.flatMap(([ optionName, value ]): ExpectedTestData[] => {
      return [
        createExpectedData(
          scopeName,
          `${optionName}${value}`,
          [ { text: `${optionName}${value}`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
          placeholder,
        ),
        createExpectedData(
          scopeName,
          `${optionName}%var%`,
          [
            { text: optionName, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
            { text: '%', scopes: name(scopeName, RuleName.PercentBegin) },
            { text: 'var', scopes: name(scopeName, RuleName.Variable) },
            { text: '%', scopes: name(scopeName, RuleName.PercentEnd) },
          ],
          placeholder,
        ),
        createExpectedData(
          scopeName,
          `${optionName}%a%b%c%`,
          [
            { text: optionName, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
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
    }),

    createExpectedData(
      scopeName,
      optionEntries.map(([ optionName, value ]) => `${optionName}${value}`).join(' '),
      optionEntries.flatMap(([ optionName, value ]): ParsedResult[] => {
        return [ { text: `${optionName}${value}`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ];
      }),
      placeholder,
    ),
  ];
}
