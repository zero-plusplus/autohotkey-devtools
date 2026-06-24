import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $onOff } from '../../../../helpers/definition/parameter/$onOff.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/DetectHiddenWindows.htm
export function createDetectHiddenWindowsExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'DetectHiddenWindows';

  return [
    // Parameter 1: OnOff
    ...$onOff(scopeName, { index: 0, isLastParameter: true, name: commandName }),
  ];
}
