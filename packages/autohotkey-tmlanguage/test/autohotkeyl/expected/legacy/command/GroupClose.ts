import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/GroupClose.htm
export function createGroupCloseExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'GroupClose';

  return [
    // Parameter 1: GroupName
    ...$(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Mode
    ...$shouldKeyword(scopeName, [ 'R', 'A' ], { name: commandName, index: 1, isLastParameter: true }),
  ];
}
