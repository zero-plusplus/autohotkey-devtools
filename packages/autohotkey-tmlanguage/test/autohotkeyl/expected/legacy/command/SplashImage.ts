import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { colorOption } from '../../../../helpers/definition/option/colorOption.ts';
import { floatOption } from '../../../../helpers/definition/option/floatOption.ts';
import { keywordOption } from '../../../../helpers/definition/option/keywordOption.ts';
import { sizeOption } from '../../../../helpers/definition/option/sizeOption.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import { $fontName } from '../../../../helpers/definition/parameter/$fontName.ts';
import { $imagePath } from '../../../../helpers/definition/parameter/$imagePath.ts';
import { $subcommandlike } from '../../../../helpers/definition/parameter/$subcommandlike.ts';
import { $winTitle } from '../../../../helpers/definition/parameter/$winTitle.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/SplashImage.htm
export function createSplashImageExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SplashImage';

  return [
    // Parameter 1: Off
    ...$subcommandlike(scopeName, [ 'Off' ], { name: commandName, index: 0, isLastParameter: true, deprecated: true }),

    // Parameter 1: ImageFile
    ...$imagePath(scopeName, { name: commandName, index: 0, deprecated: true }),

    // Parameter 2: Options
    ...$(scopeName, { name: commandName, index: 1, deprecated: true }, (placeholder) => {
      return [
        ...keywordOption(scopeName, [ 'A', 'T', 'Hide' ], placeholder),
        ...floatOption(scopeName, [ 'B', 'M', 'P', 'H', 'W', 'X', 'Y', 'C', 'ZH', 'ZW', 'ZX', 'ZY', 'FM', 'FS', 'WM', 'WS' ], placeholder),
        ...colorOption(scopeName, [ 'CB', 'CT', 'CW' ], placeholder),
        ...sizeOption(scopeName, [ 'R' ], placeholder),
      ];
    }),

    // Parameter 3: SubText
    ...$(scopeName, { name: commandName, index: 2, deprecated: true }),

    // Parameter 4: MainText
    ...$(scopeName, { name: commandName, index: 3, deprecated: true }),

    // Parameter 5: WinTitle
    ...$winTitle(scopeName, { name: commandName, index: 4, deprecated: true }),

    // Parameter 6: FontName
    ...$fontName(scopeName, { name: commandName, index: 5, isLastParameter: true, deprecated: true }),
  ];
}
