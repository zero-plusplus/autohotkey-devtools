import type { commandNames } from './autohotkeyl/constants';
import {
  CommandArgsType, CommandParameterFlag, CommandSignatureFlag, HighlightType, Repository,
  RuleName, scopeNames, type CommandFlag, type RuleDescriptor, type StyleName, type TokenType,
} from './constants';

export type Repositories = { [key in Partial<Repository>[number]]: Rule | undefined };
export type Captures = Record<string | number, Rule | undefined>;

export type ScopeName = typeof scopeNames[number];
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
  begin?: string;
  beginCaptures?: Repositories;
  end?: string;
  endCaptures?: Repositories;
}
export interface BeginWhileRule extends RuleBase {
  begin?: string;
  beginCaptures?: Repositories;
  while?: string;
  whileCaptures?: Repositories;
}
export interface IncludeRule extends RuleBase {
  include: string;
}

export type CommandArgWithKeywords = [ CommandArgsType, ...string[]];
export type _CommandSignature = CommandArgsType | CommandArgWithKeywords;
export type CommandInfo =
  | [ typeof commandNames[number] ]
  | [ typeof commandNames[number], ..._CommandSignature[] ]
  | [ typeof commandNames[number], string /* subcommand */, ..._CommandSignature[] ];

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
