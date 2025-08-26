import type { ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import { $output } from '../../../../helpers/definition/parameter/$output';
import { $soundComponent } from '../../../../helpers/definition/parameter/$soundComponent';
import { $soundControlType } from '../../../../helpers/definition/parameter/$soundControlType';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/SoundGet.htm
export function createSoundGetExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SoundGet';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: ComponentType
    ...$soundComponent(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: ControlType
    ...$soundControlType(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: DeviceNumber
    ...$expression(scopeName, { name: commandName, index: 3, isLastParameter: true }),
  ];
}
