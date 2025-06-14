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
  Meta = 'Repository.Meta',

  // #region trivas
  Comment = 'Repository.Comment',
  AllMultiLineComments = 'Repository.AllMultiLineComments',
  AllSingleLineComments = 'Repository.AllSingleLineComments',
  AllInLineComments = 'Repository.AllInLineComments',

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
  // #region compiler directive
  BuiltInVariableInCompilerDirective = 'Repository.BuiltInVariableInCompilerDirective',
  UnquotedStringInCompilerDirective = 'Repository.UnquotedStringInCompilerDirective',
  ExpressionInCompilerDirective = 'Repository.ExpressionInCompilerDirective',
  DoubleStringInCompilerDirective = 'Repository.DoubleStringInCompilerDirective',
  DoubleStringContentInCompilerDirective = 'Repository.DoubleStringContentInCompilerDirective',
  DereferenceInCompilerDirective = 'Repository.DereferenceInCompilerDirective',
  UnquotedStringEscapeSequenceInCompilerDirective = 'Repository.UnquotedStringEscapeSequenceInCompilerDirective',
  // #endregion compiler directive
  // #endregion trivas
  // #region statements
  Statement = 'Repository.Statement',
  StatementInClassBlock = 'Repository.StatementInClassBlock',
  Import = 'Repository.Import',
  Export = 'Repository.Export',
  ExpressionStatement = 'Repository.ExpressionStatement',
  IncludeStatement = 'Repository.IncludeStatement',
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
  // #region name
  Variable = 'Repository.Variable',
  ConstantLikeVariable = 'Repository.ConstantLikeVariable',
  UserDefinedVariable = 'Repository.UserDefinedVariable',
  BuiltInVariable = 'Repository.BuiltInVariable',
  BuiltInClass = 'Repository.BuiltInClass',
  KeywordLikeBuiltInVariable = 'Repository.KeywordLikeBuiltInVariable',

  MetaPropertyName = 'Repository.MetaPropertyName',
  MetaFunctionName = 'Repository.MetaFunctionName',
  FunctionName = 'Repository.FunctionName',
  LabelName = 'Repository.LabelName',
  // #endregion name
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
  PercentExpressionInLastArgument = 'Repository.PercentExpressionInLastArgument',
  ContinuationSection = 'Repository.ContinuationSection',
  ContinuationSectionText = 'Repository.ContinuationSectionText',
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

  // #region misc
  Unknown = 'unknown',
  IncludeLibrary = 'string.include.library',
  // #endregion misc
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
