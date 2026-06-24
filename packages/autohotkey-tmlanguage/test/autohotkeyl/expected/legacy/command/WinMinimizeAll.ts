import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $blank } from '../../../../helpers/definition/parameter/$blank.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/WinMinimizeAll.htm
export function createWinMinimizeAllExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'WinMinimizeAll';

  return [
    // ParameterLess
    ...$blank(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
