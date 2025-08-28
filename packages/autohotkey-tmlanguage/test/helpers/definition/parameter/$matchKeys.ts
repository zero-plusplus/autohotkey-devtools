import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';

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
