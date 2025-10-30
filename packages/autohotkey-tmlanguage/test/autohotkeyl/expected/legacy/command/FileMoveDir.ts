import type { ScopeName } from '../../../../../src/tmlanguage';
import { $path } from '../../../../helpers/definition/parameter/$path';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/FileMoveDir.htm
export function createFileMoveDirExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileMoveDir';

  return [
    // Parameter 1: Source
    ...$path(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Dest
    ...$path(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: OverwriteOrRename
    ...$shouldKeyword(scopeName, [ '0', '1', '2', 'R' ], { name: commandName, index: 2, isLastParameter: true }),
  ];
}
