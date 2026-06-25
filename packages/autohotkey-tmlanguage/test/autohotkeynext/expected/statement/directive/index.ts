import type {
  ScopeName,
} from '../../../../../src/tmlanguage.ts';
import * as expected_v2 from '../../../../autohotkey2/expected/statement/directive/index.ts';
import type { ExpectedTestData } from '../../../../types.ts';
import { createModuleExpectedDataList } from './_Module.ts';
import { createStructPackExpectedDataList } from './_StructPack.ts';

export function createDirectiveStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...expected_v2.createDirectiveStatementExpectedData(scopeName),

    ...createModuleExpectedDataList(scopeName),
    ...createStructPackExpectedDataList(scopeName),
  ];
}
