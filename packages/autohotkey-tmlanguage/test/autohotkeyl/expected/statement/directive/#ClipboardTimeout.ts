import { RuleName, type ScopeName } from '../../../../../src/tmlanguage';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_ClipboardTimeout.htm
export function createClipboardTimeoutExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#ClipboardTimeout';

  return [ ...$shouldInteger(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0 }) ];
}
