import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $expression } from '../../../../helpers/definition/parameter/$expression.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/SendLevel.htm
export function createSendLevelExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SendLevel';

  return [
    // Parameter 1: Level
    ...$expression(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
