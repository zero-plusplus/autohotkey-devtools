import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import * as common from '../../../../common/index.ts';
import type { ExpectedTestData } from '../../../../types.ts';

export function createFieldDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createFieldDeclarationExpectedData(scopeName) ];
}
