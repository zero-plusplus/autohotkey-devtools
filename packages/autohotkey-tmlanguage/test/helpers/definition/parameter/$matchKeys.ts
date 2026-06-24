import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';

export function $matchKeys(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    createCommandExpectedData(
      scopeName,
      `a,b,c`,
      [
        { text: `a`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: `,`, scopes: name(scopeName, RuleName.UnquotedString) },
        { text: `b`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: `,`, scopes: name(scopeName, RuleName.UnquotedString) },
        { text: `c`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
      ],
      placeholder,
    ),
  ];
}
