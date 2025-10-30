import type { ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';
import { createSendExpectedDataList } from './Send';

// https://www.autohotkey.com/docs/v1/lib/SendPlay.htm
export function createSendPlayExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return createSendExpectedDataList(scopeName, 'SendPlay');
}
