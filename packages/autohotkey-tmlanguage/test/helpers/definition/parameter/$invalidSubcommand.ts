import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';

export function $invalidSubcommand(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    createCommandExpectedData(
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
