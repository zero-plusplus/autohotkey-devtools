import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $driveletter } from '../../../../helpers/definition/parameter/$driveletter.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/FileRecycleEmpty.htm
export function createFileRecycleEmptyExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileRecycleEmpty';

  return [
    // Parameter 1: DriveLetter
    ...$driveletter(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
