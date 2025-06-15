import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

interface Placeholder {
  modifiers: readonly string[];
  operators: readonly string[];
}
export function createAssignmentDeclarationExpectedData(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...placeholder.modifiers.flatMap((modifier): ExpectedTestData[] => {
      return placeholder.operators.flatMap((operator): ExpectedTestData[] => {
        return [
          [
            dedent`
              ${modifier} var ${operator} 123     ; comment
            `,
            [
              { text: modifier, scopes: name(scopeName, RuleName.Modifier) },
              { text: 'var', scopes: name(scopeName, RuleName.Variable) },
              { text: operator, scopes: name(scopeName, RuleName.Operator) },
              { text: '123', scopes: name(scopeName, RuleName.Integer) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ],
          [
            dedent`
              ${modifier}           ; comment
                var ${operator}     ; comment
                    123             ; comment
            `,
            [
              { text: modifier, scopes: name(scopeName, RuleName.Modifier) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: 'var', scopes: name(scopeName, RuleName.Variable) },
              { text: operator, scopes: name(scopeName, RuleName.Operator) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },

              { text: '123', scopes: name(scopeName, RuleName.Integer) },
              { text: '; comment', scopes: name(scopeName, RuleName.InlineComment) },
            ],
          ],
        ];
      });
    }),
  ];
}
