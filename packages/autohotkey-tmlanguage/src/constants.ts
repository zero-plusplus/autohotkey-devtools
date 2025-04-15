// #region constants
export const scopeNames = [ 'autohotkey', 'autohotkeynext', 'autohotkeyl', 'autohotkey2' ] as const;

// #region modifiers
export const commonModifiers = [ 'local', 'global', 'static' ] as const;
// #endregion modifiers

// #region operators
// https://www.autohotkey.com/docs/v2/Variables.htm#Operators
// https://www.autohotkey.com/docs/v1/Variables.htm#Operators
export const commonAssignmentOperators = [
  ':=',   // e.g. `a := 1`
  '+=',   // e.g. `a += 1`
  '-=',   // e.g. `a -= 1`
  '*=',   // e.g. `a *= 1`
  '/=',   // e.g. `a /= 1`
  '//=',  // e.g. `a //= 1`
  '.=',   // e.g. `a .= 1`
  '|=',   // e.g. `a |= 1`
  '&=',   // e.g. `a &= 1`
  '^=',   // e.g. `a ^= 1`
  '>>=',  // e.g. `a >>= 1`
  '<<=',  // e.g. `a <<= 1`
  '>>>=', // e.g. `a >>>= 1`
] as const;
export const commonExpressionOperatorsWithoutAssignment = [
  '+',    // e.g. `+1`, `1 + 1`
  '++',   // e.g. `++1`, `1++`
  '-',    // e.g. `-1`, `1 - 1`
  '--',   // e.g. `--1`, `1--`
  '*',    // e.g. `1 * 1`, `*expression`
  '**',   // e.g. `1 ** 1`
  '/',    // e.g. `1 / 1`
  '//',   // e.g. `1 // 1`
  '.',    // e.g. `1 . 1`, `obj.member`
  '~',    // e.g. `~1`
  '&',    // e.g. `&var`, `1 & 1`
  '|',    // e.g. `1 | 1`
  '^',    // e.g. `1 ^ 1`
  '<<',   // e.g. `1 << 1`
  '>>',   // e.g. `1 >> 1`
  '>>>',  // e.g. `1 >>> 1`
  '!',    // e.g. `!expression`
  '&&',   // e.g. `1 && 1`
  '||',   // e.g. `1 || 1`
  '>',    // e.g. `1 > 1`
  '>=',   // e.g. `1 >= 1`
  '<',    // e.g. `1 < 1`
  '<=',   // e.g. `1 <= 1`
  '=',    // e.g. `1 = 1`
  '==',   // e.g. `1 == 1`
  '?',    // e.g. `a ? b : c`, `a?.b`
  ':',    // e.g. `a ? b : c`
  '~=',   // e.g. value ~= "i)abc"
] as const;
export const commonExpressionKeywords = [
  'NOT',  // e.g. `not expression`
  'AND',  // e.g. `1 and 1`
  'OR',   // e.g. `1 or 1`
] as const;
// #endregion operators

