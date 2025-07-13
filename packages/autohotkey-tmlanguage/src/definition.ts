import { mergeFlags } from '@zero-plusplus/utilities/src';
import * as patterns_v1 from './autohotkeyl/patterns';
import * as constants_common from './common/constants';
import {
  alt, anyChars0, anyChars1, capture, char, endAnchor, group, groupMany1, ignoreCase, inlineSpace, inlineSpaces0, lookahead, lookbehind,
  negChar, negChars0, negChars1, numbers0, numbers1, optional, optseq, ordalt, seq, text, textalt, wordBound,
} from './oniguruma';
import {
  includeRule, Repository, RuleName, StyleName,
  type ElementName, type IncludeRule,
} from './tmlanguage';

// #region constants
export const scopeNames = [ 'autohotkey', 'autohotkeynext', 'autohotkeyl', 'autohotkey2' ] as const;
// #endregion constants

// #region enum
export const enum HighlightType {
  Blank = 'Blank',
  // e.g. `#If var + fn()`
  //           ^^^^^^^^^^
  Expression = 'Expression',
  UnquotedString = 'UnquotedString',
  UnquotedStringWithNumber = 'UnquotedStringWithNumber',
  UnquotedBooleanLike = 'UnquotedBooleanLike',
  QuotableUnquotedString = 'QuotableUnquotedString',
  NumberInCommandArgument = 'NumberInCommandArgument',
  // e.g. `Send, {LButton 5}`
  //             ^^^^^^^^^^^
  SendKeyName = 'SendKeyName',
  // e.g. `#Include path\to`, `#Include <lib>`
  //                ^^^^^^^             ^^^^^
  IncludeLibrary = 'IncludeLibrary',
  QuotableIncludeLibrary = 'QuotableIncludeLibrary',

  // e.g. `arg1, arg2`
  //       ^^^^^^^^^^
  RestParams = 'RestParams',
  LabelName = 'LabelName',
  // Keywords to distinguish between signatures
  // e.g. `Control, Check`, `Control, UnCheck`
  //                ^^^^^             ^^^^^^^
  SubCommand = 'SubCommand',
  // Applies only to the first argument of the following two commands
  // Not originally necessary. However, added to distinguish between strict signatures
  // https://www.autohotkey.com/docs/v1/lib/Progress.htm
  // https://www.autohotkey.com/docs/v1/lib/SplashImage.htm
  // e.g. `Progress, Off`, `SplashImage, Off`
  //                 ^^^                 ^^^
  SubCommandLike = 'SubCommandLike',
  // Basically the same as SubCommand, but the highlighted color is the same as the control flow keyword
  // e.g. `Loop Files`, `Loop Parse`
  //            ^^^^^         ^^^^^
  FlowSubCommand = 'FlowSubCommand',
  // In addition to SubCommand, a label-like syntax is added. Mainly used in commands that deal with Gui
  // e.g. `Gui, Add`, `Gui, GuiName:Add`
  //            ^^^         ^^^^^^^^^^^
  GuiSubCommand = 'GuiSubCommand',
  Input = 'Input',
  Output = 'Output',
  Invalid = 'Invalid',

  // Accepts one arbitrary keyword, otherwise not accepted
  // e.g. `Gui, Flash, Off`
  //                   ^^^
  KeywordOnly = 'KeywordOnly',
  // e.g. `PixelGetColor, output, x, y, Fast RGB`
  //                                    ^^^^ ^^^
  SpacedKeywordsOnly = 'SpacedKeywordsOnly',

  // Accepts zero or more unquoted strings or keywords. Must have a space between each
  // e.g. `ControlClick x123 y123`, `Click, 100 100 LButton`
  //                    ^^^^ ^^^^           ^^^ ^^^ ^^^^^^^
  UnquotedOrKeywords = 'UnquotedOrKeywords',

  // Accepts zero or more keywords. Each keyword must be preceded by `+` or `-` and each must have a space
  // It also accepts an optional gui name for the first argument
  // e.g. `Gui, GuiName: +Resize`, `Gui, New, +Resize`
  //            ^^^^^^^^^^^^^^^^              ^^^^^^^
  GuiOptions = 'GuiOptions',

  // Accepts zero or more keywords. Each keyword must be preceded by `+` or `-` and each must have a space
  // e.g. `GuiControl, +Default`
  //                   ^^^^^^^^
  GuiControlOptions = 'GuiControlOptions',

  // https://www.autohotkey.com/docs/v1/lib/Menu.htm#MenuItemName
  // In the following example, `&O` needs to be emphasized and `&&` needs to be escaped
  // e.g. `Menu, MenuName, Add, &Open`, `Menu, MenuName, Add, Save && Exit`
  MenuItemName = 'MenuItemName',

  // e.g. `Control, Style, ^0x800000`, `WinSet, Style, -0xC00000`
  //                       ^^^^^^^^^                   ^^^^^^^^^
  Style = 'Style',

  // e.g. `WinGet, output,ID, abc ahk_exe abc.exe ahk_class abc
  //                          ^^^ ^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^
  WinTitle = 'WinTitle',

  // e.g. `#Module ModuleName`
  //               ^^^^^^^^^^
  Namespace = 'Namespace',

  // e.g. `; @Ahk2Exe-AddResource fileName`
  //                              ^^^^^^^^
  UnquotedStringInCompilerDirective = 'UnquotedStringInCompilerDirective',

  // e.g. `; @Ahk2Exe-Let name = value`
  //                      ^^^^^^^^^^^^
  ExpressionInCompilerDirective = 'ExpressionInCompilerDirective',
}
export const enum CommandSignatureFlag {
  None = 0,
  Deprecated = 1 << 0,
}
export const enum CommandParameterFlag {
  None = 0,
  Invalid = 1 << 0,
  Deprecated = 1 << 1,
  SubCommand = 1 << 2,
  Expression = 1 << 3,
  RestParams = 1 << 4,
  CompilerDirective = 1 << 5,

  Number = 1 << 14,
  WithNumber = 1 << 15,
  Keyword = 1 << 16,
  Options = 1 << 17,
  Labeled = 1 << 18,
  CaseSensitive = 1 << 19,
}
export const enum CommandFlag {
  None = 0,
  Deprecated = 1 << 0,
  Removed = 1 << 1,
}
// #endregion enum

