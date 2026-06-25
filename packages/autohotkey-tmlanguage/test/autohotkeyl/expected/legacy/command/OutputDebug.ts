import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/OutputDebug.htm
export function createOutputDebugExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'OutputDebug';

  return [
    // Parameter 1: Text
    ...$(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
