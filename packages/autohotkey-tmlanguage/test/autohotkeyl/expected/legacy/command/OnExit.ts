import type { ScopeName } from '../../../../../src/tmlanguage';
import { $shouldLabel } from '../../../../helpers/definition/parameter/$shouldLabel';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/OnExit.htm
export function createOnExitExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'OnExit';

  return [
    // Parameter 1: Label
    ...$shouldLabel(scopeName, { name: commandName, index: 0, isLastParameter: true, deprecated: true }),
  ];
}
