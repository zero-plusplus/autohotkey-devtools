import { Repository, RuleName } from '../../../constants';
import { capture, inlineSpaces0, negChars1, seq } from '../../../oniguruma';
import type { MatchRule, ScopeName } from '../../../types';
import { includeRule, name, patternsRule } from '../../../utils';
import { createLegacyTextEscapeSequencesRule } from './escape';

interface Placeholder {
  stringRuleName: RuleName;
  stringPattern: string;
  escapeSequences: readonly string[];
}
export function createUnquotedString(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(inlineSpaces0(), capture(placeholder.stringPattern)),
    captures: {
      1: patternsRule(
        createLegacyTextEscapeSequencesRule(scopeName, placeholder.escapeSequences),
        includeRule(Repository.Dereference),
        {
          name: name(scopeName, placeholder.stringRuleName),
          match: negChars1('`'),
        },
      ),
    },
  };
}
