import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $blank } from '../../../../helpers/definition/parameter/$blank.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/ListHotkeys.htm
export function createListHotkeysExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'ListHotkeys';

  return [
    // ParameterLess
    ...$blank(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
