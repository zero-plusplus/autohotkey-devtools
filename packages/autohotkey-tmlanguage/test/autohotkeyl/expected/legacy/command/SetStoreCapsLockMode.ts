import type { ScopeName } from '../../../../../src/tmlanguage';
import { $onOff } from '../../../../helpers/definition/parameter/$onOff';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/SetStoreCapsLockMode.htm
export function createSetStoreCapsLockModeExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SetStoreCapsLockMode';

  return [
    // Parameter 1: OnOff
    ...$onOff(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
