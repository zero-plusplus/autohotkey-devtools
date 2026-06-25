import type { ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import type { CommandPlaceholder } from '../helpers.ts';
import { $rest } from './$rest.ts';

export function $shouldEscapeComma(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return $rest(scopeName, placeholder);
}
