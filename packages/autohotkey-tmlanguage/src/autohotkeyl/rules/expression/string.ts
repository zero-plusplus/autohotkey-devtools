import { RuleDescriptor, StyleName, type Repository } from '../../../constants';
import { capture, char, escapeOnigurumaTexts, ordalt, seq } from '../../../oniguruma';
import type { ElementName, MatchRule, PatternsRule, ScopeName } from '../../../types';
import { includeRule, name, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  quoteChar: string;
  stringContentsPattern: string;
  stringEndPattern: string;
  stringElementName: ElementName;
  stringContentRepository: Repository;
}
export function createStringRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    name: name(scopeName, placeholder.stringElementName),
    match: seq(
      capture(char(placeholder.quoteChar)),
      capture(placeholder.stringContentsPattern),
      capture(placeholder.stringEndPattern),
    ),
    captures: {
      1: nameRule(scopeName, RuleDescriptor.Begin),
      2: patternsRule(includeRule(placeholder.stringContentRepository)),
      3: nameRule(scopeName, RuleDescriptor.End),
    },
  };
}

interface Placeholder2 {
  escapeSequences: string[];
}
export function createStringContentRule(scopeName: ScopeName, placeholder: Placeholder2): PatternsRule {
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
