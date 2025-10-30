import type { ScopeName } from '../../../../../src/tmlanguage';
import { floatOption } from '../../../../helpers/definition/option/floatOption';
import { keywordOption } from '../../../../helpers/definition/option/keywordOption';
import { sizeOption } from '../../../../helpers/definition/option/sizeOption';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $blank } from '../../../../helpers/definition/parameter/$blank';
import { $color } from '../../../../helpers/definition/parameter/$color';
import { $onOffToggle } from '../../../../helpers/definition/parameter/$onOffToggle';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger';
import { $style } from '../../../../helpers/definition/parameter/$style';
import { $subcommand } from '../../../../helpers/definition/parameter/$subcommand';
import { $winTitle } from '../../../../helpers/definition/parameter/$winTitle';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/WinSet.htm
export function createWinSetExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'WinSet';

  return [
    // Parameter 1: SubCommand, Parameter 2: OnOffToggle, Parameter 3: WinTitle, Parameter 4: WinText, Parameter 5: ExcludeTitle, Parameter 6: ExcludeText
    ...((): ExpectedTestData[] => {
      return [
        ...$subcommand(scopeName, [ 'AlwaysOnTop' ], { name: commandName, index: 0 }),
        ...$onOffToggle(scopeName, { name: commandName, index: 1, subcommand: { name: 'AlwaysOnTop', index: 0 } }),
        ...$winTitle(scopeName, { name: commandName, index: 2, subcommand: { name: 'AlwaysOnTop', index: 0 } }),
        ...$(scopeName, { name: commandName, index: 3, subcommand: { name: 'AlwaysOnTop', index: 0 } }),
        ...$winTitle(scopeName, { name: commandName, index: 4, subcommand: { name: 'AlwaysOnTop', index: 0 } }),
        ...$(scopeName, { name: commandName, index: 5, subcommand: { name: 'AlwaysOnTop', index: 0 }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: SubCommand, Parameter 2: N, Parameter 3: WinTitle, Parameter 4: WinText, Parameter 5: ExcludeTitle, Parameter 6: ExcludeText
    ...((): ExpectedTestData[] => {
      return [
        ...$subcommand(scopeName, [ 'Transparent' ], { name: commandName, index: 0 }),
        ...$shouldInteger(scopeName, { name: commandName, index: 1, subcommand: { name: 'Transparent', index: 0 } }),
        ...$winTitle(scopeName, { name: commandName, index: 2, subcommand: { name: 'Transparent', index: 0 } }),
        ...$(scopeName, { name: commandName, index: 3, subcommand: { name: 'Transparent', index: 0 } }),
        ...$winTitle(scopeName, { name: commandName, index: 4, subcommand: { name: 'Transparent', index: 0 } }),
        ...$(scopeName, { name: commandName, index: 5, subcommand: { name: 'Transparent', index: 0 }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: SubCommand, Parameter 2: Color, Parameter 3: WinTitle, Parameter 4: WinText, Parameter 5: ExcludeTitle, Parameter 6: ExcludeText
    ...((): ExpectedTestData[] => {
      return [
        ...$subcommand(scopeName, [ 'TransColor' ], { name: commandName, index: 0 }),
        ...$color(scopeName, { name: commandName, index: 1, subcommand: { name: 'TransColor', index: 0 } }),
        ...$winTitle(scopeName, { name: commandName, index: 2, subcommand: { name: 'TransColor', index: 0 } }),
        ...$(scopeName, { name: commandName, index: 3, subcommand: { name: 'TransColor', index: 0 } }),
        ...$winTitle(scopeName, { name: commandName, index: 4, subcommand: { name: 'TransColor', index: 0 } }),
        ...$(scopeName, { name: commandName, index: 5, subcommand: { name: 'TransColor', index: 0 }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: SubCommand, Parameter 2: N, Parameter 3: WinTitle, Parameter 4: WinText, Parameter 5: ExcludeTitle, Parameter 6: ExcludeText
    ...((): ExpectedTestData[] => {
      return [
        ...$subcommand(scopeName, [ 'Style', 'ExStyle' ], { name: commandName, index: 0 }),
        ...$style(scopeName, { name: commandName, index: 1, subcommand: { name: 'Style', index: 0 } }),
        ...$winTitle(scopeName, { name: commandName, index: 2, subcommand: { name: 'Style', index: 0 } }),
        ...$(scopeName, { name: commandName, index: 3, subcommand: { name: 'Style', index: 0 } }),
        ...$winTitle(scopeName, { name: commandName, index: 4, subcommand: { name: 'Style', index: 0 } }),
        ...$(scopeName, { name: commandName, index: 5, subcommand: { name: 'Style', index: 0 }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: SubCommand, Parameter 2: Blank, Parameter 3: WinTitle, Parameter 4: WinText, Parameter 5: ExcludeTitle, Parameter 6: ExcludeText
    ...((): ExpectedTestData[] => {
      return [
        ...$subcommand(scopeName, [ 'Bottom', 'Top', 'Disable', 'Enable', 'Redraw' ], { name: commandName, index: 0 }),
        ...$blank(scopeName, { name: commandName, index: 1, subcommand: { name: 'Bottom', index: 0 } }),
        ...$winTitle(scopeName, { name: commandName, index: 2, subcommand: { name: 'Bottom', index: 0 } }),
        ...$(scopeName, { name: commandName, index: 3, subcommand: { name: 'Bottom', index: 0 } }),
        ...$winTitle(scopeName, { name: commandName, index: 4, subcommand: { name: 'Bottom', index: 0 } }),
        ...$(scopeName, { name: commandName, index: 5, subcommand: { name: 'Bottom', index: 0 }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: SubCommand, Parameter 2: Options, Parameter 3: WinTitle, Parameter 4: WinText, Parameter 5: ExcludeTitle, Parameter 6: ExcludeText
    ...((): ExpectedTestData[] => {
      return [
        ...$subcommand(scopeName, [ 'Region' ], { name: commandName, index: 0 }),
        ...((placeholder = { name: commandName, index: 1, subcommand: { name: 'Region', index: 0 } }): ExpectedTestData[] => {
          return [
            ...$(scopeName, placeholder),
            ...keywordOption(scopeName, [ 'E' ], placeholder),
            ...floatOption(scopeName, [ 'W', 'H' ], placeholder),
            ...sizeOption(scopeName, [ 'R', '' ], placeholder),
          ];
        })(),
        ...$winTitle(scopeName, { name: commandName, index: 2, subcommand: { name: 'Region', index: 0 } }),
        ...$(scopeName, { name: commandName, index: 3, subcommand: { name: 'Region', index: 0 } }),
        ...$winTitle(scopeName, { name: commandName, index: 4, subcommand: { name: 'Region', index: 0 } }),
        ...$(scopeName, { name: commandName, index: 5, subcommand: { name: 'Region', index: 0 }, isLastParameter: true }),
      ];
    })(),

    ...$blank(scopeName, { name: commandName, index: 0 }),
  ];
}
