import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';

export function createKeywordInvalidExpectedDataList(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...[ 'invalid' ].flatMap((param): ExpectedTestData[] => {
      return [
        createExpectedData(
          scopeName,
          param,
          [ { text: param, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) } ],
          placeholder,
        ),
      ];
    }),
  ];
}
