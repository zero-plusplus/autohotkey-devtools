import { RuleName, type ScopeName } from '../../../../../src/tmlanguage';
import { $blank } from '../../../../helpers/definition/parameter/$blank';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_WinActivateForce.htm
export function createWinActivateForceExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#WinActivateForce';

  return [ ...$blank(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true }) ];
}
