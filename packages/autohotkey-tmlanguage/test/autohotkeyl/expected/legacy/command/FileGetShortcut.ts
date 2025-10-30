import type { ScopeName } from '../../../../../src/tmlanguage';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $path } from '../../../../helpers/definition/parameter/$path';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/FileGetShortcut.htm
export function createFileGetShortcutExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileGetShortcut';

  return [
    // Parameter 1: LinkFile
    ...$path(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: OutTarget
    ...$output(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: OutDir
    ...$output(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: OutArgs
    ...$output(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: OutDescription
    ...$output(scopeName, { name: commandName, index: 4 }),

    // Parameter 6: OutIcon
    ...$output(scopeName, { name: commandName, index: 5 }),

    // Parameter 7: OutIconNum
    ...$output(scopeName, { name: commandName, index: 6 }),

    // Parameter 8: OutIcon
    ...$output(scopeName, { name: commandName, index: 7, isLastParameter: true }),
  ];
}
