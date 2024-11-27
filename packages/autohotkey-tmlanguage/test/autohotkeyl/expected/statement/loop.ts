import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createLoopStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    [
      dedent`
        Loop {
        } Until true
      `,
      [
        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
        { text: 'Until', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'true', scopes: name(scopeName, RuleName.BuiltInVariable) },
      ],
    ],

    // #region loop files
    [
      dedent`
        Loop Files
        {
        }
        Loop, Files
        {
        }
      `,
      [
        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Files', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Files', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
    [
      dedent`
        Loop Files
        Loop Files, C:\\test
        Loop Files, C:\\test, D
      `,
      [
        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Files', scopes: name(scopeName, RuleName.ControlFlowKeyword) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Files', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'C:\\test', scopes: name(scopeName, RuleName.UnquotedString) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Files', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'C:\\test', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'D', scopes: name(scopeName, RuleName.UnquotedString) },
      ],
    ],
    // #endregion loop files
  ];
}
