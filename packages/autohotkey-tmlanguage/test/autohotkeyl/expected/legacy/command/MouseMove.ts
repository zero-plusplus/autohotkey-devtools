import type { ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/MouseMove.htm
export function createMouseMoveExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'MouseMove';

  return [
    // Parameter 1: X
    ...$expression(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Y
    ...$expression(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Speed
    ...$expression(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: Relative
    ...$shouldKeyword(scopeName, [ 'R' ], { name: commandName, index: 3, isLastParameter: true }),
  ];
}
