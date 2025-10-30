import type { ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $shouldSpacedKeywords } from '../../../../helpers/definition/parameter/$shouldSpacedKeywords';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/PixelSearch.htm
export function createPixelSearchExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'PixelSearch';

  return [
    // Parameter 1: OutputVarX
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: OutputVarY
    ...$output(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: X1
    ...$expression(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: Y1
    ...$expression(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: X2
    ...$expression(scopeName, { name: commandName, index: 4 }),

    // Parameter 6: Y2
    ...$expression(scopeName, { name: commandName, index: 5 }),

    // Parameter 7: ColorID
    ...$expression(scopeName, { name: commandName, index: 6 }),

    // Parameter 8: Variation
    ...$expression(scopeName, { name: commandName, index: 7 }),

    // Parameter 9: Mode
    ...$shouldSpacedKeywords(scopeName, [ 'Fast', 'RGB' ], { name: commandName, index: 8, isLastParameter: true }),
  ];
}
