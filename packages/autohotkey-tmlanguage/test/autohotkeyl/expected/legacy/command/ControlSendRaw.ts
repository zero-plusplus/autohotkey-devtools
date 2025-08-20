import type { ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';
import { createControlSendExpectedDataList } from './ControlSend';

// https://www.autohotkey.com/docs/v1/lib/ControlSend.htm
export function createControlSendRawExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return createControlSendExpectedDataList(scopeName, 'ControlSendRaw');
}
