import type { ScopeName } from '../../../../src/types';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createJumpStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createJumpStatementExpectedData(scopeName) ];
}
