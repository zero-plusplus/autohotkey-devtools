import type { ScopeName } from '../../../../src/tmlanguage';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createWhileStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createWhileStatementExpectedData(scopeName) ];
}
