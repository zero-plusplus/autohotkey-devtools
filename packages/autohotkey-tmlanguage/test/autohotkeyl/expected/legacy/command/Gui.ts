import type { ScopeName } from '../../../../../src/tmlanguage';
import { floatOption } from '../../../../helpers/definition/option/floatOption';
import { keywordOption } from '../../../../helpers/definition/option/keywordOption';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $guiControlType } from '../../../../helpers/definition/parameter/$guiControlType';
import { $guiOptions } from '../../../../helpers/definition/parameter/$guiOptions';
import { $guisubcommand } from '../../../../helpers/definition/parameter/$guisubcommand';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/Gui.htm
export function createGuiExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'Gui';

  return [
    // Parameter 1: SubCommand, Parameter 2: Options, Parameter 3: Title
    ...((): ExpectedTestData[] => {
      return [
        ...$guisubcommand(scopeName, 'NEW', { name: commandName, index: 0 }),
        ...$guiOptions(scopeName, { name: commandName, index: 1, subcommand: { index: 0, name: 'New' } }),
        ...$(scopeName, { name: commandName, index: 2, subcommand: { index: 0, name: 'New' } }),
      ];
    })(),

    // Parameter 1: SubCommand, Parameter 2: ControlType, Parameter 3: Options, Parameter 4: Text
    ...((): ExpectedTestData[] => {
      return [
        ...$guisubcommand(scopeName, 'Add', { name: commandName, index: 0 }),
        ...$guiControlType(scopeName, { name: commandName, index: 1, subcommand: { index: 0, name: 'Add' } }),
        ...$(scopeName, { name: commandName, index: 2, subcommand: { index: 0, name: 'Add' } }),
        ...$(scopeName, { name: commandName, index: 3, subcommand: { index: 0, name: 'Add' } }),
      ];
    })(),

    // Parameter 1: SubCommand, Parameter 2: Options, Parameter 3: Title
    ...((): ExpectedTestData[] => {
      return [
        ...$guisubcommand(scopeName, 'Show', { name: commandName, index: 0 }),
        ...((placeholder = { name: commandName, index: 1, subcommand: { index: 0, name: 'Show' } }): ExpectedTestData[] => {
          return [
            ...$(scopeName, placeholder),
            ...keywordOption(scopeName, [ 'xCenter', 'yCenter', 'AutoSize', 'Minimize', 'Maximize', 'Restore', 'NoActivate', 'NA', 'Hide', 'Center' ], placeholder),
            ...floatOption(scopeName, [ 'W', 'H', 'X', 'Y' ], placeholder),
          ];
        })(),
        ...$(scopeName, { name: commandName, index: 2, subcommand: { index: 0, name: 'Show' }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: +/-Option1 +/-Option2
    ...$guiOptions(scopeName, { name: commandName, index: 0 }),
  ];
}
