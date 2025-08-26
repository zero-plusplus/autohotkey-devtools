import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { Placeholder } from '../helpers';
import { $shouldFloat } from './$shouldFloat';
import { $shouldInteger } from './$shouldInteger';

export function $shouldNumber(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...$shouldInteger(scopeName, placeholder),
    ...$shouldFloat(scopeName, placeholder),
  ];
}
