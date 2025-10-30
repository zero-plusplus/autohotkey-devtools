import type { ScopeName } from '../../../../../src/tmlanguage';
import { decimalOption } from '../../../../helpers/definition/option/decimalOption';
import { keywordOption } from '../../../../helpers/definition/option/keywordOption';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $keyName } from '../../../../helpers/definition/parameter/$keyName';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/KeyWait.htm
export function createKeyWaitExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'KeyWait';

  return [
    // Parameter 1: KeyName
    ...$keyName(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Options
    ...((placeholder = { name: commandName, index: 1, isLastParameter: true }): ExpectedTestData[] => {
      return [
        ...$(scopeName, placeholder),
        ...keywordOption(scopeName, [ 'D', 'L' ], placeholder),
        ...decimalOption(scopeName, [ 'T' ], placeholder),
      ];
    })(),
  ];
}
