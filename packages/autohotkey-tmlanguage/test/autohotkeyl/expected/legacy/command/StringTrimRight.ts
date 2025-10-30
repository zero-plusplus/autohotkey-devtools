import type { ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $input } from '../../../../helpers/definition/parameter/$input';
import { $output } from '../../../../helpers/definition/parameter/$output';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/StringTrimRight.htm
export function createStringTrimRightExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'StringTrimRight';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0, deprecated: true }),

    // Parameter 2: InputVar
    ...$input(scopeName, { name: commandName, index: 1, deprecated: true }),

    // Parameter 3: Count
    ...$expression(scopeName, { name: commandName, index: 2, isLastParameter: true, deprecated: true }),
  ];
}
