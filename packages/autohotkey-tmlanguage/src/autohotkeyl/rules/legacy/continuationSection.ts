import { Repository, RuleName, StyleName } from '../../../constants';
import { alt, anyChars0, capture, char, endAnchor, group, ignoreCase, inlineSpace, inlineSpaces0, inlineSpaces1, lookahead, lookbehind, many0, negativeLookahead, negChar, negChars0, optseq, ordalt, reluctant, seq } from '../../../oniguruma';
import type { BeginEndRule, ScopeName } from '../../../types';
import { includeRule, name, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
  lineEndAnchor: string;
}
export function createContinuationSectionRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return {
    name: name(scopeName, Repository.ContinuationSection),
    begin: seq(
      placeholder.startAnchor,
      inlineSpaces0(),
      capture(char('(')),
      inlineSpaces0(),
      capture(reluctant(anyChars0())),
      optseq(
        inlineSpaces1(),
        capture(seq(char(';'), anyChars0())),
      ),
      placeholder.lineEndAnchor,
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.OpenParen),
      2: patternsRule(
        // [options](https://www.autohotkey.com/docs/v1/Scripts.htm#Join)
        {
          match: seq(
            lookbehind(alt(inlineSpace(), char('('))),
            inlineSpaces0(),
            alt(
              capture(alt(
                ignoreCase('LTrim'),
                ignoreCase('RTrim0'),
                ignoreCase(ordalt('Comments', 'Comment', 'Com', 'C')),
                char('%', ',', '`'),
              )),
              group(seq(capture(ignoreCase('Join')), capture(negChars0('\\s')))),
            ),
            lookahead(alt(inlineSpace(), endAnchor())),
          ),
          captures: {
            1: nameRule(scopeName, RuleName.UnquotedString, StyleName.Strong),
            2: nameRule(scopeName, RuleName.UnquotedString, StyleName.Strong),
            3: patternsRule(includeRule(Repository.ContinuationSectionText)),
          },
        },
        // invalid options
        {
          name: name(scopeName, RuleName.UnquotedString, StyleName.Invalid),
          match: negChar('\\s'),
        },
      ),
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
