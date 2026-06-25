import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import { $output } from '../../../../helpers/definition/parameter/$output.ts';
import { $path } from '../../../../helpers/definition/parameter/$path.ts';
import { $shouldSpacedKeywords } from '../../../../helpers/definition/parameter/$shouldSpacedKeywords.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/Run.htm
export function createRunExpectedDataList(scopeName: ScopeName, commandName = 'Run'): ExpectedTestData[] {
  return [
    // Parameter 1: Target
    ...$(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: WorkingDir
    ...$path(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Options
    ...$shouldSpacedKeywords(scopeName, [ 'Max', 'Min', 'Hide', 'UseErrorLevel' ], { name: commandName, index: 2 }),

    // Parameter 4: OutputVarPID
    ...$output(scopeName, { name: commandName, index: 3, isLastParameter: true }),
  ];
}
