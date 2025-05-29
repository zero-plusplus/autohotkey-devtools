import {
  name, Repository, RuleName,
  type ScopeName,
} from '../../../src/tmlanguage';
import type { ExpectedTestData } from '../../types';

export function createLabelStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      'abc_123:',
      [
        { text: 'abc_123', scopes: name(scopeName, Repository.LabelStatement, RuleName.LabelName) },
        { text: ':', scopes: name(scopeName, Repository.LabelStatement, RuleName.Colon) },
      ],
    ],
    [
      '123_abc:',
      [
        { text: '123_abc', scopes: name(scopeName, Repository.LabelStatement, RuleName.LabelName) },
        { text: ':', scopes: name(scopeName, Repository.LabelStatement, RuleName.Colon) },
      ],
    ],
  ];
}
