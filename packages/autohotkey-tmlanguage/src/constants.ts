// #region constants
export const scopeNames = [ 'autohotkey', 'autohotkeynext', 'autohotkeyl', 'autohotkey2' ] as const;
// #endregion constants

// #region enum
export const enum Repository {
  Self = '$self',
  Meta = 'Repository.Meta',

  // #region trivas
  Comment = 'Repository.Comment',
  MultiLineComments = 'Repository.MultiLineComments',
  SingleLineComments = 'Repository.SingleLineComments',
  InLineComments = 'Repository.InLineComments',
  MultiLineComment = 'Repository.MultiLineComment',
  SingleLineComment = 'Repository.SingleLineComment',
  CompilerDirectiveComment = 'Repository.CompilerDirectiveComment',
  InLineComment = 'Repository.InLineComment',

  // #region document
  MultiLineDocumentComment = 'Repository.MultiLineDocumentComment',
  SingleLineDocumentComment = 'Repository.SingleLineDocumentComment',
  InlineDocumentComment = 'Repository.InlineDocumentComment',
  FencedCodeBlockInDocument = 'Repository.FencedCodeBlockInDocument',
  InlineTextInDocument = 'Repository.InlineTextInDocument',
  TypeInDocument = 'Repository.TypeInDocument',
  // #endregion document
  // #endregion trivas

  // #region statements
  Statement = 'Repository.Statement',
  StatementCommon = 'Repository.StatementCommon',
  Import = 'Repository.Import',
  Export = 'Repository.Export',
  ExpressionStatement = 'Repository.ExpressionStatement',
  IncludeStatement = 'Repository.IncludeStatement',
  RequiresStatement = 'Repository.RequiresStatement',
  DirectiveStatement = 'Repository.DirectiveStatement',
  JumpStatement = 'Repository.JumpStatement',
  JumpToLabelStatement = 'Repository.JumpToLabelStatement',
  CommandStatement = 'Repository.CommandStatement',
  LegacyStatement = 'Repository.LegacyStatement',
  IfStatement = 'Repository.IfStatement',
  SwitchStatement = 'Repository.SwitchStatement',
  WhileStatement = 'Repository.WhileStatement',
  LoopStatement = 'Repository.LoopStatement',
  UntilStatement = 'Repository.UntilStatement',
  ForStatement = 'Repository.ForStatement',
  TryStatement = 'repository.TryStatement',
  ThrowStatement = 'Repository.ThrowStatement',
  LabelStatement = 'Repository.LabelStatement',
  HotkeyLabelStatement = 'Repository.HotkeyLabelStatement',
  HotstringLabelStatement = 'Repository.HotstringLabelStatement',
  CallStatement = 'Repository.CallStatement',
  BuiltInCallStatement = 'Repository.BuiltInCallStatement',
  UserDefinedCallStatement = 'Repository.UserDefinedCallStatement',
  // #endregion statements

  // #region declaration
  Block = 'Repository.Block',
  Modifier = 'Repository.Modifier',
  Declaration = 'Repository.Declaration',
  AssignmentDeclaration = 'Repository.AssignmentDeclaration',
  TypedAssignmentDeclaration = 'Repository.TypedAssignmentDeclaration',
  ClassDeclaration = 'Repository.ClassDeclaration',
  BlockInClassBody = 'Repository.BlockInClassBody',
  PropertyDeclaration = 'Repository.PropertyDeclaration',
  // #endregion declaration

  // #region expressions
  Expression = 'Repository.Expression',
  ExpressionInBrackets = 'Repository.ExpressionInBrackets',
  ExpressionInControlFlow = 'Repository.ExpressionInControlFlow',
  Expressions = 'Repository.Expressions',
  ParenthesizedExpression = 'Repository.ParenthesizedExpression',
  ShorthandRegexpMatch = 'Repository.ShorthandRegexpMatch',

  // #region literal
  Literal = 'Repository.Literal',

  // #region string
  String = 'Repository.String',
  InvalidStringContent = 'Repository.InvalidStringContent',
  DoubleString = 'Repository.DoubleString',
  DoubleStringEscapeSequence = 'Repository.DoubleStringEscapeSequence',
  SingleString = 'Repository.SingleString',
  SingleStringEscapeSequence = 'Repository.SingleStringEscapeSequence',

  ContinuationStringOptions = 'Repository.ContinuationStringOptions',
  ContinuationDoubleString = 'Repository.ContinuationDoubleString',
  ContinuationSingleString = 'Repository.ContinuationSingleString',
  // #endregion string
  // #region number
  Number = 'Repository.Number',
  Integer = 'Repository.Integer',
  Float = 'Repository.Float',
  InvalidFloat = 'Repository.InvalidFloat',
  Hex = 'Repository.Hex',
  InvalidHex = 'Repository.InvalidHex',
  ScientificNotation = 'Repository.ScientificNotation',
  InvalidScientificNotation = 'Repository.InvalidScientificNotation',
  // #endregion number

  // #region object
  Object = 'Repository.Object',
  ObjectInBrackets = 'Repository.ObjectInBrackets',
  ObjectContent = 'Repository.ObjectContent',
  ObjectKey = 'Repository.ObjectKey',
  Array = 'Repository.Array',
  // #endregion object
  // #endregion literal

  // #region variable
  Variable = 'Repository.Variable',
  ConstantLikeVariable = 'Repository.ConstantLikeVariable',
  UserDefinedVariable = 'Repository.UserDefinedVariable',
  BuiltInVariable = 'Repository.BuiltInVariable',
  BuiltInClass = 'Repository.BuiltInClass',
  KeywordLikeBuiltInVariable = 'Repository.KeywordLikeBuiltInVariable',

  MetaPropertyName = 'Repository.MetaPropertyName',
  MetaFunctionName = 'Repository.MetaFunctionName',
  FunctionName = 'Repository.FunctionName',
  // #endregion variable

  // #region regexp
  StringAsRegExp = 'Repository.StringAsRegExp',
  DoubleStringAsRegexp = 'Repository.DoubleStringAsRegexp',
  DoubleStringAsRegExpContent = 'Repository.DoubleStringAsRegExpContent',
  DoubleStringAsRegExpCommonContent = 'Repository.DoubleStringAsRegExpCommonContent',
  SingleStringAsRegexp = 'Repository.SingleStringAsRegexp',
  SingleStringAsRegExpContent = 'Repository.SingleStringAsRegExpContent',
  SingleStringAsRegExpCommonContent = 'Repository.SingleStringAsRegExpCommonContent',
  // #endregion regexp

  // #region misc
  Dereference = 'Repository.Dereference',
  InvalidDereference = 'Repository.InvalidDereference',
  CallExpression_FunctionDeclarationHead = 'Repository.CallExpression_FunctionDeclarationHead',
  MethodDeclarationHead = 'Repository.MethodDeclarationHead',
  NewCallExpression = 'Repository.NewCallExpression',
  // #endregion misc
  // #endregion expressions

  // #region operators
  Operator = 'Repository.Operator',
  Comma = 'Repository.Comma',
  Dot = 'Repository.Dot',
  // #endregion operators

  // #region keyword
  KeywordInExpression = 'Repository.KeywordInExpression',
  // #endregion keyword

  // #region misc
  UnquotedStringEscapeSequence = 'Repository.UnquotedStringEscapeSequence',
  FunctionExpressionBlock = 'Repository.FunctionExpressionBlock',

  // #region compiler directive
  BuiltInVariableInCompilerDirective = 'Repository.BuiltInVariableInCompilerDirective',
  UnquotedStringInCompilerDirective = 'Repository.UnquotedStringInCompilerDirective',
  ExpressionInCompilerDirective = 'Repository.ExpressionInCompilerDirective',
  DoubleStringInCompilerDirective = 'Repository.DoubleStringInCompilerDirective',
  DoubleStringContentInCompilerDirective = 'Repository.DoubleStringContentInCompilerDirective',
  DereferenceInCompilerDirective = 'Repository.DereferenceInCompilerDirective',
  UnquotedStringEscapeSequenceInCompilerDirective = 'Repository.UnquotedStringEscapeSequenceInCompilerDirective',
  // #endregion compiler directive
  // #endregion misc

  // #region v1 syntax
  Command = 'Repository.Command',
  CommonCommand = 'Repository.CommonCommand',
  CommandArgument = 'Repository.CommandArgument',
  CommandArgumentWithNumber = 'Repository.CommandArgumentWithNumber',
  CommandLastArgument = 'Repository.CommandLastArgument',
  CommandLastArgumentWithNumber = 'Repository.CommandLastArgumentWithNumber',
  CommandRestArguments = 'Repository.CommandRestArguments',
  MenuItemNameCommandArgument = 'Repository.MenuItemNameCommandArgument',
  CommandArgumentText = 'Repository.CommandArgumentText',
  CommandLastArgumentText = 'Repository.CommandLastArgumentText',
  CommandArgumentNumber = 'Repository.CommandArgumentNumber',
  CommandInvalidArgument = 'Repository.CommandInvalidArgument',
  CommandArgumentControlStyleText = 'Repository.CommandArgumentControlStyleText',
  CommandArgumentSendKeyName = 'Repository.CommandArgumentSendKeyName',
  // #endregion v1 syntax

  // #region legacy
  Legacy = 'Repository.Legacy',
  LegacyAssignmentDeclaration = 'Repository.LegacyAssignmentDeclaration',
  LegacyIfStatement = 'Repository.LegacyIfStatement',
  PercentExpression = 'Repository.PercentExpression',
  PercentExpressions = 'Repository.PercentExpressions',
  ContinuationSection = 'Repository.ContinuationSection',
  ContinuationSectionText = 'Repository.ContinuationSectionText',
  // #endregion legacy
}

