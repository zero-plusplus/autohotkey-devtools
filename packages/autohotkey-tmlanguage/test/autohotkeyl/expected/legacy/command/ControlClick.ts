import type { ScopeName } from '../../../../../src/tmlanguage';
import { decimalOption } from '../../../../helpers/definition/option/decimalOption';
import { keywordOption } from '../../../../helpers/definition/option/keywordOption';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $control } from '../../../../helpers/definition/parameter/$control';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $whichButton } from '../../../../helpers/definition/parameter/$whichButton';
import { $winTitle } from '../../../../helpers/definition/parameter/$winTitle';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/ControlClick.htm
export function createControlClickExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'ControlClick';

  return [
    // Parameter 1: Control/Pos
    ...((placeholder = { name: commandName, index: 0 }): ExpectedTestData[] => {
      return [
        ...$control(scopeName, placeholder),
        ...$(scopeName, placeholder),
        ...decimalOption(scopeName, [ [ 'X', '16' ], [ 'Y', '20' ] ], placeholder),
      ];
    })(),

    // Parameter 2: WinTitle
    ...$winTitle(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: WinText
    ...$(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: WhichButton
    ...$whichButton(scopeName, { name: commandName, index: 3 }),

    // Parameter 5: ClickCount
    ...$expression(scopeName, { name: commandName, index: 4 }),

    // Parameter 6: Options
    ...((placeholder = { name: commandName, index: 5 }): ExpectedTestData[] => {
      return [
        ...$(scopeName, placeholder),
        ...keywordOption(scopeName, [ 'NA', 'D', 'U', 'Pos' ], placeholder),
        ...decimalOption(scopeName, [ [ 'X', '16' ], [ 'Y', '20' ] ], placeholder),
      ];
    })(),

    // Parameter 7: ExcludeTitle
    ...$winTitle(scopeName, { name: commandName, index: 6 }),

    // Parameter 8: ExcludeText
    ...$(scopeName, { name: commandName, index: 7 }),
  ];
}
