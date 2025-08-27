import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $winTitle } from '../../../../helpers/definition/parameter/$winTitle';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/WinRestore.htm
export function createWinRestoreExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'WinRestore';

  return [
    // Parameter 1: WinTitle
    ...$winTitle(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: WinText
    ...$(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: ExcludeTitle
    ...$winTitle(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: ExcludeText
    ...$(scopeName, { name: commandName, index: 3, isLastParameter: true }),
  ];
}
