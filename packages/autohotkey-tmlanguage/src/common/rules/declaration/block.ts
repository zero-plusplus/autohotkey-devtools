import {
  capture,
  char,
} from '../../../oniguruma';
import {
  nameRule,
  RuleName,
  type BeginEndRule,
  type Rule,
  type ScopeName,
} from '../../../tmlanguage';

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
