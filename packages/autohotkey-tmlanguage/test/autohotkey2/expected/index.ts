import type { ScopeName } from '../../../src/types';
import * as common from '../../common';
import type { ExpectedTestData } from '../../types';
import { createFunctionDeclarationExpectedData } from './declaration/function';
import { createArrayLiteralExpectedData } from './expression/array';
import { createCallExpressionExpectedData } from './expression/call';
import { createObjectLiteralExpectedData } from './expression/object';
import { createOperatorInExpressionExpectedData } from './expression/operator';
import { createRegExpExpectedData } from './expression/regexp';
import { createStringLiteralExpectedData } from './expression/string';
import { createVariableExpectedData } from './expression/variable';

export function createExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // #region common
    ...common.createDocumentCommentExpectedData(scopeName),
    ...common.createMultiLineCommentExpectedData(scopeName),
    ...common.createSingleLineCommentExpectedData(scopeName),
    // #endregion common

    ...createArrayLiteralExpectedData(scopeName),
    ...createCallExpressionExpectedData(scopeName),
    ...createFunctionDeclarationExpectedData(scopeName),
    ...createObjectLiteralExpectedData(scopeName),
    ...createOperatorInExpressionExpectedData(scopeName),
    ...createRegExpExpectedData(scopeName),
    ...createStringLiteralExpectedData(scopeName),
    ...createVariableExpectedData(scopeName),
  ];
}
