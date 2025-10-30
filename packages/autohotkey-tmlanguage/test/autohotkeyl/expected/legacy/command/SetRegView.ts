import type { ScopeName } from '../../../../../src/tmlanguage';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/SetRegView.htm
export function createSetRegViewExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SetRegView';

  return [
    // Parameter 1: RegView
    ...$shouldKeyword(scopeName, [ '32', '64', 'Default' ], { name: commandName, index: 0, isLastParameter: true }),
  ];
}
