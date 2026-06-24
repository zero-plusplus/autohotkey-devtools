import type { ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import type { CommandPlaceholder } from '../helpers.ts';
import { $ } from './$.ts';

export function $path(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [ ...$(scopeName, placeholder) ];
}
