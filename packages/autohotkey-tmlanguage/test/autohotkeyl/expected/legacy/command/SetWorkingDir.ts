import type { ScopeName } from '../../../../../src/tmlanguage';
import { $path } from '../../../../helpers/definition/parameter/$path';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/SetWorkingDir.htm
export function createSetWorkingDirExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SetWorkingDir';

  return [
    // Parameter 1: DirName
    ...$path(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
