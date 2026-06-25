import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createKeywordInvalidExpectedDataList } from '../common/invalid.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';

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
