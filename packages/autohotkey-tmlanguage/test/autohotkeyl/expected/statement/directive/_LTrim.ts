import { RuleName, type ScopeName } from '../../../../../src/tmlanguage.ts';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/Scripts.htm#LTrim
export function createLTrimExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#LTrim';

  return [ ...$shouldKeyword(scopeName, [ 'Off' ], { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true }) ];
}
