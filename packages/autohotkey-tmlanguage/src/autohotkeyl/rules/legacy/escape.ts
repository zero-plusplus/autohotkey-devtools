import { RuleName, StyleName } from '../../../constants';
import { escapeOnigurumaTexts, ordalt } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { name } from '../../../utils';

export function createUnquotedEscapeSequencesRule(scopeName: ScopeName, escapeSequences: readonly string[]): MatchRule {
  return {
    name: name(scopeName, RuleName.UnquotedString, StyleName.Escape),
    match: ordalt(...escapeOnigurumaTexts(escapeSequences)),
  };
}
