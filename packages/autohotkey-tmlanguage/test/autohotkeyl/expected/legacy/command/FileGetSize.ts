import type { ScopeName } from '../../../../../src/tmlanguage';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $path } from '../../../../helpers/definition/parameter/$path';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/FileGetSize.htm
export function createFileGetSizeExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileGetSize';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Filename
    ...$path(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Units
    ...$shouldKeyword(scopeName, [ 'B', 'K', 'M' ], { name: commandName, index: 2, isLastParameter: true }),
  ];
}
