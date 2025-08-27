import { RuleName, type ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_EscapeChar.htm#DerefChar
export function createDerefCharExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#DerefChar';

  return [ ...$(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true, deprecated: true }) ];
}
