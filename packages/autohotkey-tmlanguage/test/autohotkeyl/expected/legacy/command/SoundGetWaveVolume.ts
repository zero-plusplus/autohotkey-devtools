import type { ScopeName } from '../../../../../src/tmlanguage';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/SoundGetWaveVolume.htm
export function createSoundGetWaveVolumeExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SoundGetWaveVolume';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: DeviceNumber
    ...$shouldInteger(scopeName, { name: commandName, index: 1, isLastParameter: true }),
  ];
}
