import { name, RuleName, type ScopeName } from '../../../../../src/tmlanguage';
import { createExpectedData } from '../../../../helpers/definition/helpers';
import { $ } from '../../../../helpers/definition/parameter/$';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/v1/lib/_EscapeChar.htm
export function createEscapeCharExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#EscapeChar';

  return [
    ...((placeholder = { name: directiveName, elementName: RuleName.DirectiveName, index: 0, isLastParameter: true, deprecated: true }): ExpectedTestData[] => {
      return [
        ...$(scopeName, placeholder),
        createExpectedData(
          scopeName,
          `\\`,
          [ { text: '\\', scopes: name(scopeName, RuleName.UnquotedString) } ],
          placeholder,
        ),
      ];
    })(),
  ];
}
