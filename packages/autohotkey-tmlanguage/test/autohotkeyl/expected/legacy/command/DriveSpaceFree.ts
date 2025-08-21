import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $output } from '../../../../helpers/definition/parameter/$output';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/DriveSpaceFree.htm
export function createDriveSpaceFreeExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'DriveSpaceFree';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Path
    ...$(scopeName, { name: commandName, index: 1 }),
  ];
}
