import type { ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $path } from '../../../../helpers/definition/parameter/$path';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/FileRemoveDir.htm
export function createFileRemoveDirExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileRemoveDir';

  return [
    // Parameter 1: DirName
    ...$path(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Recurse
    ...$expression(scopeName, { name: commandName, index: 1, isLastParameter: true }),
  ];
}
