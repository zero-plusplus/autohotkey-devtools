import type { ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import type { CommandPlaceholder } from '../helpers.ts';
import { hexOption } from '../option/hexOption.ts';
import { identifierOption } from '../option/identifierOption.ts';
import { keywordOption } from '../option/keywordOption.ts';
import { signedFloatOption } from '../option/signedFloatOption.ts';
import { toggleOption } from '../option/toggleOption.ts';

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
