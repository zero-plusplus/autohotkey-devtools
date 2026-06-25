import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $expression } from '../../../../helpers/definition/parameter/$expression.ts';
import { $input } from '../../../../helpers/definition/parameter/$input.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/EnvDiv.htm
export function createEnvDivExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'EnvDiv';

  return [
    // Parameter 1: Var
    ...$input(scopeName, { name: commandName, index: 0, deprecated: true }),

    // Parameter 2: Value
    ...$expression(scopeName, { name: commandName, index: 1, deprecated: true, isLastParameter: true }),
  ];
}
