import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { floatOption } from '../../../../helpers/definition/option/floatOption.ts';
import { stringOption } from '../../../../helpers/definition/option/stringOption.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import { $expression } from '../../../../helpers/definition/parameter/$expression.ts';
import { $output } from '../../../../helpers/definition/parameter/$output.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/ImageSearch.htm
export function createImageSearchExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'ImageSearch';

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

    // Parameter 7: ImageFile
    ...((placeholder = { name: commandName, index: 6, isLastParameter: true }): ExpectedTestData[] => {
      return [
        ...$(scopeName, placeholder),
        ...stringOption(scopeName, [ 'HICON:', 'HBITMAP:' ], placeholder),
        ...floatOption(scopeName, [ '*Icon', '*', '*Trans', '*w', '*h' ], placeholder),
      ];
    })(),
  ];
}
