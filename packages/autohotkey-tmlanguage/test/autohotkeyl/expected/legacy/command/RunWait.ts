import type { ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';
import { createRunExpectedDataList } from './Run';

// https://www.autohotkey.com/docs/v1/lib/RunWait.htm
export function createRunWaitExpectedDataList(scopeName: ScopeName, commandName = 'RunWait'): ExpectedTestData[] {
  return createRunExpectedDataList(scopeName, commandName);
}
