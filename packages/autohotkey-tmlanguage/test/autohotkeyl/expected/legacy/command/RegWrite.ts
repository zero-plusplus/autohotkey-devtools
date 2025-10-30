import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $regkey } from '../../../../helpers/definition/parameter/$regkey';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import { $withNumber } from '../../../../helpers/definition/parameter/$withNumber';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/RegWrite.htm
export function createRegWriteExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'RegWrite';

  return [
    // Parameter 1: ValueType
    ...$shouldKeyword(scopeName, [
      'REG_SZ',
      'REG_EXPAND_SZ',
      'REG_MULTI_SZ',
      'REG_DWORD',
      'REG_BINARY',
    ], { name: commandName, index: 0 }),

    // Parameter 2: RootKey/KeyName
    ...$regkey(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: SubKey/ValueName
    ...$(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: ValueName/Value
    ...$withNumber(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: /Value
    ...$withNumber(scopeName, { name: commandName, index: 4, isLastParameter: true }),
  ];
}
