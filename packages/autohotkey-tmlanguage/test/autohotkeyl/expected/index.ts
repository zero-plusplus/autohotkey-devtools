import type { ScopeName } from '../../../src/tmlanguage.ts';
import * as common from '../../common/index.ts';
import type { ExpectedTestData } from '../../types.ts';
import { createAssignmentDeclarationExpectedData } from './declaration/assignment.ts';
import { createBlockDeclarationExpectedData } from './declaration/block.ts';
import { createFieldDeclarationExpectedData } from './declaration/class/field.ts';
import { createClassDeclarationExpectedData } from './declaration/class/index.ts';
import { createMetaFunctionDeclarationExpectedData } from './declaration/class/metaFunction.ts';
import { createFunctionDeclarationExpectedData } from './declaration/function.ts';
import { createHotkeyLabelStatementExpectedData } from './declaration/hotkeyLabel.ts';
import { createHotstringLabelStatementExpectedData } from './declaration/hotstringLabel.ts';
import { createLabelStatementExpectedData } from './declaration/label.ts';
import { createArrayLiteralExpectedData } from './expression/array.ts';
import { createCallExpressionExpectedData } from './expression/call.ts';
import { createDereferenceExpressionExpectedData } from './expression/dereference.ts';
import { createNewExpressionExpectedData } from './expression/new.ts';
import { createNumberLiteralExpectedData } from './expression/number.ts';
import { createObjectLiteralExpectedData } from './expression/object.ts';
import { createOperatorInExpressionExpectedData } from './expression/operator.ts';
import { createParenthesizedExpressionExpectedData } from './expression/parenthesized.ts';
import { createRegExpExpectedData } from './expression/regexp.ts';
import { createStringLiteralExpectedData } from './expression/string.ts';
import { createVariableExpectedData } from './expression/variable.ts';
import { createLegacyAssignmentStatementExpectedData } from './legacy/assignment.ts';
import { createCommandStatementExpectedData } from './legacy/command/index.ts';
import { createContinuationSectionExpectedData } from './legacy/continuationSection.ts';
import { createLegacyIfStatementExpectedData } from './legacy/if.ts';
import { createDirectiveStatementExpectedData } from './statement/directive/index.ts';
import { createForStatementExpectedData } from './statement/for.ts';
import { createIfStatementExpectedData } from './statement/if.ts';
import { createJumpStatementExpectedData } from './statement/jump.ts';
import { createLoopStatementExpectedData } from './statement/loop.ts';
import { createSwitchStatementExpectedData } from './statement/switch.ts';
import { createThrowStatementExpectedData } from './statement/throw.ts';
import { createTryStatementExpectedData } from './statement/try.ts';
import { createWhileStatementExpectedData } from './statement/while.ts';

export function createExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // #region common
    ...common.createDirectiveCommentExpectedData(scopeName),
    ...common.createDocumentCommentExpectedData(scopeName),
    ...common.createMultiLineCommentExpectedData(scopeName),
    ...common.createSingleLineCommentExpectedData(scopeName),
    // #endregion common

    ...createArrayLiteralExpectedData(scopeName),
    ...createAssignmentDeclarationExpectedData(scopeName),
    ...createBlockDeclarationExpectedData(scopeName),
    ...createCallExpressionExpectedData(scopeName),
    ...createClassDeclarationExpectedData(scopeName),
    ...createCommandStatementExpectedData(scopeName),
    ...createContinuationSectionExpectedData(scopeName),
    ...createDereferenceExpressionExpectedData(scopeName),
    ...createDirectiveStatementExpectedData(scopeName),
    ...createFieldDeclarationExpectedData(scopeName),
    ...createForStatementExpectedData(scopeName),
    ...createFunctionDeclarationExpectedData(scopeName),
    ...createHotkeyLabelStatementExpectedData(scopeName),
    ...createHotstringLabelStatementExpectedData(scopeName),
    ...createIfStatementExpectedData(scopeName),
    ...createJumpStatementExpectedData(scopeName),
    ...createLabelStatementExpectedData(scopeName),
    ...createLegacyAssignmentStatementExpectedData(scopeName),
    ...createLegacyIfStatementExpectedData(scopeName),
    ...createLoopStatementExpectedData(scopeName),
    ...createMetaFunctionDeclarationExpectedData(scopeName),
    ...createNewExpressionExpectedData(scopeName),
    ...createNumberLiteralExpectedData(scopeName),
    ...createObjectLiteralExpectedData(scopeName),
    ...createOperatorInExpressionExpectedData(scopeName),
    ...createParenthesizedExpressionExpectedData(scopeName),
    ...createRegExpExpectedData(scopeName),
    ...createStringLiteralExpectedData(scopeName),
    ...createSwitchStatementExpectedData(scopeName),
    ...createThrowStatementExpectedData(scopeName),
    ...createTryStatementExpectedData(scopeName),
    ...createVariableExpectedData(scopeName),
    ...createWhileStatementExpectedData(scopeName),
  ];
}
