import type { ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $output } from '../../../../helpers/definition/parameter/$output';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/Random.htm
export function createRandomExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'Random';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Min/NewSeed
    ...$expression(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Max
    ...$expression(scopeName, { name: commandName, index: 2, isLastParameter: true }),
  ];
}
