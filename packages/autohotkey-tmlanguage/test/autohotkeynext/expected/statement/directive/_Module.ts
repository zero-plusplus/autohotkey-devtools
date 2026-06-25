import { dedent } from '@zero-plusplus/utilities/src/index.ts';
import { name, RuleName, type ScopeName } from '../../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../../types.ts';

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