// https://macromates.com/manual/en/language_grammars#naming_conventions
// https://github.com/microsoft/vscode/blob/main/extensions/theme-defaults/themes/dark_vs.json
// https://github.com/microsoft/vscode/blob/main/extensions/theme-defaults/themes/dark_plus.json
export const enum RuleName {
  // #region trivias
  SingleLineComment = 'comment.single-line',
  InLineComment = 'comment.in-line',
  MultiLineComment = 'comment.multi-line',
  DirectiveComment = 'comment.single-line.directive',
  DirectiveCommentName = 'meta.preprocessor.comment.directive',

  // #region document
  DocumentComment = 'comment.multi-line.document',
  DocumentTag = 'storage.type.class.document',
  KeywordInDocument = 'constant.language.document.keyword',
  ReservedWordInDocument = 'keyword.control.document.reserved-word',
  NamePathInDocument = 'support.class.document.name-path',
  TypeInDocument = 'support.class.document.type',
  FencedCodeBlock = 'markup.fenced_code.block',
  CodeFence = 'punctuation.definition',
  CodeBegin = 'comment.multi-line.document.code.begin',
  LanguageName = 'fenced_code.block.language',
  LanguageAttribute = 'fenced_code.block.language.attributes',
  EmbeddedLanguage = 'meta.embedded.block',
  NameOrUrlInDocument = 'variable.other.in-document',
  // #endregion document
  // #endregion trivias

  // #region statement
  ClassName = 'support.class.name',
  DirectiveName = 'meta.preprocessor.directive',
  LabelName = 'entity.name.label',
  HotkeyFlag = 'string.label.like.flag',
  HotkeyModifier = 'string.label.like.hotkey.modifier',
  HotkeyLabelName = 'string.label.like.hotkey.label',
  HotkeyCombinator = 'string.label.like.hotkey.combinator',
  HotstringOption = 'string.label.like.hotkey.option',
  HotstringLabelName = 'string.label.like.hotstring',
  Namespace = 'support.class.namespace',
  // #endregion statement

  // #region declaration
  Type = 'entity.name.type',
  Modifier = 'storage.modifier',
  BlockBegin = 'punctuation.definition.block.begin',
  ClassBlockBegin = 'punctuation.definition.class.block.begin',
  BlockEnd = 'punctuation.definition.block.end',
  ClassBlockEnd = 'punctuation.definition.class.block.end',
  // #endregion declaration

  // #region expressions
  // #region variable
  Variable = 'variable.other',
  ConstantLikeVariable = 'variable.other.constant.like',
  BuiltInVariable = 'support.variable',
  KeywordLikeBuiltInVariable = 'constant.language.varible',
  // #endregion variable
  // #region string
  ContinuationOption = 'continuation.option keyword.operator.quantifier.regexp',
  UnquotedString = 'token.string string.unquoted',
  UnquotedStringEscapeSequence = 'token.string string.escape.unquoted',
  DoubleString = 'token.string string.quoted.double',
  DoubleStringEscapeSequence = 'constant.character.escape.double',
  SingleStringEscapeSequence = 'constant.character.escape.single',
  SingleString = 'token.string string.quoted.single',
  MultiLineString = 'token.string string.quoted.unquoted',
  EscapeSequence = 'constant.character.escape',
  // #endregion string
  // #region number
  Integer = 'constant.numeric.integer',
  DecimalPart = 'constant.numeric.decimal.part',
  Float = 'constant.numeric.float',
  DecimalPoint = 'constant.numeric.decimal.point',
  Hex = 'constant.numeric.hex',
  HexPrefix = 'constant.numeric.hex.prefix',
  HexValue = 'constant.numeric.hex.value',
  ScientificNotation = 'constant.numeric.scientificnotation',
  ENotation = 'constant.numeric.e-notation',
  ExponentPlusMinusSign = 'constant.numeric.exponent.plus-minus.sign',
  Exponent = 'constant.numeric.exponent',
  // #endregion number
  // #region operators
  Operator = 'keyword.operator',
  Dot = 'keyword.operator.dot',
  Equals = 'keyword.operator.equals',
  Comma = 'keyword.operator.comma',
  // #endregion operators

  // #region regexp
  RegExpOption = 'string.regexp keyword.other.regexp.option',
  RegExpString = 'string.regexp',
  DoubleStringAsRegExp = 'string.regexp.double-quote',
  RegExpAnchor = 'keyword.control.anchor.regexp',
  RegExpOr = 'keyword.operator.or.regexp',
  RegExpGroup = 'punctuation.definition.group.regexp',
  RegExpCharacterClassSet = 'constant.other.character-class.set.regexp',
  RegExpCharacterClass = 'punctuation.definition.character-class.regexp',
  RegExpQuantifier = 'keyword.operator.quantifier.regexp',
  // #endregion regexp
  // #endregion expressions

  // #region keyword
  ImportExportAll = 'constant.language.import-export-all',
  MetaKeyword = 'keyword.control.meta',
  KeywordInExpression = 'keyword.control.in-expression',
  GetSetKeyword = 'storage.type.get-set',
  ByrefKeyword = 'keyword.control.byref',
  ClassKeyword = 'storage.type.class',
  ExtendsKeyword = 'storage.modifier.extends',
  // #endregion keyword

  // #region token
  FunctionName = 'support.function',
  MetaFunctionName = 'storage.type',
  ControlFlowKeyword = 'keyword.control.flow',
  SwitchLabelKeyword = 'keyword.control.switch-case-default',
  PercentExpressionBegin = 'meta.percent.expresion.begin',
  PercentBegin = 'meta.percent.begin',
  PercentEnd = 'meta.percent.end',
  OpenParen = 'meta.brace.round.begin',
  CloseParen = 'meta.brace.round.end',
  OpenBracket = 'meta.brace.square.begin',
  CloseBracket = 'meta.brace.square.end',
  OpenBrace = 'meta.brace.curly.begin',
  CloseBrace = 'meta.brace.curly.end',
  OpenAngleBracket = 'meta.brace.angle.begin',
  CloseAngleBracket = 'meta.brace.angle.end',
  Colon = 'punctuation.separator.colon',
  ColonColon = 'punctuation.separator.colon-colon',
  SemiColon = 'punctuation.separator.semi-colon',
  // #region tokens

  // #region legacy
  LegacyAssignment = 'expression.legacy.assignment',
  LegacyTextEscapeSequence = 'constant.character.escape.legacy.text',
  CommandName = 'support.function.command',
  JumpCommandName = 'keyword.control.jump',
  SubCommandName = 'support.function.subcommand',
  FlowSubCommandName = 'keyword.control.flow.subcommand',
  // #endregion legacy
}
export const enum RuleDescriptor {
  Begin = 'description.begin',
  End = 'description.end',
}
export const enum StyleName {
  Emphasis = 'emphasis',
  Strong = 'strong',
  Strikethrough = 'markup.strikethrough',
  Invalid = 'invalid.illegal',
  Escape = 'constant.character.escape',
  Underline = 'markup.underline',
}
export const enum TokenType {
  Comment = 'token.comment',
  Other = 'token.other',
  String = 'token.string',
}

export const enum CommandArgsType {
  None = 0,
  Expression,
  Enum,
  Legacy,
  SubCommand,
  Input,
  Output,

  Parameters, // e.g. `ControlClick x123 y123`, `Click, 100 100 LButton`
  ControlStyle,
}

export const enum HighlightType {
  None = 'none',
  Blank = 'blank',
  Expression = 'expression',
  ExpressionWithOneTrueBrace = 'expressionwithonetruebrace',
  UnquotedString = 'unquotedstring',
  UnquotedStringShouldEscapeComma = 'unquoted_string_should_escapecomma',
  UnquotedStringWithNumber = 'unquotedstring_with_number',
  NumberInCommandArgument = 'number_in_command_argument',
  // e.g. Send, {LButton 5}
  //            ^^^^^^^^^^^
  SendKeyName = 'send_key_name',
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
