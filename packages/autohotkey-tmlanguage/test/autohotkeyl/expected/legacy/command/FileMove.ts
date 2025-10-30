import type { ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $glob } from '../../../../helpers/definition/parameter/$glob';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/FileMove.htm
export function createFileMoveExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileMove';

  return [
    // Parameter 1: SourcePattern
    ...$glob(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: DestPattern
    ...$glob(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Overwrite
    ...$expression(scopeName, { name: commandName, index: 2, isLastParameter: true }),
  ];
}
