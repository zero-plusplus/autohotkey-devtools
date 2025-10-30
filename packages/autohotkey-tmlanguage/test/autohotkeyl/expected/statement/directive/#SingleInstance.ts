import { RuleName, type ScopeName } from '../../../../../src/tmlanguage';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_SingleInstance.htm
export function createSingleInstanceExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#SingleInstance';

  return [ ...$shouldKeyword(scopeName, [ 'Force', 'Ignore', 'Prompt', 'Off' ], { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true }) ];
}
