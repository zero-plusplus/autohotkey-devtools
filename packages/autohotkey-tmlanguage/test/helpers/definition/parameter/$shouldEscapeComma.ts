import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { Placeholder } from '../helpers';
import { $rest } from './$rest';

export function $shouldEscapeComma(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return $rest(scopeName, placeholder);
}
