import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $onOff } from '../../../../helpers/definition/parameter/$onOff.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/StringCaseSense.htm
export function createStringCaseSenseExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'StringCaseSense';

  return [
    // Parameter 1: OnOffLocale
    ...$onOff(scopeName, { index: 0, isLastParameter: true, name: commandName }, [ 'Locale' ]),
  ];
}
