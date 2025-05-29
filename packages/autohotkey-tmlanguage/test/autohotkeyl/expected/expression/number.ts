import type { ScopeName } from '../../../../src/tmlanguage';
import * as common from '../../../common/expression/number';
import type { ExpectedTestData } from '../../../types';

export function createNumberLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createNumberLiteralExpectedData(scopeName) ];
}
