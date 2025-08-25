import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $shouldFloat } from '../../../../helpers/definition/parameter/$shouldFloat';
import { $withNumber } from '../../../../helpers/definition/parameter/$withNumber';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/MsgBox.htm
export function createMsgBoxExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'MsgBox';

  return [
    // Parameter 1: Text/Options
    ...$withNumber(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Title
    ...$(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Text
    ...$(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: Timeout
    ...$shouldFloat(scopeName, { name: commandName, index: 3, isLastParameter: true }),
  ];
}
