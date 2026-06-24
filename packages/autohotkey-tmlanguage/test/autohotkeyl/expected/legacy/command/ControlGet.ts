import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { keywordOption } from '../../../../helpers/definition/option/keywordOption.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import { $blank } from '../../../../helpers/definition/parameter/$blank.ts';
import { $control } from '../../../../helpers/definition/parameter/$control.ts';
import { $invalidSubcommand } from '../../../../helpers/definition/parameter/$invalidSubcommand.ts';
import { $output } from '../../../../helpers/definition/parameter/$output.ts';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger.ts';
import { $subcommand } from '../../../../helpers/definition/parameter/$subcommand.ts';
import { $winTitle } from '../../../../helpers/definition/parameter/$winTitle.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/ControlGet.htm
export function createControlGetExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'ControlGet';

  return [
    // Parameter 1: Output
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: SubCommand,
    ...$subcommand(scopeName, [ 'List', 'Checked', 'Enabled', 'Visible', 'Tab', 'Choice', 'LineCount', 'CurrentLine', 'CurrentCol', 'Selected', 'Style', 'ExStyle', 'Hwnd', 'FindString', 'Line' ], { name: commandName, index: 1 }),

    // Parameter 3-A: Options
    ...keywordOption(scopeName, [ 'Selected', 'Focused', 'Col', 'Count' ], { name: commandName, index: 2, subcommand: { name: 'List', index: 1 } }),

    // Parameter 3-B: Blank
    ...$blank(scopeName, { name: commandName, index: 2, subcommand: { name: 'Checked', index: 1 } }),

    // Parameter 3-C: String
    ...$(scopeName, { name: commandName, index: 2, subcommand: { name: 'FindString', index: 1 } }),

    // Parameter 3-D: N
    ...$shouldInteger(scopeName, { name: commandName, index: 2, subcommand: { name: 'Line', index: 1 } }),

    // Parameter 3-E: Invalid
    ...$invalidSubcommand(scopeName, { name: commandName, index: 2, subcommand: { name: 'XXX', index: 1, invalid: true } }),

    // Parameter 4: Control
    ...$control(scopeName, { name: commandName, index: 3, subcommand: { name: 'List', index: 1 } }),

    // Parameter 5: WinTitle
    ...$winTitle(scopeName, { name: commandName, index: 4, subcommand: { name: 'List', index: 1 } }),

    // Parameter 6: WinText
    ...$(scopeName, { name: commandName, index: 5, subcommand: { name: 'List', index: 1 } }),

    // Parameter 7: ExcludeTitle
    ...$winTitle(scopeName, { name: commandName, index: 6, subcommand: { name: 'List', index: 1 } }),

    // Parameter 8: ExcludeText
    ...$(scopeName, { name: commandName, index: 7, subcommand: { name: 'List', index: 1 } }),
  ];
}
