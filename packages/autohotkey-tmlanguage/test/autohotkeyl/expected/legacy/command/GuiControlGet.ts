import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import { $blank } from '../../../../helpers/definition/parameter/$blank.ts';
import { $control } from '../../../../helpers/definition/parameter/$control.ts';
import { $guisubcommand } from '../../../../helpers/definition/parameter/$guisubcommand.ts';
import { $output } from '../../../../helpers/definition/parameter/$output.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/GuiControlGet.htm
export function createGuiControlGetExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'GuiControlGet';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: SubCommand, Parameter 3: ControlID, Parameter 4: Value
    ...((): ExpectedTestData[] => {
      return [
        ...$guisubcommand(scopeName, [ 'Pos', 'Focus', 'FocusV', 'Visible', 'Hwnd', 'Name' ], { name: commandName, index: 1 }),
        ...$control(scopeName, { name: commandName, index: 2, subcommand: { index: 1, name: 'Pos' }, isLastParameter: true }),
      ];
    })(),

    // Parameter 2: SubCommand, Parameter 3: Blank, Parameter 4: ControlID, Parameter 5: Value
    ...((): ExpectedTestData[] => {
      return [
        ...$blank(scopeName, { name: commandName, index: 1 }),
        ...$control(scopeName, { name: commandName, index: 2 }),
        ...$(scopeName, { name: commandName, index: 3, isLastParameter: true }),
      ];
    })(),
  ];
}
