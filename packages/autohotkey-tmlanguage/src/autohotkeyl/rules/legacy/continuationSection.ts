import { Repository, RuleName } from '../../../constants';
import { alt, capture, char, inlineSpace, inlineSpaces0, lookahead, many0, negativeLookahead, negChar, negChars0, seq, startAnchor } from '../../../oniguruma';
import type { BeginEndRule, ScopeName } from '../../../types';
import { includeRule, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  endAnchor: string;
}
export function createContinuationSectionRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return {
    begin: seq(
      startAnchor(),
      inlineSpaces0(),
      capture(char('(')),
      inlineSpaces0(),
      capture(negChars0(')')),
      lookahead(placeholder.endAnchor),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.OpenParen),
      2: patternsRule(
        includeRule(Repository.ContinuationStringOptions),
        includeRule(Repository.InLineComments),
      ),
    },
    end: seq(
      startAnchor(),
      inlineSpaces0(),
      negativeLookahead(char('`')),
      capture(char(')')),
      capture(many0(alt(
        seq(negativeLookahead(inlineSpace()), char(';')),
        negChar(';'),
      ))),
      lookahead(placeholder.endAnchor),
    ),
    endCaptures: {
      1: nameRule(scopeName, RuleName.CloseParen),
      2: patternsRule(
        includeRule(Repository.Comma),
        includeRule(Repository.CommandArgument),
      ),
      3: patternsRule(includeRule(Repository.InLineComments)),
    },
    patterns: [ includeRule(Repository.ContinuationSectionText) ],
  };
}
