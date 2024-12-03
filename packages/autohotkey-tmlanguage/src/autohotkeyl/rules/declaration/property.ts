import { Repository, RuleName } from '../../../constants';
import { alt, capture, char, group, inlineSpaces0, keyword, lookbehind, seq, startAnchor } from '../../../oniguruma';
import type { BeginEndRule, MatchRule, ScopeName } from '../../../types';
import { includeRule, nameRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
  identifierPattern: string;
  keywordsInArgument: readonly string[];
}
export function createPropertyDeclarationRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return {
    begin: seq(
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      capture(placeholder.identifierPattern),
      capture(char('[')),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.OpenBracket),
    },
    end: capture(char(']')),
    endCaptures: {
      1: nameRule(scopeName, RuleName.CloseBracket),
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
              char('[', ','),
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
