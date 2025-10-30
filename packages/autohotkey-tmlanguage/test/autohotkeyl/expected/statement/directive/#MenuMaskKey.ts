import { RuleName, type ScopeName } from '../../../../../src/tmlanguage';
import { $keyName } from '../../../../helpers/definition/parameter/$keyName';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_MenuMaskKey.htm
export function createMenuMaskKeyExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#MenuMaskKey';

  return [ ...$keyName(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true }) ];
}
