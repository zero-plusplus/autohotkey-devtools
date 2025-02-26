import * as constants_v2 from '../../../src/autohotkey2/constants';
import * as constants_vnext from '../../../src/autohotkeynext/constants';
import type { ScopeName } from '../../../src/types';
import * as autohotkey2 from '../../autohotkey2/expected';
import type { ExpectedTestData } from '../../types';
import { createExportDeclarationExpectedData } from './declaration/export';
import { createImportDeclarationExpectedData } from './declaration/import';
import { createTypedAssignmentDeclarationExpectedData } from './declaration/typedAssignment';
import { createCallExpressionExpectedData } from './expression/call';
import { createFunctionExpressionExpectedData } from './expression/function';

export function createExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...autohotkey2.createExpectedDataList(scopeName, {
      keywordLikeBuiltinVariables: constants_v2.keywordLikeBuiltinVariables,
      builtinVaribles: constants_vnext.builtinVaribles,
      builtInClassNames: constants_vnext.builtInClassNames,
      directiveNames: constants_vnext.directiveNames,
    }),

    ...createCallExpressionExpectedData(scopeName),
    ...createExportDeclarationExpectedData(scopeName),
    ...createFunctionExpressionExpectedData(scopeName),
    ...createImportDeclarationExpectedData(scopeName),
    ...createTypedAssignmentDeclarationExpectedData(scopeName),
  ];
}
