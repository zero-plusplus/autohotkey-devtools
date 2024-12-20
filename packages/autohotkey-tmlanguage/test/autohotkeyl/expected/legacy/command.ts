import { dedent, hasFlag } from '@zero-plusplus/utilities/src';
import * as definition_v1 from '../../../../src/autohotkeyl/definition';
import { CommandFlag, RuleName, StyleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData, ParsedResult } from '../../../types';

export function createCommandStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        ${definition_v1.commandDefinitions.flatMap((definition): string[] => {
          return definition.signatures.map(() => {
            return definition.name;
          });
        }).join('\n')}
      `,
      [
        ...definition_v1.commandDefinitions.flatMap((definition): ParsedResult[] => {
          return definition.signatures.flatMap(() => {
            return [
              hasFlag(definition.flags, CommandFlag.Deprecated)
                ? { text: definition.name, scopes: name(scopeName, RuleName.CommandName, StyleName.Strikethrough) }
                : { text: definition.name, scopes: name(scopeName, RuleName.CommandName) },
            ];
          });
        }),
      ],
    ],
  ];
}
