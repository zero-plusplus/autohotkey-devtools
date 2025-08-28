import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { CommandPlaceholder } from '../helpers';
import { $ } from './$';

export function $fontName(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [ ...$(scopeName, placeholder) ];
}
