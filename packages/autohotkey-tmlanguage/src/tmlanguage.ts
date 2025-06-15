import type { LiteralUnion } from 'type-fest';
import type { scopeNames } from './definition';

// #region rule combinators
export function includeRule(repositoryName: Repository): IncludeRule {
  return { include: `#${repositoryName}` };
}
export function includeScope(scopeName: ScopeName): IncludeRule {
  return { include: `source.${scopeName}` };
}
export function name(scopeName: LiteralUnion<ScopeName, string>, ...ruleNames: ElementName[]): ElementName {
  return ruleNames.map((ruleName) => `${ruleName}.${scopeName}`).join(' ') as ElementName;
}
export function nameRule(scopeName: LiteralUnion<ScopeName, string>, ...ruleNames: ElementName[]): NameRule {
  return { name: name(scopeName, ...ruleNames) };
}
export function patternsRule(...rules: Rule[]): PatternsRule {
  return { patterns: rules };
}
export function namedPatternsRule(name: ElementName, rules: Rule[]): PatternsRule {
  return { name, patterns: rules };
}
// #endregion rule combinators

// #region enum
export const enum Repository {
  Self = '$self',
  Meta = '$.Meta',

  // #region trivas
  Comment = '$.Comment',
  AllMultiLineComments = '$.AllMultiLineComments',
  AllSingleLineComments = '$.AllSingleLineComments',
  AllInLineComments = '$.AllInLineComments',

  MultiLineComment = '$.MultiLineComment',
  SingleLineComment = '$.SingleLineComment',
  CompilerDirectiveComment = '$.CompilerDirectiveComment',
  InLineComment = '$.InLineComment',

  // #region document
  MultiLineDocumentComment = '$.MultiLineDocumentComment',
  SingleLineDocumentComment = '$.SingleLineDocumentComment',
  InlineDocumentComment = '$.InlineDocumentComment',
  FencedCodeBlockInDocument = '$.FencedCodeBlockInDocument',
  InlineTextInDocument = '$.InlineTextInDocument',
  TypeInDocument = '$.TypeInDocument',
  // #endregion document
  // #region compiler directive
  BuiltInVariableInCompilerDirective = '$.BuiltInVariableInCompilerDirective',
  UnquotedStringInCompilerDirective = '$.UnquotedStringInCompilerDirective',
  ExpressionInCompilerDirective = '$.ExpressionInCompilerDirective',
  DoubleStringInCompilerDirective = '$.DoubleStringInCompilerDirective',
  DoubleStringContentInCompilerDirective = '$.DoubleStringContentInCompilerDirective',
  DereferenceInCompilerDirective = '$.DereferenceInCompilerDirective',
  UnquotedStringEscapeSequenceInCompilerDirective = '$.UnquotedStringEscapeSequenceInCompilerDirective',
  // #endregion compiler directive
  // #endregion trivas
  // #region statements
  Statement = '$.Statement',
  StatementInClassBlock = '$.StatementInClassBlock',
  Import = '$.Import',
  Export = '$.Export',
  ExpressionStatement = '$.ExpressionStatement',
  IncludeStatement = '$.IncludeStatement',
  DirectiveStatement = '$.DirectiveStatement',
  JumpStatement = '$.JumpStatement',
  JumpToLabelStatement = '$.JumpToLabelStatement',
  CommandStatement = '$.CommandStatement',
  LegacyStatement = '$.LegacyStatement',
  IfStatement = '$.IfStatement',
  SwitchStatement = '$.SwitchStatement',
  WhileStatement = '$.WhileStatement',
  LoopStatement = '$.LoopStatement',
  UntilStatement = '$.UntilStatement',
  ForStatement = '$.ForStatement',
  TryStatement = '$.TryStatement',
  ThrowStatement = '$.ThrowStatement',
  LabelStatement = '$.LabelStatement',
  HotkeyLabelStatement = '$.HotkeyLabelStatement',
  HotstringLabelStatement = '$.HotstringLabelStatement',
  CallStatement = '$.CallStatement',
  BuiltInCallStatement = '$.BuiltInCallStatement',
  UserDefinedCallStatement = '$.UserDefinedCallStatement',
  // #endregion statements
  // #region declaration
  Block = '$.Block',
  Modifier = '$.Modifier',
  Declaration = '$.Declaration',
  AssignmentDeclaration = '$.AssignmentDeclaration',
  TypedAssignmentDeclaration = '$.TypedAssignmentDeclaration',
  ClassDeclaration = '$.ClassDeclaration',
  BlockInClassBody = '$.BlockInClassBody',
  PropertyDeclaration = '$.PropertyDeclaration',
  // #endregion declaration
  // #region expressions
  Expression = '$.Expression',
  ExpressionInBrackets = '$.ExpressionInBrackets',
  ExpressionInControlFlow = '$.ExpressionInControlFlow',
  ParenthesizedExpression = '$.ParenthesizedExpression',
  ShorthandRegexpMatch = '$.ShorthandRegexpMatch',

  // #region literal
  Literal = '$.Literal',

  // #region string
  String = '$.String',
  InvalidStringContent = '$.InvalidStringContent',
  DoubleString = '$.DoubleString',
  DoubleStringEscapeSequence = '$.DoubleStringEscapeSequence',
  SingleString = '$.SingleString',
  SingleStringEscapeSequence = '$.SingleStringEscapeSequence',

  ContinuationStringOptions = '$.ContinuationStringOptions',
  ContinuationDoubleString = '$.ContinuationDoubleString',
  ContinuationSingleString = '$.ContinuationSingleString',
  // #endregion string
  // #region number
  Number = '$.Number',
  Integer = '$.Integer',
  Float = '$.Float',
  InvalidFloat = '$.InvalidFloat',
  Hex = '$.Hex',
  InvalidHex = '$.InvalidHex',
  ScientificNotation = '$.ScientificNotation',
  InvalidScientificNotation = '$.InvalidScientificNotation',
  // #endregion number
  // #region object
  Object = '$.Object',
  ObjectInBrackets = '$.ObjectInBrackets',
  ObjectContent = '$.ObjectContent',
  ObjectKey = '$.ObjectKey',
  Array = '$.Array',
  // #endregion object
  // #endregion literal
  // #region name
  Variable = '$.Variable',
  ConstantLikeVariable = '$.ConstantLikeVariable',
  UserDefinedVariable = '$.UserDefinedVariable',
  BuiltInVariable = '$.BuiltInVariable',
  BuiltInClass = '$.BuiltInClass',
  KeywordLikeBuiltInVariable = '$.KeywordLikeBuiltInVariable',

  MetaPropertyName = '$.MetaPropertyName',
  MetaFunctionName = '$.MetaFunctionName',
  FunctionName = '$.FunctionName',
  LabelName = '$.LabelName',
  // #endregion name
  // #region regexp
  StringAsRegExp = '$.StringAsRegExp',
  DoubleStringAsRegexp = '$.DoubleStringAsRegexp',
  DoubleStringAsRegExpContent = '$.DoubleStringAsRegExpContent',
  DoubleStringAsRegExpCommonContent = '$.DoubleStringAsRegExpCommonContent',
  SingleStringAsRegexp = '$.SingleStringAsRegexp',
  SingleStringAsRegExpContent = '$.SingleStringAsRegExpContent',
  SingleStringAsRegExpCommonContent = '$.SingleStringAsRegExpCommonContent',
  // #endregion regexp
  // #region misc
  Dereference = '$.Dereference',
  InvalidDereference = '$.InvalidDereference',
  CallExpression_FunctionDeclarationHead = '$.CallExpression_FunctionDeclarationHead',
  MethodDeclarationHead = '$.MethodDeclarationHead',
  NewCallExpression = '$.NewCallExpression',
  // #endregion misc
  // #endregion expressions
  // #region operators
  Operator = '$.Operator',
  Comma = '$.Comma',
  Dot = '$.Dot',
  // #endregion operators
  // #region keyword
  KeywordInExpression = '$.KeywordInExpression',
  // #endregion keyword
  // #region misc
  UnquotedStringEscapeSequence = '$.UnquotedStringEscapeSequence',
  FunctionExpressionBlock = '$.FunctionExpressionBlock',
  // #endregion misc
  // #region v1 syntax
  Command = '$.Command',
  CommonCommand = '$.CommonCommand',
  CommandArgument = '$.CommandArgument',
  CommandArgumentWithNumber = '$.CommandArgumentWithNumber',
  CommandLastArgument = '$.CommandLastArgument',
  CommandLastArgumentWithNumber = '$.CommandLastArgumentWithNumber',
  CommandRestArguments = '$.CommandRestArguments',
  MenuItemNameCommandArgument = '$.MenuItemNameCommandArgument',
  CommandArgumentText = '$.CommandArgumentText',
  CommandLastArgumentText = '$.CommandLastArgumentText',
  CommandArgumentNumber = '$.CommandArgumentNumber',
  CommandInvalidArgument = '$.CommandInvalidArgument',
  CommandArgumentControlStyleText = '$.CommandArgumentControlStyleText',
  CommandArgumentSendKeyName = '$.CommandArgumentSendKeyName',
  CommandArgumentBooleanLike = '$.CommandArgumentBooleanLike',
  // #endregion v1 syntax
  // #region legacy
  Legacy = '$.Legacy',
  LegacyAssignmentDeclaration = '$.LegacyAssignmentDeclaration',
  LegacyIfStatement = '$.LegacyIfStatement',
  PercentExpression = '$.PercentExpression',
  PercentExpressionInLastArgument = '$.PercentExpressionInLastArgument',
  ContinuationSection = '$.ContinuationSection',
  ContinuationSectionText = '$.ContinuationSectionText',
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
  HotkeyFlag = 'string.label.hotkey.flag',
  HotkeyModifier = 'string.label.hotkey.modifier',
  HotkeyLabelName = 'string.label.hotkey.name',
  HotkeyCombinator = 'string.label.hotkey.combinator',
  HotstringOption = 'string.label.hotkey.option',
  HotstringLabelName = 'string.label.hotstring',
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
  ContinuationOption = 'keyword.operator.quantifier.continuation-option',
  UnquotedString = 'string.unquoted',
  UnquotedStringEscapeSequence = 'string.escape.unquoted',
  DoubleString = 'string.quoted.double',
  DoubleStringEscapeSequence = 'constant.character.escape.double',
  SingleStringEscapeSequence = 'constant.character.escape.single',
  SingleString = 'string.quoted.single',
  MultiLineString = 'string.quoted.unquoted',
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
  RegExpOption = 'keyword.other.regexp.option',
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

  // #region name
  JumpCommandName = 'keyword.control.jump',
  SubCommandName = 'support.function.subcommand',
  FlowSubCommandName = 'keyword.control.flow.subcommand',
  // #endregion name

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

  // #region command / directive / legacy
  LegacyAssignment = 'expression.legacy.assignment',
  LegacyTextEscapeSequence = 'constant.character.escape.legacy.text',
  CommandName = 'support.function.command',
  IncludeLibrary = 'string.include.library',
  // #endregion command / directive / legacy
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
// #endregion enum

// #region type
export type Repositories = {
  [key in Partial<Repository>[number]]: Rule | undefined;
};
export type ScopeName = (typeof scopeNames)[number];
export type ElementName = Repository | RuleName | RuleDescriptor | StyleName | TokenType;
export interface TmLanguage {
  scopeName: string;
  injectionSelector?: string;
  patterns: Rule[];
  repository: Repositories;
}

// https://macromates.com/manual/en/language_grammars#rule_keys
export type Rule = NameRule | PatternsRule | MatchRule | BeginEndRule | BeginWhileRule | IncludeRule;
export interface RuleBase {
  name?: ElementName;
  contentName?: ElementName;
  comment?: string;
  disabled?: 1;
  patterns?: Rule[];
}
export interface NameRule extends RuleBase {
  name: ElementName;
}
export interface PatternsRule extends RuleBase {
  patterns: Rule[];
}
export interface MatchRule extends RuleBase {
  match: string;
  captures?: Repositories;
}
export interface BeginEndRule extends RuleBase {
  begin: string;
  beginCaptures?: Repositories;
  end: string;
  endCaptures?: Repositories;
}
export interface BeginWhileRule extends RuleBase {
  begin: string;
  beginCaptures?: Repositories;
  while: string;
  whileCaptures?: Repositories;
}
export interface IncludeRule extends RuleBase {
  include: string;
}
// #endregion type
