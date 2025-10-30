import type { ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';
import { createSetCapsLockStateExpectedDataList } from './SetCapsLockState';

// https://www.autohotkey.com/docs/v1/lib/SetScrollLockState.htm
export function createSetScrollLockStateExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return createSetCapsLockStateExpectedDataList(scopeName, 'SetScrollLockState');
}
