import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $output } from '../../../../helpers/definition/parameter/$output.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/WinGetActiveTitle.htm
export function createWinGetActiveTitleExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'WinGetActiveTitle';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
