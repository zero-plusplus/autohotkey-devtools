import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { Placeholder } from '../helpers';
import { $ } from './$';

export function $path(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [ ...$(scopeName, placeholder) ];
}
