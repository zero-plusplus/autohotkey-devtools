import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { Placeholder } from '../helpers';
import { $shouldKeyword } from './$shouldKeyword';

export function $timeunit(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return $shouldKeyword(scopeName, [ 'Seconds', 'S', 'Minutes', 'M', 'Hours', 'H', 'Days', 'D' ], placeholder);
}
