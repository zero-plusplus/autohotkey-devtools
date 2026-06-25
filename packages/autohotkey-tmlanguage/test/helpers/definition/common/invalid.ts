import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';

export function createKeywordInvalidExpectedDataList(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...[ 'invalid' ].flatMap((param): ExpectedTestData[] => {
      return [
        createCommandExpectedData(
          scopeName,
          param,
          [ { text: param, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) } ],
          placeholder,
        ),
      ];
    }),
  ];
}
