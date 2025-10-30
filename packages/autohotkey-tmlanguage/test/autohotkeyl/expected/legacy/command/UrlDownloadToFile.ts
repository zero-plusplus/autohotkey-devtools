import type { ScopeName } from '../../../../../src/tmlanguage';
import { $ } from '../../../../helpers/definition/parameter/$';
import { $path } from '../../../../helpers/definition/parameter/$path';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/UrlDownloadToFile.htm
export function createUrlDownloadToFileExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'UrlDownloadToFile';

  return [
    // Parameter 1: URL
    ...$(scopeName, { name: commandName, index: 0 }),

    // Parameter 2: Filename
    ...$path(scopeName, { name: commandName, index: 1, isLastParameter: true }),
  ];
}
