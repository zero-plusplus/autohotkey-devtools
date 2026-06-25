import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import { $input } from '../../../../helpers/definition/parameter/$input.ts';
import { $output } from '../../../../helpers/definition/parameter/$output.ts';
import { $shouldEscapeComma } from '../../../../helpers/definition/parameter/$shouldEscapeComma.ts';
import type { ExpectedTestData } from '../../../../types.ts';

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
