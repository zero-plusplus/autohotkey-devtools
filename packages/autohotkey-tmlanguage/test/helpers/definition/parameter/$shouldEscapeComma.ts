import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { CommandPlaceholder } from '../helpers';
import { $rest } from './$rest';

export function $shouldEscapeComma(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return $rest(scopeName, placeholder);
}
