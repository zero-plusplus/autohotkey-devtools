import { Repository, RuleName } from '../../../constants';
import {
  alt, capture, char, group, inlineSpace, inlineSpaces0, keyword, lookbehind, optseq, ordalt,
  seq, startAnchor,
} from '../../../oniguruma';
import { includeRule, nameRule } from '../../../tmlanguage';
import type { BeginEndRule, MatchRule, Rule, ScopeName } from '../../../types';

interface Placeholder {
  modifiers: readonly string[];
  identifierPattern: string;
  identifierNameRule: Rule;
  keywordsInArgument: readonly string[];
}
export function createPropertyDeclarationRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return {
    begin: seq(
      startAnchor(),
      inlineSpaces0(),
      optseq(
        capture(ordalt(...placeholder.modifiers)),
        inlineSpace(),
      ),
      inlineSpaces0(),
      capture(placeholder.identifierPattern),
      capture(char('[')),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.Modifier),
      2: placeholder.identifierNameRule,
      3: nameRule(scopeName, RuleName.OpenBracket),
    },
    end: capture(char(']')),
    endCaptures: {
      1: nameRule(scopeName, RuleName.CloseBracket),
    },
    patterns: [
      includeRule(Repository.Meta),

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
            1: nameRule(scopeName, RuleName.KeywordInExpression),
          },
        };
      }),
      includeRule(Repository.Comma),
      includeRule(Repository.Expression),
    ],
  };
}
