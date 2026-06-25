import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';
import { keywordOption } from '../option/keywordOption.ts';
import { $ } from './$.ts';

export function $regkey(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    ...keywordOption(scopeName, [
      'HKEY_LOCAL_MACHINE',
      'HKLM',
      'HKEY_USERS',
      'HKU',
      'HKEY_CURRENT_USER',
      'HKCU',
      'HKEY_CLASSES_ROOT',
      'HKCR',
      'HKEY_CURRENT_CONFIG',
      'HKCC',
    ], placeholder),
    createCommandExpectedData(
      scopeName,
      `HKEY_LOCAL_MACHINE\\xxx`,
      [
        { text: 'HKEY_LOCAL_MACHINE', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: '\\xxx', scopes: name(scopeName, RuleName.UnquotedString) },
      ],
      placeholder,
    ),
  ];
}
