import type { ScopeName } from '../../../../../src/tmlanguage';
import { $input } from '../../../../helpers/definition/parameter/$input';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/StringLower.htm
export function createStringLowerExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'StringLower';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: InputVar
    ...$input(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: T
    ...$shouldKeyword(scopeName, [ 'T' ], { name: commandName, index: 2, isLastParameter: true }),
  ];
}
