import type { ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $input } from '../../../../helpers/definition/parameter/$input';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/StringMid.htm
export function createStringMidExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'StringMid';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0, deprecated: true }),

    // Parameter 2: InputVar
    ...$input(scopeName, { name: commandName, index: 1, deprecated: true }),

    // Parameter 3: StartChar
    ...$expression(scopeName, { name: commandName, index: 2, deprecated: true }),

    // Parameter 4: Count
    ...$expression(scopeName, { name: commandName, index: 3, deprecated: true }),

    // Parameter 5: L
    ...$shouldKeyword(scopeName, [ 'L' ], { name: commandName, index: 4, isLastParameter: true, deprecated: true }),
  ];
}
