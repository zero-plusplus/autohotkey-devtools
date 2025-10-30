import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { CommandPlaceholder } from '../helpers';
import { flagedHexOption } from '../option/flagedHexOption';
import { flagedIdentifierOption } from '../option/flagedIdentifierOption';
import { flagedKeywordOption } from '../option/flagedKeywordOption';
import { flagedSignedFloatOption } from '../option/flagedSignedFloatOption';
import { flagedToggleOption } from '../option/flagedToggleOption';

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
