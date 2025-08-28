import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';
import { keywordOption } from '../option/keywordOption';
import { $ } from './$';

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
