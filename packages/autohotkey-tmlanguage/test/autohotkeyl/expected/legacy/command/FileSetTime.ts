import type { ScopeName } from '../../../../../src/tmlanguage';
import { letterOption } from '../../../../helpers/definition/option/letterOption';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $glob } from '../../../../helpers/definition/parameter/$glob';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/FileSetTime.htm
export function createFileSetTimeExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileSetTime';

  return [
    // Parameter 1: YYYYMMDDHH24MISS
    ...$expression(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: FilePattern
    ...$glob(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: WhichTime
    ...((placeholder = { name: commandName, index: 2 }): ExpectedTestData[] => {
      return [
        ...$shouldKeyword(scopeName, [ 'M', 'C', 'A' ], placeholder),
        ...letterOption(scopeName, [ 'M', 'C', 'A' ], placeholder),
      ];
    })(),

    // Parameter 4: OperateOnFolders
    ...$expression(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: Recurse
    ...$expression(scopeName, { name: commandName, index: 4, isLastParameter: true }),
  ];
}
