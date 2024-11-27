import { RuleName } from '../../../constants';
import { char, negativeLookbehind, seq } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { name } from '../../../utils';

export function createCommaSeparatorRule(scopeName: ScopeName, separator: ','): MatchRule {
  return {
    name: name(scopeName, RuleName.Comma),
    match: seq(negativeLookbehind(char('`')), char(separator)),
  };
}
