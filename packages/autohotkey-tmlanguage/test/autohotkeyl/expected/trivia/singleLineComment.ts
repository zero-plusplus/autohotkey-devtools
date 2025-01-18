import type { ScopeName } from '../../../../src/types';
import * as common from '../../../common';
import type { ExpectedTestData } from '../../../types';

export function createSingleLineCommentExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...common.createSingleLineCommentExpectedData(scopeName) ];
}
