import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $menuItemName } from '../../../../helpers/definition/parameter/$menuItemName';
import { $winTitle } from '../../../../helpers/definition/parameter/$winTitle';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/WinMenuSelectItem.htm
export function createWinMenuSelectItemExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'WinMenuSelectItem';

  return [
    // Parameter 1: WinTitle
    ...$winTitle(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: WinText
    ...$(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Menu
    ...$menuItemName(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: SubMenu1
    ...$(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: SubMenu2
    ...$(scopeName, { name: commandName, index: 4 }),

    // Parameter 6: SubMenu3
    ...$(scopeName, { name: commandName, index: 5 }),

    // Parameter 7: SubMenu4
    ...$(scopeName, { name: commandName, index: 6 }),

    // Parameter 8: SubMenu5
    ...$(scopeName, { name: commandName, index: 7 }),

    // Parameter 9: SubMenu6
    ...$(scopeName, { name: commandName, index: 8 }),

    // Parameter 10: ExcludeTitle
    ...$winTitle(scopeName, { name: commandName, index: 9 }),

    // Parameter 11: ExcludeText
    ...$(scopeName, { name: commandName, index: 10, isLastParameter: true }),
  ];
}
