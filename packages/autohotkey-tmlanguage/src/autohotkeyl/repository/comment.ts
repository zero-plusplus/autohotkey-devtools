import { Repository, RuleName } from '../../constants';
import { anyChars0, capture, chr, endAnchor, inlineSpace, inlineSpaces0, lookbehind, seq, startAnchor } from '../../oniguruma';
import type { MatchRule, PatternsRule, Repositories, ScopeName } from '../../types';
import { createUtilities, includeRule, patternsRule } from '../../utils';

export function createRepositories(scopeName: ScopeName): Repositories {
  const { nameRule } = createUtilities(scopeName);
  return {
    [Repository.Comment]: ((): PatternsRule => {
      return patternsRule(
        includeRule(Repository.SingleLineComment),
        includeRule(Repository.InLineComment),
      );
    })(),
    [Repository.SingleLineComment]: ((): MatchRule => {
      return {
        match: seq(
          lookbehind(seq(startAnchor(), inlineSpaces0())),
          capture(seq(chr(';'), anyChars0())),
          endAnchor(),
        ),
        captures: {
          1: nameRule(RuleName.SingleLineComment),
        },
      };
    })(),
    [Repository.InLineComment]: ((): MatchRule => {
      return {
        match: seq(
          lookbehind(inlineSpace()),
          capture(seq(chr(';'), anyChars0())),
          endAnchor(),
        ),
        captures: {
          1: nameRule(RuleName.InLineComment),
        },
      };
    })(),
  };
}
