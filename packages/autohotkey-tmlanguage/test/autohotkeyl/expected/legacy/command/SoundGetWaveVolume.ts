import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $output } from '../../../../helpers/definition/parameter/$output.ts';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger.ts';
import type { ExpectedTestData } from '../../../../types.ts';

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
