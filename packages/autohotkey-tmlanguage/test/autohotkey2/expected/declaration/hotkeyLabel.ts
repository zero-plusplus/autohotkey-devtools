import type { ScopeName } from '../../../../src/types';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createHotkeyLabelStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createHotkeyLabelStatementExpectedData(scopeName) ];
}
