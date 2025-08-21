import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $invalidSubcommand } from '../../../../helpers/definition/parameter/$invalidSubcommand';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import { $subcommand } from '../../../../helpers/definition/parameter/$subcommand';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/Drive.htm
export function createDriveExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'Drive';

  return [
    // Parameter 1: SubCommand, Parameter 2: Drive, Parameter 3: 1
    ...$subcommand(scopeName, [ 'Eject' ], { name: commandName, index: 0 }),
    ...$(scopeName, { name: commandName, index: 1, subcommand: { index: 0, name: 'Eject' } }),
    ...$shouldKeyword(scopeName, [ '1' ], { name: commandName, index: 2, subcommand: { index: 0, name: 'Eject' } }),

    // Parameter 1: SubCommand, Parameter 2: Drive, Parameter 3: NewLabel
    ...$subcommand(scopeName, [ 'Label' ], { name: commandName, index: 0 }),
    ...$(scopeName, { name: commandName, index: 1, subcommand: { index: 0, name: 'Label' } }),
    ...$(scopeName, { name: commandName, index: 2, subcommand: { index: 0, name: 'Label' } }),

    // Parameter 1: SubCommand, Parameter 2: Drive
    ...$subcommand(scopeName, [ 'Lock', 'Unlock' ], { name: commandName, index: 0 }),
    ...$(scopeName, { name: commandName, index: 1, subcommand: { index: 0, name: 'Lock' } }),

    ...$invalidSubcommand(scopeName, { name: commandName, index: 0 }),
  ];
}
