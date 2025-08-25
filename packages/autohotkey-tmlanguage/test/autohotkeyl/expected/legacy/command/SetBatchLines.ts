import type { ScopeName } from '../../../../../src/tmlanguage';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/SetBatchLines.htm
export function createSetBatchLinesExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SetBatchLines';

  return [
    // Parameter 1: Milliseconds/LineCount
    ...$shouldInteger(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
