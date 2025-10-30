import type { ScopeName } from '../../../../../src/tmlanguage';
import { $input } from '../../../../helpers/definition/parameter/$input';
import { $output } from '../../../../helpers/definition/parameter/$output';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/StringLen.htm
export function createStringLenExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'StringLen';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0, deprecated: true }),

    // Parameter 2: InputVar
    ...$input(scopeName, { name: commandName, index: 1, isLastParameter: true, deprecated: true }),
  ];
}
