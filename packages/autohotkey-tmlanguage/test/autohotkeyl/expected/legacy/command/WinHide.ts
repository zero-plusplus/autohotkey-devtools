import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import { $winTitle } from '../../../../helpers/definition/parameter/$winTitle.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/WinHide.htm
export function createWinHideExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'WinHide';

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
