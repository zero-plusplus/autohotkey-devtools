import type { ScopeName } from '../../../../src/types';
import * as common from '../../../common/expression/array';
import type { ExpectedTestData } from '../../../types';

export function createArrayLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createArrayLiteralExpectedData(scopeName) ];
}
