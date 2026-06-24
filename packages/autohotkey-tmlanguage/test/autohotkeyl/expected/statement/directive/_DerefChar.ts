import { RuleName, type ScopeName } from '../../../../../src/tmlanguage.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/_EscapeChar.htm#DerefChar
export function createDerefCharExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#DerefChar';

  return [ ...$(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true, deprecated: true }) ];
}
