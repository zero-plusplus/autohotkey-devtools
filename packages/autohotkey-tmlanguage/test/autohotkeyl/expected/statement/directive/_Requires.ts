import { RuleName, type ScopeName } from '../../../../../src/tmlanguage.ts';
import { $requiresVersion } from '../../../../helpers/definition/parameter/$requiresVersion.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/_Requires.htm
export function createRequiresExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#Requires';

  return [ ...$requiresVersion(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true }) ];
}
