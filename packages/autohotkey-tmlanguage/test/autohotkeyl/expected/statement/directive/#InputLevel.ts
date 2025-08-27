import { RuleName, type ScopeName } from '../../../../../src/tmlanguage';
import { $shouldInteger } from '../../../../helpers/definition/parameter/$shouldInteger';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_InputLevel.htm
export function createInputLevelExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#InputLevel';

  return [ ...$shouldInteger(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true }) ];
}
