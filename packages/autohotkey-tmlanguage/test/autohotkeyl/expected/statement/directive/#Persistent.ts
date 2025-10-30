import { RuleName, type ScopeName } from '../../../../../src/tmlanguage';
import { $blank } from '../../../../helpers/definition/parameter/$blank';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_Persistent.htm
export function createPersistentExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#Persistent';

  return [ ...$blank(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true }) ];
}
