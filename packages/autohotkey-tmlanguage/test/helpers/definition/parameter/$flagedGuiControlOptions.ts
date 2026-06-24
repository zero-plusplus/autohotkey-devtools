import type { ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import type { CommandPlaceholder } from '../helpers.ts';
import { flagedHexOption } from '../option/flagedHexOption.ts';
import { flagedIdentifierOption } from '../option/flagedIdentifierOption.ts';
import { flagedKeywordOption } from '../option/flagedKeywordOption.ts';
import { flagedSignedFloatOption } from '../option/flagedSignedFloatOption.ts';
import { flagedToggleOption } from '../option/flagedToggleOption.ts';

export function $flagedGuiControlOptions(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...flagedKeywordOption(scopeName, [
      'X+M',
      'X-M',
      'Y+M',
      'Y-M',
      'Left',
      'Right',
      'Center',
      'Section',
      'Tabstop',
      'Wrap',
      'AltSubmit',
      'CDefault',
      'BackgroundTrans',
      'Background',
      'Border',
      'Theme',
    ], placeholder),
    ...flagedSignedFloatOption(scopeName, [
      'R',
      'W',
      'H',
      'WP',
      'HP',
      'X',
      'Y',
      'XP',
      'YP',
      'XM',
      'YM',
      'XS',
      'YS',
      'Choose',
      'VScroll',
      'HScroll',
    ], placeholder),
    ...flagedIdentifierOption(scopeName, [ 'V', 'G', 'Hwnd' ], placeholder),
    ...flagedHexOption(scopeName, [ 'C' ], placeholder),
    ...flagedToggleOption(scopeName, [ 'Disabled', 'Hidden' ], placeholder),
  ];
}
