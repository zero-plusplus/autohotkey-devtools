import type { ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import type { CommandPlaceholder } from '../helpers.ts';
import { $shouldFloat } from './$shouldFloat.ts';
import { $shouldInteger } from './$shouldInteger.ts';

export function $shouldNumber(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...$shouldInteger(scopeName, placeholder),
    ...$shouldFloat(scopeName, placeholder),
  ];
}
