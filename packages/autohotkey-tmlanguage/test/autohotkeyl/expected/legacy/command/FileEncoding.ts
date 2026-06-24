import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $encoding } from '../../../../helpers/definition/parameter/$encoding.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/FileEncoding.htm
export function createFileEncodingExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileEncoding';

  return [
    // Parameter 1: Encoding
    ...$encoding(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
