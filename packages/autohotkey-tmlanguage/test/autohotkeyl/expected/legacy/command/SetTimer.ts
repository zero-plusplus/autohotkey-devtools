import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { keywordOption } from '../../../../helpers/definition/option/keywordOption.ts';
import { $expression } from '../../../../helpers/definition/parameter/$expression.ts';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger.ts';
import { $shouldLabel } from '../../../../helpers/definition/parameter/$shouldLabel.ts';
import type { ExpectedTestData } from '../../../../types.ts';

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
