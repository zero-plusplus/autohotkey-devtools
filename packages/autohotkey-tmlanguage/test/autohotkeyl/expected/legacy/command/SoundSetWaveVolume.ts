import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $expression } from '../../../../helpers/definition/parameter/$expression.ts';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger.ts';
import type { ExpectedTestData } from '../../../../types.ts';

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
