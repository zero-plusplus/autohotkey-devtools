import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $expression } from '../../../../helpers/definition/parameter/$expression.ts';
import { $soundComponent } from '../../../../helpers/definition/parameter/$soundComponent.ts';
import { $soundControlType } from '../../../../helpers/definition/parameter/$soundControlType.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/SoundSet.htm
export function createSoundSetExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'SoundSet';

  return [
    // Parameter 1: NewSetting
    ...$expression(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: ComponentType
    ...$soundComponent(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: ControlType
    ...$soundControlType(scopeName, { name: commandName, index: 2 }),

    // Parameter 4: DeviceNumber
    ...$expression(scopeName, { name: commandName, index: 3, isLastParameter: true }),
  ];
}
