import type { ScopeName } from '../../../src/types';
import * as v1 from '../../autohotkeyl/expected';
import type { ExpectedTestData } from '../../types';
export * from './trivia/comment';

export function createExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // #region common
    ...v1.createDocumentCommentExpectedData(scopeName),
    ...v1.createMultiLineCommentExpectedData(scopeName),
    ...v1.createSingleLineCommentExpectedData(scopeName),
    // #endregion common
  ];
}
