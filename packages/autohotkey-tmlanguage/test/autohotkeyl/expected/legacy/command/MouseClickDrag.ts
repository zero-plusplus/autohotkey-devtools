import type { ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import { $whichButton } from '../../../../helpers/definition/parameter/$whichButton';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/MouseClickDrag.htm
export function createMouseClickDragExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'MouseClickDrag';

  return [
    // Parameter 1: WhichButton
    ...$whichButton(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: X1
    ...$expression(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Y1
    ...$expression(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: X2
    ...$expression(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: Y2
    ...$expression(scopeName, { name: commandName, index: 4 }),

    // Parameter 6: Speed
    ...$expression(scopeName, { name: commandName, index: 5 }),

    // Parameter 7: Relative
    ...$shouldKeyword(scopeName, [ 'R' ], { name: commandName, index: 6, isLastParameter: true }),
  ];
}
