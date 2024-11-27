import { RuleName } from '../../../constants';
import { keyword } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { name } from '../../../utils';

interface Placeholder {
  keywords: string[];
}
export function createKeywordRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    name: name(scopeName, RuleName.Keyword),
    match: keyword(...placeholder.keywords),
  };
}
