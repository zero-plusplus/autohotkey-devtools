import { RuleName, StyleName } from '../../../constants';
import { anyChars0, capture, char, escapeOnigurumaTexts, negativeLookbehind, ordalt, seq } from '../../../oniguruma';
import type { ElementName, MatchRule, ScopeName } from '../../../types';
import { name, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  quoteChar: string;
  stringElementName: ElementName;
  escapeSequences: string[];
}
export function createStringRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    name: name(scopeName, placeholder.stringElementName),
    match: seq(
      capture(char(placeholder.quoteChar)),
      capture(anyChars0()),
      capture(char(placeholder.quoteChar)),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.StringBegin),
      2: patternsRule(
        {
          name: name(scopeName, StyleName.Invalid),
          match: seq(
            negativeLookbehind(char('`')),
            char(placeholder.quoteChar),
          ),
        },
        {
          name: name(scopeName, StyleName.Escape),
          match: ordalt(...escapeOnigurumaTexts(placeholder.escapeSequences)),
        },
        {
          name: name(scopeName, StyleName.Invalid),
          match: char('`'),
        },
      ),
      3: nameRule(scopeName, RuleName.StringEnd),
    },
  };
}
