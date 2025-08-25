import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { Placeholder } from '../helpers';
import { keywordOption } from '../option/keywordOption';
import { $ } from './$';

export function $regkey(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
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
  ];
}
