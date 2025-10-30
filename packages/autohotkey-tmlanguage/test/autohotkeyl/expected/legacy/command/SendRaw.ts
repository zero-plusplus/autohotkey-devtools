import type { ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';
import { createSendExpectedDataList } from './Send';

// https://www.autohotkey.com/docs/v1/lib/SendRaw.htm
export function createSendRawExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return createSendExpectedDataList(scopeName, 'SendRaw');
}
