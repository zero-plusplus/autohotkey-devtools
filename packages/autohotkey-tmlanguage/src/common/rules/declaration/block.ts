import { RuleName } from '../../../constants';
import { capture, char } from '../../../oniguruma';
import { nameRule } from '../../../tmlanguage';
import type { BeginEndRule, Rule, ScopeName } from '../../../types';

interface Placeholder {
  statementsInBlock: Rule[];
}
export function createBlockRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return {
    begin: capture(char('{')),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.BlockBegin),
    },
    end: capture(char('}')),
    endCaptures: {
      1: nameRule(scopeName, RuleName.BlockEnd),
    },
    patterns: placeholder.statementsInBlock,
  };
}
