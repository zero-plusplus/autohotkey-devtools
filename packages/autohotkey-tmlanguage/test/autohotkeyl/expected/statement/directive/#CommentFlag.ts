import { RuleName, type ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_CommentFlag.htm
export function createCommentFlagExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#CommentFlag';

  return [ ...$(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0, deprecated: true }) ];
}
