import type { ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/SendLevel.htm
export function createSendLevelExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SendLevel';

  return [
    // Parameter 1: Level
    ...$expression(scopeName, { name: commandName, index: 0 }),
  ];
}
