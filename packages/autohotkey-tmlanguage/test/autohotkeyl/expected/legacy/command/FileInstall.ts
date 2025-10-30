import type { ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $path } from '../../../../helpers/definition/parameter/$path';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/FileInstall.htm
export function createFileInstallExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileInstall';

  return [
    // Parameter 1: Source
    ...$path(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Dest
    ...$path(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Overwrite
    ...$expression(scopeName, { name: commandName, index: 2, isLastParameter: true }),
  ];
}
