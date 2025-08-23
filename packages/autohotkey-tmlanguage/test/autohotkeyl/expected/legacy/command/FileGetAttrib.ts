import type { ScopeName } from '../../../../../src/tmlanguage';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $path } from '../../../../helpers/definition/parameter/$path';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/FileGetAttrib.htm
export function createFileGetAttribExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileGetAttrib';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Filename
    ...$path(scopeName, { name: commandName, index: 1, isLastParameter: true }),
  ];
}
