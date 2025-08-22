import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $output } from '../../../../helpers/definition/parameter/$output';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/EnvGet.htm
export function createEnvGetExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'EnvGet';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: EnvVar
    ...$(scopeName, { name: commandName, index: 1, isLastParameter: true }),
  ];
}
