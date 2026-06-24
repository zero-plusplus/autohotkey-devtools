import { RuleName, type ScopeName } from '../../../../../src/tmlanguage.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import { $winTitle } from '../../../../helpers/definition/parameter/$winTitle.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/_IfWinActive.htm
export function createIfWinActiveExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  return [ '#IfWinActive', '#IfWinExist', '#IfWinNotActive', '#IfWinNotExist' ].flatMap((directiveName): ExpectedTestData[] => {
    return [
      ...$winTitle(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 0 }),
      ...$(scopeName, { name: directiveName, elementName: RuleName.DirectiveName, index: 1, isLastParameter: true }),
    ];
  });
}
