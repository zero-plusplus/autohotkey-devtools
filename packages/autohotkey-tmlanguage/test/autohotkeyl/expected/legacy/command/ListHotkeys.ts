import type { ScopeName } from '../../../../../src/tmlanguage';
import { $blank } from '../../../../helpers/definition/parameter/$blank';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/ListHotkeys.htm
export function createListHotkeysExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'ListHotkeys';

  return [
    // ParameterLess
    ...$blank(scopeName, { name: commandName, index: 0 }),
  ];
}
