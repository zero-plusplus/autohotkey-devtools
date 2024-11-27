import { Repository, RuleName } from '../../../constants';
import { alt, capture, char, groupMany1, inlineSpaces0, seq } from '../../../oniguruma';
import type { BeginEndRule, ScopeName } from '../../../types';
import { includeRule, nameRule } from '../../../utils';

interface Placeholder {
  identifierPattern: string;
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
      includeRule(Repository.Comment),
      includeRule(Repository.Expression),
    ],
  };
}
