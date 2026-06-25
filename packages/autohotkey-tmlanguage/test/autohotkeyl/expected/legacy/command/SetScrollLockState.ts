import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../../types.ts';
import { createSetCapsLockStateExpectedDataList } from './SetCapsLockState.ts';

// https://www.autohotkey.com/docs/v1/lib/SetScrollLockState.htm
export function createSetScrollLockStateExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return createSetCapsLockStateExpectedDataList(scopeName, 'SetScrollLockState');
}
