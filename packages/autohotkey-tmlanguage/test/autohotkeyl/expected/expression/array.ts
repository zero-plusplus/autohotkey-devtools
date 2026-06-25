import type { ScopeName } from '../../../../src/tmlanguage.ts';
import * as common from '../../../common/expression/array.ts';
import type { ExpectedTestData } from '../../../types.ts';

export function createArrayLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createArrayLiteralExpectedData(scopeName) ];
}
