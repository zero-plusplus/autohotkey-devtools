import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $keyName } from '../../../../helpers/definition/parameter/$keyName.ts';
import { $output } from '../../../../helpers/definition/parameter/$output.ts';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/GetKeyState.htm
export function createGetKeyStateExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'GetKeyState';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0, deprecated: true }),

    // Parameter 2: KeyName
    ...$keyName(scopeName, { name: commandName, index: 1, deprecated: true }),

    // Parameter 3: Mode
    ...$shouldKeyword(scopeName, [ 'P', 'T' ], { name: commandName, index: 2, deprecated: true, isLastParameter: true }),
  ];
}
