import type { LiteralUnion } from 'type-fest';
import * as constants_v2 from './autohotkey2/constants';
import * as constants_v1 from './autohotkeyl/constants';
import { Repository } from './constants';
import {
  alt, char, group, inlineSpaces0, lookbehind, opt, seq, startAnchor, textalt,
} from './oniguruma';
import type {
  ElementName, IncludeRule, NameRule, PatternsRule, Rule, ScopeName, Utilities,
} from './types';

export function getStatementBegin(scopeName: ScopeName): string {
  switch (scopeName) {
    case 'autohotkeynext':
    case 'autohotkey2':
    case 'autohotkeyl': return lookbehind(alt(
      seq(startAnchor(), inlineSpaces0()),
      seq(char(':'), inlineSpaces0()),
    ));
  }
  throw Error(`Scope "${scopeName}" not found`);
}
export function getOperators(scopeName: ScopeName): readonly string[] {
  switch (scopeName) {
    case 'autohotkeynext':
    case 'autohotkey2': {
      return constants_v2.expressionOperators;
    }
    case 'autohotkeyl': {
      return constants_v1.expressionOperators;
    }
  }
  throw Error(`Scope "${scopeName}" not found`);
}
export function getContinuationBegin(scopeName: ScopeName): string {
  // https://www.autohotkey.com/docs/v2/Scripts.htm#continuation-line
  // https://www.autohotkey.com/docs/v1/Scripts.htm#continuation-line
  const operators = getOperators(scopeName).filter((operator) => {
    switch (operator) {
      case '++':
      case '--': return false;
      default: return true;
    }
  });

  switch (scopeName) {
    case 'autohotkeynext':
    case 'autohotkey2':
    case 'autohotkeyl': {
      return lookbehind(seq(
        startAnchor(),
        inlineSpaces0(),
        group(textalt(...operators)),
      ));
    }
  }
  throw Error(`Scope "${scopeName}" not found`);
}
export function getExpressionBegin(scopeName: ScopeName): string {
  switch (scopeName) {
    case 'autohotkeynext':
    case 'autohotkey2':
    case 'autohotkeyl': {
      return lookbehind(alt(
        seq(startAnchor(), inlineSpaces0(), opt(char(','))),
        seq(char(':'), inlineSpaces0()),
      ));
    }
  }
  throw Error(`Scope "${scopeName}" not found`);
}
export function getBuiltInVariableNames(scopeName: ScopeName): readonly string[] {
  switch (scopeName) {
    case 'autohotkeynext':
    case 'autohotkey2': {
      return constants_v2.builtinVaribles;
    }
    case 'autohotkeyl': {
      return constants_v1.builtinVaribles;
    }
  }
  throw Error(`Scope "${scopeName}" not found`);
}
export function createUtilities(scopeName: ScopeName): Utilities {
  return {
    name: (...ruleNames: ElementName[]): string => name(scopeName, ...ruleNames),
    nameRule: (...ruleNames: ElementName[]): NameRule => ({ name: name(scopeName, ...ruleNames) }),
    includeRule: (repositoryName: Repository) => includeRule(repositoryName),
    includeScope: (scopeName: ScopeName) => includeScope(scopeName),
  };
}

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
