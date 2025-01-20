import type { ScopeName } from '../../../src/types';
import * as common from '../../common';
import type { ExpectedTestData } from '../../types';
import { createAssignmentDeclarationExpectedData } from './declaration/assignment';
import { createClassDeclarationExpectedData } from './declaration/class';
import { createFunctionDeclarationExpectedData } from './declaration/function';
import { createHotkeyLabelStatementExpectedData } from './declaration/hotkeyLabel';
import { createHotstringLabelStatementExpectedData } from './declaration/hotstringLabel';
import { createLabelStatementExpectedData } from './declaration/label';
import { createArrayLiteralExpectedData } from './expression/array';
import { createCallExpressionExpectedData } from './expression/call';
import { createDereferenceExpressionExpectedData } from './expression/dereference';
import { createNumberLiteralExpectedData } from './expression/number';
import { createObjectLiteralExpectedData } from './expression/object';
import { createOperatorInExpressionExpectedData } from './expression/operator';
import { createParenthesizedExpressionExpectedData } from './expression/parenthesized';
import { createRegExpExpectedData } from './expression/regexp';
import { createStringLiteralExpectedData } from './expression/string';
import { createVariableExpectedData } from './expression/variable';
import { createForStatementExpectedData } from './statement/for';
import { createIfStatementExpectedData } from './statement/if';
import { createIncludeStatementExpectedData } from './statement/include';
import { createJumpStatementExpectedData } from './statement/jump';
import { createLoopStatementExpectedData } from './statement/loop';
import { createSwitchStatementExpectedData } from './statement/switch';
import { createThrowStatementExpectedData } from './statement/throw';
import { createTryStatementExpectedData } from './statement/try';
import { createUntilStatementExpectedData } from './statement/until';
import { createWhileStatementExpectedData } from './statement/while';

export function createExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // #region common
    ...common.createDocumentCommentExpectedData(scopeName),
    ...common.createMultiLineCommentExpectedData(scopeName),
    ...common.createSingleLineCommentExpectedData(scopeName),
    // #endregion common

    ...createArrayLiteralExpectedData(scopeName),
    ...createAssignmentDeclarationExpectedData(scopeName),
    ...createCallExpressionExpectedData(scopeName),
    ...createClassDeclarationExpectedData(scopeName),
    ...createDereferenceExpressionExpectedData(scopeName),
    ...createForStatementExpectedData(scopeName),
    ...createFunctionDeclarationExpectedData(scopeName),
    ...createHotkeyLabelStatementExpectedData(scopeName),
    ...createHotstringLabelStatementExpectedData(scopeName),
    ...createIfStatementExpectedData(scopeName),
    ...createIncludeStatementExpectedData(scopeName),
    ...createJumpStatementExpectedData(scopeName),
    ...createLabelStatementExpectedData(scopeName),
    ...createLoopStatementExpectedData(scopeName),
    ...createNumberLiteralExpectedData(scopeName),
    ...createObjectLiteralExpectedData(scopeName),
    ...createOperatorInExpressionExpectedData(scopeName),
    ...createParenthesizedExpressionExpectedData(scopeName),
    ...createRegExpExpectedData(scopeName),
    ...createStringLiteralExpectedData(scopeName),
    ...createSwitchStatementExpectedData(scopeName),
    ...createThrowStatementExpectedData(scopeName),
    ...createTryStatementExpectedData(scopeName),
    ...createUntilStatementExpectedData(scopeName),
    ...createVariableExpectedData(scopeName),
    ...createWhileStatementExpectedData(scopeName),
  ];
}
