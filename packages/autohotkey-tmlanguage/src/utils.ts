import { IncludeRule, NameRule, Repository, RuleName, ScopeName, Utilities } from './types';

export function includeRule(repositoryName: Repository): IncludeRule {
  return { include: `#${repositoryName}` };
}
export function includeScope(scopeName: ScopeName): IncludeRule {
  return { include: `source.${scopeName}` };
}
export function name(scopeName: ScopeName, ...ruleNames: RuleName[]): string {
  return ruleNames.map((ruleName) => `${ruleName}.${scopeName}`).join(' ');
}
export function nameRule(scopeName: ScopeName, ...ruleNames: RuleName[]): NameRule {
  return { name: name(scopeName, ...ruleNames) };
}
export function createUtilities(scopeName: ScopeName): Utilities {
  return {
    name: (...ruleNames: RuleName[]): string => name(scopeName, ...ruleNames),
    nameRule: (...ruleNames: RuleName[]): NameRule => ({ name: name(scopeName, ...ruleNames) }),
    includeRule: (repositoryName: Repository) => includeRule(repositoryName),
    includeScope: (scopeName: ScopeName) => includeScope(scopeName),
  };
}
