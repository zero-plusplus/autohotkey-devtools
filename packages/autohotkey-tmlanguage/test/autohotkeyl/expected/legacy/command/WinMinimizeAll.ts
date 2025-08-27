import type { ScopeName } from '../../../../../src/tmlanguage';
import { $blank } from '../../../../helpers/definition/parameter/$blank';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/WinMinimizeAll.htm
export function createWinMinimizeAllExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'WinMinimizeAll';

  return [
    // ParameterLess
    ...$blank(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
