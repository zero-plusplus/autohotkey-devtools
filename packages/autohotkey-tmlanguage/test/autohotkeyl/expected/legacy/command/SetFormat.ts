import type { ScopeName } from '../../../../../src/tmlanguage';
import { keywordOption } from '../../../../helpers/definition/option/keywordOption';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import { $withNumber } from '../../../../helpers/definition/parameter/$withNumber';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/SetFormat.htm
export function createSetFormatExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SetFormat';

  return [
    // Parameter 1: Var
    ...$shouldKeyword(scopeName, [ 'IntegerFast', 'FloatFast', 'Integer', 'Float' ], { name: commandName, index: 0, deprecated: true }),

    // Parameter 2: Format
    ...((placeholder = { name: commandName, index: 1, isLastParameter: true, deprecated: true }): ExpectedTestData[] => {
      return [
        ...$withNumber(scopeName, placeholder),
        ...keywordOption(scopeName, [ 'H', 'Hex', 'D' ], placeholder),
      ];
    })(),
  ];
}
