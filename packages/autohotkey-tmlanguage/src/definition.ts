// #region constants
export const scopeNames = [ 'autohotkey', 'autohotkeynext', 'autohotkeyl', 'autohotkey2' ] as const;
// #endregion constants

// #region enum
export const enum HighlightType {
  None = 'none',
  Blank = 'blank',
  Expression = 'expression',
  UnquotedString = 'unquotedstring',
  UnquotedStringShouldEscapeComma = 'unquoted_string_should_escapecomma',
  UnquotedStringWithNumber = 'unquotedstring_with_number',
  NumberInCommandArgument = 'number_in_command_argument',
  // e.g. Send, {LButton 5}
  //            ^^^^^^^^^^^
  SendKeyName = 'send_key_name',
  // e.g. #Requires AutoHotkey v2.0
  //                ^^^^^^^^^^^^^^^
  // RequiresVersion = 'requires_version',
  // e.g. `#Include path\to`, `#Include <lib>`
  //                ^^^^^^^             ^^^^^
  IncludeLibrary = 'include_library',

  RestParams = 'rest_params',
  LabelName = 'labelname',
  // Keywords to distinguish between signatures
  // e.g. `Control, Check`, `Control, UnCheck`
  //                ^^^^^             ^^^^^^^
  SubCommand = 'subcommand',
  // Applies only to the first argument of the following two commands
  // Not originally necessary. However, added to distinguish between strict signatures
  // https://www.autohotkey.com/docs/v1/lib/Progress.htm
  // https://www.autohotkey.com/docs/v1/lib/SplashImage.htm
  // e.g. `Progress, Off`, `SplashImage, Off`
  //                 ^^^                 ^^^
  SubCommandLike = 'subcommand_like',
  // Basically the same as SubCommand, but the highlighted color is the same as the control flow keyword
  // e.g. `Loop Files`, `Loop Parse`
  //            ^^^^^         ^^^^^
  FlowSubCommand = 'flow_subcommand',
  // In addition to SubCommand, a label-like syntax is added. Mainly used in commands that deal with Gui
  // e.g. `Gui, Add`, `Gui, GuiName:Add`
  //            ^^^         ^^^^^^^^^^^
  GuiSubCommand = 'gui_subcommand',
  Input = 'input',
  Output = 'output',
  Invalid = 'invalid',

  // Accepts one arbitrary keyword, otherwise not accepted
  // e.g. `Gui, Flash, Off`
  //                   ^^^
  KeywordOnly = 'keyword_only',
  // e.g. `PixelGetColor, output, x, y, Fast RGB`
  //                                    ^^^^ ^^^
  SpacedKeywordsOnly = 'spaced_keywords_only',

  // Accepts zero or more unquoted strings or keywords. Must have a space between each
  // e.g. `ControlClick x123 y123`, `Click, 100 100 LButton`
  //                    ^^^^ ^^^^           ^^^ ^^^ ^^^^^^^
  UnquotedOrKeywords = 'unquoted_or_keywords',

  // Accepts one or more arbitrary keywords. No space is needed between each
  // e.g. `Loop, Files, \path\to, DFR
  //                              ^^^
  LetterOptions = 'letter_options',
  // Accepts entries beginning with `+`, `-` or `^` followed by one or more keywords. No space is needed between each
  // e.g. `FileSetAttrib, +HA-R`
  //                      ^^^^^
  FileAttributes = 'file_attributes',

  // Accepts zero or more keywords. Each keyword must be preceded by `+` or `-` and each must have a space
  // It also accepts an optional gui name for the first argument
  // e.g. `Gui, GuiName: +Resize`, `Gui, New, +Resize`
  //            ^^^^^^^^^^^^^^^^              ^^^^^^^
  GuiOptions = 'gui_options',

  // Accepts zero or more keywords. Each keyword must be preceded by `+` or `-` and each must have a space
  // e.g. `GuiControl, +Default`
  //                   ^^^^^^^^
  GuiControlOptions = 'gui_control_options',

  // https://www.autohotkey.com/docs/v1/lib/Menu.htm#MenuItemName
  // In the following example, `&O` needs to be emphasized and `&&` needs to be escaped
  // e.g. `Menu, MenuName, Add, &Open`, `Menu, MenuName, Add, Save && Exit`
  MenuItemName = 'menu_item_name',

  // e.g. `Control, Style, ^0x800000`, `WinSet, Style, -0xC00000`
  //                       ^^^^^^^^^                   ^^^^^^^^^
  Style = 'style',

  // e.g. `WinGet, output,ID, abc ahk_exe abc.exe ahk_class abc
  //                          ^^^ ^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^
  WinTitle = 'window_title',

  // e.g. `#Module ModuleName`
  //               ^^^^^^^^^^
  Namespace = 'namespace',

  // ; @Ahk2Exe-AddResource fileName
  //                        ^^^^^^^^
  UnquotedStringInCompilerDirective = 'unquotedstring_in_compiler_directive',

  // ; @Ahk2Exe-Let name = value
  //                ^^^^^^^^^^^^
  ExpressionInCompilerDirective = 'expression_in_compiler_directive',
}
export const enum CommandSignatureFlag {
  None = 0,
  Deprecated = 1 << 0,
}
export const enum CommandParameterFlag {
  None = 0,
  Deprecated = 1 << 0,
  Keyword = 1 << 1,
  IgnoreCase = 1 << 2,
}
export const enum CommandFlag {
  None = 0,
  Deprecated = 1 << 0,
}
// #endregion enum

// #region type
export interface CommandParameter {
  readonly type: HighlightType;
  readonly flags: CommandParameterFlag;
  readonly itemPatterns?: string[];
}
export interface SubCommandParameter extends CommandParameter {
  readonly type: HighlightType.SubCommand | HighlightType.SubCommandLike | HighlightType.FlowSubCommand | HighlightType.GuiSubCommand;
  readonly itemPatterns: string[];
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
