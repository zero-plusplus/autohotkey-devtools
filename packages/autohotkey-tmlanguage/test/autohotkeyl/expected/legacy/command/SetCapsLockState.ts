import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $onOff } from '../../../../helpers/definition/parameter/$onOff.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/SetCapsLockState.htm
export function createSetCapsLockStateExpectedDataList(scopeName: ScopeName, commandName = 'SetCapsLockState'): ExpectedTestData[] {
  return [
    // Parameter 1: State
    ...$onOff(scopeName, { name: commandName, index: 0, isLastParameter: true }, [ 'AlwaysOn', 'AlwaysOff' ]),
  ];
}
