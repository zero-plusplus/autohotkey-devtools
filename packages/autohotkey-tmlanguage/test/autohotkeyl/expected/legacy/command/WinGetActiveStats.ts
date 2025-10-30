import type { ScopeName } from '../../../../../src/tmlanguage';
import { $output } from '../../../../helpers/definition/parameter/$output';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/WinGetActiveStats.htm
export function createWinGetActiveStatsExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'WinGetActiveStats';

  return [
    // Parameter 1: OutTitle
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: OutWidth
    ...$output(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: OutHeight
    ...$output(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: OutX
    ...$output(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: OutY
    ...$output(scopeName, { name: commandName, index: 4, isLastParameter: true }),
  ];
}
