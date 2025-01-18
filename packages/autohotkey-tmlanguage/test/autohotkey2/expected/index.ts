import * as constants_v2 from '../../../src/autohotkey2/constants';
import type { ScopeName } from '../../../src/types';
import * as common from '../../common';
import type { ExpectedTestData } from '../../types';
export * from './trivia/comment';

export function createExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // #region common
    ...common.createDocumentCommentExpectedData(scopeName),
    ...common.createMultiLineCommentExpectedData(scopeName),
    ...common.createSingleLineCommentExpectedData(scopeName),
    ...common.createRegExpExpectedData(scopeName, {
      quote: '"',
      escapedQuoted: '`"',
      escapeSequences: constants_v2.doubleQuoteEscapeSequences,
    }),
    // #endregion common
  ];
}
