import type { ScopeName } from '../../../../../src/tmlanguage';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/SendMode.htm
export function createSendModeExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SendMode';

  return [
    // Parameter 1: Mode
    ...$shouldKeyword(scopeName, [ 'Event', 'Input', 'InputThenPlay', 'Play' ], { name: commandName, index: 0, isLastParameter: true }),
  ];
}
