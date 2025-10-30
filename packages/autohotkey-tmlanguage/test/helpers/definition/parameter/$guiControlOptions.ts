import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { CommandPlaceholder } from '../helpers';
import { hexOption } from '../option/hexOption';
import { identifierOption } from '../option/identifierOption';
import { keywordOption } from '../option/keywordOption';
import { signedFloatOption } from '../option/signedFloatOption';
import { toggleOption } from '../option/toggleOption';

export function $guiControlOptions(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...keywordOption(scopeName, [
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
    ...signedFloatOption(scopeName, [
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
    ...identifierOption(scopeName, [ 'V', 'G', 'Hwnd' ], placeholder),
    ...hexOption(scopeName, [ 'C' ], placeholder),
    ...toggleOption(scopeName, [ 'Disabled', 'Hidden' ], placeholder),
  ];
}
