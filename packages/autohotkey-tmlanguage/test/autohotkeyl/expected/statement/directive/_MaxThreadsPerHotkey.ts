import { RuleName, type ScopeName } from '../../../../../src/tmlanguage.ts';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/_MaxThreadsPerHotkey.htm
export function createMaxThreadsPerHotkeyExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#MaxThreadsPerHotkey';

  return [ ...$shouldInteger(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true }) ];
}
