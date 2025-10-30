import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $regkey } from '../../../../helpers/definition/parameter/$regkey';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/RegDelete.htm
export function createRegDeleteExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'RegDelete';

  return [
    // Parameter 1: RootKey/KeyName
    ...$regkey(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: SubKey/ValueName
    ...$(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: ValueName
    ...$(scopeName, { name: commandName, index: 2, isLastParameter: true }),
  ];
}
