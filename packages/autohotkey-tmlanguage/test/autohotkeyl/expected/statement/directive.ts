import { directiveDefinitions } from '../../../../src/autohotkeyl/definition';
import type { ScopeName } from '../../../../src/types';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createDirectiveStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...common.createDirectiveStatementExpectedData(scopeName, {
      directiveDefinitions,
    }),
  ];
}
