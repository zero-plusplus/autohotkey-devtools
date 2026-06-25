import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import * as common from '../../../../common/index.ts';
import type { ExpectedTestData } from '../../../../types.ts';

export function createPropertyDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createPropertyDeclarationExpectedData(scopeName) ];
}
