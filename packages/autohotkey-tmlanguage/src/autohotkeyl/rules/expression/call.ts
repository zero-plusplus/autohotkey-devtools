import { Repository, RuleName } from '../../../constants';
import { alt, capture, char, group, inlineSpaces0, keyword, lookbehind, seq, startAnchor } from '../../../oniguruma';
import type { BeginEndRule, MatchRule, PatternsRule, Rule, ScopeName } from '../../../types';
import { includeRule, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  callableNamePattern: string;
  callableNameRule: Rule;
  keywordsInArgument: string[];
}
export function createCallExpressionRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return {
    begin: seq(
      group(alt(
        lookbehind(char(']', '.')),
        capture(placeholder.callableNamePattern),
      )),
      capture(char('(')),
    ),
    beginCaptures: {
      1: placeholder.callableNameRule,
      2: nameRule(scopeName, RuleName.OpenParen),
    },
    end: capture(char(')')),
    endCaptures: {
      1: nameRule(scopeName, RuleName.CloseParen),
    },
    patterns: [
      includeRule(Repository.Meta),

      createKeywordInArgumentRule(scopeName, placeholder),
      includeRule(Repository.Comma),
      includeRule(Repository.Expression),
    ],
  };
}

export function createKeywordInArgumentRule(scopeName: ScopeName, placeholder: Placeholder): PatternsRule {
  return patternsRule(...placeholder.keywordsInArgument.map((keywordsInArgument): MatchRule => {
    return {
      match: seq(
        lookbehind(group(alt(
          startAnchor(),
          char('(', ','),
        ))),
        inlineSpaces0(),
        capture(keyword(keywordsInArgument)),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.KeywordInExpression),
      },
    };
  }));
}
