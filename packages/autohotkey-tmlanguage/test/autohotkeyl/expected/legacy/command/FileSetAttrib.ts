import type { ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $fileAttributes } from '../../../../helpers/definition/parameter/$fileAttributes';
import { $glob } from '../../../../helpers/definition/parameter/$glob';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/FileSetAttrib.htm
export function createFileSetAttribExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileSetAttrib';

  return [
    // Parameter 1: Attributes
    ...$fileAttributes(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: FilePattern
    ...$glob(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: OperateOnFolders
    ...$expression(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: Recurse
    ...$expression(scopeName, { name: commandName, index: 3, isLastParameter: true }),
  ];
}
