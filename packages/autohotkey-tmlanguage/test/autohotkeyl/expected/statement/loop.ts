import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName, StyleName } from '../../../../src/constants';
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
        Loop files
        {
        }
        Loop, Files
        {
        }
      `,
      [
        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'files', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
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
        Loop Files, C:\\test, DFR
        Loop Files, C:\\test, NotOption
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
        { text: 'DFR', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Files', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'C:\\test', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'NotOption', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
      ],
    ],
    // #endregion loop files

    // #region loop parse
    [
      dedent`
        Loop parse
        {
        }
        Loop, Parse
        {
        }
      `,
      [
        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'parse', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Parse', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
    [
      dedent`
        Loop Parse
        Loop Parse, input
        Loop Parse, % "a,b,c"
        Loop Parse, input, CSV
        Loop Parse, input, |
        Loop Parse, input, CSV, |
        Loop Parse, input, CSV, \`,
      `,
      [
        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Parse', scopes: name(scopeName, RuleName.ControlFlowKeyword) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Parse', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Parse', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '% ', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleName.StringBegin) },
        { text: 'a,b,c', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleName.StringEnd) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Parse', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'CSV', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Parse', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '|', scopes: name(scopeName, RuleName.UnquotedString) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Parse', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'CSV', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '|', scopes: name(scopeName, RuleName.UnquotedString) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Parse', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'CSV', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '`,', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Escape) },
      ],
    ],
    // #endregion loop parse
  ];
}
