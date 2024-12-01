import { dedent, hasFlag } from '@zero-plusplus/utilities/src';
import { commandDefinitions } from '../../../../src/autohotkeyl/definition';
import { CommandFlag, Repository, RuleName, StyleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createCommandStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // command name
    ...commandDefinitions.map((definition): ExpectedTestData => {
      const scopes = hasFlag(definition.flags, CommandFlag.Deprecated)
        ? name(scopeName, Repository.CommandStatement, RuleName.CommandName, StyleName.Strikethrough)
        : name(scopeName, Repository.CommandStatement, RuleName.CommandName);

      return [ definition.name, [ { text: definition.name, scopes: scopes } ] ];
    }),

    // #region first separator
    // comma separator
    [
      'AutoTrim, On', [
        { text: 'AutoTrim', scopes: name(scopeName, Repository.CommandStatement, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, Repository.CommandStatement, RuleName.Comma) },
        { text: 'On', scopes: name(scopeName, Repository.CommandStatement, RuleName.UnquotedString, StyleName.Strong) },
      ],
    ],
    // space separator
    [
      'AutoTrim On', [
        { text: 'AutoTrim', scopes: name(scopeName, Repository.CommandStatement, RuleName.CommandName) },
        { text: 'On', scopes: name(scopeName, Repository.CommandStatement, RuleName.UnquotedString, StyleName.Strong) },
      ],
    ],
    // #endregion first separator

    // #region arguments
    // unquoted string argument
    [
      'AutoTrim, abc', [
        { text: 'AutoTrim', scopes: name(scopeName, Repository.CommandStatement, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, Repository.CommandStatement, RuleName.Comma) },
        { text: 'abc', scopes: name(scopeName, Repository.CommandStatement, RuleName.UnquotedString) },
      ],
    ],
    // dereference argument
    [
      'AutoTrim, %true%', [
        { text: 'AutoTrim', scopes: name(scopeName, Repository.CommandStatement, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, Repository.CommandStatement, RuleName.Comma) },
        { text: '%', scopes: name(scopeName, Repository.CommandStatement, RuleName.PercentBegin) },
        { text: 'true', scopes: name(scopeName, Repository.CommandStatement, RuleName.KeywordLikeBuiltInVariable) },
        { text: '%', scopes: name(scopeName, Repository.CommandStatement, RuleName.PercentEnd) },
      ],
    ],
    // percent expression argument
    [
      'AutoTrim, % true', [
        { text: 'AutoTrim', scopes: name(scopeName, Repository.CommandStatement, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, Repository.CommandStatement, RuleName.Comma) },
        { text: '% ', scopes: name(scopeName, Repository.CommandStatement, RuleName.PercentExpressionBegin) },
        { text: 'true', scopes: name(scopeName, Repository.CommandStatement, RuleName.KeywordLikeBuiltInVariable) },
      ],
    ],

    // #region extra highlights
    // keywords
    [
      'AutoTrim, On', [
        { text: 'AutoTrim', scopes: name(scopeName, Repository.CommandStatement, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, Repository.CommandStatement, RuleName.Comma) },
        { text: 'On', scopes: name(scopeName, Repository.CommandStatement, RuleName.UnquotedString, StyleName.Strong) },
      ],
    ],
    // #endregion extra highlights

    // #region continuation arguments
    [
      dedent`
        AutoTrim
          , continuation argument
      `, [
        { text: 'AutoTrim', scopes: name(scopeName, Repository.CommandStatement, RuleName.CommandName) },
        { text: ',', scopes: name(scopeName, Repository.CommandStatement, RuleName.Comma) },
        { text: 'continuation argument', scopes: name(scopeName, Repository.CommandStatement, RuleName.UnquotedString) },
      ],
    ],
    // #endregion continuation arguments
    // #endregion arguments
  ];
}
