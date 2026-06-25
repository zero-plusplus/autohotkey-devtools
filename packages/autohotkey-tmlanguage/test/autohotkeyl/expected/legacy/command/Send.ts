import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $sendKeyName } from '../../../../helpers/definition/parameter/$sendKeyName.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/Send.htm
export function createSendExpectedDataList(scopeName: ScopeName, commandName = 'Send'): ExpectedTestData[] {
  return [
    // Parameter 1: Keys
    ...$sendKeyName(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
