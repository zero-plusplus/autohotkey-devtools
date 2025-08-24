import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';
import { $ } from './$';

export function $menuItemName(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    createExpectedData(
      scopeName,
      `&menuName`,
      [
        { text: `&m`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Underline) },
        { text: `enuName`, scopes: name(scopeName, RuleName.UnquotedString) },
      ],
      placeholder,
    ),
    createExpectedData(
      scopeName,
      `&&`,
      [ { text: `&&`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Escape) } ],
      placeholder,
    ),
    createExpectedData(
      scopeName,
      `&`,
      [ { text: `&`, scopes: name(scopeName, RuleName.UnquotedString) } ],
      placeholder,
    ),
  ];
}
