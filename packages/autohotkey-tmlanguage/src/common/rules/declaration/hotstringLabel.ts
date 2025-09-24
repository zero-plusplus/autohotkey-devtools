import {
  anyChar,
  anyChars0,
  anyChars1,
  capture,
  char,
  lookahead,
  lookbehind,
  reluctant,
  seq,
  text,
} from '../../../oniguruma';
import {
  includeRule,
  name,
  nameRule,
  patternsRule,
  Repository,
  RuleName,
  StyleName,
  type MatchRule,
  type ScopeName,
} from '../../../tmlanguage';

interface Placeholder {
  startPattern: string;
  endPattern: string;
}
export function createHotstringLabelRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startPattern),
      capture(char(':')),
      capture(anyChars0()),
      capture(char(':')),
      capture(anyChars1()),
      capture(text('::')),
      capture(reluctant(anyChars0())),
      lookahead(placeholder.endPattern),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.Colon),
      2: patternsRule(
        includeRule(Repository.CommandArgumentHotstringOptions),
        {
          name: name(scopeName, RuleName.UnquotedString, StyleName.Invalid),
          match: anyChar(),
        },
      ),
      3: nameRule(scopeName, RuleName.Colon),
      4: nameRule(scopeName, RuleName.HotstringLabelName),
      5: nameRule(scopeName, RuleName.ColonColon),
      6: nameRule(scopeName, RuleName.UnquotedString),
    },
  };
}
