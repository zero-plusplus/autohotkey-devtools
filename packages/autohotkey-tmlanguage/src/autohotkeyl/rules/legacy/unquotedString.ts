import { Repository, RuleName } from '../../../constants';
import { alt, capture, char, endAnchor, ignoreCase, inlineSpace, inlineSpaces0, lookahead, many1, negativeLookahead, negChar, negChars0, numbers1, optional, optseq, seq } from '../../../oniguruma';
import type { MatchRule, Rule, ScopeName } from '../../../types';
import { includeRule, name, patternsRule } from '../../../utils';

interface Placeholder {
  stringRuleName: RuleName;
  stringPattern: string;
  additionalRules?: Rule[];
}
export function createUnquotedString(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(inlineSpaces0(), capture(placeholder.stringPattern)),
    captures: {
      1: patternsRule(
        includeRule(Repository.UnquotedStringEscapeSequence),
        includeRule(Repository.Dereference),
        ...(placeholder.additionalRules ?? []),
        {
          match: seq(
            negativeLookahead(alt(
              inlineSpace(),
              char(','),
              endAnchor(),
            )),
            capture(alt(
              inlineSpaces0(),
              seq(ignoreCase('0x'), many1('[0-9a-fA-F]')),
              seq(
                numbers1(),
                optseq(char('.'), numbers1()),
                optseq(
                  ignoreCase('E'),
                  optional(char('+', '-')),
                  numbers1(),
                ),
              ),
            )),
            lookahead(alt(
              inlineSpace(),
              char(','),
              endAnchor(),
            )),
          ),
          captures: {
            1: patternsRule(includeRule(Repository.Number)),
          },
        },
        {
          name: name(scopeName, placeholder.stringRuleName),
          match: seq(
            negChar('`', '0-9', inlineSpace()),
            negChars0('`', inlineSpace()),
          ),
        },
      ),
    },
  };
}
