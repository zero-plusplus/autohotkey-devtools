import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $expression } from '../../../../helpers/definition/parameter/$expression.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/SoundBeep.htm
export function createSoundBeepExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SoundBeep';

  return [
    // Parameter 1: Frequency
    ...$expression(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Duration
    ...$expression(scopeName, { name: commandName, index: 1, isLastParameter: true }),
  ];
}
