import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger.ts';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/Critical.htm
export function createCriticalExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'Critical';

  return [
    // Parameter 1: OnOffNumeric
    ...$shouldKeyword(scopeName, [ 'On', 'Off' ], { name: commandName, index: 0, isLastParameter: true }),
    ...$shouldInteger(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
