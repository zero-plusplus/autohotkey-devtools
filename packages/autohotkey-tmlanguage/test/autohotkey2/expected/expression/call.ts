import type { ScopeName } from '../../../../src/types';
import * as common from '../../../common/expression/call';
import type { ExpectedTestData } from '../../../types';

export function createCallExpressionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createCallExpressionExpectedData(scopeName) ];
}
