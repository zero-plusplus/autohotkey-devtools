import { RuleName, type ScopeName } from '../../../../../src/tmlanguage';
import { $shouldKeyword } from '../../../../helpers/definition/parameter/$shouldKeyword';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_Warn.htm
export function createWarnExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#Warn';

  return [
    // Parameter 1: WarningType
    ...$shouldKeyword(scopeName, [ 'UseUnsetLocal', 'UseUnsetGlobal', 'UseEnv', 'LocalSameAsGlobal', 'ClassOverwrite', 'Unreachable', 'All' ], { name: directiveName, elementName: RuleName.DirectiveName, index: 0 }),
    ...$shouldKeyword(scopeName, [ 'MsgBox', 'StdOut', 'OutputDebug', 'Off' ], { name: directiveName, elementName: RuleName.DirectiveName, index: 1, isLastParameter: true }),
  ];
}
