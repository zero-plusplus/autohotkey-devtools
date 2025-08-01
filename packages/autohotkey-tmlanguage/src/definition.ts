import { mergeFlags } from '@zero-plusplus/utilities/src';
import * as patterns_v1 from './autohotkeyl/patterns';
import * as constants_common from './common/constants';
import {
  alt,
  anyChars0,
  anyChars1,
  capture,
  char,
  endAnchor,
  group,
  groupMany1,
  ignoreCase,
  inlineSpace,
  inlineSpaces0,
  lookahead,
  lookbehind,
  negChar,
  negChars0,
  negChars1,
  numbers0,
  numbers1,
  optional,
  optseq,
  ordalt,
  seq,
  text,
  textalt,
} from './oniguruma';
import {
  includeRule,
  Repository,
  RuleName,
  StyleName,
  type ElementName,
  type IncludeRule,
} from './tmlanguage';

// #region constants
export const scopeNames = [ 'autohotkey', 'autohotkeynext', 'autohotkeyl', 'autohotkey2' ] as const;
// #endregion constants

// #region enum
export const enum CommandFlag {
  None = 0,
  Deprecated = 1 << 0,
  Removed = 1 << 1,
}
export const enum CommandSignatureFlag {
  None = 0,
  Deprecated = 1 << 0,
}
export const enum CommandParameterFlag {
  None = 0,
  Blank = 1 << 0,
  SubCommand = 1 << 1,
  Expression = 1 << 2,
  RestParams = 1 << 3,
  CompilerDirective = 1 << 4,

  // Accept only one keyword
  // [o] AutoTrim, On
  // [x] AutoTrim, On Off
  ExclusiveKeyword = 1 << 16,
  // Gui, GuiName:
  //      ^^^^^^^^
  GuiLabeled = 1 << 17,
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
export type ParameterItemMatcher = string | CommandParameterMatcher | CommandParameterCapturedMatcher | IncludeRule | ParameterItemMatcher[];
export interface CommandParameter {
  readonly flags: CommandParameterFlag;
  readonly itemMatchers?: ParameterItemMatcher[];
}
export interface CommandSignature {
  readonly flags: CommandSignatureFlag;
  readonly parameters: CommandParameter[];
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
export function createOptionPattern(pattern: string, extraPrefixSeparators: string[] = [], extraSuffixSeparators: string[] = []): string {
  return seq(
    lookbehind(alt(
      inlineSpace(),
      char(',', ...extraPrefixSeparators),
    )),
    pattern,
    lookahead(alt(
      endAnchor(),
      inlineSpace(),
      char(',', ...extraSuffixSeparators),
    )),
  );
}
export function createOption(pattern: string, extraPrefixSeparators: string[] = [], extraSuffixSeparators: string[] = []): ParameterItemMatcher {
  return {
    name: [ RuleName.UnquotedString, StyleName.Strong ],
    match: createOptionPattern(pattern, extraPrefixSeparators, extraSuffixSeparators),
  };
}
export function keywordOption(...optionNames: string[]): ParameterItemMatcher {
  return createOption(ignoreCase(textalt(...optionNames)));
}
export function quotableKeywordOption(...keywords: string[]): ParameterItemMatcher {
  return [
    {
      name: RuleName.UnquotedString,
      match: char('"', `'`),
    },
    createOption(ignoreCase(textalt(...keywords)), [ '"', `'` ], [ '"', `'` ]),
  ];
}
export function flagedOption(...options: string[]): ParameterItemMatcher {
  return createOption(seq(
    optional(char('+', '-', '^')),
    ignoreCase(textalt(...options)),
  ));
}
export function endKeyOption(): ParameterItemMatcher {
  return createOption(seq(
    char('{'),
    inlineSpaces0(),
    negChars1(inlineSpace()),
    inlineSpaces0(),
    char('}'),
  ));
}
export function matchKeyOption(): ParameterItemMatcher {
  return createOption(negChars1(','));
}
export function caseSensitiveLetterOption(...options: string[]): string {
  return groupMany1(textalt(...options));
}
export function letterOption(...options: string[]): string {
  return ignoreCase(caseSensitiveLetterOption(...options));
}
export function flagedLetterOption(...options: string[]): string {
  return seq(
    optional(char('+', '-', '^')),
    letterOption(...options),
  );
}
export function toggleOption(...options: string[]): ParameterItemMatcher {
  // e.g. `Disabled0`, `Hidden1`
  return createOption(seq(
    ignoreCase(textalt(...options)),
    optional(char('0', '1')),
  ));
}
export function flagedToggleOption(...options: string[]): ParameterItemMatcher {
  // e.g. `Disabled0`, `Hidden1`
  return createOption(seq(
    optional(char('+', '-')),
    ignoreCase(textalt(...options)),
    optional(char('0', '1')),
  ));
}
export function rangeOption(...options: string[]): ParameterItemMatcher {
  return createOption(seq(
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
export function sizeOption(...options: string[]): ParameterItemMatcher {
  return createOption(seq(
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
export function flagedSizeOption(...options: string[]): ParameterItemMatcher {
  return createOption(seq(
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
export function stringOption(...optionNames: string[]): ParameterItemMatcher {
  return {
    match: seq(
      lookbehind(alt(
        inlineSpace(),
        char(','),
      )),
      capture(ignoreCase(textalt(...optionNames))),
      capture(negChars0(inlineSpace())),
      lookahead(alt(
        inlineSpace(),
        char(','),
        endAnchor(),
      )),
    ),
    captures: {
      1: [ { name: [ RuleName.UnquotedString, StyleName.Strong ] } ],
      2: [
        includeRule(Repository.DereferenceInCommandArgument),
        {
          name: [ RuleName.UnquotedString, StyleName.Strong ],
          match: negChars0('%', inlineSpace()),
        },
      ],
    },
  };
}
export function flagedStringOption(...options: string[]): ParameterItemMatcher {
  return createOption(seq(
    optional(char('+', '-')),
    ignoreCase(textalt(...options)),
    negChars0(inlineSpace()),
  ));
}
export function identifierOption(...options: string[]): ParameterItemMatcher {
  return createOption(seq(
    ignoreCase(textalt(...options)),
    optional(patterns_v1.identifierPattern),
  ));
}
export function flagedIdentifierOption(...options: string[]): ParameterItemMatcher {
  return createOption(seq(
    optional(char('+', '-')),
    ignoreCase(textalt(...options)),
    optional(patterns_v1.identifierPattern),
  ));
}
export function decimalOption(...options: string[]): ParameterItemMatcher {
  return createOption(seq(
    ignoreCase(textalt(...options)),
    optional(decimalPattern()),
  ));
}
export function numberOption(...options: string[]): ParameterItemMatcher {
  return createOption(seq(
    ignoreCase(textalt(...options)),
    optional(numberPattern()),
  ));
}
export function quotableNumberOption(...options: string[]): ParameterItemMatcher {
  return [
    {
      name: RuleName.UnquotedString,
      match: char('"', `'`),
    },
    createOption(seq(
      ignoreCase(textalt(...options)),
      optional(numberPattern()),
    ), [ '"', `'` ], [ '"', `'` ]),
  ];
}
export function signedNumberOption(...options: string[]): ParameterItemMatcher {
  return createOption(seq(
    ignoreCase(textalt(...options)),
    optseq(
      optional(char('+', '-')),
      optional(numberPattern()),
    ),
  ));
}
export function flagedSignedNumberOption(...options: string[]): ParameterItemMatcher {
  return createOption(seq(
    optional(char('+', '-')),
    ignoreCase(textalt(...options)),
    optseq(
      optional(char('+', '-')),
      optional(numberPattern()),
    ),
  ));
}
export function hexOption(...options: string[]): ParameterItemMatcher {
  return createOption(seq(
    ignoreCase(ordalt(...options)),
    optional(hexPattern()),
  ));
}
export function flagedHexOption(...options: string[]): ParameterItemMatcher {
  return createOption(seq(
    optional(char('+', '-')),
    ignoreCase(ordalt(...options)),
    optional(hexPattern()),
  ));
}
export function colorOption(...options: string[]): ParameterItemMatcher {
  return createOption(seq(
    ignoreCase(textalt(...options)),
    group(alt(
      group(textalt(...constants_common.colorNames, 'Default')),
      group(hexPattern()),
    )),
  ));
}
// #endregion parameter item defenition

// #region command definitions
export function command(name: string, signatureOrSignatures: CommandSignature | CommandSignature[], flags: CommandFlag = CommandFlag.None): CommandDefinition {
  const signatures = Array.isArray(signatureOrSignatures) ? signatureOrSignatures : [ signatureOrSignatures ];
  return { name, signatures, flags };
}
export function signature(parameters: CommandParameter[], flags: CommandSignatureFlag = CommandSignatureFlag.None): CommandSignature {
  return { flags, parameters };
}
// #endregion command definitions

// #region command parameter definitions
export function $(itemMatchers: ParameterItemMatcher[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    flags,
    itemMatchers: [
      includeRule(Repository.DereferenceUnaryOperator),
      includeRule(Repository.DereferenceInCommandArgument),
      ...itemMatchers,
      includeRule(Repository.UnquotedStringEscapeSequence),
      {
        name: [ RuleName.UnquotedString ],
        match: negChars1('`', '%', inlineSpace()),
      },
    ],
  };
}
export function $subcommand(values: string | string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  // Keywords to distinguish between signatures
  // e.g. `Control, Check`, `Control, UnCheck`
  //                ^^^^^             ^^^^^^^
  return {
    flags: mergeFlags(flags, CommandParameterFlag.SubCommand),
    itemMatchers: [
      {
        name: RuleName.SubCommandName,
        match: ignoreCase(ordalt(...(Array.isArray(values) ? values : [ values ]))),
      },
    ],
  };
}
export function $subcommandlike(values: string | string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  // Applies only to the first argument of the following two commands
  // Not originally necessary. However, added to distinguish between strict signatures
  // https://www.autohotkey.com/docs/v1/lib/Progress.htm
  // https://www.autohotkey.com/docs/v1/lib/SplashImage.htm
  // e.g. `Progress, Off`, `SplashImage, Off`
  //                 ^^^                 ^^^
  return {
    flags: mergeFlags(flags, CommandParameterFlag.SubCommand),
    itemMatchers: [
      {
        name: [ RuleName.UnquotedString, StyleName.Strong ],
        match: ignoreCase(ordalt(...(Array.isArray(values) ? values : [ values ]))),
      },
    ],
  };
}
export function $flowsubcommand(values: string | string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  // Basically the same as SubCommand, but the highlighted color is the same as the control flow keyword
  // e.g. `Loop Files`, `Loop Parse`
  //            ^^^^^         ^^^^^
  return {
    flags: mergeFlags(flags, CommandParameterFlag.SubCommand),
    itemMatchers: [
      {
        name: RuleName.FlowSubCommandName,
        match: ignoreCase(ordalt(...(Array.isArray(values) ? values : [ values ]))),
      },
    ],
  };
}
export function $guisubcommand(values: string | string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  // In addition to SubCommand, a label-like syntax is added. Mainly used in commands that deal with Gui
  // e.g. `Gui, Add`, `Gui, GuiName:Add`
  //            ^^^         ^^^^^^^^^^^
  return {
    flags: mergeFlags(flags, CommandParameterFlag.SubCommand, CommandParameterFlag.GuiLabeled),
    itemMatchers: [
      {
        name: RuleName.SubCommandName,
        match: ignoreCase(ordalt(...(Array.isArray(values) ? values : [ values ]))),
      },
    ],
  };
}
export function $blank(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    flags: mergeFlags(flags, CommandParameterFlag.Blank),
    itemMatchers: [
      {
        name: [ RuleName.UnquotedString, StyleName.Invalid ],
        match: negChars1(',', inlineSpace()),
      },
    ],
  };
}
export function $invalid(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $blank(flags);
}
export function $style(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  // e.g. `Control, Style, ^0x800000`, `WinSet, Style, -0xC00000`
  //                       ^^^^^^^^^                   ^^^^^^^^^
  return {
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
export function $quotable(itemMatchers: ParameterItemMatcher[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    flags,
    itemMatchers: [
      includeRule(Repository.DereferenceUnaryOperator),
      includeRule(Repository.DereferenceInCommandArgument),

      ...itemMatchers,
      includeRule(Repository.UnquotedStringEscapeSequence),
      {
        name: [ RuleName.UnquotedString ],
        match: char('"', `'`),
      },
      {
        name: [ RuleName.UnquotedString ],
        match: negChars1('`', '%', '"', `'`, inlineSpace()),
      },
    ],
  };
}
export function $shouldIdentifier(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    flags: mergeFlags(flags, CommandParameterFlag.ExclusiveKeyword),
    itemMatchers: [
      includeRule(Repository.Variable),
      {
        name: [ RuleName.Variable, StyleName.Invalid ],
        match: anyChars1(),
      },
    ],
  };
}
export function $shouldEscapeComma(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $rest([], flags);
}
export function $shouldBoolean(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    flags: mergeFlags(flags, CommandParameterFlag.ExclusiveKeyword),
    itemMatchers: [
      includeRule(Repository.DereferenceInCommandArgument),

      {
        match: capture(ignoreCase(ordalt('true', 'false', '0', '1'))),
        captures: {
          1: [ includeRule(Repository.Expression) ],
        },
      },
      {
        name: [ RuleName.UnquotedString, StyleName.Invalid ],
        match: anyChars1(),
      },
    ],
  };
}
export function $shouldInteger(): CommandParameter {
  return {
    flags: CommandParameterFlag.None,
    itemMatchers: [
      includeRule(Repository.DereferenceUnaryOperator),
      includeRule(Repository.DereferenceInCommandArgument),
      includeRule(Repository.Operator),
      includeRule(Repository.Integer),
      {
        name: [ RuleName.UnquotedString, StyleName.Invalid ],
        match: anyChars1(),
      },
    ],
  };
}
export function $shouldNumber(...itemMatchers: ParameterItemMatcher[]): CommandParameter {
  return {
    flags: CommandParameterFlag.None,
    itemMatchers: [
      includeRule(Repository.DereferenceUnaryOperator),
      includeRule(Repository.DereferenceInCommandArgument),
      includeRule(Repository.Operator),
      includeRule(Repository.Number),
      ...itemMatchers,
      {
        name: [ RuleName.UnquotedString, StyleName.Invalid ],
        match: negChars1('%', '0-9', inlineSpace()),
      },
    ],
  };
}
export function $shouldLabel(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    flags,
    itemMatchers: [ includeRule(Repository.LabelName) ],
  };
}
export function $shouldKeyword(itemMatchers: ParameterItemMatcher[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  // Accepts one arbitrary keyword, otherwise not accepted
  // e.g. `Gui, Flash, Off`
  //                   ^^^
  return {
    flags: mergeFlags(flags, CommandParameterFlag.ExclusiveKeyword),
    itemMatchers: [
      includeRule(Repository.DereferenceUnaryOperator),
      includeRule(Repository.DereferenceInCommandArgument),

      ...itemMatchers,
      {
        name: [ RuleName.UnquotedString, StyleName.Invalid ],
        match: negChars0(inlineSpace()),
      },
    ],
  };
}
export function $shouldSpacedKeywords(itemMatchers: ParameterItemMatcher[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  // e.g. `PixelGetColor, output, x, y, Fast RGB`
  //                                    ^^^^ ^^^
  return $shouldKeyword(itemMatchers, flags);
}
export function $withNumber(itemMatchers: ParameterItemMatcher[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    flags,
    itemMatchers: [
      includeRule(Repository.DereferenceUnaryOperator),
      includeRule(Repository.DereferenceInCommandArgument),
      includeRule(Repository.Operator),
      includeRule(Repository.Number),
      ...itemMatchers,

      includeRule(Repository.UnquotedStringEscapeSequence),
      {
        name: [ RuleName.UnquotedString ],
        match: negChars1('`', '%', '0-9', inlineSpace()),
      },
    ],
  };
}
export function $expression(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    flags: mergeFlags(flags, CommandParameterFlag.Expression),
    itemMatchers: [
      includeRule(Repository.DereferenceInCommandArgument),
      includeRule(Repository.Expression),
    ],
  };
}
export function $rest(itemMatchers: ParameterItemMatcher[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    flags: mergeFlags(flags, CommandParameterFlag.RestParams),
    itemMatchers: [
      ...itemMatchers,
      includeRule(Repository.CommandArgument),
    ],
  };
}
export function $fileAttributes(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $shouldKeyword([ flagedLetterOption('R', 'A', 'S', 'H', 'N', 'O', 'T') ], flags);
}
export function $guiOptions(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $(
    [
      flagedOption('AlwaysOnTop', 'Border', 'Caption', 'DelimiterSpace', 'DelimiterTab', 'Disabled', 'DPIScale', 'LastFoundExist', 'MaximizeBox', 'MinimizeBox', 'OwnDialogs', 'Owner', 'Parent', 'Resize', 'SysMenu', 'Theme', 'ToolWindow'),
      flagedStringOption('Delimiter'),
      flagedIdentifierOption('Hwnd', 'Label', 'LastFound'),
      flagedSizeOption('MinSize', 'MaxSize'),
    ],
    mergeFlags(flags, CommandParameterFlag.GuiLabeled),
  );
}
export function $input(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $shouldIdentifier(flags);
}
export function $output(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $shouldIdentifier(flags);
}
export function $menuItemName(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  // https://www.autohotkey.com/docs/v1/lib/Menu.htm#MenuItemName
  // In the following example, `&O` needs to be emphasized and `&&` needs to be escaped
  // e.g. `Menu, MenuName, Add, &Open`, `Menu, MenuName, Add, Save && Exit`
  return {
    flags,
    itemMatchers: [ includeRule(Repository.MenuItemNameCommandArgument) ],
  };
}
export function $menuOptions(values: string[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $([
    decimalOption('P'),
    flagedOption('Radio', 'Right', 'Break', 'BarBreak'),
    ...values,
  ], flags);
}
export function $includeLib(flags: CommandParameterFlag = CommandParameterFlag.None, quotable = false): CommandParameter {
  // e.g. `#Include path\to`, `#Include <lib>`
  //                ^^^^^^^             ^^^^^
  return {
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
            includeRule(Repository.DereferenceInCommandArgument),
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
export function $quotableIncludeLib(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $includeLib(flags, true);
}
export function $requiresVersion(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $([
    createOptionPattern(ignoreCase('AutoHotkey')),
    group(seq(group(alt('32', '64')), char('-'), ignoreCase(text('bit')))),
    group(ordalt(
      '<',
      '<=',
      '>',
      '>=',
      '=',
    )),
    createOptionPattern(seq(
      optional(ignoreCase('v')),
      optional(textalt('2.', '1.')),
      numberPattern(),
    )),
  ], flags);
  // return { type: HighlightType.RequiresVersion, flags };
}
export function $control(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $([ keywordOption('ahk_id') ], flags);
}
export function $controlOrPos(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $([ keywordOption('ahk_id'), decimalOption('X', 'Y') ], flags);
}
export function $controlMoveOptions(): CommandParameter {
  return $([ numberOption('X', 'Y', 'W', 'H') ]);
}
export function $guiControlType(): CommandParameter {
  return $shouldKeyword([ keywordOption('ActiveX', 'Button', 'CheckBox', 'ComboBox', 'Custom', 'DateTime', 'DropDownList', 'DDL', 'Edit', 'GroupBox', 'Hotkey', 'Link', 'ListBox', 'ListView', 'MonthCal', 'Picture', 'Pic', 'Progress', 'Radio', 'Slider', 'StatusBar', 'Tab', 'Tab2', 'Tab3', 'Text', 'TreeView', 'UpDown') ]);
}
export function $guiControlOptions(flaged = false): CommandParameter {
  // Accepts zero or more keywords. Each keyword must be preceded by `+` or `-` and each must have a space
  // e.g. `GuiControl, +Default`
  //                   ^^^^^^^^
  return $(
    [
      createOption(seq(
        ...(flaged ? [ optional(char('+', '-', '^')) ] : []),
        ignoreCase(textalt('X+M', 'X-M', 'Y+M', 'Y-M', 'Left', 'Right', 'Center', 'Section', 'Tabstop', 'Wrap', 'AltSubmit', 'CDefault', 'BackgroundTrans', 'Background', 'Border', 'Theme')),
      ), [ ':' ]),
      (flaged ? flagedSignedNumberOption : signedNumberOption)('R', 'W', 'H', 'WP', 'HP', 'X', 'Y', 'XP', 'YP', 'XM', 'YM', 'XS', 'YS', 'Choose', 'VScroll', 'HScroll'),
      (flaged ? flagedIdentifierOption : identifierOption)('V', 'G', 'Hwnd'),
      (flaged ? flagedHexOption : hexOption)('C'),
      (flaged ? flagedToggleOption : toggleOption)('Disabled', 'Hidden'),
    ],
    CommandParameterFlag.GuiLabeled,
  );
}
export function $flagedGuiControlOptions(): CommandParameter {
  return $guiControlOptions(true);
}
export function $onOff(itemMatchers: ParameterItemMatcher[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $shouldKeyword([ keywordOption('On', 'Off', '1', '0'), ...itemMatchers ], flags);
}
export function $onOffToggle(itemMatchers: ParameterItemMatcher[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $onOff([ keywordOption('Toggle'), ...itemMatchers ], flags);
}
export function $whichButton(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $([ keywordOption('Left', 'L', 'Right', 'R', 'Middle', 'M', 'WheelUp', 'WU', 'WheelDown', 'WD', 'WheelLeft', 'WL', 'WheelRight', 'WR') ], flags);
}
export function $path(itemMatchers: ParameterItemMatcher[] = [], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $(itemMatchers, flags);
}
export function $imagePath(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $path([ stringOption('HICON:', 'HBITMAP:') ], flags);
}
export function $glob(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $([], flags);
}
export function $encoding(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $([ keywordOption('CP0', 'UTF-8', 'UTF-8-RAW', 'UTF-16', 'UTF-16-RAW'), numberOption('CP') ], flags);
}
export function $quotableEncoding(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $([ quotableKeywordOption('CP0', 'UTF-8', 'UTF-8-RAW', 'UTF-16', 'UTF-16-RAW'), quotableNumberOption('CP') ], flags);
}
export function $keyName(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $shouldKeyword([ keywordOption(...constants_common.keyNameList), hexOption('sc', 'vk') ], flags);
}
export function $hotkeyName(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $([ includeRule(Repository.HotkeyName) ], flags);
}
export function $sendKeyName(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  // e.g. `Send, {LButton 5}`
  //             ^^^^^^^^^^^
  return $([ includeRule(Repository.CommandArgumentSendKeyName) ], flags);
}
export function $timeunit(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $shouldKeyword([ keywordOption('Seconds', 'S', 'Minutes', 'M', 'Hours', 'H', 'Days', 'D') ], flags);
}
export function $formatTime(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $(
    [ caseSensitiveLetterOption('d', 'dd', 'ddd', 'dddd', 'M', 'MM', 'MMM', 'MMMM', 'y', 'yy', 'yyyy', 'gg', 'h', 'hh', 'H', 'HH', 'm', 'mm', 's', 'ss', 't', 'tt') ],
    flags,
  );
}
export function $color(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return $([ keywordOption('Default', 'Black', 'Silver', 'Gray', 'White', 'Maroon', 'Red', 'Purple', 'Fuchsia', 'Green', 'Lime', 'Olive', 'Yellow', 'Navy', 'Blue', 'Teal', 'Aqua') ], flags);
}
export function $soundComponent(): CommandParameter {
  return $([ keywordOption('MASTER', 'SPEAKERS', 'DIGITAL', 'LINE', 'MICROPHONE', 'SYNTH', 'CD', 'TELEPHONE', 'PCSPEAKER', 'WAVE', 'AUX', 'ANALOG', 'HEADPHONES', 'N/A') ]);
}
export function $soundControlType(): CommandParameter {
  return $([ keywordOption('VOLUME', 'VOL', 'ONOFF', 'MUTE', 'MONO', 'LOUDNESS', 'STEREOENH', 'BASSBOOST', 'PAN', 'QSOUNDPAN', 'BASS', 'TREBLE', 'EQUALIZER') ]);
}
export function $winTitle(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  // e.g. `WinGet, output,ID, abc ahk_exe abc.exe ahk_class abc
  //                          ^^^ ^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^
  return $([ keywordOption('ahk_class', 'ahk_id', 'ahk_pid', 'ahk_exe', 'ahk_group') ], flags);

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
export const $winParams: CommandParameter[] = [
  $winTitle(),
  $(),
  $winTitle(),
  $(),
] as const;
export const $parameterless: CommandParameter[] = [ $invalid() ] as const;
// #endregion command parameter definitions
