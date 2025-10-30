import type { ScopeName } from '../../../../../src/tmlanguage';
import { $driveletter } from '../../../../helpers/definition/parameter/$driveletter';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/FileRecycleEmpty.htm
export function createFileRecycleEmptyExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileRecycleEmpty';

  return [
    // Parameter 1: DriveLetter
    ...$driveletter(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
