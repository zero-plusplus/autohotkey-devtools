import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createKeywordInvalidExpectedDataList } from '../common/invalid';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';

export function $blank(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...createKeywordInvalidExpectedDataList(scopeName, placeholder),
    createCommandExpectedData(
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
        createCommandExpectedData(
          scopeName,
          value,
          [ { text: value, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) } ],
          placeholder,
        ),
      ];
    }),
  ];
}
