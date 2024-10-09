import { CommandArgsType, commandNames, Repository, RuleName, scopeNames } from './constants';

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

export type CommandArgWithKeywords = [ CommandArgsType, ...string[]];
export type CommandSignature = CommandArgsType | CommandArgWithKeywords;
export type CommandInfo =
  | [ typeof commandNames[number] ]
  | [ typeof commandNames[number], ...CommandSignature[] ]
  | [ typeof commandNames[number], string /* subcommand */, ...CommandSignature[] ];
export interface VariableParts {
  headChar: string;
  tailChar: string;
}
export interface EscapeSequencesInfo {
  doubleQuote: string[];
  singleQuote: string[];
  legacyText: string[];
}
export interface Utilities {
  getVariableParts: () => VariableParts;
  getEscapeSequencesInfo: () => EscapeSequencesInfo;
  getExpressionBegin: () => string;
  getOperators: () => string[];
  getStatementBegin: () => string;
  getContinuationBegin: () => string;
  getBuiltInVariableNames: () => string[];
  name: (...ruleNames: RuleName[]) => string;
  nameRule: (...ruleNames: RuleName[]) => NameRule;
  includeRule: (repositoryName: Repository) => IncludeRule;
  includeScope: (scopeName: ScopeName) => IncludeRule;
}
