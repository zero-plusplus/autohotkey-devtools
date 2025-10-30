import type { ScopeName } from '../../../../../src/tmlanguage';
import { $driveletter } from '../../../../helpers/definition/parameter/$driveletter';
import { $invalidSubcommand } from '../../../../helpers/definition/parameter/$invalidSubcommand';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $path } from '../../../../helpers/definition/parameter/$path';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import { $subcommand } from '../../../../helpers/definition/parameter/$subcommand';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/DriveGet.htm
export function createDriveGetExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'DriveGet';

  return [
    // Parameter 1: Output
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: SubCommand, Parameter 3: Type
    ...$subcommand(scopeName, [ 'List' ], { name: commandName, index: 1 }),
    ...$shouldKeyword(scopeName, [
      'CDROM',
      'REMOVABLE',
      'FIXED',
      'NETWORK',
      'RAMDISK',
      'UNKNOWN',
    ], { name: commandName, index: 2, subcommand: { index: 1, name: 'List' }, isLastParameter: true }),

    // Parameter 2: SubCommand, Parameter 3: Path
    ...$subcommand(scopeName, [
      'Capacity',
      'Cap',
      'Type',
      'Status',
    ], { name: commandName, index: 1 }),
    ...$path(scopeName, { name: commandName, index: 2, subcommand: { index: 1, name: 'Capacity' }, isLastParameter: true }),

    // Parameter 2: SubCommand, Parameter 3: Drive
    ...$subcommand(scopeName, [
      'FileSystem',
      'FS',
      'Label',
      'Serial',
      'StatusCD',
    ], { name: commandName, index: 1 }),
    ...$driveletter(scopeName, { name: commandName, index: 2, subcommand: { index: 1, name: 'FileSystem' }, isLastParameter: true }),

    ...$invalidSubcommand(scopeName, { name: commandName, index: 1, isLastParameter: true }),
  ];
}
