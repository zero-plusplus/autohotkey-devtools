import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $winTitle } from '../../../../helpers/definition/parameter/$winTitle';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/StatusBarGetText.htm
export function createStatusBarGetTextExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'StatusBarGetText';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Part#
    ...$expression(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: WinTitle
    ...$winTitle(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: WinText
    ...$(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: ExcludeTitle
    ...$winTitle(scopeName, { name: commandName, index: 4 }),

    // Parameter 6: ExcludeText
    ...$(scopeName, { name: commandName, index: 5, isLastParameter: true }),
  ];
}
