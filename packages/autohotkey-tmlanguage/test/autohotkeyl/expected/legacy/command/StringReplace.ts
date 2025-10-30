import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $input } from '../../../../helpers/definition/parameter/$input';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/StringReplace.htm
export function createStringReplaceExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'StringReplace';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0, deprecated: true }),

    // Parameter 2: InputVar
    ...$input(scopeName, { name: commandName, index: 1, deprecated: true }),

    // Parameter 3: SearchText
    ...$(scopeName, { name: commandName, index: 2, deprecated: true }),

    // Parameter 4: ReplaceText
    ...$(scopeName, { name: commandName, index: 3, deprecated: true }),

    // Parameter 5: ReplaceAll
    ...$shouldKeyword(scopeName, [ '1', 'A', 'All' ], { name: commandName, index: 4, isLastParameter: true, deprecated: true }),
  ];
}
