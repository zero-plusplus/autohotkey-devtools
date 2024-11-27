import { RuleName } from '../../../constants';
import type { MatchRule, ScopeName } from '../../../types';
import { name } from '../../../utils';

export function createUnquotedString(scopeName: ScopeName, unquotedString: string): MatchRule {
  return {
    name: name(scopeName, RuleName.UnquotedString),
    match: unquotedString,
  };
}
