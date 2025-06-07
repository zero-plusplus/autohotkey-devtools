import { dedent } from '@zero-plusplus/utilities/src';
import {
  name, RuleDescriptor, RuleName, StyleName,
  type ScopeName,
} from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';

export function createLoopStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    // [Loop](https://www.autohotkey.com/docs/v1/lib/Loop.htm)
    ...((): ExpectedTestData[] => {
      return [
        // one true brace style
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                loop {          ; comment
                }               ; comment
              `,
              [
                { text: 'loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                Loop {          ; comment
                }               ; comment
              `,
              [
                { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                Loop 10 {       ; comment
                }               ; comment

                Loop, 10 {      ; comment
                }               ; comment
              `,
              [
                ...[
                  { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                  { text: '10', scopes: name(scopeName, RuleName.Integer) },
                  { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
                ],

                ...[
                  { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                  { text: ',', scopes: name(scopeName, RuleName.Comma) },
                  { text: '10', scopes: name(scopeName, RuleName.Integer) },
                  { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
                ],
              ],
            ],
          ];
        })(),

        // K&R style
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                loop            ; comment
                {               ; comment
                }               ; comment
              `,
              [
                { text: 'loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                Loop            ; comment
                {               ; comment
                }               ; comment
              `,
              [
                { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
              ],
            ],
            [
              dedent`
                Loop 10         ; comment
                {               ; comment
                }               ; comment

                Loop, 10        ; comment
                {               ; comment
                }               ; comment
              `,
              [
                ...[
                  { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                  { text: '10', scopes: name(scopeName, RuleName.Integer) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
                ],

                ...[
                  { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                  { text: ',', scopes: name(scopeName, RuleName.Comma) },
                  { text: '10', scopes: name(scopeName, RuleName.Integer) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
                ],
              ],
            ],
          ];
        })(),
      ];
    })(),

    // [Loop Until](https://www.autohotkey.com/docs/v1/lib/Until.htm)
    ...((): ExpectedTestData[] => {
      return [
        // one true brace style
        ...((): ExpectedTestData[] => {
          return [
            [
              dedent`
                Loop {              ; comment
                } Until true        ; comment

                Loop {              ; comment
                }                   ; comment
                Until true          ; comment
              `,
              [
                ...[
                  { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                  { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

                  { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
                  { text: 'Until', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
                  { text: 'true', scopes: name(scopeName, RuleName.KeywordLikeBuiltInVariable) },
                  { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
                ],

                ...[
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
            ],
          ];
        })(),

        // K&R style
        ...((): ExpectedTestData[] => {
          return [
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

    // [Loop Files](https://www.autohotkey.com/docs/v1/lib/LoopFile.htm)
    ...((): ExpectedTestData[] => {
      return [
        [
          dedent`
            loop files              ; comment
            {                       ; comment
            }                       ; comment

            loop, files             ; comment
            {                       ; comment
            }                       ; comment
          `,
          [
            ...[
              { text: 'loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
              { text: 'files', scopes: name(scopeName, RuleName.FlowSubCommandName) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

              { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

              { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
            ],

            ...[
              { text: 'loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: 'files', scopes: name(scopeName, RuleName.FlowSubCommandName) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

              { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

              { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
            ],
          ],
        ],
        [
          dedent`
            Loop Files              ; comment
            {                       ; comment
            }                       ; comment
            Loop, Files             ; comment
            {                       ; comment
            }                       ; comment
          `,
          [
            ...[
              { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
              { text: 'Files', scopes: name(scopeName, RuleName.FlowSubCommandName) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

              { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

              { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
            ],

            ...[
              { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: 'Files', scopes: name(scopeName, RuleName.FlowSubCommandName) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

              { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

              { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
            ],
          ],
        ],
        [
          dedent`
            Loop Files                          ; comment
            {                                   ; comment
            }                                   ; comment

            Loop Files, C:\\test                ; comment
            {                                   ; comment
            }                                   ; comment

            Loop Files, C:\\test, DFR           ; comment
            {                                   ; comment
            }                                   ; comment

            Loop Files, C:\\test, _             ; comment
            {                                   ; comment
            }                                   ; comment
          `,
          [
            ...[
              { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
              { text: 'Files', scopes: name(scopeName, RuleName.FlowSubCommandName) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

              { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

              { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
            ],

            ...[
              { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
              { text: 'Files', scopes: name(scopeName, RuleName.FlowSubCommandName) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: 'C:\\test', scopes: name(scopeName, RuleName.UnquotedString) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

              { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

              { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
            ],

            ...[
              { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
              { text: 'Files', scopes: name(scopeName, RuleName.FlowSubCommandName) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: 'C:\\test', scopes: name(scopeName, RuleName.UnquotedString) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: 'D', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
              { text: 'F', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
              { text: 'R', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },

              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

              { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

              { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
            ],

            ...[
              { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
              { text: 'Files', scopes: name(scopeName, RuleName.FlowSubCommandName) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: 'C:\\test', scopes: name(scopeName, RuleName.UnquotedString) },
              { text: ',', scopes: name(scopeName, RuleName.Comma) },
              { text: '_', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },

              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

              { text: '{', scopes: name(scopeName, RuleName.BlockBegin) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },

              { text: '}', scopes: name(scopeName, RuleName.BlockEnd) },
              { text: '; comment', scopes: name(scopeName, RuleName.InLineComment) },
            ],
          ],
        ],
      ];
    })(),

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
        Loop Parse, % "a,b,c"
        Loop Parse, input, CSV
        Loop Parse, input, |
        Loop Parse, input, CSV, |
        Loop Parse, input, CSV, \`,
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
        { text: '%', scopes: name(scopeName, RuleName.PercentExpressionBegin) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.Begin) },
        { text: 'a,b,c', scopes: name(scopeName, RuleName.DoubleString) },
        { text: '"', scopes: name(scopeName, RuleName.DoubleString, RuleDescriptor.End) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Parse', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'CSV', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Parse', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '|', scopes: name(scopeName, RuleName.UnquotedString) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Parse', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'input', scopes: name(scopeName, RuleName.Variable) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'CSV', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '|', scopes: name(scopeName, RuleName.UnquotedString) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Parse', scopes: name(scopeName, RuleName.FlowSubCommandName) },
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
        Loop Read, path\\to
        Loop Read, path\\to, path\\to
        Loop Read, path\\to, \`,
      `,
      [
        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Read', scopes: name(scopeName, RuleName.FlowSubCommandName) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Read', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'path\\to', scopes: name(scopeName, RuleName.UnquotedString) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Read', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'path\\to', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'path\\to', scopes: name(scopeName, RuleName.UnquotedString) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Read', scopes: name(scopeName, RuleName.FlowSubCommandName) },
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
        Loop Reg, HKLM\\path\\to
        Loop Reg, HKLM\\path\\to, KVR
        Loop Reg, HKLM\\path\\to, _
      `,
      [
        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Reg', scopes: name(scopeName, RuleName.FlowSubCommandName) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Reg', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'HKLM\\path\\to', scopes: name(scopeName, RuleName.UnquotedString) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Reg', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'HKLM\\path\\to', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'K', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'V', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
        { text: 'R', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },

        { text: 'Loop', scopes: name(scopeName, RuleName.ControlFlowKeyword) },
        { text: 'Reg', scopes: name(scopeName, RuleName.FlowSubCommandName) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: 'HKLM\\path\\to', scopes: name(scopeName, RuleName.UnquotedString) },
        { text: ',', scopes: name(scopeName, RuleName.Comma) },
        { text: '_', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
      ],
    ],
    // #endregion loop reg
  ];
}
