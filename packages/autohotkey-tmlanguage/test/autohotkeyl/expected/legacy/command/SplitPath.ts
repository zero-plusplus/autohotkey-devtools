import type { ScopeName } from '../../../../../src/tmlanguage';
import { $input } from '../../../../helpers/definition/parameter/$input';
import { $output } from '../../../../helpers/definition/parameter/$output';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/SplitPath.htm
export function createSplitPathExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SplitPath';

  return [
    // Parameter 1: InputVar
    ...$input(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: OutFileName
    ...$output(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: OutDir
    ...$output(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: OutExtension
    ...$output(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: OutNameNoExt
    ...$output(scopeName, { name: commandName, index: 4 }),

    // Parameter 6: OutDrive
    ...$output(scopeName, { name: commandName, index: 5, isLastParameter: true }),
  ];
}
