import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $shouldLabel } from '../../../../helpers/definition/parameter/$shouldLabel.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/OnExit.htm
export function createOnExitExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'OnExit';

  return [
    // Parameter 1: Label
    ...$shouldLabel(scopeName, { name: commandName, index: 0, isLastParameter: true, deprecated: true }),
  ];
}
