import type { ScopeName } from '../../../src/types';
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
import { createModifierDeclarationExpectedData } from './declaration/modifier';
import { createArrayLiteralExpectedData } from './expression/array';
import { createCallExpressionExpectedData } from './expression/call';
import { createContinuationStringLiteralExpectedData } from './expression/continuationString';
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
import { createUntilStatementExpectedData } from './statement/until';
import { createWhileStatementExpectedData } from './statement/while';
import { createDirectiveCommentExpectedData } from './trivia/directiveComment';
import { createDocumentCommentExpectedData } from './trivia/documentComment';
import { createMultiLineCommentExpectedData } from './trivia/multiLineComment';
import { createSingleLineCommentExpectedData } from './trivia/singleLineComment';

export * from './declaration/assignment';
export * from './declaration/block';
export * from './declaration/class';
export * from './declaration/function';
export * from './declaration/hotkeyLabel';
export * from './declaration/hotstringLabel';
export * from './declaration/label';
export * from './declaration/modifier';
export * from './expression/array';
export * from './expression/call';
export * from './expression/continuationString';
export * from './expression/dereference';
export * from './expression/new';
export * from './expression/number';
export * from './expression/object';
export * from './expression/operator';
export * from './expression/parenthesized';
export * from './expression/regexp';
export * from './expression/string';
export * from './expression/variable';
export * from './legacy/assignment';
export * from './legacy/command';
export * from './legacy/continuationSection';
export * from './legacy/if';
export * from './statement/directive';
export * from './statement/for';
export * from './statement/if';
export * from './statement/jump';
export * from './statement/loop';
export * from './statement/switch';
export * from './statement/throw';
export * from './statement/try';
export * from './statement/until';
export * from './statement/while';
export * from './trivia/documentComment';
export * from './trivia/multiLineComment';
export * from './trivia/singleLineComment';

export function createExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...createArrayLiteralExpectedData(scopeName),
    ...createAssignmentDeclarationExpectedData(scopeName),
    ...createBlockDeclarationExpectedData(scopeName),
    ...createCallExpressionExpectedData(scopeName),
    ...createClassDeclarationExpectedData(scopeName),
    ...createCommandStatementExpectedData(scopeName),
    ...createContinuationSectionExpectedData(scopeName),
    ...createContinuationStringLiteralExpectedData(scopeName),
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
    ...createModifierDeclarationExpectedData(scopeName),
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
    ...createUntilStatementExpectedData(scopeName),
    ...createVariableExpectedData(scopeName),
    ...createWhileStatementExpectedData(scopeName),
  ];
}
