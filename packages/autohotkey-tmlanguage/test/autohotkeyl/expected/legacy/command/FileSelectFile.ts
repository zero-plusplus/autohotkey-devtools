import type { ScopeName } from '../../../../../src/tmlanguage';
import { decimalOption } from '../../../../helpers/definition/option/decimalOption';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $path } from '../../../../helpers/definition/parameter/$path';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/FileSelectFile.htm
export function createFileSelectFileExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileSelectFile';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Options
    ...((placeholder = { name: commandName, index: 1 }): ExpectedTestData[] => {
      return [
        ...$shouldInteger(scopeName, placeholder),
        ...decimalOption(scopeName, [ 'M', 'S' ], placeholder),
      ];
    })(),

    // Parameter 3: RootDir\Filename
    ...$path(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: Title
    ...$(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: Filter
    ...$(scopeName, { name: commandName, index: 4, isLastParameter: true }),
  ];
}
