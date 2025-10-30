import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $control } from '../../../../helpers/definition/parameter/$control';
import { $controlMoveOptions } from '../../../../helpers/definition/parameter/$controlMoveOptions';
import { $flagedGuiControlOptions } from '../../../../helpers/definition/parameter/$flagedGuiControlOptions';
import { $guisubcommand } from '../../../../helpers/definition/parameter/$guisubcommand';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/GuiControl.htm
export function createGuiControlExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'GuiControl';

  return [
    // Parameter 1: SubCommand, Parameter 2: ControlID, Parameter 3: Value
    ...((): ExpectedTestData[] => {
      return [
        ...$guisubcommand(scopeName, [ 'Text', 'Choose', 'ChooseString' ], { name: commandName, index: 0 }),
        ...$control(scopeName, { name: commandName, index: 1, subcommand: { index: 0, name: 'Text' } }),
        ...$(scopeName, { name: commandName, index: 2, subcommand: { index: 0, name: 'Text' }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: SubCommand, Parameter 2: ControlID, Parameter 3: Options
    ...((): ExpectedTestData[] => {
      return [
        ...$guisubcommand(scopeName, [ 'Move', 'MoveDraw' ], { name: commandName, index: 0 }),
        ...$control(scopeName, { name: commandName, index: 1, subcommand: { index: 0, name: 'Move' } }),
        ...$controlMoveOptions(scopeName, { name: commandName, index: 2, subcommand: { index: 0, name: 'Move' }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: SubCommand, Parameter 2: ControlID
    ...((): ExpectedTestData[] => {
      return [
        ...$guisubcommand(scopeName, [ 'Focus', 'Disable', 'Enable', 'Hide', 'Show', 'Font' ], { name: commandName, index: 0 }),
        ...$control(scopeName, { name: commandName, index: 1, subcommand: { index: 0, name: 'Focus' }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: +/-Option1 +/-Option2, Parameter 2: ControlID, Parameter 3: Value
    ...((): ExpectedTestData[] => {
      return [
        ...$flagedGuiControlOptions(scopeName, { name: commandName, index: 0 }),
        ...$control(scopeName, { name: commandName, index: 1 }),
        ...$(scopeName, { name: commandName, index: 2, isLastParameter: true }),
      ];
    })(),
  ];
}
