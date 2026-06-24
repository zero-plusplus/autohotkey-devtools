import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import { $expression } from '../../../../helpers/definition/parameter/$expression.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/TrayTip.htm
export function createTrayTipExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'TrayTip';

  return [
    // Parameter 1: Title
    ...$(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Text
    ...$(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: Timeout
    ...$expression(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: Options
    ...$expression(scopeName, { name: commandName, index: 3, isLastParameter: true }),
  ];
}
