import { Repository, RuleName, StyleName } from '../../../constants';
import {
  alt, anyChars0, anyChars1, capture, char, ignoreCase, lookahead, lookbehind, numbers1, optional,
  seq, text,
} from '../../../oniguruma';
import { name, nameRule, patternsRule } from '../../../tmlanguage';
import type { MatchRule, ScopeName } from '../../../types';

interface Placeholder {
  startAnchor: string;
  endAnchor: string;
}
export function createHotstringLabelRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    name: name(scopeName, Repository.HotstringLabelStatement),
    match: seq(
      lookbehind(placeholder.startAnchor),
      capture(char(':')),
      capture(anyChars0()),
      capture(char(':')),
      capture(anyChars1()),
      capture(text('::')),
      capture(anyChars0()),
      lookahead(placeholder.endAnchor),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.Colon),
      2: patternsRule(
        {
          // e.g. `K-1` `P1`
          name: name(scopeName, RuleName.HotstringOption, StyleName.Strong),
          match: seq(
            ignoreCase(),
            char(
              'K',                                  // https://www.autohotkey.com/docs/v1/Hotstrings.htm#Kn
              'P',                                  // https://www.autohotkey.com/docs/v1/Hotstrings.htm#Pn
            ),
            optional(char('-')),
            numbers1(),
          ),
        },
        {
          // e.g. `C` `C0` `C1`
          name: name(scopeName, RuleName.HotstringOption, StyleName.Strong),
          match: seq(
            ignoreCase(),
            char('C'),                              // https://www.autohotkey.com/docs/v1/Hotstrings.htm#C
            optional(char('0', '1')),
          ),
        },
        {
          // e.g. `B` `B0`
          name: name(scopeName, RuleName.HotstringOption, StyleName.Strong),
          match: seq(
            ignoreCase(),
            char(
              '*',                                  // https://www.autohotkey.com/docs/v1/Hotstrings.htm#Asterisk
              '?',                                  // https://www.autohotkey.com/docs/v1/Hotstrings.htm#Question
              'B',                                  // https://www.autohotkey.com/docs/v1/Hotstrings.htm#b0
              'O',                                  // https://www.autohotkey.com/docs/v1/Hotstrings.htm#O
              'R',                                  // https://www.autohotkey.com/docs/v1/Hotstrings.htm#raw
              'T',                                  // https://www.autohotkey.com/docs/v1/Hotstrings.htm#T
              'Z',                                  // https://www.autohotkey.com/docs/v1/Hotstrings.htm#z
            ),
            optional(char('0')),
          ),
        },
        {
          // e.g. `SI`
          name: name(scopeName, RuleName.HotstringOption, StyleName.Strong),
          match: seq(
            ignoreCase(),
            alt(
              'SI',                                   // <
              'SP',                                   // https://www.autohotkey.com/docs/v1/Hotstrings.htm#SendMode
              'SE',                                   // >
              'X',                                    // https://www.autohotkey.com/docs/v1/Hotstrings.htm#X
            ),
          ),
        },
        {
          name: name(scopeName, RuleName.HotstringOption, StyleName.Invalid),
          match: anyChars1(),
        },
      ),
      3: nameRule(scopeName, RuleName.Colon),
      4: nameRule(scopeName, RuleName.HotstringLabelName),
      5: nameRule(scopeName, RuleName.ColonColon),
      6: nameRule(scopeName, RuleName.UnquotedString),
    },
  };
}
