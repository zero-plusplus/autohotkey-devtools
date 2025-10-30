import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $input } from '../../../../helpers/definition/parameter/$input';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $shouldEscapeComma } from '../../../../helpers/definition/parameter/$shouldEscapeComma';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/StringSplit.htm
export function createStringSplitExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'StringSplit';

  return [
    // Parameter 1: OutputArray
    ...$output(scopeName, { name: commandName, index: 0, deprecated: true }),

    // Parameter 2: InputVar
    ...$input(scopeName, { name: commandName, index: 1, deprecated: true }),

    // Parameter 3: DelimiterChars
    ...$(scopeName, { name: commandName, index: 2, deprecated: true }),

    // Parameter 4: OmitChars
    ...$shouldEscapeComma(scopeName, { name: commandName, index: 3, deprecated: true }),
  ];
}