// #region type
export interface CommandParameterMatcher {
  name: ElementName | ElementName[];
  match?: string;
}
export interface CommandParameterCapturedMatcher {
  name?: ElementName | ElementName[];
  match: string;
  captures: { [key in number ]: ParameterItemMatcher[] };
}
export type ParameterItemMatcher = string | CommandParameterMatcher | CommandParameterCapturedMatcher | IncludeRule;
export interface CommandParameter {
  readonly type: HighlightType;
  readonly flags: CommandParameterFlag;
  readonly itemMatchers?: ParameterItemMatcher[];
}
export interface IncludeRulesCommandParameter {
  readonly type: HighlightType;
  readonly flags: CommandParameterFlag;
  readonly includes: IncludeRule[];
}
export interface CommandSignature {
  readonly flags: CommandSignatureFlag;
  readonly parameters: Array<CommandParameter | IncludeRulesCommandParameter>;
}
export interface CommandDefinition {
  readonly name: string;
  readonly flags: CommandFlag;
  readonly signatures: CommandSignature[];
}
// #endregion type

// #region parameter item defenition
export function decimalPattern(): string {
  return numbers1();
}
export function numberPattern(): string {
  return seq(
    decimalPattern(),
    optseq(
      char('.'),
      numbers0(),
    ),
  );
}
export function hexPattern(): string {
  return seq(
    optional(ignoreCase('0x')),
    groupMany1('[0-9a-fA-F]'),
  );
}
export function createOptionItemPattern(pattern: string): string {
  return seq(
    lookbehind(alt(inlineSpace(), wordBound())),
    pattern,
    lookahead(alt(inlineSpace(), wordBound())),
  );
}
export function createSpacedOptionItemPattern(pattern: string): string {
  return seq(
    lookbehind(alt(
      inlineSpace(),
      char(',', ':', '"', `'`),
    )),
    pattern,
    lookahead(alt(
      inlineSpace(),
      char(',', '%', '"', `'`),
      endAnchor(),
    )),
  );
}
export function optionItem(...options: string[]): string {
  return seq(wordBound(), ignoreCase(textalt(...options)), wordBound());
}
export function signOptionItem(...options: string[]): string {
  return seq(ignoreCase(textalt(...options)), wordBound());
}
export function flagedOptionItem(...options: string[]): string {
  return createSpacedOptionItemPattern(seq(
    optional(char('+', '-', '^')),
    ignoreCase(textalt(...options)),
  ));
}
export function endKeyOptionItem(): string {
  return seq(
    char('{'),
    inlineSpaces0(),
    negChars1(inlineSpace()),
    inlineSpaces0(),
    char('}'),
  );
}
export function matchKeyOptionItem(): string {
  return negChars1(',');
}
export function letterOptionItem(...options: string[]): string {
  return groupMany1(ignoreCase(textalt(...options)));
}
export function flagedLetterOptionItem(...options: string[]): string {
  return seq(
    optional(char('+', '-', '^')),
    letterOptionItem(...options),
  );
}
export function toggleOptionItem(...options: string[]): string {
  // e.g. `Disabled0`, `Hidden1`
  return createSpacedOptionItemPattern(seq(
    ignoreCase(textalt(...options)),
    optional(char('0', '1')),
  ));
}
export function flagedToggleOptionItem(...options: string[]): string {
  // e.g. `Disabled0`, `Hidden1`
  return createSpacedOptionItemPattern(seq(
    optional(char('+', '-')),
    ignoreCase(textalt(...options)),
    optional(char('0', '1')),
  ));
}
export function rangeOptionItem(...options: string[]): string {
  return createSpacedOptionItemPattern(seq(
    ignoreCase(textalt(...options)),
    optseq(
      numberPattern(),
      optseq(
        ignoreCase(char('-')),
        optional(numberPattern()),
      ),
    ),
  ));
}
export function sizeOptionItem(...options: string[]): string {
  return createSpacedOptionItemPattern(seq(
    ignoreCase(textalt(...options)),
    optseq(
      numberPattern(),
      optseq(
        char('x'),
        optional(numberPattern()),
      ),
    ),
  ));
}
export function flagedSizeOptionItem(...options: string[]): string {
  return createSpacedOptionItemPattern(seq(
    optional(char('+', '-')),
    ignoreCase(textalt(...options)),
    optseq(
      numberPattern(),
      optseq(
        char('-'),
        optional(numberPattern()),
      ),
    ),
  ));
}
export function stringOptionItem(...options: string[]): string {
  return createSpacedOptionItemPattern(seq(
    ignoreCase(textalt(...options)),
    negChars0(inlineSpace()),
  ));
}
export function flagedStringOptionItem(...options: string[]): string {
  return createSpacedOptionItemPattern(seq(
    optional(char('+', '-')),
    ignoreCase(textalt(...options)),
    negChars0(inlineSpace()),
  ));
}
export function identifierOptionItem(...options: string[]): string {
  return createSpacedOptionItemPattern(seq(
    ignoreCase(textalt(...options)),
    optional(patterns_v1.identifierPattern),
  ));
}
export function flagedIdentifierOptionItem(...options: string[]): string {
  return createSpacedOptionItemPattern(seq(
    optional(char('+', '-')),
    ignoreCase(textalt(...options)),
    optional(patterns_v1.identifierPattern),
  ));
}
export function decimalOptionItem(...options: string[]): string {
  return createSpacedOptionItemPattern(seq(
    ignoreCase(textalt(...options)),
    optional(decimalPattern()),
  ));
}
export function numberOptionItem(...options: string[]): string {
  return createSpacedOptionItemPattern(seq(
    ignoreCase(textalt(...options)),
    optional(numberPattern()),
  ));
}
// export function flagedNumberOptionItem(...options: string[]): string {
//   return createSpacedOptionItemPattern(seq(
//     optional(char('+', '-')),
//     ignoreCase(textalt(...options)),
//     optional(numberPattern()),
//   ));
// }
export function signedNumberOptionItem(...options: string[]): string {
  return createSpacedOptionItemPattern(seq(
    ignoreCase(textalt(...options)),
    optseq(
      optional(char('+', '-')),
      optional(numberPattern()),
    ),
  ));
}
export function flagedSignedNumberOptionItem(...options: string[]): string {
  return createSpacedOptionItemPattern(seq(
    optional(char('+', '-')),
    ignoreCase(textalt(...options)),
    optseq(
      optional(char('+', '-')),
      optional(numberPattern()),
    ),
  ));
}
export function hexOptionItem(...options: string[]): string {
  return createSpacedOptionItemPattern(seq(
    ignoreCase(ordalt(...options)),
    optional(hexPattern()),
  ));
}
export function flagedHexOptionItem(...options: string[]): string {
  return createSpacedOptionItemPattern(seq(
    optional(char('+', '-')),
    ignoreCase(ordalt(...options)),
    optional(hexPattern()),
  ));
}
export function colorOptionItem(...options: string[]): string {
  return createSpacedOptionItemPattern(seq(
    ignoreCase(textalt(...options)),
    group(alt(
      group(textalt(...constants_common.colorNames, 'Default')),
      group(hexPattern()),
    )),
  ));
}
// #endregion parameter item defenition

