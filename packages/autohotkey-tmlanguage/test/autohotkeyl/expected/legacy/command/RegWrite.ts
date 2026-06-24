import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import { $regkey } from '../../../../helpers/definition/parameter/$regkey.ts';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword.ts';
import { $withNumber } from '../../../../helpers/definition/parameter/$withNumber.ts';
import type { ExpectedTestData } from '../../../../types.ts';

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
