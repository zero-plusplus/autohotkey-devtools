import { IncludeRule, Repository, RuleName, ScopeName, Utilities } from './types';

export function include(repositoryName: Repository): IncludeRule {
  return { include: `#${repositoryName}` };
}
export function name(scopeName: ScopeName, ...ruleNames: RuleName[]): string {
  return ruleNames.map((ruleName) => `${ruleName}.${scopeName}`).join(' ');
}
export function createUtilities(scopeName: ScopeName): Utilities {
  return {
    name: (...ruleNames: RuleName[]): string => name(scopeName, ...ruleNames),
    include: (repositoryName: Repository) => include(repositoryName),
  };
}
