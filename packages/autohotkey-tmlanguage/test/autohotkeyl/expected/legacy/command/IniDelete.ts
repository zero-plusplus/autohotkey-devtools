import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $path } from '../../../../helpers/definition/parameter/$path';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/IniDelete.htm
export function createIniDeleteExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'IniDelete';

  return [
    // Parameter 1: Filename
    ...$path(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Section
    ...$(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Key
    ...$(scopeName, { name: commandName, index: 2, isLastParameter: true }),
  ];
}
