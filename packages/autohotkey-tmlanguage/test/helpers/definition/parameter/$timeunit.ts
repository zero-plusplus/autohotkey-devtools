import type { ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import type { CommandPlaceholder } from '../helpers.ts';
import { $shouldKeyword } from './$shouldKeyword.ts';

export function $timeunit(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return $shouldKeyword(scopeName, [ 'Seconds', 'S', 'Minutes', 'M', 'Hours', 'H', 'Days', 'D' ], placeholder);
}
