import { Repository, RuleName } from '../../../constants';
import { alt, anyChars0, capture, char, inlineSpace, inlineSpaces0, many0, negativeLookahead, negChar, seq } from '../../../oniguruma';
import type { BeginEndRule, ScopeName } from '../../../types';
import { includeRule, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
  lineEndAnchor: string;
}
export function createContinuationSectionRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return {
    begin: capture(seq(
      placeholder.startAnchor,
      inlineSpaces0(),
      char('('),
      inlineSpaces0(),
      anyChars0(),
      placeholder.lineEndAnchor,
    )),
    beginCaptures: {
      1: patternsRule(includeRule(Repository.ContinuationStringOptions)),
      3: patternsRule(includeRule(Repository.InLineComment)),
    },
    end: seq(
      placeholder.startAnchor,
      inlineSpaces0(),
      negativeLookahead(char('`')),
      capture(char(')')),
      capture(many0(alt(
        seq(negativeLookahead(inlineSpace()), char(';')),
        negChar(';'),
      ))),
      placeholder.lineEndAnchor,
    ),
    endCaptures: {
      1: nameRule(scopeName, RuleName.CloseParen),
      2: patternsRule(
        includeRule(Repository.Comma),
        includeRule(Repository.CommandArgument),
      ),
      3: patternsRule(includeRule(Repository.InLineComment)),
    },
    patterns: [ includeRule(Repository.ContinuationSectionText) ],
  };
}
