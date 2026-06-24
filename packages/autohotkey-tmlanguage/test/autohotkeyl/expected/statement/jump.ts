import type { ScopeName } from '../../../../src/tmlanguage.ts';
import * as common from '../../../common/index.ts';
import type { ExpectedTestData } from '../../../types.ts';

export function createJumpStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createJumpStatementExpectedData(scopeName) ];
}
