import type { ScopeName } from '../../../src/types';
import * as autohotkey2 from '../../autohotkey2/expected';
import type { ExpectedTestData } from '../../types';

export function createExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return [ ...autohotkey2.createExpectedDataList(scopeName) ];
}
