import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $regkey } from '../../../../helpers/definition/parameter/$regkey';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/RegRead.htm
export function createRegReadExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'RegRead';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: RootKey/KeyName
    ...$regkey(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: SubKey/ValueName
    ...$(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: ValueName
    ...$(scopeName, { name: commandName, index: 3, isLastParameter: true }),
  ];
}
