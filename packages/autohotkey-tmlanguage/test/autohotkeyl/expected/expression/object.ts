import type { ScopeName } from '../../../../src/tmlanguage';
import * as common from '../../../common/expression/object';
import type { ExpectedTestData } from '../../../types';

export function createObjectLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createObjectLiteralExpectedData(scopeName) ];
}
