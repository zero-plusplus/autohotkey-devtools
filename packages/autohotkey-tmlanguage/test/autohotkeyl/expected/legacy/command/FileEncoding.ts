import type { ScopeName } from '../../../../../src/tmlanguage';
import { $encoding } from '../../../../helpers/definition/parameter/$encoding';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/FileEncoding.htm
export function createFileEncodingExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileEncoding';

  return [
    // Parameter 1: Encoding
    ...$encoding(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
