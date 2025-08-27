import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $winTitle } from '../../../../helpers/definition/parameter/$winTitle';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/WinGetTitle.htm
export function createWinGetTitleExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'WinGetTitle';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: WinTitle
    ...$winTitle(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: WinText
    ...$(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: ExcludeTitle
    ...$winTitle(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: ExcludeText
    ...$(scopeName, { name: commandName, index: 4, isLastParameter: true }),
  ];
}
