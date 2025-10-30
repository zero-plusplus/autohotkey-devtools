import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $winTitle } from '../../../../helpers/definition/parameter/$winTitle';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/StatusBarWait.htm
export function createStatusBarWaitExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'StatusBarWait';

  return [
    // Parameter 1: BarText
    ...$(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Timeout
    ...$expression(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Part#
    ...$expression(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: WinTitle
    ...$winTitle(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: WinText
    ...$(scopeName, { name: commandName, index: 4 }),

    // Parameter 6: Interval
    ...$expression(scopeName, { name: commandName, index: 5 }),

    // Parameter 7: ExcludeTitle
    ...$winTitle(scopeName, { name: commandName, index: 6 }),

    // Parameter 8: ExcludeText
    ...$(scopeName, { name: commandName, index: 7, isLastParameter: true }),
  ];
}
