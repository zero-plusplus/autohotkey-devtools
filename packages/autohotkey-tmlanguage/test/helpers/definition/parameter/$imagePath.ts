import type { ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import type { CommandPlaceholder } from '../helpers.ts';
import { stringOption } from '../option/stringOption.ts';
import { $ } from './$.ts';

export function $imagePath(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    ...stringOption(scopeName, [ 'HICON:', 'HBITMAP:' ], placeholder),
  ];
}
