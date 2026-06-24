import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../../types.ts';
import { createSendExpectedDataList } from './Send.ts';

// https://www.autohotkey.com/docs/v1/lib/SendRaw.htm
export function createSendRawExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return createSendExpectedDataList(scopeName, 'SendRaw');
}
