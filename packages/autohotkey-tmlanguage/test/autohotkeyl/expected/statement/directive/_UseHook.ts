import { RuleName, type ScopeName } from '../../../../../src/tmlanguage.ts';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/_UseHook.htm
export function createUseHookBufferExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#UseHook';

  return [ ...$shouldKeyword(scopeName, [ 'On', 'Off' ], { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true }) ];
}
