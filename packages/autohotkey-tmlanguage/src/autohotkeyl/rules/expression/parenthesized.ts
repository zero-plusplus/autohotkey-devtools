import { Repository, RuleName } from '../../../constants';
import { anyChars0, capture, char, seq } from '../../../oniguruma';
import { includeRule, nameRule, patternsRule } from '../../../tmlanguage';
import type { PatternsRule, ScopeName } from '../../../types';

export function createParenthesizedExpressionRule(scopeName: ScopeName): PatternsRule {
  return patternsRule(
    {
      match: seq(
        capture(char('(')),
        capture(anyChars0()),
        capture(char(')')),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.OpenParen),
        2: patternsRule(
          includeRule(Repository.Comma),
          includeRule(Repository.ObjectInBrackets),
          includeRule(Repository.Expression),
        ),
        3: nameRule(scopeName, RuleName.CloseParen),
      },
    },
    {
      begin: capture(char('(')),
      beginCaptures: {
        1: nameRule(scopeName, RuleName.OpenParen),
      },
      end: capture(char(')')),
      endCaptures: {
        1: nameRule(scopeName, RuleName.CloseParen),
      },
      patterns: [
        includeRule(Repository.Meta),

        includeRule(Repository.Comma),
        includeRule(Repository.ExpressionInBrackets),
      ],
    },
  );
}
