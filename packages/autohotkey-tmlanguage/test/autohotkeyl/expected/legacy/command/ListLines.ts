import type { ScopeName } from '../../../../../src/tmlanguage';
import { $onOff } from '../../../../helpers/definition/parameter/$onOff';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/ListLines.htm
export function createListLinesExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'ListLines';

  return [
    // Parameter 1: OnOff
    ...$onOff(scopeName, { index: 0, isLastParameter: true, name: commandName }),
  ];
}
