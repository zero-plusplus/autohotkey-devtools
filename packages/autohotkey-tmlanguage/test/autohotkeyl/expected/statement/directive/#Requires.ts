import { RuleName, type ScopeName } from '../../../../../src/tmlanguage';
import { $requiresVersion } from '../../../../helpers/definition/parameter/$requiresVersion';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_Requires.htm
export function createRequiresExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#Requires';

  return [ ...$requiresVersion(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true }) ];
}
