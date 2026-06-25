import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import * as common from '../../../../common/index.ts';
import type { ExpectedTestData } from '../../../../types.ts';

export function createClassHeadDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createClassHeadDeclarationExpectedData(scopeName) ];
}
