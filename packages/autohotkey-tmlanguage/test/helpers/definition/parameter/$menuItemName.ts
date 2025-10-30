import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';
import { $ } from './$';

export function $menuItemName(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    createCommandExpectedData(
      scopeName,
      `&menuName`,
      [
        { text: `&m`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Underline) },
        { text: `enuName`, scopes: name(scopeName, RuleName.UnquotedString) },
      ],
      placeholder,
    ),
    createCommandExpectedData(
      scopeName,
      `&&`,
      [ { text: `&&`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Escape) } ],
      placeholder,
    ),
    createCommandExpectedData(
      scopeName,
      `&`,
      [ { text: `&`, scopes: name(scopeName, RuleName.UnquotedString) } ],
      placeholder,
    ),
  ];
}
