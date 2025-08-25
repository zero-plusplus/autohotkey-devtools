import type { ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';
import { createSendExpectedDataList } from './Send';

// https://www.autohotkey.com/docs/v1/lib/SendInput.htm
export function createSendInputExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return createSendExpectedDataList(scopeName, 'SendInput');
}
