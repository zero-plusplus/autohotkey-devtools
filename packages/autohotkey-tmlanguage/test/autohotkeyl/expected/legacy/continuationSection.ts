import { dedent } from '@zero-plusplus/utilities/src';
import { Repository, RuleName, StyleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createContinuationSectionExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        (
          text
        )
      `, [
        { text: '(', scopes: name(scopeName, Repository.ContinuationSection, RuleName.OpenParen) },
        { text: 'text', scopes: name(scopeName, Repository.ContinuationSection, RuleName.UnquotedString) },
        { text: ')', scopes: name(scopeName, Repository.ContinuationSection, RuleName.CloseParen) },
      ],
    ],
    [
      dedent`
        (Join\`r\`n
        )
        (Join|
        )
      `, [
        { text: '(', scopes: name(scopeName, Repository.ContinuationSection, RuleName.OpenParen) },
        { text: 'Join', scopes: name(scopeName, Repository.ContinuationSection, RuleName.UnquotedString, StyleName.Strong) },
        { text: '`r', scopes: name(scopeName, Repository.ContinuationSection, RuleName.UnquotedString, StyleName.Escape) },
        { text: '`n', scopes: name(scopeName, Repository.ContinuationSection, RuleName.UnquotedString, StyleName.Escape) },
        { text: ')', scopes: name(scopeName, Repository.ContinuationSection, RuleName.CloseParen) },

        { text: '(', scopes: name(scopeName, Repository.ContinuationSection, RuleName.OpenParen) },
        { text: 'Join', scopes: name(scopeName, Repository.ContinuationSection, RuleName.UnquotedString, StyleName.Strong) },
        { text: '|', scopes: name(scopeName, Repository.ContinuationSection, RuleName.UnquotedString) },
        { text: ')', scopes: name(scopeName, Repository.ContinuationSection, RuleName.CloseParen) },
      ],
    ],
  ];
}
