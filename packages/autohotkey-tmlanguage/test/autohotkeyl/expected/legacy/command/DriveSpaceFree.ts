import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import { $output } from '../../../../helpers/definition/parameter/$output.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/DriveSpaceFree.htm
export function createDriveSpaceFreeExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'DriveSpaceFree';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Path
    ...$(scopeName, { name: commandName, index: 1, isLastParameter: true }),
  ];
}
