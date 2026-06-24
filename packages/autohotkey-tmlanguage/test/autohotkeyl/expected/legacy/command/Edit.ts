import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { $blank } from '../../../../helpers/definition/parameter/$blank.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/Edit.htm
export function createEditExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'Edit';

  return [
    // ParameterLess
    ...$blank(scopeName, { name: commandName, index: 0, isLastParameter: true }),
  ];
}
