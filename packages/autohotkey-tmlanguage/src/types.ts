import type { commandNames } from './autohotkeyl/constants';
import { CommandArgsType, CommandParameterFlag, CommandSignatureFlag, HighlightType, Repository, RuleName, scopeNames, type CommandFlag } from './constants';

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
export type _CommandSignature = CommandArgsType | CommandArgWithKeywords;
export type CommandInfo =
  | [ typeof commandNames[number] ]
  | [ typeof commandNames[number], ..._CommandSignature[] ]
  | [ typeof commandNames[number], string /* subcommand */, ..._CommandSignature[] ];
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
  name: (...ruleNames: Array<Repository | RuleName>) => string;
  nameRule: (...ruleNames: Array<Repository | RuleName>) => NameRule;
  includeRule: (repositoryName: Repository) => IncludeRule;
  includeScope: (scopeName: ScopeName) => IncludeRule;
}

export interface CommandParameter {
  readonly type: HighlightType;
  readonly flags: CommandParameterFlag;
  readonly values?: string[];
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
