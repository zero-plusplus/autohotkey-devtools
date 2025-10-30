import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $fontName } from '../../../../helpers/definition/parameter/$fontName';
import { $subcommand } from '../../../../helpers/definition/parameter/$subcommand';
import { $subcommandlike } from '../../../../helpers/definition/parameter/$subcommandlike';
import { $winTitle } from '../../../../helpers/definition/parameter/$winTitle';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/Progress.htm
export function createProgressExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'Progress';

  return [
    // Parameter 1: Off
    ...$subcommandlike(scopeName, [ 'Off' ], { name: commandName, index: 0, isLastParameter: true, deprecated: true }),

    // Parameter 1: ProgressParam1
    ...((placeholder = { name: commandName, index: 0, deprecated: true }): ExpectedTestData[] => {
      return [
        ...$subcommand(scopeName, [ 'Show' ], placeholder),
        ...$(scopeName, placeholder),
      ];
    })(),

    // Parameter 2: SubText
    ...$(scopeName, { name: commandName, index: 1, deprecated: true }),

    // Parameter 3: MainText
    ...$(scopeName, { name: commandName, index: 2, deprecated: true }),

    // Parameter 4: WinTitle
    ...$winTitle(scopeName, { name: commandName, index: 3, deprecated: true }),

    // Parameter 5: FontName
    ...$fontName(scopeName, { name: commandName, index: 4, isLastParameter: true, deprecated: true }),
  ];
}
