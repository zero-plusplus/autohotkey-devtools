import type { ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/ClipWait.htm
export function createClipWaitExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const name = 'ClipWait';

  return [
    // Parameter 1: Timeout
    ...$expression(scopeName, { name, index: 0 }),

    // Parameter 2: WaitFor
    ...$expression(scopeName, { name, index: 1, isLastParameter: true }),
  ];
}
