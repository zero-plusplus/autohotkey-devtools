import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $winTitle } from '../../../../helpers/definition/parameter/$winTitle';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/WinClose.htm
export function createWinCloseExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'WinClose';

  return [
    // Parameter 1: WinTitle
    ...$winTitle(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: WinText
    ...$(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: SecondsToWait
    ...$expression(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: ExcludeTitle
    ...$winTitle(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: ExcludeText
    ...$(scopeName, { name: commandName, index: 4, isLastParameter: true }),
  ];
}
