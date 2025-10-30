import type { ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/SetKeyDelay.htm
export function createSetKeyDelayExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SetKeyDelay';

  return [
    // Parameter 1: Delay
    ...$expression(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: PressDuration
    ...$expression(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Play
    ...$shouldKeyword(scopeName, [ 'Play' ], { name: commandName, index: 2, isLastParameter: true }),
  ];
}
