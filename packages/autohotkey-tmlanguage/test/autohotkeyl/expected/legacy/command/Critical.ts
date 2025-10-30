import type { ScopeName } from '../../../../../src/tmlanguage';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/Critical.htm
export function createCriticalExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'Critical';

  return [
    // Parameter 1: OnOffNumeric
    ...$shouldKeyword(scopeName, [ 'On', 'Off' ], { name: commandName, index: 0, isLastParameter: true }),
    ...$shouldInteger(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
