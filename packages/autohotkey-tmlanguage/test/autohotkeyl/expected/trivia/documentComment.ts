import { dedent } from '@zero-plusplus/utilities/src';
import { RuleDescriptor, RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createDocumentCommentExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        /**
         *
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    [
      dedent`
        /**
         * @example
         *  test := 123
         */
        /**
         * @example
         *  test := 123
         * @example
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@example', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: 'test', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Integer) },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },

        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@example', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: 'test', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Integer) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '@example', scopes: name(scopeName, RuleName.DocumentComment, RuleName.DocumentTag) },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
    [
      dedent`
        /**
         * \`\`\`autohotkeyl
         *  test := 123
         * \`\`\`
         */
        /**
         * \`\`\`autohotkeyl
         *  test := 123
         */
      `,
      [
        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '```autohotkeyl', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: 'test', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Integer) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '```', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },

        { text: '/**', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: '```autohotkeyl', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.Begin) },
        { text: ' *', scopes: name(scopeName, RuleName.DocumentComment) },
        { text: 'test', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Operator) },
        { text: '123', scopes: name(scopeName, RuleName.DocumentComment, RuleName.Integer) },
        { text: '*/', scopes: name(scopeName, RuleName.DocumentComment, RuleDescriptor.End) },
      ],
    ],
  ];
}
