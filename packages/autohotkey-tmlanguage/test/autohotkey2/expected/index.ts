import type { ScopeName } from '../../../src/types';
import * as common from '../../common';
import type { ExpectedTestData } from '../../types';
import { createOperatorInExpressionExpectedData } from './expression/operator';
import { createRegExpExpectedData } from './expression/regexp';

export function createExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // #region common
    ...common.createDocumentCommentExpectedData(scopeName),
    ...common.createMultiLineCommentExpectedData(scopeName),
    ...common.createSingleLineCommentExpectedData(scopeName),
    // #endregion common

    ...createOperatorInExpressionExpectedData(scopeName),
    ...createRegExpExpectedData(scopeName),
  ];
}
