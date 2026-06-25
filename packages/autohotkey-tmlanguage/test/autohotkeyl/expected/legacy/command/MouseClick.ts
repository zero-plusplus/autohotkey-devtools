import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $expression } from '../../../../helpers/definition/parameter/$expression.ts';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword.ts';
import { $whichButton } from '../../../../helpers/definition/parameter/$whichButton.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/MouseClick.htm
export function createMouseClickExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'MouseClick';

  return [
    // Parameter 1: WhichButton
    ...$whichButton(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: X
    ...$expression(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Y
    ...$expression(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: ClickCount
    ...$expression(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: Speed
    ...$expression(scopeName, { name: commandName, index: 4 }),

    // Parameter 6: DownOrUp
    ...$shouldKeyword(scopeName, [ 'D', 'U' ], { name: commandName, index: 5 }),

    // Parameter 7: Relative
    ...$shouldKeyword(scopeName, [ 'R' ], { name: commandName, index: 6, isLastParameter: true }),
  ];
}
