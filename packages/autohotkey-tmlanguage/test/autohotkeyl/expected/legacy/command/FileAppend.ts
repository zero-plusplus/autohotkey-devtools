import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import { $encoding } from '../../../../helpers/definition/parameter/$encoding.ts';
import { $path } from '../../../../helpers/definition/parameter/$path.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/FileAppend.htm
export function createFileAppendExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileAppend';

  return [
    // Parameter 1: Text
    ...$(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Filename
    ...$path(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Encoding
    ...$encoding(scopeName, { name: commandName, index: 2, isLastParameter: true }),
  ];
}
