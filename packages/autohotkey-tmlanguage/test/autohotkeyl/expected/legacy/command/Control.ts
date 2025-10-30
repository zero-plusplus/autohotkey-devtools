import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $blank } from '../../../../helpers/definition/parameter/$blank';
import { $control } from '../../../../helpers/definition/parameter/$control';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger';
import { $style } from '../../../../helpers/definition/parameter/$style';
import { $subcommand } from '../../../../helpers/definition/parameter/$subcommand';
import { $winTitle } from '../../../../helpers/definition/parameter/$winTitle';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/Control.htm
export function createControlExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'Control';

  return [
    // Parameter 1: SubCommand, Parameter 2: Blank
    ...$subcommand(scopeName, [ 'Check', 'UnCheck', 'Enable', 'Disable', 'Show', 'Hide', 'ShowDropDown', 'HideDropDown' ], { name: commandName, index: 0 }),
    ...$blank(scopeName, { name: commandName, index: 1, subcommand: { index: 0, name: 'Check' } }),

    // Parameter 1: SubCommand, Parameter 2: N
    ...$subcommand(scopeName, [ 'Style', 'ExStyle' ], { name: commandName, index: 0 }),
    ...$style(scopeName, { name: commandName, index: 1, subcommand: { index: 0, name: 'Style' } }),

    // Parameter 1: SubCommand, Parameter 2: Count/N
    ...$subcommand(scopeName, [ 'TabLeft', 'TabRight', 'Delete', 'Choose' ], { name: commandName, index: 0 }),
    ...$shouldInteger(scopeName, { name: commandName, index: 1, subcommand: { index: 0, name: 'TabLeft' } }),

    // Parameter 1: SubCommand, Parameter 2: Count/N
    ...$subcommand(scopeName, [ 'Add', 'ChooseString', 'EditPaste' ], { name: commandName, index: 0 }),
    ...$(scopeName, { name: commandName, index: 1, subcommand: { index: 0, name: 'Add' } }),

    // Parameter 3: Control
    ...$control(scopeName, { name: commandName, index: 2, subcommand: { index: 0, name: 'Check' } }),

    // Parameter 4: WinTitle
    ...$winTitle(scopeName, { name: commandName, index: 3, subcommand: { index: 0, name: 'Check' } }),

    // Parameter 5: WinText
    ...$(scopeName, { name: commandName, index: 4, subcommand: { index: 0, name: 'Check' } }),

    // Parameter 6: ExcludeTitle
    ...$winTitle(scopeName, { name: commandName, index: 5, subcommand: { index: 0, name: 'Check' } }),

    // Parameter 7: ExcludeText
    ...$(scopeName, { name: commandName, index: 6, subcommand: { index: 0, name: 'Check' } }),
  ];
}