// #region regexp
export const commonRegexpOptions = [ 'i', 'm', 's', 'x', 'A', 'D', 'J', 'U', 'X', 'S', 'C', '`a', '`n', '`r' ] as const;
export const commonRegexpEscapeSequences = [ '\\.', '\\*', '\\?', '\\+', '\\[', '\\{', '\\|', '\\(', '\\)', '\\^', '\\$', '\\\\' ] as const;
export const commonPcreUnicodeProperyCodes = [
  // https://www.autohotkey.com/docs/v1/misc/RegEx-QuickRef.htm#slashP
  // https://www.autohotkey.com/docs/v2/misc/RegEx-QuickRef.htm#slashP
  // https://www.pcre.org/pcre.txt
  'C',            // Other
  'Cc',           // Control
  'Cf',           // Format
  'Cn',           // Unassigned
  'Co',           // Private use
  'Cs',           // Surrogate
  'L',            // Letter
  'Ll',           // Lower case letter
  'Lm',           // Modifier letter
  'Lo',           // Other letter
  'Lt',           // Title case letter
  'Lu',           // Upper case letter
  'M',            // Mark
  'Mc',           // Spacing mark
  'Me',           // Enclosing mark
  'Mn',           // Non-spacing mark
  'N',            // Number
  'Nd',           // Decimal number
  'Nl',           // Letter number
  'No',           // Other number
  'P',            // Punctuation
  'Pc',           // Connector punctuation
  'Pd',           // Dash punctuation
  'Pe',           // Close punctuation
  'Pf',           // Final punctuation
  'Pi',           // Initial punctuation
  'Po',           // Other punctuation
  'Ps',           // Open punctuation
  'S',            // Symbol
  'Sc',           // Currency symbol
  'Sk',           // Modifier symbol
  'Sm',           // Mathematical symbol
  'So',           // Other symbol
  'Z',            // Separator
  'Zl',           // Line separator
  'Zp',           // Paragraph separator
  'Zs',           // Space separator
] as const;
export const commonPcreUnicodeProperyScripts = [
  'Common',

  'Arabic',
  'Armenian',
  'Avestan',
  'Balinese',
  'Bamum',
  'Bassa_Vah',
  'Batak',
  'Bengali',
  'Bopomofo',
  'Brahmi',
  'Braille',
  'Buginese',
  'Buhid',
  'Canadian_Aboriginal',
  'Car-ian',
  'Caucasian_Albanian',
  'Chakma',
  'Cham',
  'Cherokee',
  'Common',
  'Coptic',
  'Cunei-form',
  'Cypriot',
  'Cyrillic',
  'Deseret',
  'Devanagari',
  'Duployan',
  'Egyptian_Hiero-glyphs',
  'Elbasan',
  'Ethiopic',
  'Georgian',
  'Glagolitic',
  'Gothic',
  'Grantha',
  'Greek',
  'Gujarati',
  'Gurmukhi',
  'Han',
  'Hangul',
  'Hanunoo',
  'Hebrew',
  'Hiragana',
  'Im-perial_Aramaic',
  'Inherited',
  'Inscriptional_Pahlavi',
  'Inscrip-tional_Parthian',
  'Javanese',
  'Kaithi',
  'Kannada',
  'Katakana',
  'Kayah_Li',
  'Kharoshthi',
  'Khmer',
  'Khojki',
  'Khudawadi',
  'Lao',
  'Latin',
  'Lepcha',
  'Limbu',
  'Lin-ear_A',
  'Linear_B',
  'Lisu',
  'Lycian',
  'Lydian',
  'Mahajani',
  'Malayalam',
  'Mandaic',
  'Manichaean',
  'Meetei_Mayek',
  'Mende_Kikakui',
  'Meroitic_Cursive',
  'Meroitic_Hi-eroglyphs',
  'Miao',
  'Modi',
  'Mongolian',
  'Mro',
  'Myanmar',
  'Nabataean',
  'New_Tai_Lue',
  'Nko',
  'Ogham',
  'Ol_Chiki',
  'Old_Italic',
  'Old_North_Arabian',
  'Old_Permic',
  'Old_Persian',
  'Old_South_Arabian',
  'Old_Turkic',
  'Oriya',
  'Osmanya',
  'Pa-hawh_Hmong',
  'Palmyrene',
  'Pau_Cin_Hau',
  'Phags_Pa',
  'Phoenician',
  'Psalter_Pahlavi',
  'Rejang',
  'Runic',
  'Samaritan',
  'Saurashtra',
  'Sharada',
  'Sha-vian',
  'Siddham',
  'Sinhala',
  'Sora_Sompeng',
  'Sundanese',
  'Syloti_Nagri',
  'Syriac',
  'Tagalog',
  'Tagbanwa',
  'Tai_Le',
  'Tai_Tham',
  'Tai_Viet',
  'Takri',
  'Tamil',
  'Telugu',
  'Thaana',
  'Thai',
  'Tibetan',
  'Tifinagh',
  'Tirhuta',
  'Ugaritic',
  'Vai',
  'Warang_Citi',
  'Yi',
] as const;
// #endregion regexp
// #endregion constants

