import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';

export function $invalidSubcommand(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    createExpectedData(
      scopeName,
      `invalid, 123,`,
      [
        { text: 'invalid', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: ',', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: '123', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
        { text: ',', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
      ],
      placeholder,
    ),
  ];
}
