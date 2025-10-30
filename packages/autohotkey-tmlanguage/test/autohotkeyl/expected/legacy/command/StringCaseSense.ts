import type { ScopeName } from '../../../../../src/tmlanguage';
import { $onOff } from '../../../../helpers/definition/parameter/$onOff';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/StringCaseSense.htm
export function createStringCaseSenseExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'StringCaseSense';

  return [
    // Parameter 1: OnOffLocale
    ...$onOff(scopeName, { index: 0, isLastParameter: true, name: commandName }, [ 'Locale' ]),
  ];
}
