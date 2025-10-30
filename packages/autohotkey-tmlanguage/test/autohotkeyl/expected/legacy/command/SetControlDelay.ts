import type { ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/SetControlDelay.htm
export function createSetControlDelayExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SetControlDelay';

  return [
    // Parameter 1: Delay
    ...$expression(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
