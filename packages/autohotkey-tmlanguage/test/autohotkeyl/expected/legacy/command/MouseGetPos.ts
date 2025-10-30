import type { ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $output } from '../../../../helpers/definition/parameter/$output';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/MouseGetPos.htm
export function createMouseGetPosExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'MouseGetPos';

  return [
    // Parameter 1: OutputVarX
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: OutputVarY
    ...$output(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: OutputVarWin
    ...$output(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: OutputVarControl
    ...$output(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: Flag
    ...$expression(scopeName, { name: commandName, index: 4, isLastParameter: true }),
  ];
}
