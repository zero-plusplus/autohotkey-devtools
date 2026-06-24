import type { ScopeName } from '../../../../src/tmlanguage.ts';
import * as common from '../../../common/expression/number.ts';
import type { ExpectedTestData } from '../../../types.ts';

export function createNumberLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createNumberLiteralExpectedData(scopeName) ];
}
