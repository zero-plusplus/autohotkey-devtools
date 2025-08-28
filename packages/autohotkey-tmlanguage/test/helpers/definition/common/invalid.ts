import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';

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
