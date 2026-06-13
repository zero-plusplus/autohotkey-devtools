import type {
  ScopeName,
} from '../../../../../src/tmlanguage';
import * as expected_v2 from '../../../../autohotkey2/expected/statement/directive';
import type { ExpectedTestData } from '../../../../types';
import { createModuleExpectedDataList } from './#Module';
import { createStructPackExpectedDataList } from './#StructPack';

export function createDirectiveStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...expected_v2.createDirectiveStatementExpectedData(scopeName),

    ...createModuleExpectedDataList(scopeName),
    ...createStructPackExpectedDataList(scopeName),
  ];
}
