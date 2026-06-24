import { RuleName, type ScopeName } from '../../../../../src/tmlanguage.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/_CommentFlag.htm
export function createCommentFlagExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#CommentFlag';

  return [ ...$(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true, deprecated: true }) ];
}
