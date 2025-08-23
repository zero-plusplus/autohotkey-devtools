import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { Placeholder } from '../helpers';
import { stringOption } from '../option/stringOption';
import { $ } from './$';

export function $imagePath(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    ...stringOption(scopeName, [ 'HICON:', 'HBITMAP:' ], placeholder),
  ];
}
