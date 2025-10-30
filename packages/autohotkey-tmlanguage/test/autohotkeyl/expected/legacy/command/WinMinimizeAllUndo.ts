import type { ScopeName } from '../../../../../src/tmlanguage';
import { $blank } from '../../../../helpers/definition/parameter/$blank';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/WinMinimizeAllUndo.htm
export function createWinMinimizeAllUndoExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'WinMinimizeAllUndo';

  return [
    // ParameterLess
    ...$blank(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
