import type { ScopeName } from '../../../../../src/tmlanguage';
import { keywordOption } from '../../../../helpers/definition/option/keywordOption';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger';
import { $shouldLabel } from '../../../../helpers/definition/parameter/$shouldLabel';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/SetTimer.htm
export function createSetTimerExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SetTimer';

  return [
    // Parameter 1: Label
    ...$shouldLabel(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: PeriodOnOffDelete
    ...((placeholder = { name: commandName, index: 1 }): ExpectedTestData[] => {
      return [
        ...$shouldInteger(scopeName, placeholder),
        ...keywordOption(scopeName, [ 'On', 'Off', 'Delete' ], placeholder),
      ];
    })(),

    // Parameter 3: Priority
    ...$expression(scopeName, { name: commandName, index: 2, isLastParameter: true }),
  ];
}
