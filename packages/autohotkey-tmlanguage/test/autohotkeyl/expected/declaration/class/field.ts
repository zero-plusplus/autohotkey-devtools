import type { ScopeName } from '../../../../../src/tmlanguage';
import * as common from '../../../../common';
import type { ExpectedTestData } from '../../../../types';

export function createFieldDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createFieldDeclarationExpectedData(scopeName) ];
}
