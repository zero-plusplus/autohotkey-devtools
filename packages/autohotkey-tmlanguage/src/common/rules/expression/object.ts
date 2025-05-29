import { Repository, RuleName } from '../../../constants';
import { capture, char, inlineSpaces0, lookbehind, seq } from '../../../oniguruma';
import { includeRule, nameRule, patternsRule } from '../../../tmlanguage';
import type { BeginEndRule, MatchRule, Repositories, Rule, ScopeName } from '../../../types';

interface Placeholder extends Placeholder_ObjectRule, Placeholder_ObjectKeyRule {
  contents: Rule[];
}
export function createObjectRepositories(scopeName: ScopeName, placeholder: Placeholder): Repositories {
  return {
    [Repository.Object]: createObjectRule(scopeName, {
      startAnchor: placeholder.startAnchor,
    }),
    [Repository.ObjectKey]: createObjectKeyRule(scopeName, {
      keyName: placeholder.keyName,
    }),
    [Repository.ObjectContent]: patternsRule(...placeholder.contents),
  };
}
interface Placeholder_ObjectRule {
  startAnchor: string;
}
export function createObjectRule(scopeName: ScopeName, placeholder: Placeholder_ObjectRule): BeginEndRule {
  return {
    begin: seq(
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      capture(char('{')),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.OpenBrace),
    },
    end: capture(char('}')),
    endCaptures: {
      1: nameRule(scopeName, RuleName.CloseBrace),
    },
    patterns: [ includeRule(Repository.ObjectContent) ],
  };
}

interface Placeholder_ObjectKeyRule {
  keyName: string;
}
export function createObjectKeyRule(scopeName: ScopeName, placeholder: Placeholder_ObjectKeyRule): MatchRule {
  return {
    match: seq(
      capture(placeholder.keyName),
      inlineSpaces0(),
      capture(char(':')),
    ),
    captures: {
      1: patternsRule(
        includeRule(Repository.Dereference),
        includeRule(Repository.ConstantLikeVariable),
        includeRule(Repository.UserDefinedVariable),
      ),
      2: nameRule(scopeName, RuleName.Colon),
    },
  };
}
