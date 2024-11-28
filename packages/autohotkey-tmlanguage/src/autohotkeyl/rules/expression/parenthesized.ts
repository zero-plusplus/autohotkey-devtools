import { Repository, RuleName } from '../../../constants';
import { anyChars0, capture, char, seq } from '../../../oniguruma';
import type { BeginEndRule, ScopeName } from '../../../types';
import { includeRule, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
}
export function createParenthesizedExpressionRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return patternsRule(
    {
      match: seq(capture(char('(')), capture(anyChars0()), capture(char(')'))),
      captures: {
        1: nameRule(scopeName, RuleName.OpenParen),
        2: patternsRule(includeRule(Repository.Expression)),
        3: nameRule(scopeName, RuleName.CloseParen),
      },
    },
    {
      begin: seq(
        placeholder.startAnchor,
        capture(char('(')),
      ),
      beginCaptures: {
        1: nameRule(scopeName, RuleName.OpenParen),
      },
      end: capture(char(')')),
      endCaptures: {
        1: nameRule(scopeName, RuleName.CloseParen),
      },
      patterns: [ includeRule(Repository.Expression) ],
    },
  );
}
