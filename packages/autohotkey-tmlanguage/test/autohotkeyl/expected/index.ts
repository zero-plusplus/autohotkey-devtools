import type { ScopeName } from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';
import { createAssignmentDeclarationExpectedData } from './declaration/assignment';
import { createBlockDeclarationExpectedData } from './declaration/block';
import { createClassDeclarationExpectedData } from './declaration/class';
import { createFieldDeclarationExpectedData } from './declaration/class/field';
import { createMetaFunctionDeclarationExpectedData } from './declaration/class/metaFunction';
import { createFunctionDeclarationExpectedData } from './declaration/function';
import { createHotkeyLabelStatementExpectedData } from './declaration/hotkeyLabel';
import { createHotstringLabelStatementExpectedData } from './declaration/hotstringLabel';
import { createLabelStatementExpectedData } from './declaration/label';
import { createArrayLiteralExpectedData } from './expression/array';
import { createCallExpressionExpectedData } from './expression/call';
import { createDereferenceExpressionExpectedData } from './expression/dereference';
import { createNewExpressionExpectedData } from './expression/new';
import { createNumberLiteralExpectedData } from './expression/number';
import { createObjectLiteralExpectedData } from './expression/object';
import { createOperatorInExpressionExpectedData } from './expression/operator';
import { createParenthesizedExpressionExpectedData } from './expression/parenthesized';
import { createRegExpExpectedData } from './expression/regexp';
import { createStringLiteralExpectedData } from './expression/string';
import { createVariableExpectedData } from './expression/variable';
import { createLegacyAssignmentStatementExpectedData } from './legacy/assignment';
import { createCommandStatementExpectedData } from './legacy/command';
import { createContinuationSectionExpectedData } from './legacy/continuationSection';
import { createLegacyIfStatementExpectedData } from './legacy/if';
import { createDirectiveStatementExpectedData } from './statement/directive';
import { createForStatementExpectedData } from './statement/for';
import { createIfStatementExpectedData } from './statement/if';
import { createJumpStatementExpectedData } from './statement/jump';
import { createLoopStatementExpectedData } from './statement/loop';
import { createSwitchStatementExpectedData } from './statement/switch';
import { createThrowStatementExpectedData } from './statement/throw';
import { createTryStatementExpectedData } from './statement/try';
import { createWhileStatementExpectedData } from './statement/while';
import { createDirectiveCommentExpectedData } from './trivia/directiveComment';
import { createDocumentCommentExpectedData } from './trivia/documentComment';
import { createMultiLineCommentExpectedData } from './trivia/multiLineComment';
import { createSingleLineCommentExpectedData } from './trivia/singleLineComment';

export function createExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...createArrayLiteralExpectedData(scopeName),
    ...createAssignmentDeclarationExpectedData(scopeName),
    ...createBlockDeclarationExpectedData(scopeName),
    ...createCallExpressionExpectedData(scopeName),
    ...createClassDeclarationExpectedData(scopeName),
    ...createCommandStatementExpectedData(scopeName),
    ...createContinuationSectionExpectedData(scopeName),
    ...createDereferenceExpressionExpectedData(scopeName),
    ...createDirectiveCommentExpectedData(scopeName),
    ...createDirectiveStatementExpectedData(scopeName),
    ...createDocumentCommentExpectedData(scopeName),
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
    ...createMultiLineCommentExpectedData(scopeName),
    ...createNewExpressionExpectedData(scopeName),
    ...createNumberLiteralExpectedData(scopeName),
    ...createObjectLiteralExpectedData(scopeName),
    ...createOperatorInExpressionExpectedData(scopeName),
    ...createParenthesizedExpressionExpectedData(scopeName),
    ...createRegExpExpectedData(scopeName),
    ...createSingleLineCommentExpectedData(scopeName),
    ...createStringLiteralExpectedData(scopeName),
    ...createSwitchStatementExpectedData(scopeName),
    ...createThrowStatementExpectedData(scopeName),
    ...createTryStatementExpectedData(scopeName),
    ...createVariableExpectedData(scopeName),
    ...createWhileStatementExpectedData(scopeName),
  ];
}
