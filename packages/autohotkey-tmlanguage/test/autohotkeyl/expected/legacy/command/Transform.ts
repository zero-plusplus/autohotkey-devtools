import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger';
import { $shouldNumber } from '../../../../helpers/definition/parameter/$shouldNumber';
import { $subcommand } from '../../../../helpers/definition/parameter/$subcommand';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/Transform.htm
export function createTransformExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'Transform';

  return [
    // Parameter 1: OutputVar, Parameter 2: SubCommand, Parameter 3: String
    ...((): ExpectedTestData[] => {
      return [
        ...$output(scopeName, { name: commandName, index: 0, deprecated: true }),
        ...$subcommand(scopeName, [ 'Unicode', 'Deref', 'Asc' ], { name: commandName, index: 1, deprecated: true }),
        ...$(scopeName, { name: commandName, index: 2, subcommand: { name: 'Unicode', index: 1 }, isLastParameter: true, deprecated: true }),
      ];
    })(),

    // Parameter 1: OutputVar, Parameter 2: SubCommand, Parameter 3: String, Parameter 4: Flags
    ...((): ExpectedTestData[] => {
      return [
        ...$output(scopeName, { name: commandName, index: 0, deprecated: true }),
        ...$subcommand(scopeName, [ 'HTML' ], { name: commandName, index: 1, deprecated: true }),
        ...$(scopeName, { name: commandName, index: 2, subcommand: { name: 'HTML', index: 1 }, deprecated: true }),
        ...$shouldInteger(scopeName, { name: commandName, index: 3, subcommand: { name: 'HTML', index: 1 }, isLastParameter: true, deprecated: true }),
      ];
    })(),

    // Parameter 1: OutputVar, Parameter 2: SubCommand, Parameter 3: Number
    ...((): ExpectedTestData[] => {
      return [
        ...$output(scopeName, { name: commandName, index: 0, deprecated: true }),
        ...$subcommand(scopeName, [
          'Chr',
          'Sqrt',
          'Log',
          'Ln',
          'Ceil',
          'Floor',
          'Abs',
          'Sin',
          'Cos',
          'Tan',
          'ASin',
          'ACos',
          'ATan',
          'BitNot',
        ], { name: commandName, index: 1, deprecated: true }),
        ...$shouldNumber(scopeName, { name: commandName, index: 2, subcommand: { name: 'Chr', index: 1 }, isLastParameter: true, deprecated: true }),
      ];
    })(),

    // Parameter 1: OutputVar, Parameter 2: SubCommand, Parameter 3: N
    ...((): ExpectedTestData[] => {
      return [
        ...$output(scopeName, { name: commandName, index: 0, deprecated: true }),
        ...$subcommand(scopeName, [ 'Exp' ], { name: commandName, index: 1, deprecated: true }),
        ...$shouldNumber(scopeName, { name: commandName, index: 2, subcommand: { name: 'Exp', index: 1 }, isLastParameter: true, deprecated: true }),
      ];
    })(),

    // Parameter 1: OutputVar, Parameter 2: SubCommand, Parameter 3: Dividend, Parameter 4: Divisor
    ...((): ExpectedTestData[] => {
      return [
        ...$output(scopeName, { name: commandName, index: 0, deprecated: true }),
        ...$subcommand(scopeName, [ 'Mod' ], { name: commandName, index: 1, deprecated: true }),
        ...$shouldNumber(scopeName, { name: commandName, index: 2, subcommand: { name: 'Mod', index: 1 }, deprecated: true }),
        ...$shouldNumber(scopeName, { name: commandName, index: 3, subcommand: { name: 'Mod', index: 1 }, isLastParameter: true, deprecated: true }),
      ];
    })(),

    // Parameter 1: OutputVar, Parameter 2: SubCommand, Parameter 3: Number, Parameter 4: N
    ...((): ExpectedTestData[] => {
      return [
        ...$output(scopeName, { name: commandName, index: 0, deprecated: true }),
        ...$subcommand(scopeName, [ 'Round', 'BitShiftLeft', 'BitShiftRight' ], { name: commandName, index: 1, deprecated: true }),
        ...$shouldNumber(scopeName, { name: commandName, index: 2, subcommand: { name: 'Round', index: 1 }, deprecated: true }),
        ...$shouldNumber(scopeName, { name: commandName, index: 3, subcommand: { name: 'Round', index: 1 }, isLastParameter: true, deprecated: true }),
      ];
    })(),

    // Parameter 1: OutputVar, Parameter 2: SubCommand, Parameter 3: Base, Parameter 4: Exponent
    ...((): ExpectedTestData[] => {
      return [
        ...$output(scopeName, { name: commandName, index: 0, deprecated: true }),
        ...$subcommand(scopeName, [ 'Pow' ], { name: commandName, index: 1, deprecated: true }),
        ...$shouldNumber(scopeName, { name: commandName, index: 2, subcommand: { name: 'Pow', index: 1 }, deprecated: true }),
        ...$shouldNumber(scopeName, { name: commandName, index: 3, subcommand: { name: 'Pow', index: 1 }, isLastParameter: true, deprecated: true }),
      ];
    })(),

    // Parameter 1: OutputVar, Parameter 2: SubCommand, Parameter 3: Number1, Parameter 4: Number2
    ...((): ExpectedTestData[] => {
      return [
        ...$output(scopeName, { name: commandName, index: 0, deprecated: true }),
        ...$subcommand(scopeName, [ 'BitAnd', 'BitOr', 'BitXOr' ], { name: commandName, index: 1, deprecated: true }),
        ...$shouldNumber(scopeName, { name: commandName, index: 2, subcommand: { name: 'BitAnd', index: 1 }, deprecated: true }),
        ...$shouldNumber(scopeName, { name: commandName, index: 3, subcommand: { name: 'BitAnd', index: 1 }, isLastParameter: true, deprecated: true }),
      ];
    })(),
  ];
}
