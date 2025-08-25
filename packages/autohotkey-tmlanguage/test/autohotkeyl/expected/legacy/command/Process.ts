import { RuleName, StyleName, type ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import { $subcommand } from '../../../../helpers/definition/parameter/$subcommand';
import { $subcommandlike } from '../../../../helpers/definition/parameter/$subcommandlike';
import { $withNumber } from '../../../../helpers/definition/parameter/$withNumber';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/Process.htm
export function createProcessExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'Process';

  return [
    // Parameter 1: SubCommand, Parameter 2: PIDOrName
    ...((): ExpectedTestData[] => {
      return [
        ...$subcommand(scopeName, [ 'Exist', 'Close' ], { name: commandName, index: 0 }),
        ...$withNumber(scopeName, { name: commandName, index: 1, subcommand: { name: 'Exist', index: 0 }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: SubCommand, Parameter 2: PIDOrName, Parameter 3: Timeout
    ...((): ExpectedTestData[] => {
      return [
        ...$subcommand(scopeName, [ 'Wait', 'WaitClose' ], { name: commandName, index: 0 }),
        ...$withNumber(scopeName, { name: commandName, index: 1, subcommand: { name: 'Wait', index: 0 } }),
        ...$shouldInteger(scopeName, { name: commandName, index: 2, subcommand: { name: 'Wait', index: 0 }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: SubCommand, Parameter 2: PIDOrName, Parameter 3: Level
    ...((): ExpectedTestData[] => {
      return [
        ...$subcommand(scopeName, [ 'Priority' ], { name: commandName, index: 0 }),
        ...$withNumber(scopeName, { name: commandName, index: 1, subcommand: { name: 'Priority', index: 0 } }),
        ...$shouldKeyword(scopeName, [
          'Low',
          'L',
          'BelowNormal',
          'B',
          'Normal',
          'N',
          'AboveNormal',
          'A',
          'High',
          'H',
          'Realtime',
          'R',
        ], { name: commandName, index: 2, subcommand: { name: 'Priority', index: 0 }, isLastParameter: true }),
      ];
    })(),

    // This subcommand has not been implemented
    // Parameter 1: SubCommand
    ...((): ExpectedTestData[] => {
      return [
        ...$subcommandlike(scopeName, [ 'List' ], { name: commandName, index: 0 }),
        ...$(scopeName, { name: commandName, index: 1, subcommand: { name: 'List', index: 0, elementName: [ RuleName.UnquotedString, StyleName.Strong ] } }),
        ...$(scopeName, { name: commandName, index: 2, subcommand: { name: 'List', index: 0, elementName: [ RuleName.UnquotedString, StyleName.Strong ] } }),
        ...$(scopeName, { name: commandName, index: 3, subcommand: { name: 'List', index: 0, elementName: [ RuleName.UnquotedString, StyleName.Strong ] } }),
        ...$(scopeName, { name: commandName, index: 4, subcommand: { name: 'List', index: 0, elementName: [ RuleName.UnquotedString, StyleName.Strong ] } }),
      ];
    })(),
  ];
}
