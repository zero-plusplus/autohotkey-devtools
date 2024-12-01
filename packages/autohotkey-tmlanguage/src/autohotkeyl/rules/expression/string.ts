import { RuleName, StyleName, type Repository } from '../../../constants';
import { anyChars0, capture, char, escapeOnigurumaTexts, negativeLookahead, negChars0, negChars1, ordalt, seq } from '../../../oniguruma';
import type { ElementName, MatchRule, PatternsRule, ScopeName } from '../../../types';
import { includeRule, name, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  quoteChar: string;
  stringElementName: ElementName;
  escapeSequences: string[];
  stringContentRepository: Repository;
}
export function createStringRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    match: seq(
      capture(char(placeholder.quoteChar)),
      capture(anyChars0()),
      capture(seq(
        char(placeholder.quoteChar),
        negativeLookahead(char(placeholder.quoteChar)),
      )),
    ),
    captures: {
      1: nameRule(scopeName, placeholder.stringElementName, RuleName.StringBegin),
      2: patternsRule(includeRule(placeholder.stringContentRepository)),
      3: nameRule(scopeName, placeholder.stringElementName, RuleName.StringEnd),
    },
  };
}

interface Placeholder2 {
  quoteChar: string;
  stringElementName: ElementName;
  escapeSequences: string[];
}
export function createStringContentRule(scopeName: ScopeName, placeholder: Placeholder2): PatternsRule {
  return patternsRule(
    {
      name: name(scopeName, placeholder.stringElementName, StyleName.Invalid),
      match: seq(
        char(placeholder.quoteChar),
        negativeLookahead(char(placeholder.quoteChar)),
      ),
    },
    {
      name: name(scopeName, placeholder.stringElementName, StyleName.Escape),
      match: ordalt(...escapeOnigurumaTexts(placeholder.escapeSequences)),
    },
    {
      name: name(scopeName, placeholder.stringElementName, StyleName.Invalid),
      match: char('`'),
    },
    {
      name: name(scopeName, placeholder.stringElementName),
      match: seq(negChars0(placeholder.quoteChar, '`')),
    },
    {
      name: name(scopeName, placeholder.stringElementName),
      match: negChars1(placeholder.quoteChar, '`'),
    },
  );
}
