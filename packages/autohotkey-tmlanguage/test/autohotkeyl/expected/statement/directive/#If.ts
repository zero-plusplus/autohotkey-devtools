import { RuleName, type ScopeName } from '../../../../../src/tmlanguage';
import { $expression } from '../../../../helpers/definition/parameter/$expression';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_If.htm
export function createIfExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#If';

  return [ ...$expression(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true }) ];
}
