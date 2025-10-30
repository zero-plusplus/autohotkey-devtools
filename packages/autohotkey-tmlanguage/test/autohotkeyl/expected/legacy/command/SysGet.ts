import type { ScopeName } from '../../../../../src/tmlanguage';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger';
import { $subcommand } from '../../../../helpers/definition/parameter/$subcommand';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/SysGet.htm
export function createSysGetExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SysGet';

  return [
    // Parameter 1: OutputVar, Parameter 2: SubCommand
    ...((): ExpectedTestData[] => {
      return [
        ...$output(scopeName, { name: commandName, index: 0 }),
        ...$subcommand(scopeName, [ 'MonitorCount', 'MonitorPrimary' ], { name: commandName, index: 1, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: OutputVar, Parameter 2: SubCommand, Parameter 3: N
    ...((): ExpectedTestData[] => {
      return [
        ...$output(scopeName, { name: commandName, index: 0 }),
        ...$subcommand(scopeName, [ 'Monitor', 'MonitorWorkArea', 'MonitorName' ], { name: commandName, index: 1 }),
        ...$shouldInteger(scopeName, { name: commandName, index: 2, subcommand: { name: 'Monitor', index: 1 }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: OutputVar, Parameter 2: N
    ...((): ExpectedTestData[] => {
      return [
        ...$output(scopeName, { name: commandName, index: 0 }),
        ...$shouldInteger(scopeName, { name: commandName, index: 1, isLastParameter: true }),
      ];
    })(),
  ];
}
