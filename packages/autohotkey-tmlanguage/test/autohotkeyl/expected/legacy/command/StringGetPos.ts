import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { floatOption } from '../../../../helpers/definition/option/floatOption.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import { $expression } from '../../../../helpers/definition/parameter/$expression.ts';
import { $input } from '../../../../helpers/definition/parameter/$input.ts';
import { $output } from '../../../../helpers/definition/parameter/$output.ts';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/StringGetPos.htm
export function createStringGetPosExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'StringGetPos';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0, deprecated: true }),

    // Parameter 2: InputVar
    ...$input(scopeName, { name: commandName, index: 1, deprecated: true }),

    // Parameter 3: SearchText
    ...$(scopeName, { name: commandName, index: 2, deprecated: true }),

    // Parameter 4: Occurrence
    ...$shouldKeyword(scopeName, [ 'L', 'R' ], { name: commandName, index: 3, deprecated: true }, (placeholder) => {
      return [ ...floatOption(scopeName, [ 'L', 'R' ], placeholder) ];
    }),

    // Parameter 5: Offset
    ...$expression(scopeName, { name: commandName, index: 4, isLastParameter: true, deprecated: true }),
  ];
}
