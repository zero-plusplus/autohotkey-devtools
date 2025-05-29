import type { ScopeName } from '../../../../src/tmlanguage';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createUntilStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createUntilStatementExpectedData(scopeName) ];
}
