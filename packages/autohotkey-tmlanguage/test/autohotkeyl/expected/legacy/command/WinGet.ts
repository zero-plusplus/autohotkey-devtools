import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import { $blank } from '../../../../helpers/definition/parameter/$blank.ts';
import { $output } from '../../../../helpers/definition/parameter/$output.ts';
import { $subcommand } from '../../../../helpers/definition/parameter/$subcommand.ts';
import { $winTitle } from '../../../../helpers/definition/parameter/$winTitle.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/WinGet.htm
export function createWinGetExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'WinGet';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: SubCommand
    ...((placeholder = { name: commandName, index: 1 }): ExpectedTestData[] => {
      return [
        ...$subcommand(scopeName, [
          'ID',
          'IDLast',
          'PID',
          'ProcessName',
          'ProcessPath',
          'Count',
          'List',
          'MinMax',
          'ControlList',
          'ControlListHwnd',
          'Transparent',
          'TransColor',
          'Style',
          'ExStyle',
        ], placeholder),
        ...$blank(scopeName, placeholder),
      ];
    })(),

    // Parameter 3: WinTitle
    ...$winTitle(scopeName, { name: commandName, index: 2, subcommand: { name: 'ID', index: 1 } }),

    // Parameter 4: WinText
    ...$(scopeName, { name: commandName, index: 3, subcommand: { name: 'ID', index: 1 } }),

    // Parameter 5: ExcludeTitle
    ...$winTitle(scopeName, { name: commandName, index: 4, subcommand: { name: 'ID', index: 1 } }),

    // Parameter 6: ExcludeText
    ...$(scopeName, { name: commandName, index: 5, isLastParameter: true, subcommand: { name: 'ID', index: 1 } }),
  ];
}
