import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../../types.ts';
import { createControlSendExpectedDataList } from './ControlSend.ts';

// https://www.autohotkey.com/docs/v1/lib/ControlSend.htm
export function createControlSendRawExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return createControlSendExpectedDataList(scopeName, 'ControlSendRaw');
}
