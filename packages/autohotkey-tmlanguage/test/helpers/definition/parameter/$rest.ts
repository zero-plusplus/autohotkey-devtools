import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { Placeholder } from '../helpers';
import { $ } from './$';

export function $rest(scopeName: ScopeName, placeholder: Placeholder, additionalExpectedTestDataBuilder = (placeholder: Placeholder): ExpectedTestData[] => ([])): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    ...$(scopeName, { ...placeholder, index: placeholder.index + 1 }),
    ...$(scopeName, { ...placeholder, index: placeholder.index + 2 }),
    ...$(scopeName, { ...placeholder, index: placeholder.index + 3 }),
  ];
}

