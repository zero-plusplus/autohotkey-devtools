import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $imagePath } from '../../../../helpers/definition/parameter/$imagePath';
import { $menuItemName } from '../../../../helpers/definition/parameter/$menuItemName';
import { $menuOptions } from '../../../../helpers/definition/parameter/$menuOptions';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import { $subcommand } from '../../../../helpers/definition/parameter/$subcommand';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/Menu.htm
export function createMenuExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'Menu';

  return [
    // Parameter 1: SubCommand, Parameter 2: SubCommand, Parameter 3: IconNumber, Parameter 4: Freeze
    ...((): ExpectedTestData[] => {
      return [
        ...$subcommand(scopeName, [ 'Tray' ], { name: commandName, index: 0 }),
        ...$subcommand(scopeName, [ 'Icon' ], { name: commandName, index: 1, subcommand: { name: 'Tray', index: 0 } }),
        ...$imagePath(scopeName, { name: commandName, index: 2, subcommand: [ { name: 'Tray', index: 0 }, { name: 'Icon', index: 1 } ] }),
        ...$shouldInteger(scopeName, { name: commandName, index: 3, subcommand: [ { name: 'Tray', index: 0 }, { name: 'Icon', index: 1 } ] }),
        ...$shouldKeyword(scopeName, [ '0', '1' ], { name: commandName, index: 4, subcommand: [ { name: 'Tray', index: 0 }, { name: 'Icon', index: 1 } ], isLastParameter: true }),
      ];
    })(),

    // Parameter 1: SubCommand, Parameter 2: SubCommand, Parameter 3: Text
    ...((): ExpectedTestData[] => {
      return [
        ...$subcommand(scopeName, [ 'Tray' ], { name: commandName, index: 0 }),
        ...$subcommand(scopeName, [ 'Tip' ], { name: commandName, index: 1, subcommand: { name: 'Tray', index: 0 } }),
        ...$(scopeName, { name: commandName, index: 2, subcommand: [ { name: 'Tray', index: 0 }, { name: 'Tip', index: 1 } ], isLastParameter: true }),
      ];
    })(),

    // Parameter 1: SubCommand, Parameter 2: SubCommand, Parameter 3: ClickCount
    ...((): ExpectedTestData[] => {
      return [
        ...$subcommand(scopeName, [ 'Tray' ], { name: commandName, index: 0 }),
        ...$subcommand(scopeName, [ 'Click' ], { name: commandName, index: 1, subcommand: { name: 'Tray', index: 0 } }),
        ...$shouldInteger(scopeName, { name: commandName, index: 2, subcommand: [ { name: 'Tray', index: 0 }, { name: 'Click', index: 1 } ], isLastParameter: true }),
      ];
    })(),

    // Parameter 1: SubCommand, Parameter 2: SubCommand
    ...((): ExpectedTestData[] => {
      return [
        ...$subcommand(scopeName, [ 'Tray' ], { name: commandName, index: 0 }),
        ...$subcommand(scopeName, [ 'MainWindow', 'NoMainWindow', 'NoIcon' ], { name: commandName, index: 1, subcommand: { name: 'Tray', index: 0 } }),
      ];
    })(),

    // Parameter 1: MenuName, Parameter 2: SubCommand, Parameter 3: MenuItemName, Parameter 4: LabelOrSubmenu, Parameter 5: Options
    ...((): ExpectedTestData[] => {
      return [
        ...$(scopeName, { name: commandName, index: 0 }),
        ...$subcommand(scopeName, [ 'Add' ], { name: commandName, index: 1 }),
        ...$menuItemName(scopeName, { name: commandName, index: 2, subcommand: { name: 'Add', index: 1 } }),
        ...$(scopeName, { name: commandName, index: 3, subcommand: { name: 'Add', index: 1 } }),
        ...$menuOptions(scopeName, { name: commandName, index: 4, subcommand: { name: 'Add', index: 1 }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: MenuName, Parameter 2: SubCommand, Parameter 3: MenuItemName, Parameter 4: ItemToInsert, Parameter 5: LabelOrSubmenu, Parameter 6: Options
    ...((): ExpectedTestData[] => {
      return [
        ...$(scopeName, { name: commandName, index: 0 }),
        ...$subcommand(scopeName, [ 'Insert' ], { name: commandName, index: 1 }),
        ...$menuItemName(scopeName, { name: commandName, index: 2, subcommand: { name: 'Insert', index: 1 } }),
        ...$(scopeName, { name: commandName, index: 3, subcommand: { name: 'Insert', index: 1 } }),
        ...$(scopeName, { name: commandName, index: 4, subcommand: { name: 'Insert', index: 1 } }),
        ...$menuOptions(scopeName, { name: commandName, index: 5, subcommand: { name: 'Insert', index: 1 }, isLastParameter: true }),
      ];
    })(),
  ];
}
