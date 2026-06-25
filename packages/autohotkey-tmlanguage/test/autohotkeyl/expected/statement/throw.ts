import type { ScopeName } from '../../../../src/tmlanguage.ts';
import * as common from '../../../common/index.ts';
import type { ExpectedTestData } from '../../../types.ts';

export function createThrowStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createThrowStatementExpectedData(scopeName) ];
}
