import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $glob } from '../../../../helpers/definition/parameter/$glob.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/FileDelete.htm
export function createFileDeleteExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileDelete';

  return [
    // Parameter 1: FilePattern
    ...$glob(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
