import { Repository, RuleName } from '../../../constants';
import { capture, char } from '../../../oniguruma';
import type { BeginEndRule, ScopeName } from '../../../types';
import { includeRule, nameRule } from '../../../utils';

export function createBlockRule(scopeName: ScopeName): BeginEndRule {
  return {
    begin: capture(char('{')),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.BlockBegin),
    },
    end: capture(char('}')),
    endCaptures: {
      1: nameRule(scopeName, RuleName.BlockEnd),
    },
    patterns: [ includeRule(Repository.Self) ],
  };
}
