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
  '%',    // e.g. `%var%`, `a%b%c`
  '!',    // e.g. `!expression`
  'NOT',  // e.g. `not expression`
  '&&',   // e.g. `1 && 1`
  'AND',  // e.g. `1 and 1`
  '||',   // e.g. `1 || 1`
  'OR',   // e.g. `1 or 1`
  '>',    // e.g. `1 > 1`
  '>=',   // e.g. `1 >= 1`
  '<',    // e.g. `1 < 1`
  '<=',   // e.g. `1 <= 1`
  '=',    // e.g. `1 = 1`
  '==',   // e.g. `1 == 1`
  '?',    // e.g. `a ? b : c`, `a?.b`
  ':',    // e.g. `a ? b : c`
] as const;
// #endregion operators
// #endregion constants

// #region enum
export const enum Repository {
  Self = '$self',

  // #region trivas
  Comment = 'repository.comment',
  SingleLineComment = 'repository.comment.single-line',
  InLineComment = 'repository.comment.in-line',
  MultiLineComment = 'repository.comment.multi-line',
  // #endregion trivas

  // #region statements
  Statement = 'repository.statement',
  ExpressionStatement = 'repository.statement.expression',
  IncludeStatement = 'repository.statement.include',
  DirectiveStatement = 'repository.statement.directive',
  JumpStatement = 'repository.statement.jump',
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
  // #endregion statements

  // #region declaration
  Block = 'repository.declaration.block',
  Modifier = 'repository.declaration.modifier',
  Declaration = 'repository.declaration',
  AssignmentDeclaration = 'repository.declaration.assignment',
  ClassDeclaration = 'repository.declaration.class',
  PropertyDeclaration = 'repository.declaration.property',
  // #endregion declaration


  // #region expressions
  Expression = 'repository.expression',
  Expressions = 'repository.expressions',
  ParenthesizedExpression = 'repository.expression.parenthesized',

  // #region literal
  Literal = 'repository.expression.literal',

  // #region string
  String = 'repository.expression.string',
  InvalidStringContent = 'repository.expression.string.content.invalid',
  DoubleString = 'repository.expression.string.double-quote',
  DoubleStringContent = 'repository.expression.string.double-quote.content',
  DoubleStringEscapeSequence = 'repository.expression.string.content.escape-sequence.double-quote',
  SingleString = 'repository.expression.string.single-quote',
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
  Array = 'repository.expression.array',
  // #endregion object
  // #endregion literal

  // #region variable
  Variable = 'repository.expression.variable',
  BuiltInVariable = 'repository.expression.variable.built-in',
  KeywordLikeBuiltInVariable = 'repository.expression.variable.built-in.keyword-like',
  InvalidVariable = 'repository.expression.variable.invalid',
  // #endregion variable

  // #region misc
  Dereference = 'repository.expression.dereference',
  InvalidDereference = 'repository.expression.dereference.invalid',
  CallExpression_FunctionDeclarationHead = 'repository.expression.call repository.declaration.function-method.head',
  // #endregion misc
  // #endregion expressions

  // #region operators
  Operator = 'repository.operator.without-comma',
  Comma = 'repository.operator.comma',
  // #endregion operators

  // #region keyword
  KeywordInExpression = 'repository.keyword.expression',
  // #endregion keyword

  // #region v1 syntax
  Command = 'repository.command',
  CommonCommand = 'repository.common-command',
  CommandArgument = 'repository.command.argument',
  CommandLastArgument = 'repository.command.argument.last',
  CommandArgumentText = 'repository.command.argument.text',
  CommandLastArgumentText = 'repository.command.argument.last.text',
  CommandArgumentControlStyleText = 'repository.command.argument.text.control-style',
  // #endregion v1 syntax

  // #region legacy
  Legacy = 'repository.legacy',
  LegacyAssignment = 'repository.legacy.expression.assignment',
  PercentExpression = 'repository.legacy.expression.percent',
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
  Modifier = 'storage.modifier',
  BlockBegin = 'punctuation.definition.block.begin',
  ClassBlockBegin = 'punctuation.definition.class.block.begin',
  BlockEnd = 'punctuation.definition.block.end',
  ClassBlockEnd = 'punctuation.definition.class.block.end',
  // #endregion declaration

  // #region expressions
  // #region variable
  Variable = 'variable.other',
  BuiltInVariable = 'support.variable',
  KeywordLikeBuiltInVariable = 'constant.language.varible',
  // #endregion variable
  // #region string
  ContinuationOption = 'continuation.option keyword.operator.quantifier.regexp',
  UnquotedString = 'string.unquoted',
  DoubleString = 'string.quoted.double',
  DoubleStringEscapeSequence = 'constant.character.escape.double',
  SingleStringEscapeSequence = 'constant.character.escape.single',
  SingleString = 'string.quoted.single',
  MultiLineString = 'string.quoted.unquoted',
  StringBegin = 'punctuation.definition.string.begin',
  StringEnd = 'punctuation.definition.string.end',
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
  Comma = 'punctuation.separator.comma',
  // #endregion operators
  // #endregion expressions

  // #region keyword
  KeywordInExpression = 'keyword.control.in-expression',
  GetSetKeyword = 'storage.type.get-set',
  ByrefKeyword = 'keyword.control.byref',
  ClassKeyword = 'storage.type.class',
  ExtendsKeyword = 'storage.modifier.extends',
  // #endregion keyword

  // #region token
  FunctionName = 'support.function',
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
  // #endregion legacy
}
export const enum StyleName {
  Emphasis = 'emphasis',
  Strong = 'strong',
  Strikethrough = 'markup.strikethrough',
  Invalid = 'invalid.illegal',
  Escape = 'constant.character.escape',
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
  None = 0,
  Blank,
  Expression,
  ExpressionWithOneTrueBrace,
  Enum,
  UnquotedString,
  UnquotedStringShouldEscapeComma,
  LabelName,
  SubCommand,
  GuiSubCommand,
  Input,
  Output,

  Options, // e.g. `ControlClick x123 y123`, `Click, 100 100 LButton`
  CombiOptions, // e.g. `FileSetAttributes, +HA-R`
  GuiOptions, // e.g. `Gui, +Resize -MaximizeBox`
  Style, // e.g. `Control, Style, ^0x800000`, `WinSet, Style, -0xC00000`
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
