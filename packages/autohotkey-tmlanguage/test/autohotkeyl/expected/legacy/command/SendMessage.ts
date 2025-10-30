import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $control } from '../../../../helpers/definition/parameter/$control';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $winTitle } from '../../../../helpers/definition/parameter/$winTitle';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/SendMessage.htm
export function createSendMessageExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SendMessage';

  return [
    // Parameter 1: MsgNumber
    ...$expression(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: wParam
    ...$expression(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: lParam
    ...$expression(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: Control
    ...$control(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: WinTitle
    ...$winTitle(scopeName, { name: commandName, index: 4 }),

    // Parameter 6: WinText
    ...$(scopeName, { name: commandName, index: 5 }),

    // Parameter 7: ExcludeTitle
    ...$winTitle(scopeName, { name: commandName, index: 6 }),

    // Parameter 8: ExcludeText
    ...$(scopeName, { name: commandName, index: 7 }),

    // Parameter 9: Timeout
    ...$expression(scopeName, { name: commandName, index: 8, isLastParameter: true }),
  ];
}
