import type { ScopeName } from '../../../../../src/tmlanguage';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/CoordMode.htm
export function createCoordModeExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'CoordMode';

  return [
    // Parameter 1: TargetType
    ...$shouldKeyword(scopeName, [
      'ToolTip',
      'Pixel',
      'Mouse',
      'Caret',
      'Menu',
    ], { name: commandName, index: 0 }),

    // Parameter 2: RelativeTo
    ...$shouldKeyword(scopeName, [
      'Screen',
      'Relative',
      'Window',
      'Client',
    ], { name: commandName, index: 1, isLastParameter: true }),
  ];
}
