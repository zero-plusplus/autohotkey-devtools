import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $imagePath } from '../../../../helpers/definition/parameter/$imagePath';
import { $subcommand } from '../../../../helpers/definition/parameter/$subcommand';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/Menu.htm
export function createMenuExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'Menu';

  return [
    // Parameter 1: SubCommand
    ...((): ExpectedTestData[] => {
      return [
        ...$subcommand(scopeName, [ 'Tray' ], { name: commandName, index: 0 }),
        ...$subcommand(scopeName, [ 'Icon' ], { name: commandName, index: 1, subcommand: { name: 'Tray', index: 0 } }),
        ...$imagePath(scopeName, { name: commandName, index: 2, subcommand: [ { name: 'Tray', index: 0 }, { name: 'Icon', index: 1 } ] }),
        ...$(scopeName, { name: commandName, index: 3, subcommand: [ { name: 'Tray', index: 0 }, { name: 'Icon', index: 1 } ] }),
        ...$(scopeName, { name: commandName, index: 4, subcommand: [ { name: 'Tray', index: 0 }, { name: 'Icon', index: 1 } ] }),
      ];
    })(),
  ];
}
