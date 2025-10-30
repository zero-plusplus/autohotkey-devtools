import type { ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/SoundSetWaveVolume.htm
export function createSoundSetWaveVolumeExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SoundSetWaveVolume';

  return [
    // Parameter 1: Percent
    ...$expression(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: ComponentType
    ...$shouldInteger(scopeName, { name: commandName, index: 1, isLastParameter: true }),
  ];
}
