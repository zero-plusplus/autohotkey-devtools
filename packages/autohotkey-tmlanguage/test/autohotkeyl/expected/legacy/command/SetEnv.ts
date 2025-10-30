import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $input } from '../../../../helpers/definition/parameter/$input';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/SetEnv.htm
export function createSetEnvExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SetEnv';

  return [
    // Parameter 1: Var
    ...$input(scopeName, { name: commandName, index: 0, deprecated: true }),

    // Parameter 2: Value
    ...$(scopeName, { name: commandName, index: 1, isLastParameter: true, deprecated: true }),
  ];
}
