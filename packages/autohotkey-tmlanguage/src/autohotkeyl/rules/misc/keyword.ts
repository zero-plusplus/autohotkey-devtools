import { keyword } from '../../../oniguruma';
import type { ElementName, MatchRule, ScopeName } from '../../../types';

interface Placeholder {
  elementName: ElementName;
  keywords: string[];
}
export function createKeywordRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    name: placeholder.elementName,
    match: keyword(...placeholder.keywords),
  };
}
