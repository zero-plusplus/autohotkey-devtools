import type { ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import type { CommandPlaceholder } from '../helpers.ts';
import { $ } from './$.ts';

export function $rest(scopeName: ScopeName, placeholder: CommandPlaceholder, additionalExpectedTestDataBuilder = (placeholder: CommandPlaceholder): ExpectedTestData[] => ([])): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    ...$(scopeName, { ...placeholder, index: placeholder.index + 1 }),
    ...$(scopeName, { ...placeholder, index: placeholder.index + 2 }),
    ...$(scopeName, { ...placeholder, index: placeholder.index + 3 }),
  ];
}

