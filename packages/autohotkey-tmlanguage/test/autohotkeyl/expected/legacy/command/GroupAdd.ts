import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import { $winTitle } from '../../../../helpers/definition/parameter/$winTitle.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/GroupAdd.htm
export function createGroupAddExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'GroupAdd';

  return [
    // Parameter 1: GroupName
    ...$(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: WinTitle
    ...$winTitle(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: WinText
    ...$(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: Label
    ...$(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: ExcludeTitle
    ...$winTitle(scopeName, { name: commandName, index: 4 }),

    // Parameter 6: ExcludeText
    ...$(scopeName, { name: commandName, index: 5, isLastParameter: true }),
  ];
}
