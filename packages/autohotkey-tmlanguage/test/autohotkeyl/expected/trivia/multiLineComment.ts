import type { ScopeName } from '../../../../src/types';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createMultiLineCommentExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createMultiLineCommentExpectedData(scopeName) ];
}
