import * as constants_v2 from '../../../src/autohotkey2/constants';
import * as constants_vnext from '../../../src/autohotkeynext/constants';
import type { ScopeName } from '../../../src/tmlanguage';
import * as autohotkey2 from '../../autohotkey2/expected';
import type { ExpectedTestData } from '../../types';
import { createExportDeclarationExpectedData } from './declaration/export';
import { createImportDeclarationExpectedData } from './declaration/import';
import { createTypedAssignmentDeclarationExpectedData } from './declaration/typedAssignment';
import { createCallExpressionExpectedData } from './expression/call';
import { createFunctionExpressionExpectedData } from './expression/function';
import { createObjectLiteralExpectedData } from './expression/object';
import { createDirectiveStatementExpectedData } from './statement/directive';

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
    ...createTypedAssignmentDeclarationExpectedData(scopeName),
  ];
}
