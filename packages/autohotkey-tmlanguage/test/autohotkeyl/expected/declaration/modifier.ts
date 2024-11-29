import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createModifierDeclarationExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        local
        global
        static
      `,
      [
        { text: 'local', scopes: name(scopeName, RuleName.Modifier) },
        { text: 'global', scopes: name(scopeName, RuleName.Modifier) },
        { text: 'static', scopes: name(scopeName, RuleName.Modifier) },
      ],
    ],
  ];
}
