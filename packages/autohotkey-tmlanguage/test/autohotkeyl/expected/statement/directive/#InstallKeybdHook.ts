import { RuleName, type ScopeName } from '../../../../../src/tmlanguage';
import { $blank } from '../../../../helpers/definition/parameter/$blank';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_InstallKeybdHook.htm
export function createInstallKeybdHookExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#InstallKeybdHook';

  return [ ...$blank(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true }) ];
}
