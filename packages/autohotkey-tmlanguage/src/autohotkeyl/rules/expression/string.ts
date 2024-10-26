import { RuleName } from '../../../constants';
import { anyChar, capture, char, endAnchor, escapeOnigurumaTexts, inlineSpaces0, lookahead, negativeLookahead, negativeLookbehind, ordalt, seq } from '../../../oniguruma';
import type { BeginEndRule, ScopeName } from '../../../types';
import { name, nameRule } from '../../../utils';

export function createStringRule(scopeName: ScopeName, quote: '"' | `'`, escapeSequences: string[]): BeginEndRule {
  const quoteChar = char(quote);
  const quoteEscapeSequence = scopeName === 'autohotkeyl' ? quoteChar : char('`');

  return {
    name: name(scopeName, quote === '"' ? RuleName.DoubleString : RuleName.SingleString),
    begin: seq(negativeLookbehind(quoteEscapeSequence), capture(quote)),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.StringBegin),
    },
    end: seq(capture(quote), negativeLookahead(quoteEscapeSequence)),
    endCaptures: {
      1: nameRule(scopeName, RuleName.StringEnd),
    },
    patterns: [
      // "foo
      //     ^ missing quote
      //  ^^^ invalid
      //
      {
        match: seq(
          capture(anyChar()),
          inlineSpaces0(),
          lookahead(endAnchor()),
        ),
        captures: {
          1: nameRule(scopeName, RuleName.Invalid),
        },
      },
      // escape sequences
      {
        name: name(scopeName, RuleName.EscapeSequence),
        match: seq(
          capture(ordalt(...escapeOnigurumaTexts(escapeSequences))),
          negativeLookahead(endAnchor()),
        ),
      },
    ],
  };
}
