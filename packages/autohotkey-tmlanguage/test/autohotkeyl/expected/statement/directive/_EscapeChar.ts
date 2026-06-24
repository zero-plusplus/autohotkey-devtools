import { name, RuleName, type ScopeName } from '../../../../../src/tmlanguage.ts';
import { createCommandExpectedData } from '../../../../helpers/definition/helpers.ts';
import { $ } from '../../../../helpers/definition/parameter/$.ts';
import type { ExpectedTestData } from '../../../../types.ts';

// https://www.autohotkey.com/docs/v1/lib/_EscapeChar.htm
export function createEscapeCharExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#EscapeChar';

  return [
    ...((placeholder = { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true, deprecated: true }): ExpectedTestData[] => {
      return [
        ...$(scopeName, placeholder),
        createCommandExpectedData(
          scopeName,
          `\\`,
          [ { text: '\\', scopes: name(scopeName, RuleName.UnquotedString) } ],
          placeholder,
        ),
      ];
    })(),
  ];
}
