import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { CommandPlaceholder } from '../helpers';
import { $shouldFloat } from './$shouldFloat';
import { $shouldInteger } from './$shouldInteger';

export function $shouldNumber(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...$shouldInteger(scopeName, placeholder),
    ...$shouldFloat(scopeName, placeholder),
  ];
}
