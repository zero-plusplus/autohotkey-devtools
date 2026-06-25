import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../../types.ts';
import { createRunExpectedDataList } from './Run.ts';

// https://www.autohotkey.com/docs/v1/lib/RunWait.htm
export function createRunWaitExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return createRunExpectedDataList(scopeName, 'RunWait');
}
