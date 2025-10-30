import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/ToolTip.htm
export function createToolTipExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'ToolTip';

  return [
    // Parameter 1: Text
    ...$(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: X
    ...$expression(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Y
    ...$expression(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: WhichToolTip
    ...$expression(scopeName, { name: commandName, index: 3, isLastParameter: true }),
  ];
}
