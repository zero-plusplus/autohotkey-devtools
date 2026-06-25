import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import { $output } from '../../../../helpers/definition/parameter/$output.ts';
import { $winTitle } from '../../../../helpers/definition/parameter/$winTitle.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/WinGetPos.htm
export function createWinGetPosExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'WinGetPos';

  return [
    // Parameter 1: OutX
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: OutY
    ...$output(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: OutWidth
    ...$output(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: OutHeight
    ...$output(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: WinTitle
    ...$winTitle(scopeName, { name: commandName, index: 4 }),

    // Parameter 6: WinText
    ...$(scopeName, { name: commandName, index: 5 }),

    // Parameter 7: ExcludeTitle
    ...$winTitle(scopeName, { name: commandName, index: 6 }),

    // Parameter 8: ExcludeText
    ...$(scopeName, { name: commandName, index: 7, isLastParameter: true }),
  ];
}
