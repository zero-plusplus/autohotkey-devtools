import type { ScopeName } from '../../../../../src/tmlanguage';
import { floatOption } from '../../../../helpers/definition/option/floatOption';
import { keywordOption } from '../../../../helpers/definition/option/keywordOption';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $expressionWithPercentExpression } from '../../../../helpers/definition/parameter/$expressionWithPercentExpression';
import { $hotkeyName } from '../../../../helpers/definition/parameter/$hotkeyName';
import { $subcommand } from '../../../../helpers/definition/parameter/$subcommand';
import { $winTitle } from '../../../../helpers/definition/parameter/$winTitle';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/Hotkey.htm
export function createHotkeyExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'Hotkey';

  return [
    // Parameter 1: KeyName, Parameter 2: Label, Parameter 3: Options
    ...((): ExpectedTestData[] => {
      return [
        ...$hotkeyName(scopeName, { name: commandName, index: 0 }),
        ...((placeholder = { name: commandName, index: 1 }): ExpectedTestData[] => {
          return [
            ...$(scopeName, placeholder),
            ...keywordOption(scopeName, [ 'On', 'Off', 'Toggle', 'AltTab' ], placeholder),
          ];
        })(),
        ...((placeholder = { name: commandName, index: 2, isLastParameter: true }): ExpectedTestData[] => {
          return [
            ...$(scopeName, placeholder),
            ...keywordOption(scopeName, [ 'UseErrorLevel', 'On', 'Off', 'B', 'B0' ], placeholder),
            ...floatOption(scopeName, [ 'P', 'T', 'I' ], placeholder),
          ];
        })(),
      ];
    })(),

    // Parameter 1: IfWinActive/Exist, Parameter 2: WinTitle, Parameter 3: WinText
    ...((): ExpectedTestData[] => {
      return [
        ...$subcommand(scopeName, [ 'IfWinActive', 'IfWinExist' ], { name: commandName, index: 0 }),
        ...$winTitle(scopeName, { name: commandName, index: 1, subcommand: { name: 'IfWinActive', index: 0 } }),
        ...$(scopeName, { name: commandName, index: 2, subcommand: { name: 'IfWinActive', index: 0 }, isLastParameter: true }),
      ];
    })(),

    // Parameter 1: If, Parameter 2: Expression
    ...((): ExpectedTestData[] => {
      return [
        ...$subcommand(scopeName, [ 'If' ], { name: commandName, index: 0 }),
        ...$expressionWithPercentExpression(scopeName, { name: commandName, index: 1, subcommand: { name: 'If', index: 0 }, isLastParameter: true }),
      ];
    })(),
  ];
}
