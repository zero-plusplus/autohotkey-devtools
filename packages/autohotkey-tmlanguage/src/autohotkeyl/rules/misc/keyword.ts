import type { RuleName } from '../../../constants';
import { char, ignoreCase, lookahead, negativeLookbehind, ordalt, seq, wordBound } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { name } from '../../../utils';

interface Placeholder {
  keywordRuleName: RuleName;
  keywords: string[];
}
export function createKeywordRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    name: name(scopeName, placeholder.keywordRuleName),
    match: seq(
      negativeLookbehind(char('.')),
      ignoreCase(ordalt(...placeholder.keywords)),
      lookahead(wordBound()),
    ),
  };
}
