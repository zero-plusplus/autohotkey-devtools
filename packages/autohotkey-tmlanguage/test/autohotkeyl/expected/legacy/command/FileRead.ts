import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { decimalOption } from '../../../../helpers/definition/option/decimalOption.ts';
import { keywordOption } from '../../../../helpers/definition/option/keywordOption.ts';
import { $output } from '../../../../helpers/definition/parameter/$output.ts';
import { $path } from '../../../../helpers/definition/parameter/$path.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/FileRead.htm
export function createFileReadExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileRead';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Filename
    ...((placeholder = { name: commandName, index: 1, isLastParameter: true }): ExpectedTestData[] => {
      return [
        ...$path(scopeName, placeholder),
        ...keywordOption(scopeName, [ '*c', '*t' ], placeholder),
        ...decimalOption(scopeName, [ '*m', '*P' ], placeholder),
      ];
    })(),
  ];
}
