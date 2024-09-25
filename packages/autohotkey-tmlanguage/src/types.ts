// #region constant
export const scopeNames = [ 'autohotkey', 'autohotkeynext', 'autohotkeyl', 'autohotkey2' ] as const;
export const enum Repository {
  Self = '$self',

  Statement = 'statement',
  Literal = 'literal',

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

  // #region boolean
  Boolean = 'constant.language.boolean',
  True = 'constant.language.boolean.true',
  False = 'constant.language.boolean.false',
  // #endregion boolean
}

// https://macromates.com/manual/en/language_grammars#naming_conventions
// https://github.com/microsoft/vscode/blob/main/extensions/theme-defaults/themes/dark_vs.json
// https://github.com/microsoft/vscode/blob/main/extensions/theme-defaults/themes/dark_plus.json
export const enum RuleName {
  Emphasis = 'emphasis',

  Directive = 'meta.preprocessor',
  LegacyExpressionContent = 'string.legacy.content',

  CommentBlock = 'comment.block',

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

  // #region boolean
  Boolean = 'constant.language.boolean',
  True = 'constant.language.boolean.true',
  False = 'constant.language.boolean.false',
  // #endregion boolean
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

export interface Utilities {
  name: (...ruleNames: RuleName[]) => string;
  nameRule: (...ruleNames: RuleName[]) => NameRule;
  includeRule: (repositoryName: Repository) => IncludeRule;
  includeScope: (scopeName: ScopeName) => IncludeRule;
}
// #endregion types
