import type { ScopeName } from '../../../../../src/tmlanguage';
import { $onOff } from '../../../../helpers/definition/parameter/$onOff';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/BlockInput.htm
export function createBlockInputExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'BlockInput';

  return [
    // Parameter 1: OnOff/SendMouse/MouseMove
    ...$onOff(
      scopeName,
      { index: 0, name: commandName, isLastParameter: true },
      [ 'Send', 'Mouse', 'SendAndMouse', 'Default', 'MouseMove', 'MouseMoveOff' ],
    ),
  ];
}
