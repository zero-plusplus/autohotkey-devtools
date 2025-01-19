import { dedent } from '@zero-plusplus/utilities/src';
import * as constants_v1 from '../../../../src/autohotkeyl/constants';
import { RuleDescriptor, RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import * as common from '../../../common/expression/string';
import type { ExpectedTestData } from '../../../types';

export function createStringLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  const placeholder = {
    ruleName: RuleName.DoubleString,
    quote: '"',
    escapeSequences: constants_v1.doubleQuoteEscapeSequences,
  };

  const q = placeholder.quote;
  return [
    ...common.createStringLiteralExpectedData(scopeName, placeholder),

    // Do not conflict with labels
    [
      dedent`
        ${q}:${q}
        ${q}::${q}
      `, [
        { text: q, scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: ':', scopes: name(scopeName, RuleName.DoubleString) },
        { text: q, scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },

        { text: q, scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: '::', scopes: name(scopeName, RuleName.DoubleString) },
        { text: q, scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
      ],
    ],
  ];
}
