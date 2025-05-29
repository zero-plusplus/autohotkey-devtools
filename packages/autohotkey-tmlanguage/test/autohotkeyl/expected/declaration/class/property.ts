import type { ScopeName } from '../../../../../src/tmlanguage';
import * as common from '../../../../common';
import type { ExpectedTestData } from '../../../../types';

export function createPropertyDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createPropertyDeclarationExpectedData(scopeName) ];
}
