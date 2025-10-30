import type { ScopeName } from '../../../../../src/tmlanguage';
import { $blank } from '../../../../helpers/definition/parameter/$blank';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger';
import { $subcommand } from '../../../../helpers/definition/parameter/$subcommand';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/Thread.htm
export function createThreadExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'Thread';

  return [
    // Parameter 1: SubCommand, Parameter 2: False/Level
    ...((): ExpectedTestData[] => {
      return [
        ...$subcommand(scopeName, [ 'NoTimers', 'Priority' ], { name: commandName, index: 0 }),
        ...$expression(scopeName, { name: commandName, index: 1, subcommand: { name: 'NoTimers', index: 0 }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: SubCommand, Parameter 2: Duration, LineCount
    ...((): ExpectedTestData[] => {
      return [
        ...$subcommand(scopeName, [ 'Interrupt' ], { name: commandName, index: 0 }),
        ...$shouldInteger(scopeName, { name: commandName, index: 1, subcommand: { name: 'Interrupt', index: 0 } }),
        ...$shouldInteger(scopeName, { name: commandName, index: 2, subcommand: { name: 'Interrupt', index: 0 }, isLastParameter: true }),
      ];
    })(),

    ...$blank(scopeName, { name: commandName, index: 0 }),
  ];
}
