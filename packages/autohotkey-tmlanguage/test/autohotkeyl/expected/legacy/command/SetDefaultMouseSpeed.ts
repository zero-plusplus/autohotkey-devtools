import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $expression } from '../../../../helpers/definition/parameter/$expression.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/SetDefaultMouseSpeed.htm
export function createSetDefaultMouseSpeedExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SetDefaultMouseSpeed';

  return [
    // Parameter 1: Delay
    ...$expression(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