// #region enum
export const enum Repository {
  Self = '$self',
  Meta = 'repository.meta',

  // #region trivas
  Comment = 'repository.comment',
  MultiLineComments = 'repository.comments.multi-line',
  SingleLineComments = 'repository.comments.single-line',
  InLineComments = 'repository.comments.in-line',
  MultiLineComment = 'repository.comment.multi-line',
  SingleLineComment = 'repository.comment.single-line',
  InLineComment = 'repository.comment.in-line',

  // #region document
  MultiLineDocumentComment = 'repository.comment.document.multi-line',
  SingleLineDocumentComment = 'repository.comment.document.single-line',
  InlineDocumentComment = 'repository.comment.document.in-line',
  FencedCodeBlockInDocument = 'repository.comment.document.fenced_code',
  InlineTextInDocument = 'repository.comment.document.inline-text',
  TypeInDocument = 'repository.comment.document.type',
  // #endregion document
  // #endregion trivas

  // #region statements
  Statement = 'repository.statement',
  StatementCommon = 'repository.statement.common',
  Import = 'repository.statement.import',
  Export = 'repository.statement.export',
  ExpressionStatement = 'repository.statement.expression',
  IncludeStatement = 'repository.statement.include',
  RequiresStatement = 'repository.statement.requires',
  DirectiveStatement = 'repository.statement.directive',
  JumpStatement = 'repository.statement.jump',
  JumpToLabelStatement = 'repository.statement.jump.to-label',
  CommandStatement = 'repository.statement.command',
  LegacyStatement = 'repository.statement.legacy.expression',
  IfStatement = 'repository.statement.if-else',
  SwitchStatement = 'repository.statement.switch-case',
  WhileStatement = 'repository.statement.while',
  LoopStatement = 'repository.statement.loop',
  UntilStatement = 'repository.statement.until',
  ForStatement = 'repository.statement.for',
  TryStatement = 'repository.statement.try-catch-finally',
  ThrowStatement = 'repository.statement.throw',
  LabelStatement = 'repository.statement.label',
  HotkeyLabelStatement = 'repository.statement.hotkey',
  HotstringLabelStatement = 'repository.statement.hotstring',
  CallStatement = 'repository.statement.expression.call',
  BuiltInCallStatement = 'repository.statement.expression.call.builtin',
  UserDefinedCallStatement = 'repository.statement.expression.call.user-defined',
  // #endregion statements

  // #region declaration
  Block = 'repository.declaration.block',
  Modifier = 'repository.declaration.modifier',
  Declaration = 'repository.declaration',
  AssignmentDeclaration = 'repository.declaration.assignment',
  TypedAssignmentDeclaration = 'repository.declaration.assignment.typed',
  ClassDeclaration = 'repository.declaration.class',
  BlockInClassBody = 'repository.declaration.block.in-class-body',
  PropertyDeclaration = 'repository.declaration.property',
  // #endregion declaration


  // #region expressions
  Expression = 'repository.expression',
  ExpressionInBrackets = 'repository.expression.in-brackets',
  ExpressionInControlFlow = 'repository.expression.in-controlflow',
  Expressions = 'repository.expressions',
  ParenthesizedExpression = 'repository.expression.parenthesized',
  ShorthandRegexpMatch = 'repository.expression.regexp.shorthand',

  // #region literal
  Literal = 'repository.expression.literal',

  // #region string
  String = 'repository.expression.string',
  InvalidStringContent = 'repository.expression.string.content.invalid',
  DoubleString = 'repository.expression.string.double-quote',
  DoubleStringContent = 'repository.expression.string.double-quote.content',
  DoubleStringEscapeSequence = 'repository.expression.string.content.escape-sequence.double-quote',
  SingleString = 'repository.expression.string.single-quote',
  SingleStringContent = 'repository.expression.string.single-quote.content',
  SingleStringEscapeSequence = 'repository.expression.string.content.escape-sequence.single-quote',

  ContinuationStringOptions = 'repository.expression.continuation-string.options',
  ContinuationDoubleString = 'repository.expression.continuation-string.double-quote',
  ContinuationSingleString = 'repository.expression.continuation-string.single-quote',
  // #endregion string
  // #region number
  Number = 'repository.expression.number',
  Integer = 'repository.expression.number.integer',
  Float = 'repository.expression.number.float',
  InvalidFloat = 'repository.expression.number.float.invalid',
  Hex = 'repository.expression.number.hex',
  InvalidHex = 'repository.expression.number.hex.invalid',
  ScientificNotation = 'repository.expression.number.scientific-notation',
  InvalidScientificNotation = 'repository.expression.number.scientific-notation.invalid',
  // #endregion number

  // #region object
  Object = 'repository.expression.object',
  ObjectInBrackets = 'repository.expression.brackets.object',
  ObjectContent = 'repository.expression.object.content',
  ObjectKey = 'repository.expression.object.key',
  Array = 'repository.expression.array',
  // #endregion object
  // #endregion literal

  // #region variable
  Variable = 'repository.expression.variable',
  ConstantLikeVariable = 'repository.expression.variable.constant-like',
  UserDefinedVariable = 'repository.expression.variable.user-defined',
  BuiltInVariable = 'repository.expression.variable.built-in',
  BuiltInClass = 'repository.expression.class.built-in',
  KeywordLikeBuiltInVariable = 'repository.expression.variable.built-in.keyword-like',
  InvalidVariable = 'repository.expression.variable.invalid',

  MetaPropertyName = 'repository.expression.variable.meta-property',
  MetaFunctionName = 'repository.expression.variable.meta-function',
  FunctionName = 'repository.expression.variable.function',
  // #endregion variable

  // #region regexp
  StringAsRegExp = 'repository.regexp',
  DoubleStringAsRegexp = 'repository.regexp.double-quote',
  DoubleStringAsRegExpContent = 'repository.regexp.double-quote.content',
  DoubleStringAsRegExpCommonContent = 'repository.regexp.double-quote.common',
  SingleStringAsRegexp = 'repository.regexp.single-quote',
  SingleStringAsRegExpContent = 'repository.regexp.single-quote.content',
  SingleStringAsRegExpCommonContent = 'repository.regexp.single-quote.common',
  // #endregion regexp

  // #region misc
  Dereference = 'repository.expression.dereference',
  InvalidDereference = 'repository.expression.dereference.invalid',
  CallExpression_FunctionDeclarationHead = 'repository.expression.call repository.declaration.function.head',
  MethodDeclarationHead = 'repository.expression.call repository.declaration.method.head',
  NewCallExpression = 'repository.expression.call.new',
  // #endregion misc
  // #endregion expressions

  // #region operators
  Operator = 'repository.operator.without-comma',
  Comma = 'repository.operator.comma',
  Dot = 'repository.operator.dot',
  // #endregion operators

  // #region keyword
  KeywordInExpression = 'repository.keyword.expression',
  // #endregion keyword

  // #region misc
  UnquotedStringEscapeSequence = 'repository.string.unquoted.escaped',
  FunctionExpressionBlock = 'repository.expression.function',
  // #endregion misc

  // #region v1 syntax
  Command = 'repository.command',
  CommonCommand = 'repository.common-command',
  CommandArgument = 'repository.command.argument',
  MenuItemNameCommandArgument = 'repository.command.argument.menu-item-name',
  CommandLastArgument = 'repository.command.argument.last',
  CommandArgumentText = 'repository.command.argument.text',
  CommandLastArgumentText = 'repository.command.argument.last.text',
  CommandArgumentControlStyleText = 'repository.command.argument.text.control-style',
  // #endregion v1 syntax

  // #region legacy
  Legacy = 'repository.legacy',
  LegacyAssignmentDeclaration = 'repository.legacy.declaration.assignment',
  LegacyIfStatement = 'repository.legacy.statement.if',
  PercentExpression = 'repository.legacy.expression.percent',
  PercentExpressions = 'repository.legacy.expressions.percent',
  ContinuationSection = 'repository.legacy.continuation-section',
  ContinuationSectionText = 'repository.legacy.continuation-section.text',
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
  HotkeyLabelName = 'string.label.like.hotkey',
  HotstringOption = 'string.label.like.hotkey.option',
  HotstringLabelName = 'string.label.like.hotstring',
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
