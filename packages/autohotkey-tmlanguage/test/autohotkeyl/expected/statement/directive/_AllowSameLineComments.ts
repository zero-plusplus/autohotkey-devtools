import { RuleName, type ScopeName } from '../../../../../src/tmlanguage.ts';
import { $blank } from '../../../../helpers/definition/parameter/$blank.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/_AllowSameLineComments.htm
export function createAllowSameLineCommentsExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#AllowSameLineComments';

  return [ ...$blank(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true, removed: true }) ];
}
