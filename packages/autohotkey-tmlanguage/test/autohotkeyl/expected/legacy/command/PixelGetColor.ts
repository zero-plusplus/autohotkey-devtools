import type { ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $shouldSpacedKeywords } from '../../../../helpers/definition/parameter/$shouldSpacedKeywords';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/PixelGetColor.htm
export function createPixelGetColorExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'PixelGetColor';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: X
    ...$expression(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Y
    ...$expression(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: Mode
    ...$shouldSpacedKeywords(scopeName, [ 'Alt', 'Slow', 'RGB' ], { name: commandName, index: 3, isLastParameter: true }),
  ];
}
