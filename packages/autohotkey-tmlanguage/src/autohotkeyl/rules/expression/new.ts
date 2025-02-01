import { Repository, RuleName } from '../../../constants';
import { alt, capture, char, group, ignoreCase, inlineSpace, lookbehind, optseq, seq, wordBound } from '../../../oniguruma';
import type { BeginEndRule, ScopeName } from '../../../types';
import { includeRule, nameRule } from '../../../utils';

interface Placeholder {
  callableNamePattern: string;
}
export function createNewCallExpressionRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return {
    begin: seq(
      lookbehind(wordBound()),
      capture(ignoreCase('new')),
      optseq(
        inlineSpace(),
        group(alt(
          lookbehind(char(']', '.')),
          capture(placeholder.callableNamePattern),
        )),
        capture(char('(')),
      ),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.KeywordInExpression),
      2: nameRule(scopeName, RuleName.ClassName),
      3: nameRule(scopeName, RuleName.OpenParen),
    },
    end: capture(char(')')),
    endCaptures: {
      1: nameRule(scopeName, RuleName.CloseParen),
    },
    patterns: [
      includeRule(Repository.Meta),

      includeRule(Repository.Comma),
      includeRule(Repository.Expression),
    ],
  };
}
