import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';

export function $endKeys(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    createCommandExpectedData(
      scopeName,
      `{Ctrl}`,
      [ { text: `{Ctrl}`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
      placeholder,
    ),
  ];
}
