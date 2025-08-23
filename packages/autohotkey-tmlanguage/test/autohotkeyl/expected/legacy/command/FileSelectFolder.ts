import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $path } from '../../../../helpers/definition/parameter/$path';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/FileSelectFolder.htm
export function createFileSelectFolderExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileSelectFolder';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: StartingFolder
    ...$path(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Options
    ...$expression(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: Prompt
    ...$(scopeName, { name: commandName, index: 3, isLastParameter: true }),
  ];
}
