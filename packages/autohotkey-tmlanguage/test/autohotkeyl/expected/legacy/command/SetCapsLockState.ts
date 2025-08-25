import type { ScopeName } from '../../../../../src/tmlanguage';
import { $onOff } from '../../../../helpers/definition/parameter/$onOff';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/SetCapsLockState.htm
export function createSetCapsLockStateExpectedDataList(scopeName: ScopeName, commandName = 'SetCapsLockState'): ExpectedTestData[] {
  return [
    // Parameter 1: State
    ...$onOff(scopeName, { name: commandName, index: 0, isLastParameter: true }, [ 'AlwaysOn', 'AlwaysOff' ]),
  ];
}
