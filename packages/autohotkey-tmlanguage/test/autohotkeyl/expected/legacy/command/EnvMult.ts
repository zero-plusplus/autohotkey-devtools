import type { ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $input } from '../../../../helpers/definition/parameter/$input';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/EnvMult.htm
export function createEnvMultExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'EnvMult';

  return [
    // Parameter 1: Var
    ...$input(scopeName, { name: commandName, index: 0, deprecated: true }),

    // Parameter 2: Value
    ...$expression(scopeName, { name: commandName, index: 1, deprecated: true, isLastParameter: true }),
  ];
}
