import type { ScopeName } from '../../../../../src/tmlanguage';
import { $click } from '../../../../helpers/definition/parameter/$click';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/Click.htm
export function createClickExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const name = 'Click';

  return [
    // Parameter 1: Options
    ...$click(scopeName, { name, index: 0, isLastParameter: true }),
  ];
}
