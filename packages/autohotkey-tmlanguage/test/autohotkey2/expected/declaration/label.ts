import type { ScopeName } from '../../../../src/types';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createLabelStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createLabelStatementExpectedData(scopeName) ];
}
