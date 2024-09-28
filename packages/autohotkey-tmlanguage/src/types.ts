// #region constant
export const scopeNames = [ 'autohotkey', 'autohotkeynext', 'autohotkeyl', 'autohotkey2' ] as const;
export const enum Repository {
  Self = '$self',

  Statement = 'statement',
  ExpressionStatement = 'statement.expression',
  Literal = 'literal',

  // #region expression
  Expression = 'expression',
  // #endregion expression

  // #region variable
  Variable = 'expression.variable',
  BuiltInVariable = 'expression.variable.built-in',
  InvalidVariable = 'invalid.illegal.variable',
  // #endregion variable

  // #region access
  Dereference = 'expression.dereference',
  InvalidDereference = 'invalid.illegal.dereference',
  // #endregion access

  // #region string
  String = 'string',
  InvalidStringContent = 'invalid.illegal.content',
  InvalidStringNewLine = 'invalid.illegal.newline',
  DoubleString = 'string.quoted.double',
  DoubleStringContent = 'string.quoted.double.content',
  DoubleStringEscapeSequence = 'constant.character.escape.double',
  SingleString = 'string.quoted.single',
  SingleStringEscapeSequence = 'constant.character.escape.single',
  // #endregion string

  // #region number
  Number = 'number',
  Integer = 'constant.numeric.integer',
  Float = 'constant.numeric.float',
  InvalidFloat = 'invalid.illegal.float',
  Hex = 'constant.numeric.hex',
  InvalidHex = 'invalid.illegal.hex',
  ScientificNotation = 'constant.numeric.scientificnotation',
  InvalidScientificNotation = 'invalid.illegal.scientificnotation',
  // #endregion number
}

// https://macromates.com/manual/en/language_grammars#naming_conventions
// https://github.com/microsoft/vscode/blob/main/extensions/theme-defaults/themes/dark_vs.json
// https://github.com/microsoft/vscode/blob/main/extensions/theme-defaults/themes/dark_plus.json
export const enum RuleName {
  Emphasis = 'emphasis',

  Directive = 'meta.preprocessor',
  LegacyExpressionContent = 'string.legacy.content',

  CommentBlock = 'comment.block',

  // #region variable
  Variable = 'variable.other',
  InvalidVariable = 'invalid.illegal.variable',
  BuiltInVariable = 'support.variable',
  // #endregion variable

  // #region access
  Dereference = 'expression.dereference',
  DereferencePercentBegin = 'punctuation.definition.dereference.begin',
  DereferencePercentEnd = 'punctuation.definition.dereference.end',
  InvalidDereference = 'invalid.illegal.dereference',
  InvalidDereferencePercent = 'invalid.illegal.dereference.percent',
  // #endregion access

  // #region string
  DoubleString = 'string.quoted.double',
  InvalidSingleLineStringContent = 'invalid.illegal.content',
  InvalidStringNewLine = 'invalid.illegal.newline',
  DoubleStringEscapeSequence = 'constant.character.escape.double',
  SingleStringEscapeSequence = 'constant.character.escape.single',
  SingleString = 'string.quoted.single',
  MultiLineString = 'string.quoted.unquoted',
  StringBegin = 'punctuation.definition.string.begin',
  StringEnd = 'punctuation.definition.string.end',
  // #endregion string

  // #region number
  InvalidNumber = 'invalid.illegal.number',
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
}

export const enum CommandArgsType {
  None,
  Expression,
  Legacy,
  SubCommand,
  Input,
  Output,

  // https://www.autohotkey.com/docs/v1/lib/Control.htm#Style
  ControlStyle, // 0x123 ^0x123
}
// #endregion constant

// #region types
export type Repositories = { [key in Partial<Repository>[number]]: Rule | undefined };
export type Captures = Record<string | number, Rule | undefined>;

export type ScopeName = typeof scopeNames[number];
export interface TmLanguage {
  scopeName: string;
  injectionSelector?: string;
  patterns: Rule[];
  repository: Repositories;
}

// https://macromates.com/manual/en/language_grammars#rule_keys
export type Rule = NameRule | PatternsRule | MatchRule | BeginEndRule | BeginWhileRule | IncludeRule;
export interface RuleBase {
  name?: string;
  comment?: string;
  disabled?: 1;
  patterns?: Rule[];
}
export interface NameRule extends RuleBase {
  name: string;
}
export interface PatternsRule extends RuleBase {
  patterns: Rule[];
}
export interface MatchRule extends RuleBase {
  match: string;
  captures?: Repositories;
}
export interface BeginEndRule extends RuleBase {
  begin?: string;
  beginCaptures?: Repositories;
  contentName?: string;
  end?: string;
  endCaptures?: Repositories;
}
export interface BeginWhileRule extends RuleBase {
  begin?: string;
  beginCaptures?: Repositories;
  contentName?: string;
  while?: string;
  whileCaptures?: Repositories;
}
export interface IncludeRule {
  include: string;
}

export type CommandArgWithKeywords = [ CommandArgsType.Legacy, ...string[]];
export type CommandSignatures = Array<CommandArgsType | CommandArgWithKeywords>;
export type SubCommandSignatures = Array<[ string, ...CommandArgsType[]]>;
export type CommandInfo =
  | [ string /* command name */ ]
  | [ string, /* command name */ SubCommandSignatures | CommandSignatures ];
export interface VariableParts {
  headChar: string;
  tailChar: string;
}
export interface EscapeSequencesInfo {
  doubleQuote: string[];
  singleQuote: string[];
}
export interface Utilities {
  getVariableParts: () => VariableParts;
  getEscapeSequencesInfo: () => EscapeSequencesInfo;
  getBuiltInVariableNames: () => string[];
  name: (...ruleNames: RuleName[]) => string;
  nameRule: (...ruleNames: RuleName[]) => NameRule;
  includeRule: (repositoryName: Repository) => IncludeRule;
  includeScope: (scopeName: ScopeName) => IncludeRule;
}
// #endregion types
