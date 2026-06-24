import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $blank } from '../../../../helpers/definition/parameter/$blank.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/SplashTextOff.htm
export function createSplashTextOffExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SplashTextOff';

  return [
    // ParameterLess
    ...$blank(scopeName, { name: commandName, index: 0, isLastParameter: true, deprecated: true }),
  ];
}
