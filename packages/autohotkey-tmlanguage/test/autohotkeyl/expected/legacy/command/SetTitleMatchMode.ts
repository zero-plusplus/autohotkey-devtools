import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/SetTitleMatchMode.htm
export function createSetTitleMatchModeExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SetTitleMatchMode';

  return [
    // Parameter 1: MatchMode/Speed
    ...$shouldKeyword(scopeName, [ '1', '2', '3', 'RegEx', 'Fast', 'Slow' ], { name: commandName, index: 0, isLastParameter: true }),
  ];
}
