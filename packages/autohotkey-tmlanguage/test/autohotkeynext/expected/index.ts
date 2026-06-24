import * as constants_v2 from '../../../src/autohotkey2/constants.ts';
import * as constants_vnext from '../../../src/autohotkeynext/constants.ts';
import type { ScopeName } from '../../../src/tmlanguage.ts';
import * as autohotkey2 from '../../autohotkey2/expected/index.ts';
import type { ExpectedTestData } from '../../types.ts';
import { createExportDeclarationExpectedData } from './declaration/export.ts';
import { createImportDeclarationExpectedData } from './declaration/import.ts';
import { createTypedAssignmentDeclarationExpectedData } from './declaration/typedAssignment.ts';
import { createCallExpressionExpectedData } from './expression/call.ts';
import { createFunctionExpressionExpectedData } from './expression/function.ts';
import { createObjectLiteralExpectedData } from './expression/object.ts';
import { createOperatorInExpressionExpectedData } from './expression/operator.ts';
import { createDirectiveStatementExpectedData } from './statement/directive/index.ts';
import { createStructPackExpectedDataList } from './statement/struct.ts';

export function createExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...autohotkey2.createExpectedDataList(scopeName, {
      keywordLikeBuiltinVariables: constants_v2.keywordLikeBuiltinVariables,
      builtinVaribles: constants_vnext.builtinVaribles,
      builtInClassNames: constants_vnext.builtInClassNames,
    }),

    ...createCallExpressionExpectedData(scopeName),
    ...createDirectiveStatementExpectedData(scopeName),
    ...createExportDeclarationExpectedData(scopeName),
    ...createFunctionExpressionExpectedData(scopeName),
    ...createImportDeclarationExpectedData(scopeName),
    ...createObjectLiteralExpectedData(scopeName),
    ...createOperatorInExpressionExpectedData(scopeName),
    ...createStructPackExpectedDataList(scopeName),
    ...createTypedAssignmentDeclarationExpectedData(scopeName),
  ];
}