// #region command / parameter definition
export function command(name: string, signatureOrSignatures: CommandSignature | CommandSignature[], flags: CommandFlag = CommandFlag.None): CommandDefinition {
  const signatures = Array.isArray(signatureOrSignatures) ? signatureOrSignatures : [ signatureOrSignatures ];
  return { name, signatures, flags };
}
export function signature(parameters: CommandParameter[], flags: CommandSignatureFlag = CommandSignatureFlag.None): CommandSignature {
  return { flags, parameters };
}
export function parameterless(): CommandParameter[] {
  return [ invalid() ];
}
export function subcommand(values: string | string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    type: HighlightType.SubCommand,
    flags: mergeFlags(flags, CommandParameterFlag.SubCommand),
    itemMatchers: [
      {
        name: RuleName.SubCommandName,
        match: ignoreCase(ordalt(...(Array.isArray(values) ? values : [ values ]))),
      },
    ],
  };
}
export function subcommandlike(values: string | string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    type: HighlightType.SubCommand,
    flags: mergeFlags(flags, CommandParameterFlag.SubCommand),
    itemMatchers: [
      {
        name: [ RuleName.UnquotedString, StyleName.Strong ],
        match: ignoreCase(ordalt(...(Array.isArray(values) ? values : [ values ]))),
      },
    ],
  };
}
export function flowSubcommand(values: string | string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    type: HighlightType.FlowSubCommand,
    flags: mergeFlags(flags, CommandParameterFlag.SubCommand),
    itemMatchers: [
      {
        name: RuleName.FlowSubCommandName,
        match: ignoreCase(ordalt(...(Array.isArray(values) ? values : [ values ]))),
      },
    ],
  };
}
export function guiSubcommand(values: string | string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    type: HighlightType.GuiSubCommand,
    flags: mergeFlags(flags, CommandParameterFlag.SubCommand, CommandParameterFlag.Labeled),
    itemMatchers: [
      {
        name: RuleName.SubCommandName,
        match: ignoreCase(ordalt(...(Array.isArray(values) ? values : [ values ]))),
      },
    ],
  };
}
export function blank(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    type: HighlightType.Blank,
    flags: mergeFlags(flags, CommandParameterFlag.Invalid),
  };
}
export function invalid(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return blank(flags);
}
export function unquoted(itemMatchers: ParameterItemMatcher[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    type: HighlightType.UnquotedString,
    flags,
    itemMatchers: [
      includeRule(Repository.DereferenceUnaryOperator),
      includeRule(Repository.Dereference),
      includeRule(Repository.UnquotedStringEscapeSequence),
      ...itemMatchers,
      {
        name: [ RuleName.UnquotedString ],
        match: negChars1('`', inlineSpace()),
      },
    ],
  };
}
export function unquotedShouldEscapeComma(optionItems: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return restParams(optionItems, flags);
}
export function unquotedInteger(...optionItems: string[]): CommandParameter {
  return unquotedNumber(...optionItems);
}
export function unquotedWithNumber(itemMatchers: ParameterItemMatcher[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    type: HighlightType.UnquotedStringWithNumber,
    flags,
    itemMatchers: [
      includeRule(Repository.DereferenceUnaryOperator),
      includeRule(Repository.Dereference),
      includeRule(Repository.UnquotedStringEscapeSequence),
      ...itemMatchers,
      includeRule(Repository.Operator),
      includeRule(Repository.Number),
    ],
  };
}
export function unquotedNumber(...itemMatchers: ParameterItemMatcher[]): CommandParameter {
  return {
    type: HighlightType.NumberInCommandArgument,
    flags: CommandParameterFlag.None,
    itemMatchers: [
      ...itemMatchers,
      includeRule(Repository.Operator),
      includeRule(Repository.Number),
      {
        name: [ RuleName.UnquotedString, StyleName.Invalid ],
        match: anyChars1(),
      },
    ],
  };
}
export function unquotedAndBoolean(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    type: HighlightType.UnquotedBooleanLike,
    flags,
    itemMatchers: [ includeRule(Repository.CommandArgumentBooleanLike) ],
  };
}
export function quotableUnquoted(itemMatchers: ParameterItemMatcher[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    type: HighlightType.QuotableUnquotedString,
    flags,
    itemMatchers: [
      includeRule(Repository.DereferenceUnaryOperator),
      includeRule(Repository.Dereference),
      includeRule(Repository.UnquotedStringEscapeSequence),
      {
        name: RuleName.UnquotedString,
        match: char('"', `'`),
      },
      ...itemMatchers,
      {
        name: RuleName.UnquotedString,
        match: negChars1('`', '"', `'`, inlineSpace()),
      },
    ],
  };
}
export function restParams(itemMatchers: ParameterItemMatcher[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    type: HighlightType.RestParams,
    flags: mergeFlags(flags, CommandParameterFlag.RestParams),
    itemMatchers: [
      ...itemMatchers,
      includeRule(Repository.CommandArgument),
    ],
  };
}
export function labelName(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    type: HighlightType.LabelName,
    flags,
    itemMatchers: values.map((value) => {
      return {
        match: capture(ignoreCase(value)),
        captures: {
          1: [ includeRule(Repository.LabelName) ],
        },
      };
    }),
  };
}
export function expression(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.Expression, flags: mergeFlags(flags, CommandParameterFlag.Expression) };
}
export function style(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    type: HighlightType.Style,
    flags,
    itemMatchers: [
      {
        name: RuleName.Operator,
        match: char('+', '-', '^'),
      },
      includeRule(Repository.Number),
      {
        name: RuleName.UnquotedString,
        match: seq(
          negChar('`', '0-9', '+', '-', '^', inlineSpace(), ','),
          negChars0('`', inlineSpace(), ','),
        ),
      },
    ],
  };
}
export function fileAttributes(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return keywordOnly([ flagedLetterOptionItem('R', 'A', 'S', 'H', 'N', 'O', 'T') ], flags);
}
export function guiOptions(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    type: HighlightType.GuiOptions,
    flags: mergeFlags(flags, CommandParameterFlag.Labeled),
    itemMatchers: [
      flagedOptionItem('AlwaysOnTop', 'Border', 'Caption', 'DelimiterSpace', 'DelimiterTab', 'Disabled', 'DPIScale', 'LastFoundExist', 'MaximizeBox', 'MinimizeBox', 'OwnDialogs', 'Owner', 'Parent', 'Resize', 'SysMenu', 'Theme', 'ToolWindow'),
      flagedStringOptionItem('Delimiter'),
      flagedIdentifierOptionItem('Hwnd', 'Label', 'LastFound'),
      flagedSizeOptionItem('MinSize', 'MaxSize'),
    ],
  };
}
export function keywordOnly(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    type: HighlightType.KeywordOnly,
    flags: mergeFlags(flags, CommandParameterFlag.Keyword),
    itemMatchers: [
      ...values,
      {
        name: [ RuleName.UnquotedString, StyleName.Invalid ],
        match: negChars0('`', inlineSpace()),
      },
    ],
  };
}
export function spacedKeywordsOnly(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return keywordOnly(values, flags);
}
export function input(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return expression(flags);
}
export function output(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return expression(flags);
}
export function menuItemName(flags: CommandParameterFlag = CommandParameterFlag.None): IncludeRulesCommandParameter {
  return {
    type: HighlightType.MenuItemName,
    flags,
    includes: [ includeRule(Repository.MenuItemNameCommandArgument) ],
  };
}
export function includeLib(flags: CommandParameterFlag = CommandParameterFlag.None, quotable = false): CommandParameter {
  return {
    type: HighlightType.UnquotedString,
    flags,
    itemMatchers: [
      {
        match: seq(
          capture(inlineSpaces0()),
          capture(char('<')),
          capture(anyChars0()),
          capture(char('>')),
          capture(anyChars0()),
        ),
        captures: {
          1: [ { name: [ RuleName.UnquotedString, StyleName.Invalid ] } ],
          2: [ { name: RuleName.OpenAngleBracket } ],
          3: [ { name: RuleName.IncludeLibrary } ],
          4: [ { name: RuleName.CloseAngleBracket } ],
          5: [ { name: [ RuleName.UnquotedString, StyleName.Invalid ] } ],
        },
      },
      {
        match: capture(seq(negChar('<', inlineSpace()), anyChars1())),
        captures: {
          1: [
            includeRule(Repository.DereferenceUnaryOperator),
            includeRule(Repository.Dereference),
            includeRule(Repository.UnquotedStringEscapeSequence),
            ...quotable
              ? [
                {
                  name: [ RuleName.UnquotedString ],
                  match: char('"', `'`),
                },
                {
                  name: [ RuleName.UnquotedString ],
                  match: negChars1('`', '"', `'`, '%', inlineSpace()),
                },
              ]
              : [
                {
                  name: [ RuleName.UnquotedString ],
                  match: negChars1('`', '%', inlineSpace()),
                },
              ],
          ],
        },
      },
    ],
  };
}
export function quotableIncludeLib(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return includeLib(flags, true);
}
export function requiresVersion(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([
    createOptionItemPattern(ignoreCase('AutoHotkey')),
    group(seq(group(alt('32', '64')), char('-'), ignoreCase(text('bit')))),
    group(ordalt(
      '<',
      '<=',
      '>',
      '>=',
      '=',
    )),
    createOptionItemPattern(seq(
      optional(ignoreCase('v')),
      optional(textalt('2.', '1.')),
      numberPattern(),
    )),
  ], flags);
  // return { type: HighlightType.RequiresVersion, flags };
}
export function menuOptions(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([
    decimalOptionItem('P'),
    flagedOptionItem('Radio', 'Right', 'Break', 'BarBreak'),
    ...values,
  ], flags);
}
export function winTitle(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ optionItem('ahk_class', 'ahk_id', 'ahk_pid', 'ahk_exe', 'ahk_group') ], flags);

  // Make each definition group easily distinguishable by underlining. However, if the underline is applied in TMLanguage, its color cannot be controlled. This should be implemented with semantic highlighting
  // For example, three groups are underlined in the following cases
  // e.g. `WinActivate abc ahk_exe abc.exe ahk_class abc`
  //                   ^^^ ^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^
  // return {
  //   type: HighlightType.UnquotedString,
  //   flags,
  //   itemMatchers: [
  //     {
  //       match: seq(
  //         lookbehind(group(seq(
  //           char(','),
  //           inlineSpaces0(),
  //         ))),
  //         capture(seq(
  //           char('%'),
  //           negChars0('%'),
  //           char('%'),
  //         )),
  //         lookahead(seq(
  //           inlineSpaces0(),
  //           alt(char(','), endAnchor()),
  //         )),
  //       ),
  //       captures: {
  //         1: [ includeRule(Repository.Dereference) ],
  //       },
  //     },
  //     {
  //       name: [ StyleName.Underline ],
  //       match: capture(seq(
  //         char('%'),
  //         negChars0('%'),
  //         char('%'),
  //       )),
  //       captures: {
  //         1: [ includeRule(Repository.Dereference) ],
  //       },
  //     },
  //     {
  //       match: capture(groupMany1(capture(seq(
  //         negChar('%'),
  //         negativeLookahead(ignoreCase(seq(
  //           text('ahk_'),
  //           group(alt(ordalt(
  //             'class',
  //             'id',
  //             'pid',
  //             'exe',
  //             'group',
  //           ))),
  //         ))),
  //       )))),
  //       captures: {
  //         1: [ { name: [ RuleName.UnquotedString, StyleName.Underline ] } ],
  //       },
  //     },
  //   ],
  // };
}
export function control(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ optionItem('ahk_id') ], flags);
}
export function controlOrPos(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ optionItem('ahk_id'), decimalOptionItem('X', 'Y') ], flags);
}
export function guiControlType(): CommandParameter {
  return keywordOnly([ optionItem('ActiveX', 'Button', 'CheckBox', 'ComboBox', 'Custom', 'DateTime', 'DropDownList', 'DDL', 'Edit', 'GroupBox', 'Hotkey', 'Link', 'ListBox', 'ListView', 'MonthCal', 'Picture', 'Pic', 'Progress', 'Radio', 'Slider', 'StatusBar', 'Tab', 'Tab2', 'Tab3', 'Text', 'TreeView', 'UpDown') ]);
}
export function controlMoveOptions(): CommandParameter {
  return unquoted([ numberOptionItem('X', 'Y', 'W', 'H') ]);
}
export function guiControlOptions(_flaged = false): CommandParameter {
  return {
    type: HighlightType.GuiOptions,
    flags: CommandParameterFlag.Labeled,
    itemMatchers: [
      (_flaged ? flagedSignedNumberOptionItem : signedNumberOptionItem)('R', 'W', 'H', 'WP', 'HP', 'X', 'Y', 'XP', 'YP', 'XM', 'YM', 'XS', 'YS', 'Choose', 'VScroll', 'HScroll'),
      (_flaged ? flagedOptionItem : optionItem)('X+M', 'X-M', 'Y+M', 'Y-M', 'Left', 'Right', 'Center', 'Section', 'Tabstop', 'Wrap', 'AltSubmit', 'CDefault', 'BackgroundTrans', 'Background', 'Border', 'Theme'),
      (_flaged ? flagedIdentifierOptionItem : identifierOptionItem)('V', 'G', 'Hwnd'),
      (_flaged ? flagedHexOptionItem : hexOptionItem)('C'),
      (_flaged ? flagedToggleOptionItem : toggleOptionItem)('Disabled', 'Hidden'),
    ],
  };
}
export function flagedGuiControlOptions(): CommandParameter {
  return guiControlOptions(true);
}
export function onOff(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return keywordOnly([ optionItem('On', 'Off', '1', '0'), ...values ], flags);
}
export function onOffToggle(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return onOff([ optionItem('Toggle'), ...values ], flags);
}
export function whichButton(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ optionItem('Left', 'L', 'Right', 'R', 'Middle', 'M', 'WheelUp', 'WU', 'WheelDown', 'WD', 'WheelLeft', 'WL', 'WheelRight', 'WR') ], flags);
}
export function path(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted(values, flags);
}
export function imagePath(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return path([ stringOptionItem('HICON:', 'HBITMAP:') ], flags);
}
export function glob(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return { type: HighlightType.UnquotedString, flags, itemMatchers: [] };
}
export function encoding(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ optionItem('CP0', 'UTF-8', 'UTF-8-RAW', 'UTF-16', 'UTF-16-RAW'), numberOptionItem('CP') ], flags);
}
export function quotableEncoding(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return quotableUnquoted(encoding().itemMatchers, flags);
}
export function keyName(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ optionItem(...constants_common.keyNameList), hexOptionItem('sc', 'vk') ], flags);
}
export function hotkeyName(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([], flags);
  //   return {
  //     type: HighlightType.HotkeyName,
  //     flags,
  //     values: [
  //   ];
  // }
}
export function sendKeys(flags: CommandParameterFlag = CommandParameterFlag.None): IncludeRulesCommandParameter {
  return {
    type: HighlightType.SendKeyName,
    flags,
    includes: [ includeRule(Repository.CommandArgumentSendKeyName) ],
  };
}
export function timeunit(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return keywordOnly([ optionItem('Seconds', 'S', 'Minutes', 'M', 'Hours', 'H', 'Days', 'D') ], flags);
}
export function formatTime(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ letterOptionItem('d', 'dd', 'ddd', 'dddd', 'M', 'MM', 'MMM', 'MMMM', 'y', 'yy', 'yyyy', 'gg', 'h', 'hh', 'H', 'HH', 'm', 'mm', 's', 'ss', 't', 'tt') ], CommandParameterFlag.CaseSensitive | flags);
}
export function color(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([ optionItem('Default', 'Black', 'Silver', 'Gray', 'White', 'Maroon', 'Red', 'Purple', 'Fuchsia', 'Green', 'Lime', 'Olive', 'Yellow', 'Navy', 'Blue', 'Teal', 'Aqua') ], flags);
}
export function soundComponent(): CommandParameter {
  return unquoted([ optionItem('MASTER', 'SPEAKERS', 'DIGITAL', 'LINE', 'MICROPHONE', 'SYNTH', 'CD', 'TELEPHONE', 'PCSPEAKER', 'WAVE', 'AUX', 'ANALOG', 'HEADPHONES', 'N/A') ]);
}
export function soundControlType(): CommandParameter {
  return unquoted([ optionItem('VOLUME', 'VOL', 'ONOFF', 'MUTE', 'MONO', 'LOUDNESS', 'STEREOENH', 'BASSBOOST', 'PAN', 'QSOUNDPAN', 'BASS', 'TREBLE', 'EQUALIZER') ]);
}
export const winParams: CommandParameter[] = [
  winTitle(),
  unquoted(),
  winTitle(),
  unquoted(),
] as const;
// #endregion command / parameter definition
