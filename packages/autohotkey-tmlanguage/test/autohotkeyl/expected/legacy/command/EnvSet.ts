import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/EnvSet.htm
export function createEnvSetExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'EnvSet';

  return [
    // Parameter 1: EnvVar
    ...$(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Value
    ...$(scopeName, { name: commandName, index: 1, isLastParameter: true }),
  ];
}
