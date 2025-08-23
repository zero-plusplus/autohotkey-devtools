import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { Placeholder } from '../helpers';
import { keywordOption } from '../option/keywordOption';
import { $ } from './$';

export function $color(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    ...keywordOption(scopeName, [ 'Default', 'Black', 'Silver', 'Gray', 'White', 'Maroon', 'Red', 'Purple', 'Fuchsia', 'Green', 'Lime', 'Olive', 'Yellow', 'Navy', 'Blue', 'Teal', 'Aqua' ], placeholder),
  ];
}
