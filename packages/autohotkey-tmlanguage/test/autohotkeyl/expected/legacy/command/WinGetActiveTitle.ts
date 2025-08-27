import type { ScopeName } from '../../../../../src/tmlanguage';
import { $output } from '../../../../helpers/definition/parameter/$output';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/WinGetActiveTitle.htm
export function createWinGetActiveTitleExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'WinGetActiveTitle';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
