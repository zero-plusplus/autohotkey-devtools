import { RuleName, type ScopeName } from '../../../../../src/tmlanguage';
import { $includeLib } from '../../../../helpers/definition/parameter/$includeLib';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_Include.htm
export function createIncludeExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return [ '#Include', '#IncludeAgain' ].flatMap((directiveName) => {
    return [ ...$includeLib(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true }) ];
  });
}
