import { Repository, RuleName } from '../../../constants';
import { alt, capture, char, group, groupMany1, inlineSpaces0, keyword, lookbehind, seq, startAnchor } from '../../../oniguruma';
import type { BeginEndRule, MatchRule, ScopeName } from '../../../types';
import { includeRule, nameRule } from '../../../utils';

interface Placeholder {
  identifierPattern: string;
  keywordsInArgument: string[];
}
export function createCallExpressionRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  const dereferencePattern = seq(char('%'), placeholder.identifierPattern, char('%'));

  return {
    begin: seq(
      capture(groupMany1(alt(placeholder.identifierPattern, dereferencePattern))),
      capture(char('(')),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.FunctionName),
      2: nameRule(scopeName, RuleName.OpenParen),
    },
    end: seq(inlineSpaces0(), capture(char(')'))),
    endCaptures: {
      1: nameRule(scopeName, RuleName.CloseParen),
    },
    patterns: [
      includeRule(Repository.DirectiveStatement),
      includeRule(Repository.Comment),
      includeRule(Repository.ParenthesizedExpression),

      ...placeholder.keywordsInArgument.map((keywordsInArgument): MatchRule => {
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
            1: nameRule(scopeName, RuleName.ByrefKeyword),
          },
        };
      }),
      includeRule(Repository.Comma),
      includeRule(Repository.Expression),
    ],
  };
}
