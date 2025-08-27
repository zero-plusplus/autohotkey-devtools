import { RuleName, type ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_EscapeChar.htm#Delimiter
export function createDelimiterExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#Delimiter';

  return [ ...$(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0, deprecated: true }) ];
}
