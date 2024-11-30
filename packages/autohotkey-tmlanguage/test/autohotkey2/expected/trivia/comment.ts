import type { ScopeName } from '../../../../src/types';
import * as expected_v1 from '../../../autohotkeyl/expected';
import type { ExpectedTestData } from '../../../types';

export function createCommentExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return expected_v1.createSingleLineCommentExpectedData(scopeName);
}
