import type { ScopeName } from '../../../../../src/tmlanguage';
import { colorOption } from '../../../../helpers/definition/option/colorOption';
import { floatOption } from '../../../../helpers/definition/option/floatOption';
import { keywordOption } from '../../../../helpers/definition/option/keywordOption';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $color } from '../../../../helpers/definition/parameter/$color';
import { $fontName } from '../../../../helpers/definition/parameter/$fontName';
import { $guiControlType } from '../../../../helpers/definition/parameter/$guiControlType';
import { $guiOptions } from '../../../../helpers/definition/parameter/$guiOptions';
import { $guisubcommand } from '../../../../helpers/definition/parameter/$guisubcommand';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import { $withNumber } from '../../../../helpers/definition/parameter/$withNumber';
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

    // Parameter 1: SubCommand, Parameter 2: NoHide
    ...((): ExpectedTestData[] => {
      return [
        ...$guisubcommand(scopeName, 'Submit', { name: commandName, index: 0 }),
        ...$shouldKeyword(scopeName, [ 'NoHide' ], { name: commandName, index: 1, subcommand: { index: 0, name: 'Submit' }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: SubCommand
    ...((): ExpectedTestData[] => {
      return $guisubcommand(scopeName, [ 'Cancel', 'Hide', 'Destroy', 'Minimize', 'Maximize', 'Restore', 'Default' ], { name: commandName, index: 0 });
    })(),

    // Parameter 1: SubCommand, Parameter 2: Options, Parameter 3: FontName
    ...((): ExpectedTestData[] => {
      return [
        ...$guisubcommand(scopeName, 'Font', { name: commandName, index: 0 }),
        ...((placeholder = { name: commandName, index: 1, subcommand: { index: 0, name: 'Font' } }): ExpectedTestData[] => {
          return [
            ...$(scopeName, placeholder),
            ...colorOption(scopeName, [ 'C' ], placeholder),
            ...floatOption(scopeName, [ 'S', 'W', 'Q' ], placeholder),
          ];
        })(),
        ...$fontName(scopeName, { name: commandName, index: 2, subcommand: { index: 0, name: 'Font' }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: SubCommand, Parameter 2: WindowColor, Parameter 3: ControlColor
    ...((): ExpectedTestData[] => {
      return [
        ...$guisubcommand(scopeName, 'Color', { name: commandName, index: 0 }),
        ...$color(scopeName, { name: commandName, index: 1, subcommand: { index: 0, name: 'Color' } }),
        ...$color(scopeName, { name: commandName, index: 2, subcommand: { index: 0, name: 'Color' }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: SubCommand, Parameter 2: X, Parameter 3: Y
    ...((): ExpectedTestData[] => {
      return [
        ...$guisubcommand(scopeName, 'Margin', { name: commandName, index: 0 }),
        ...$withNumber(scopeName, { name: commandName, index: 1, subcommand: { index: 0, name: 'Margin' } }),
        ...$withNumber(scopeName, { name: commandName, index: 2, subcommand: { index: 0, name: 'Margin' }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: SubCommand, Parameter 2: MenuName
    ...((): ExpectedTestData[] => {
      return [
        ...$guisubcommand(scopeName, 'Menu', { name: commandName, index: 0 }),
        ...$(scopeName, { name: commandName, index: 1, subcommand: { index: 0, name: 'Menu' }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: SubCommand, Parameter 2: Off
    ...((): ExpectedTestData[] => {
      return [
        ...$guisubcommand(scopeName, 'Flash', { name: commandName, index: 0 }),
        ...$shouldKeyword(scopeName, [ 'Off' ], { name: commandName, index: 1, subcommand: { index: 0, name: 'Flash' }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: +/-Option1 +/-Option2
    ...$guiOptions(scopeName, { name: commandName, index: 0 }),
  ];
}
