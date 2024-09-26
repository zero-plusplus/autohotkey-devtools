import { IncludeRule, NameRule, Repository, RuleName, ScopeName, Utilities, VariableParts } from './types';

export function getVariableParts(scopeName: ScopeName): VariableParts {
  const letter = '[a-zA-Z]';
  const numberChar = '\\d';
  const nonAsciiChar = '[^[:ascii:]]';

  switch (scopeName) {
    // https://www.autohotkey.com/docs/v2/Concepts.htm#names
    case 'autohotkeynext':
    case 'autohotkey2': {
      const symbol = '[_]';
      const headChar = `${letter}|${nonAsciiChar}|${symbol}`;
      const tailChar = `${letter}|${nonAsciiChar}|${symbol}|${numberChar}`;
      return {
        headChar,
        tailChar,
      };
    }
    // https://www.autohotkey.com/docs/v1/Concepts.htm#names
    case 'autohotkeyl': {
      const symbol = '[_#@$]';
      const headChar = `${letter}|${nonAsciiChar}|${symbol}`;
      const tailChar = `${letter}|${nonAsciiChar}|${symbol}|${numberChar}`;
      return {
        headChar,
        tailChar,
      };
    }
  }
  throw Error(`Scope "${scopeName}" not found`);
}
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
    getVariableParts: () => getVariableParts(scopeName),
    name: (...ruleNames: RuleName[]): string => name(scopeName, ...ruleNames),
    nameRule: (...ruleNames: RuleName[]): NameRule => ({ name: name(scopeName, ...ruleNames) }),
    includeRule: (repositoryName: Repository) => includeRule(repositoryName),
    includeScope: (scopeName: ScopeName) => includeScope(scopeName),
  };
}
