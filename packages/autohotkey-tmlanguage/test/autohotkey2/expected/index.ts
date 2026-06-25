import type { ScopeName } from '../../../src/tmlanguage.ts';
import * as common from '../../common/index.ts';
import type { ExpectedTestData } from '../../types.ts';
import { createAssignmentDeclarationExpectedData } from './declaration/assignment.ts';
import { createClassDeclarationExpectedData } from './declaration/class/index.ts';
import { createMetaFunctionDeclarationExpectedData } from './declaration/class/metaFunction.ts';
import { createFunctionDeclarationExpectedData } from './declaration/function.ts';
import { createHotkeyLabelStatementExpectedData } from './declaration/hotkeyLabel.ts';
import { createHotstringLabelStatementExpectedData } from './declaration/hotstringLabel.ts';
import { createLabelStatementExpectedData } from './declaration/label.ts';
import { createArrayLiteralExpectedData } from './expression/array.ts';
import { createCallExpressionExpectedData } from './expression/call.ts';
import { createDereferenceExpressionExpectedData } from './expression/dereference.ts';
import { createNumberLiteralExpectedData } from './expression/number.ts';
import { createObjectLiteralExpectedData } from './expression/object.ts';
import { createOperatorInExpressionExpectedData } from './expression/operator.ts';
import { createParenthesizedExpressionExpectedData } from './expression/parenthesized.ts';
import { createRegExpExpectedData } from './expression/regexp.ts';
import { createStringLiteralExpectedData } from './expression/string.ts';
import { createVariableExpectedData } from './expression/variable.ts';
import { createCallStatementExpectedData } from './statement/call.ts';
import { createDirectiveStatementExpectedData } from './statement/directive/index.ts';
import { createForStatementExpectedData } from './statement/for.ts';
import { createIfStatementExpectedData } from './statement/if.ts';
import { createJumpStatementExpectedData } from './statement/jump.ts';
import { createLoopStatementExpectedData } from './statement/loop.ts';
import { createSwitchStatementExpectedData } from './statement/switch.ts';
import { createThrowStatementExpectedData } from './statement/throw.ts';
import { createTryStatementExpectedData } from './statement/try.ts';
import { createWhileStatementExpectedData } from './statement/while.ts';

interface Placeholder {
  keywordLikeBuiltinVariables: readonly string[];
  builtinVaribles: readonly string[];
  builtInClassNames: readonly string[];
}
export function createExpectedDataList(scopeName: ScopeName, placeholder?: Placeholder): ExpectedTestData[] {
  return [
    // #region common
    ...common.createDirectiveCommentExpectedData(scopeName),
    ...common.createDocumentCommentExpectedData(scopeName),
    ...common.createMultiLineCommentExpectedData(scopeName),
    ...common.createSingleLineCommentExpectedData(scopeName),
    // #endregion common

    ...createArrayLiteralExpectedData(scopeName),
    ...createAssignmentDeclarationExpectedData(scopeName),
    ...createCallExpressionExpectedData(scopeName),
    ...createCallStatementExpectedData(scopeName),
    ...createClassDeclarationExpectedData(scopeName),
    ...createDereferenceExpressionExpectedData(scopeName),
    ...createDirectiveStatementExpectedData(scopeName),
    ...createForStatementExpectedData(scopeName),
    ...createFunctionDeclarationExpectedData(scopeName),
    ...createHotkeyLabelStatementExpectedData(scopeName),
    ...createHotstringLabelStatementExpectedData(scopeName),
    ...createIfStatementExpectedData(scopeName),
    ...createJumpStatementExpectedData(scopeName),
    ...createLabelStatementExpectedData(scopeName),
    ...createLoopStatementExpectedData(scopeName),
    ...createMetaFunctionDeclarationExpectedData(scopeName),
    ...createNumberLiteralExpectedData(scopeName),
    ...createObjectLiteralExpectedData(scopeName),
    ...createOperatorInExpressionExpectedData(scopeName),
    ...createParenthesizedExpressionExpectedData(scopeName),
    ...createRegExpExpectedData(scopeName),
    ...createStringLiteralExpectedData(scopeName),
    ...createSwitchStatementExpectedData(scopeName),
    ...createThrowStatementExpectedData(scopeName),
    ...createTryStatementExpectedData(scopeName),
    ...createVariableExpectedData(scopeName, placeholder),
    ...createWhileStatementExpectedData(scopeName),
  ];
}
