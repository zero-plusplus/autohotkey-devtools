import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $path } from '../../../../helpers/definition/parameter/$path';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/IniRead.htm
export function createIniReadExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'IniRead';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Filename
    ...$path(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Section
    ...$(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: Key
    ...$(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: Default
    ...$(scopeName, { name: commandName, index: 4, isLastParameter: true }),
  ];
}
