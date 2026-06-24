import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $path } from '../../../../helpers/definition/parameter/$path.ts';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/SoundPlay.htm
export function createSoundPlayExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SoundPlay';

  return [
    // Parameter 1: Filename
    ...$path(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Wait
    ...$shouldKeyword(scopeName, [ 'Wait', '1' ], { name: commandName, index: 1, isLastParameter: true }),
  ];
}
