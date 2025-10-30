import type { ScopeName } from '../../../../../src/tmlanguage';
import { $onOff } from '../../../../helpers/definition/parameter/$onOff';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/DetectHiddenWindows.htm
export function createDetectHiddenWindowsExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'DetectHiddenWindows';

  return [
    // Parameter 1: OnOff
    ...$onOff(scopeName, { index: 0, isLastParameter: true, name: commandName }),
  ];
}
