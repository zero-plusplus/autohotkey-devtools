import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $formatTime } from '../../../../helpers/definition/parameter/$formatTime';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $subcommandlike } from '../../../../helpers/definition/parameter/$subcommandlike';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/FormatTime.htm
export function createFormatTimeExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FormatTime';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: YYYYMMDDHH24MISS
    ...$(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Format
    ...$subcommandlike(scopeName, [
      'Time',
      'ShortDate',
      'LongDate',
      'YearMonth',
      'YDay',
      'YDay0',
      'WDay',
      'YWeek',
    ], { name: commandName, index: 2, isLastParameter: true }),
    ...$formatTime(scopeName, { name: commandName, index: 2, isLastParameter: true }),
  ];
}
