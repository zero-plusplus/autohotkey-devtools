import { RuleName, type ScopeName } from '../../../../../src/tmlanguage';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_MaxThreadsPerHotkey.htm
export function createMaxThreadsPerHotkeyExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#MaxThreadsPerHotkey';

  return [ ...$shouldInteger(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true }) ];
}
