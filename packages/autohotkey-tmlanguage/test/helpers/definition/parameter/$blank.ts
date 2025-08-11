import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createKeywordInvalidExpectedDataList } from '../common/invalid';
import { createExpectedData, type Placeholder } from '../helpers';

export function $blank(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...createKeywordInvalidExpectedDataList(scopeName, placeholder),
    createExpectedData(
      scopeName,
      '% var',
      [
        { text: '%', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: 'var', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
      ],
      placeholder,
    ),
    ...[
      '%var%',
      '%a%b%c%',
    ].flatMap((value) => {
      return [
        createExpectedData(
          scopeName,
          value,
          [ { text: value, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) } ],
          placeholder,
        ),
      ];
    }),
  ];
}
