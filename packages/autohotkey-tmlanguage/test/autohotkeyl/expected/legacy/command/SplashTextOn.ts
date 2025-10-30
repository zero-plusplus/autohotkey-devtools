import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/SplashTextOn.htm
export function createSplashTextOnExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SplashTextOn';

  return [
    // Parameter 1: Width
    ...$expression(scopeName, { name: commandName, index: 0, deprecated: true }),

    // Parameter 2: Options
    ...$expression(scopeName, { name: commandName, index: 1, deprecated: true }),

    // Parameter 3: MainText
    ...$(scopeName, { name: commandName, index: 2, deprecated: true }),

    // Parameter 4: Text
    ...$(scopeName, { name: commandName, index: 3, isLastParameter: true, deprecated: true }),
  ];
}
