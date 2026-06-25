import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $expression } from '../../../../helpers/definition/parameter/$expression.ts';
import { $output } from '../../../../helpers/definition/parameter/$output.ts';
import { $path } from '../../../../helpers/definition/parameter/$path.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/FileReadLine.htm
export function createFileReadLineExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'FileReadLine';

  return [
    // Parameter 1: OutputVar
    ...$output(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Filename
    ...$path(scopeName, { name: commandName, index: 1 }),

    // Parameter 3: LineNum
    ...$expression(scopeName, { name: commandName, index: 2, isLastParameter: true }),
  ];
}
