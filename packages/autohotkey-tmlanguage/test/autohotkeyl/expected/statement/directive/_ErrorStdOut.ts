import { RuleName, type ScopeName } from '../../../../../src/tmlanguage.ts';
import { $encoding } from '../../../../helpers/definition/parameter/$encoding.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/_ErrorStdOut.htm
export function createErrorStdOutExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#ErrorStdOut';

  return [ ...$encoding(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true }) ];
}
