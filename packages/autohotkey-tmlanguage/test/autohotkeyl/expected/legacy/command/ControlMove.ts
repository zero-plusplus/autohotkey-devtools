import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import { $control } from '../../../../helpers/definition/parameter/$control.ts';
import { $expression } from '../../../../helpers/definition/parameter/$expression.ts';
import { $winTitle } from '../../../../helpers/definition/parameter/$winTitle.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/ControlMove.htm
export function createControlMoveExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'ControlMove';

  return [
    // Parameter 1: Control
    ...$control(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: X
    ...$expression(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Y
    ...$expression(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: Width
    ...$expression(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: Height
    ...$expression(scopeName, { name: commandName, index: 4 }),

    // Parameter 6: WinTitle
    ...$winTitle(scopeName, { name: commandName, index: 5 }),

    // Parameter 7: WinText
    ...$(scopeName, { name: commandName, index: 6 }),

    // Parameter 8: ExcludeTitle
    ...$winTitle(scopeName, { name: commandName, index: 7 }),

    // Parameter 9: ExcludeText
    ...$(scopeName, { name: commandName, index: 8, isLastParameter: true }),
  ];
}
