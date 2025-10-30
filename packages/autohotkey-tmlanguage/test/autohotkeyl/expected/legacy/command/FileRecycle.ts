import type { ScopeName } from '../../../../../src/tmlanguage';
import { $glob } from '../../../../helpers/definition/parameter/$glob';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/FileRecycle.htm
export function createFileRecycleExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileRecycle';

  return [
    // Parameter 1: FilePattern
    ...$glob(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
