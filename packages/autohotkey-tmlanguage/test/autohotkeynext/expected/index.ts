import type { ScopeName } from '../../../src/types';
import * as autohotkey2 from '../../autohotkey2/expected';
import type { ExpectedTestData } from '../../types';
import { createImportDeclarationExpectedData } from './declaration/import';
import { createTypedAssignmentDeclarationExpectedData } from './declaration/typedAssignment';
import { createFunctionExpressionExpectedData } from './expression/function';

export function createExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...autohotkey2.createExpectedDataList(scopeName),

    ...createFunctionExpressionExpectedData(scopeName),
    ...createImportDeclarationExpectedData(scopeName),
    ...createTypedAssignmentDeclarationExpectedData(scopeName),
  ];
}
