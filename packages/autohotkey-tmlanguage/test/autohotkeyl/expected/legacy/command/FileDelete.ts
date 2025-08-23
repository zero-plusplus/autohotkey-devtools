import type { ScopeName } from '../../../../../src/tmlanguage';
import { $glob } from '../../../../helpers/definition/parameter/$glob';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/FileDelete.htm
export function createFileDeleteExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileDelete';

  return [
    // Parameter 1: FilePattern
    ...$glob(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
