import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/GroupDeactivate.htm
export function createGroupDeactivateExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'GroupDeactivate';

  return [
    // Parameter 1: GroupName
    ...$(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Mode
    ...$shouldKeyword(scopeName, [ 'R' ], { name: commandName, index: 1, isLastParameter: true }),
  ];
}
