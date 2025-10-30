import type { ScopeName } from '../../../../../src/tmlanguage';
import { keywordOption } from '../../../../helpers/definition/option/keywordOption';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $path } from '../../../../helpers/definition/parameter/$path';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/FileCreateShortcut.htm
export function createFileCreateShortcutExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileCreateShortcut';

  return [
    // Parameter 1: Target
    ...$path(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: LinkFile
    ...$path(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: WorkingDir
    ...$path(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: Args
    ...$(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: Description
    ...$(scopeName, { name: commandName, index: 4 }),

    // Parameter 6: IconFile
    ...$path(scopeName, { name: commandName, index: 5 }),

    // Parameter 7: ShortcutKey
    ...$(scopeName, { name: commandName, index: 6 }),

    // Parameter 8: IconNumber
    ...$expression(scopeName, { name: commandName, index: 7 }),

    // Parameter 9: RunState
    ...((placeholder = { name: commandName, index: 8, isLastParameter: true }): ExpectedTestData[] => {
      return [
        ...$(scopeName, placeholder),
        ...keywordOption(scopeName, [ '1', '3', '7' ], placeholder),
      ];
    })(),
  ];
}
