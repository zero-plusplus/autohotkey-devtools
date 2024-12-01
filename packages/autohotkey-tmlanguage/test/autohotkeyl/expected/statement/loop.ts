import { dedent } from '@zero-plusplus/utilities/src';
import { RuleName, StyleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createLoopStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // #region [loop until](https://www.autohotkey.com/docs/v1/lib/Until.htm)
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
        { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
      ],
    ],
    // #endregion loop until

    // #region [loop files](https://www.autohotkey.com/docs/v1/lib/LoopFile.htm)
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
        Loop Files, C:\\test, U
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
        { text: 'D', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'F', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'R', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Files', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'C:\\test', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'U', scopes: name(scopeName, RuleName.UnquotedString) },
      ],
    ],
    // #endregion loop files

    // #region [loop parse](https://www.autohotkey.com/docs/v1/lib/LoopParse.htm)
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

    // #region [loop read](https://www.autohotkey.com/docs/v1/lib/LoopReadFile.htm)
    [
      dedent`
        Loop read
        {
        }
        Loop, Read
        {
        }
      `,
      [
        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'read', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Read', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
    [
      dedent`
        Loop Read
        Loop Read, path\\to
        Loop Read, path\\to, path\\to
        Loop Read, path\\to, \`,
      `,
      [
        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Read', scopes: name(scopeName, RuleName.ControlFlowKeyword) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Read', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'path\\to', scopes: name(scopeName, RuleName.UnquotedString) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Read', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'path\\to', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'path\\to', scopes: name(scopeName, RuleName.UnquotedString) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Read', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'path\\to', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '`,', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Escape) },
      ],
    ],
    // #endregion loop read

    // #region [loop reg](https://www.autohotkey.com/docs/v1/lib/LoopReg.htm#new)
    [
      dedent`
        Loop reg
        {
        }
        Loop, Reg
        {
        }
      `,
      [
        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'reg', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Reg', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
    [
      dedent`
        Loop Reg
        Loop Reg, HKLM\\path\\to
        Loop Reg, HKLM\\path\\to, KVR
        Loop Reg, HKLM\\path\\to, U
      `,
      [
        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Reg', scopes: name(scopeName, RuleName.ControlFlowKeyword) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Reg', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'HKLM\\path\\to', scopes: name(scopeName, RuleName.UnquotedString) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Reg', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'HKLM\\path\\to', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'K', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'V', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'R', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Reg', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'HKLM\\path\\to', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'U', scopes: name(scopeName, RuleName.UnquotedString) },
      ],
    ],
    // #endregion loop reg
  ];
}
