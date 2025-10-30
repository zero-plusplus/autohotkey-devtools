import type { ScopeName } from '../../../../../src/tmlanguage';
import * as common from '../../../../common';
import type { ExpectedTestData } from '../../../../types';

export function createClassHeadDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createClassHeadDeclarationExpectedData(scopeName) ];
}
