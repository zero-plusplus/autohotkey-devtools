import type { ScopeName } from '../../../../src/types';
import * as common from '../../../common/statement/include';
import type { ExpectedTestData } from '../../../types';

export function createIncludeStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createIncludeStatementExpectedData(scopeName) ];
}
