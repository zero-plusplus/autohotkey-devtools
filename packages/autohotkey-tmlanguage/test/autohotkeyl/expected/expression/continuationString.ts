import { dedent } from '@zero-plusplus/utilities/src';
import { RuleDescriptor, RuleName, StyleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createContinuationStringLiteralExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        abc := "
        (LTrim
          1-line
          2-line
        )"
      `, [
        { text: 'abc', scopes: name(scopeName, RuleName.Variable) },
        { text: ':=', scopes: name(scopeName, RuleName.Operator) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: '(', scopes: name(scopeName, RuleName.OpenParen) },
        { text: 'LTrim', scopes: name(scopeName, RuleName.ContinuationOption, StyleName.Strong) },
        { text: '  1-line', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '  2-line', scopes: name(scopeName, RuleName.DoubleString) },
        { text: ')', scopes: name(scopeName, RuleName.CloseParen) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
      ],
    ],
  ];
}
