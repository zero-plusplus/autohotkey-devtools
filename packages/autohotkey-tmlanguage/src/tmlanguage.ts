import type { LiteralUnion } from 'type-fest';
import { Repository } from './constants';
import type {
  ElementName, IncludeRule, NameRule, PatternsRule, Rule, ScopeName,
} from './types';

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
