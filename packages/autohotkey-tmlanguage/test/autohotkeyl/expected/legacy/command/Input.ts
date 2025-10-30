import type { ScopeName } from '../../../../../src/tmlanguage';
import { floatOption } from '../../../../helpers/definition/option/floatOption';
import { keywordOption } from '../../../../helpers/definition/option/keywordOption';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $endKeys } from '../../../../helpers/definition/parameter/$endKeys';
import { $matchKeys } from '../../../../helpers/definition/parameter/$matchKeys';
import { $output } from '../../../../helpers/definition/parameter/$output';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/Input.htm
export function createInputExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'Input';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Options
    ...((placeholder = { name: commandName, index: 1 }): ExpectedTestData[] => {
      return [
        ...$(scopeName, placeholder),
        ...keywordOption(scopeName, [ 'B', 'C', 'V', 'E', 'M' ], placeholder),
        ...floatOption(scopeName, [ 'I', 'L', 'T' ], placeholder),
      ];
    })(),

    // Parameter 3: EndKeys
    ...$endKeys(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: MatchList
    ...$matchKeys(scopeName, { name: commandName, index: 3, isLastParameter: true }),
  ];
}
