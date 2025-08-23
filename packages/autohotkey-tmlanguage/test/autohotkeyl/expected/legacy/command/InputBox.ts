import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/InputBox.htm
export function createInputBoxExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'InputBox';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Title
    ...$(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Prompt
    ...$(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: Hide
    ...$shouldKeyword(scopeName, [ 'Hide' ], { name: commandName, index: 3 }),

    // Parameter 5: Width
    ...$expression(scopeName, { name: commandName, index: 4 }),

    // Parameter 6: Height
    ...$expression(scopeName, { name: commandName, index: 5 }),

    // Parameter 7: X
    ...$expression(scopeName, { name: commandName, index: 6 }),

    // Parameter 8: Y
    ...$expression(scopeName, { name: commandName, index: 7 }),

    // Parameter 9: Locale
    ...$(scopeName, { name: commandName, index: 8 }),

    // Parameter 10: Timeout
    ...$expression(scopeName, { name: commandName, index: 9 }),

    // Parameter 11: Default
    ...$(scopeName, { name: commandName, index: 10, isLastParameter: true }),
  ];
}
