import type { ScopeName } from '../../../../../src/tmlanguage.ts';
import { floatOption } from '../../../../helpers/definition/option/floatOption.ts';
import { identifierOption } from '../../../../helpers/definition/option/identifierOption.ts';
import { keywordOption } from '../../../../helpers/definition/option/keywordOption.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import { $input } from '../../../../helpers/definition/parameter/$input.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/Sort.htm
export function createSortExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const commandName = 'Sort';

  return [
    // Parameter 1: VarName
    ...$input(scopeName, { name: commandName, index: 0 }),

    // Parameter 1: Options
    ...((placeholder = { name: commandName, index: 1, isLastParameter: true }): ExpectedTestData[] => {
      return [
        ...$(scopeName, placeholder),
        ...keywordOption(scopeName, [ 'C', 'CL', 'N', 'R', 'Random', 'U', 'Z', '\\' ], placeholder),
        ...floatOption(scopeName, [ 'D', 'P' ], placeholder),
        ...identifierOption(scopeName, [ 'F' ], placeholder),
      ];
    })(),
  ];
}
