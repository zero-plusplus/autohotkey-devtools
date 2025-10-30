import { dedent } from '@zero-plusplus/utilities/src';
import { name, RuleName, type ScopeName } from '../../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../../types';

// https://www.autohotkey.com/docs/alpha/lib/_Module.htm
export function createModuleExpectedDataList(scopeName: ScopeName): ExpectedTestData[] {
  const directiveName = '#Module';

  return [
    [
      dedent`
        ${directiveName} ModuleName ; comment
      `,
      [
        { text: directiveName, scopes: name(scopeName, RuleName.DirectiveName) },
        { text: 'ModuleName', scopes: name(scopeName, RuleName.Namespace) },
        { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
      ],
    ],
  ];
}
