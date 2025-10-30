import type { ScopeName } from '../../../../../src/tmlanguage';
import { $sendKeyName } from '../../../../helpers/definition/parameter/$sendKeyName';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/Send.htm
export function createSendExpectedDataList(scopeName: ScopeName, commandName = 'Send'): ExpectedTestData[] {
  return [
    // Parameter 1: Keys
    ...$sendKeyName(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
