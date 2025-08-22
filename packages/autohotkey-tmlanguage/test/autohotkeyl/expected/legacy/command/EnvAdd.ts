import type { ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $input } from '../../../../helpers/definition/parameter/$input';
import { $timeunit } from '../../../../helpers/definition/parameter/$timeunit';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/EnvAdd.htm
export function createEnvAddExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'EnvAdd';

  return [
    // Parameter 1: Var
    ...$input(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Value
    ...$expression(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: TimeUnits
    ...$timeunit(scopeName, { name: commandName, index: 2 }),
  ];
}
