import { RuleDescriptor, StyleName } from '../../../constants';
import { alt, capture, char, groupMany0, negChar, seq, textalt } from '../../../oniguruma';
import type { ElementName, MatchRule, ScopeName } from '../../../types';
import { name, nameRule, patternsRule } from '../../../utils';

interface Placeholder_StringRule {
  quoteChar: string;
  unescapedQuotePattern: string;
  stringElementName: ElementName;
  escapeSequences: readonly string[];
}
export function createStringRule(scopeName: ScopeName, placeholder: Placeholder_StringRule): MatchRule {
  return {
    name: name(scopeName, placeholder.stringElementName),
    match: seq(
      capture(char(placeholder.quoteChar)),
      capture(groupMany0(alt(
        placeholder.unescapedQuotePattern,
        negChar(placeholder.quoteChar),
      ))),
      capture(char(placeholder.quoteChar)),
    ),
    captures: {
      1: nameRule(scopeName, RuleDescriptor.Begin),
      2: patternsRule(
        // Unofficial escape sequences used in regular expression-like string. e.g. "`)"
        {
          name: name(scopeName, StyleName.Escape),
          match: seq(char('`'), char(')')),
        },

        // Official escape sequences
        {
          name: name(scopeName, StyleName.Escape),
          match: textalt(...placeholder.escapeSequences),
        },
        {
          name: name(scopeName, StyleName.Invalid),
          match: char('`'),
        },
      ),
      3: nameRule(scopeName, RuleDescriptor.End),
    },
  };
}
