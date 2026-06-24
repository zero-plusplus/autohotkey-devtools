import { RuleName, type ScopeName } from '../../../../../src/tmlanguage.ts';
import { $keyName } from '../../../../helpers/definition/parameter/$keyName.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/_MenuMaskKey.htm
export function createMenuMaskKeyExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#MenuMaskKey';

  return [ ...$keyName(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true }) ];
}
