import { Repository, RuleDescriptor, RuleName, StyleName } from '../../../constants';
import { alt, backslash, capture, char, escapeOnigurumaTexts, group, ignoreCase, inlineSpaces0, lookbehind, negativeLookahead, negChars1, numbers1, optional, optseq, ordalt, seq, text, wordChars0 } from '../../../oniguruma';
import type { BeginEndRule, PatternsRule, ScopeName } from '../../../types';
import { includeRule, name, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  quoteChar: string;
  regexpEndPattern: string;
  contentRuleName: RuleName;
  optionsPattern: string;
}
export function createShorthundRegExpMatchRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return {
    name: name(scopeName, placeholder.contentRuleName),
    begin: seq(
      lookbehind('~='),
      inlineSpaces0(),
      capture(char(placeholder.quoteChar)),
      capture(alt(
        seq(capture(placeholder.optionsPattern), optional(ignoreCase(text('(*UCP)')))),
        optional(ignoreCase(text('(*UCP)'))),
      )),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleDescriptor.Begin),
      2: nameRule(scopeName, RuleName.RegExpOption),
    },
    end: capture(placeholder.regexpEndPattern),
    endCaptures: {
      1: nameRule(scopeName, RuleDescriptor.End),
    },
    patterns: [ includeRule(Repository.DoubleStringAsRegExpContent) ],
  };
}
export function createStringAsRegExpRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return {
    name: name(scopeName, placeholder.contentRuleName),
    begin: seq(
      capture(char(placeholder.quoteChar)),
      inlineSpaces0(),
      capture(capture(placeholder.optionsPattern)),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleDescriptor.Begin),
      2: nameRule(scopeName, RuleName.RegExpOption),
    },
    end: capture(placeholder.regexpEndPattern),
    endCaptures: {
      1: nameRule(scopeName, RuleDescriptor.End),
    },
    patterns: [ includeRule(Repository.DoubleStringAsRegExpContent) ],
  };
}

interface Placeholder2 {
  quoteChar: string;
  regexpEscapeSequences: readonly string[];
  pcreUnicodePropertyCodes: readonly string[];
  pcreUnicodePropertyScripts: readonly string[];
  stringEscapeSequences: string[];
  contentRepository: Repository;
}
export function createStringAsRegExpRuleContentRule(scopeName: ScopeName, placeholder: Placeholder2): PatternsRule {
  return patternsRule(
    // https://www.autohotkey.com/docs/v1/misc/RegExCallout.htm
    // https://www.autohotkey.com/docs/v2/misc/RegExCallout.htm
    {
      match: seq(
        capture(seq(
          ignoreCase(text('(?C')),
          numbers1(),
        )),
        optseq(
          capture(char(':')),
          capture(negChars1(')')),
        ),
        capture(char(')')),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.RegExpGroup, RuleDescriptor.Begin),
        2: nameRule(scopeName, RuleName.RegExpGroup),
        3: nameRule(scopeName, RuleName.FunctionName),
        4: nameRule(scopeName, RuleName.RegExpGroup, RuleDescriptor.End),
      },
    },

    // Group and assertions
    {
      begin: capture(alt(
        text('(?<='),
        text('(?<!'),
        text('(?='),
        text('(?!'),
        text('(?:'),
        char('('),
      )),
      beginCaptures: {
        1: nameRule(scopeName, RuleName.RegExpGroup, RuleDescriptor.Begin),
      },
      end: capture(char(')')),
      endCaptures: {
        1: nameRule(scopeName, RuleName.RegExpGroup, RuleDescriptor.End),
      },
      patterns: [ includeRule(placeholder.contentRepository) ],
    },

    // literal
    {
      begin: capture(seq(text('\\Q'))),
      beginCaptures: {
        1: nameRule(scopeName, RuleName.RegExpGroup, RuleDescriptor.Begin),
      },
      end: capture(text('\\E')),
      endCaptures: {
        1: nameRule(scopeName, RuleName.RegExpGroup, RuleDescriptor.End),
      },
    },

    // character class
    {
      name: name(scopeName, RuleName.RegExpCharacterClassSet),
      begin: capture(seq(
        negativeLookahead(backslash()),
        char('['),
        optional(char('^')),
      )),
      beginCaptures: {
        1: nameRule(scopeName, RuleName.RegExpCharacterClass, RuleDescriptor.Begin),
      },
      end: seq(
        negativeLookahead(backslash()),
        capture(char(']')),
      ),
      endCaptures: {
        1: nameRule(scopeName, RuleName.RegExpCharacterClass, RuleDescriptor.End),
      },
      patterns: [
        {
          name: name(scopeName, StyleName.Escape),
          match: seq(backslash(), char('^', '-', ']', backslash())),
        },
        {
          name: name(scopeName, StyleName.Invalid),
          match: seq(backslash(), negativeLookahead(backslash())),
        },
      ],
    },
    {
      name: name(scopeName, RuleName.RegExpCharacterClass),
      match: char('.'),
    },
    {
      // unicode character properties
      match: seq(
        capture(seq(
          backslash(),
          char('p', 'P'),
          char('{'),
        )),
        group(alt(
          capture(ordalt(...escapeOnigurumaTexts([
            ...placeholder.pcreUnicodePropertyCodes,
            ...placeholder.pcreUnicodePropertyScripts,
          ]))),
          wordChars0(),
        )),
        capture(char('}')),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.RegExpCharacterClass, RuleDescriptor.Begin),
        2: nameRule(scopeName, RuleName.RegExpCharacterClass, StyleName.Strong),
        3: nameRule(scopeName, RuleName.RegExpCharacterClass, RuleDescriptor.End),
      },
    },
    {
      name: name(scopeName, RuleName.RegExpCharacterClass),
      match: text('\\X'),
    },

    // anchor
    {
      name: name(scopeName, RuleName.RegExpAnchor),
      match: seq(negativeLookahead(backslash()), char('^', '$')),
    },

    // quantifier
    {
      name: name(scopeName, RuleName.RegExpQuantifier),
      match: seq(
        negativeLookahead(backslash()),
        char('{'),
        inlineSpaces0(),
        optional(numbers1()),
        inlineSpaces0(),
        optional(char(',')),
        inlineSpaces0(),
        optional(numbers1()),
        inlineSpaces0(),
        char('}'),
      ),
    },
    {
      name: name(scopeName, RuleName.RegExpQuantifier),
      match: char('?', '*', '+'),
    },

    // escape sequences
    {
      // regexp escape sequences
      name: name(scopeName, StyleName.Escape),
      match: seq(backslash(), char(backslash(), ...placeholder.regexpEscapeSequences)),
    },
    {
      // string escape sequences
      name: name(scopeName, StyleName.Escape),
      match: ordalt(...escapeOnigurumaTexts(placeholder.stringEscapeSequences)),
    },
    {
      name: name(scopeName, StyleName.Invalid),
      match: char('`'),
    },
  );
}
