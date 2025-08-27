import { RuleName, type ScopeName } from '../../../../../src/tmlanguage';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_MaxThreadsBuffer.htm
export function createMaxThreadsBufferExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#MaxThreadsBuffer';

  return [ ...$shouldKeyword(scopeName, [ 'On', 'Off' ], { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true }) ];
}
