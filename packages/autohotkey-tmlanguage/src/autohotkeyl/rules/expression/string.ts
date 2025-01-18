import { RuleDescriptor, StyleName, type Repository } from '../../../constants';
import { alt, capture, char, escapeOnigurumaTexts, inlineSpaces1, many0, negativeLookahead, negChar, ordalt, reluctant, seq } from '../../../oniguruma';
import type { ElementName, MatchRule, PatternsRule, ScopeName } from '../../../types';
import { includeRule, name, nameRule, patternsRule } from '../../../utils';

interface Placeholder_StringRule {
  quoteChar: string;
  unescapedQuotePattern: string;
  stringElementName: ElementName;
  stringContentRepository: Repository;
}
export function createStringRule(scopeName: ScopeName, placeholder: Placeholder_StringRule): MatchRule {
  return {
    name: name(scopeName, placeholder.stringElementName),
    match: seq(
      capture(char(placeholder.quoteChar)),
      capture(reluctant(many0(alt(
        placeholder.unescapedQuotePattern,
        seq(inlineSpaces1(), negativeLookahead(char(';'))),
        negChar(placeholder.quoteChar, '\\s'),
      )))),
      capture(char(placeholder.quoteChar)),
    ),
    captures: {
      1: nameRule(scopeName, RuleDescriptor.Begin),
      2: patternsRule(includeRule(placeholder.stringContentRepository)),
      3: nameRule(scopeName, RuleDescriptor.End),
    },
  };
}

interface Placeholder2_StringContentRule {
  escapeSequences: string[];
}
export function createStringContentRule(scopeName: ScopeName, placeholder: Placeholder2_StringContentRule): PatternsRule {
  return patternsRule(
    // Unofficial escape sequences used in regular expression-like string. e.g. "`)"
    {
      name: name(scopeName, StyleName.Escape),
      match: seq(char('`'), char(')')),
    },

    // Official escape sequences
    {
      name: name(scopeName, StyleName.Escape),
      match: ordalt(...escapeOnigurumaTexts(placeholder.escapeSequences)),
    },
    {
      name: name(scopeName, StyleName.Invalid),
      match: char('`'),
    },
  );
}
