import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleDescriptor, RuleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

export function createLoopStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // [Loop Until](https://www.autohotkey.com/docs/v2/lib/Until.htm)
    ...((): ExpectedTestData[] => {
      return [
        // one line
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                loop {            ; comment
                } until true      ; comment
              `,
              [
                { text: 'loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: 'until', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                Loop {            ; comment
                } Until true      ; comment
              `,
              [
                { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: 'Until', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                Loop {            ; comment
                }                 ; comment
                Until true        ; comment
              `,
              [
                { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'Until', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
          ];
        })(),

        // continuation
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                Loop              ; comment
                {                 ; comment
                } Until true      ; comment
              `,
              [
                { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: 'Until', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                Loop              ; comment
                {                 ; comment
                }                 ; comment
                Until true        ; comment
              `,
              [
                { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'Until', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
          ];
        })(),
      ];
    })(),

    // [Loop Files](https://www.autohotkey.com/docs/v2/lib/LoopFiles.htm)
    ...((): ExpectedTestData[] => {
      return [
        // one line
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                loop files {          ; comment
                }                     ; comment
              `,
              [
                { text: 'loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'files', scopes: name(scopeName, RuleName.FlowSubCommandName) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                Loop Files {          ; comment
                }                     ; comment
              `,
              [
                { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'Files', scopes: name(scopeName, RuleName.FlowSubCommandName) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                Loop Files, "C:\\test" {              ; comment
                }                                     ; comment
                Loop Files, "C:\\test", "DFR" {       ; comment
                }                                     ; comment
                Loop Files, "C:\\test", "_" {         ; comment
                }                                     ; comment
              `,
              [
                { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'Files', scopes: name(scopeName, RuleName.FlowSubCommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
                { text: 'C:\\test', scopes: name(scopeName, RuleName.DoubleString) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'Files', scopes: name(scopeName, RuleName.FlowSubCommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
                { text: 'C:\\test', scopes: name(scopeName, RuleName.DoubleString) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
                { text: 'DFR', scopes: name(scopeName, RuleName.DoubleString) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'Files', scopes: name(scopeName, RuleName.FlowSubCommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
                { text: 'C:\\test', scopes: name(scopeName, RuleName.DoubleString) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
                { text: '_', scopes: name(scopeName, RuleName.DoubleString) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
          ];
        })(),

        // continuation
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                loop files        ; comment
                {                 ; comment
                }                 ; comment
              `,
              [
                { text: 'loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'files', scopes: name(scopeName, RuleName.FlowSubCommandName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                Loop Files        ; comment
                {                 ; comment
                }                 ; comment
              `,
              [
                { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'Files', scopes: name(scopeName, RuleName.FlowSubCommandName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                Loop Files                          ; comment
                {                                   ; comment
                }                                   ; comment
                Loop Files, "C:\\test"              ; comment
                {                                   ; comment
                }                                   ; comment
                Loop Files, "C:\\test", "DFR"       ; comment
                {                                   ; comment
                }                                   ; comment
                Loop Files, "C:\\test", "_"         ; comment
                {                                   ; comment
                }                                   ; comment
              `,
              [
                { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'Files', scopes: name(scopeName, RuleName.FlowSubCommandName) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'Files', scopes: name(scopeName, RuleName.FlowSubCommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
                { text: 'C:\\test', scopes: name(scopeName, RuleName.DoubleString) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'Files', scopes: name(scopeName, RuleName.FlowSubCommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
                { text: 'C:\\test', scopes: name(scopeName, RuleName.DoubleString) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
                { text: 'DFR', scopes: name(scopeName, RuleName.DoubleString) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: 'Files', scopes: name(scopeName, RuleName.FlowSubCommandName) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
                { text: 'C:\\test', scopes: name(scopeName, RuleName.DoubleString) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
                { text: ',', scopes: name(scopeName, RuleName.Comma) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
                { text: '_', scopes: name(scopeName, RuleName.DoubleString) },
                { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
          ];
        })(),
      ];
    })(),

    // #region [loop parse](https://www.autohotkey.com/docs/v2/lib/LoopParse.htm)
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
        { text: 'parse', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Parse', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
    [
      dedent`
        Loop Parse
        Loop Parse, input
        Loop Parse, input, "CSV"
        Loop Parse, input, "|"
        Loop Parse, input, "CSV", "|"
      `,
      [
        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Parse', scopes: name(scopeName, RuleName.FlowSubCommandName) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Parse', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Parse', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'CSV', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Parse', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: '|', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Parse', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'CSV', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: '|', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
      ],
    ],
    // #endregion loop parse

    // #region [loop read](https://www.autohotkey.com/docs/v2/lib/LoopRead.htm)
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
        { text: 'read', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Read', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
    [
      dedent`
        Loop Read
        Loop Read, "path\\to"
        Loop Read, "path\\to", "path\\to"
      `,
      [
        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Read', scopes: name(scopeName, RuleName.FlowSubCommandName) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Read', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path\\to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Read', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path\\to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'path\\to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
      ],
    ],
    // #endregion loop read

    // #region [loop reg](https://www.autohotkey.com/docs/v2/lib/LoopReg.htm)
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
        { text: 'reg', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'Reg', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
        { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
      ],
    ],
    [
      dedent`
        Loop Reg
        Loop Reg, "HKLM\\path\\to"
        Loop Reg, "HKLM\\path\\to", "KVR"
        Loop Reg, "HKLM\\path\\to", "_"
      `,
      [
        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Reg', scopes: name(scopeName, RuleName.FlowSubCommandName) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Reg', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'HKLM\\path\\to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Reg', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'HKLM\\path\\to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'KVR', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Reg', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'HKLM\\path\\to', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: '_', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },
      ],
    ],
    // #endregion loop reg
  ];
}
