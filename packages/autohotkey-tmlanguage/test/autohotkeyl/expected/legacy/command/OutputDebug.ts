import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/OutputDebug.htm
export function createOutputDebugExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'OutputDebug';

  return [
    // Parameter 1: Text
    ...$(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
