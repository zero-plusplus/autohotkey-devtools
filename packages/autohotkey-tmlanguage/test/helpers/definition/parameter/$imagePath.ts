import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { CommandPlaceholder } from '../helpers';
import { stringOption } from '../option/stringOption';
import { $ } from './$';

export function $imagePath(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    ...stringOption(scopeName, [ 'HICON:', 'HBITMAP:' ], placeholder),
  ];
}
