import { Repository, RuleDescriptor, RuleName, StyleName, TokenType } from '../../../constants';
import {
  alt, anyChar, backslash, capture, char, endAnchor, escapeOnigurumaTexts, group, ignoreCase, inlineSpaces0,
  inlineSpaces1, lookahead, lookbehind, many0, many1, negativeLookahead, negChar, negChars1, numbers1, optional,
  optseq, ordalt, reluctant, seq, text, wordBound, wordChars0,
} from '../../../oniguruma';
import type { MatchRule, PatternsRule, ScopeName } from '../../../types';
import { includeRule, name, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  quoteChar: string;
  escapedQuotePattern: string;
  regexpOptionsPattern: string;
  contentRuleName: RuleName;
  contentRepository: Repository;
}
export function createShorthandRegExpMatchRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    name: name(scopeName, placeholder.contentRuleName),
    match: seq(
      lookbehind('~='),
      inlineSpaces0(),
      capture(char(placeholder.quoteChar)),
      inlineSpaces0(),
      optional(capture(alt(
        group(seq(
          placeholder.regexpOptionsPattern,
          optseq(
            inlineSpaces0(),
            ignoreCase(text('(*UCP)')),
          ),
        )),
        ignoreCase(text('(*UCP)')),
      ))),
      capture(reluctant(many0(alt(
        placeholder.escapedQuotePattern,
        seq(inlineSpaces1(), negativeLookahead(char(';'))),
        negChar(placeholder.quoteChar, '\\s'),
      )))),
      capture(char(placeholder.quoteChar)),
    ),
    captures: {
      1: nameRule(scopeName, RuleDescriptor.Begin),
      2: nameRule(scopeName, RuleName.RegExpOption),
      3: patternsRule(includeRule(placeholder.contentRepository)),
      4: nameRule(scopeName, RuleDescriptor.End),
    },
  };
}

export function createStringAsRegExpRule(scopeName: ScopeName, placeholder: Placeholder): MatchRule {
  return {
    name: name(scopeName, placeholder.contentRuleName),
    match: seq(
      capture(char(placeholder.quoteChar)),
      inlineSpaces0(),
      capture(placeholder.regexpOptionsPattern),
      capture(reluctant(many1(alt(
        placeholder.escapedQuotePattern,
        seq(inlineSpaces1(), negativeLookahead(char(';'))),
        negChar(placeholder.quoteChar, '\\s'),
      )))),
      capture(char(placeholder.quoteChar)),
    ),
    captures: {
      1: nameRule(scopeName, RuleDescriptor.Begin),
      2: nameRule(scopeName, RuleName.RegExpOption),
      3: patternsRule(includeRule(placeholder.contentRepository)),
      4: nameRule(scopeName, RuleDescriptor.End),
    },
  };
}

interface Placeholder2 {
  regexpOptions: readonly string[];
  contentRepository: Repository;
  commonContentRepository: Repository;
}
export function createStringAsRegExpContentRule(scopeName: ScopeName, placeholder: Placeholder2): PatternsRule {
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

    // #region sub expression
    {
      begin: alt(
        seq(capture(text('(?<')), capture(wordChars0()), capture(char('>'))),
        capture(alt(
          group(seq(
            text('(?'),
            optional(capture(negChars1(':'))),
            char(':'),
          )),
          text('(?<='),
          text('(?<!'),
          text('(?='),
          text('(?!'),
          char('('),
        )),
      ),
      beginCaptures: {
        1: nameRule(scopeName, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.Begin),
        2: nameRule(scopeName, TokenType.Other, RuleName.RegExpGroup, RuleName.Variable, RuleDescriptor.Begin),
        3: nameRule(scopeName, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.Begin),
        4: nameRule(scopeName, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.Begin),
        5: patternsRule(
          {
            name: name(scopeName, TokenType.Other, RuleName.RegExpGroup, RuleName.RegExpOption, RuleDescriptor.Begin),
            match: ordalt(...escapeOnigurumaTexts(placeholder.regexpOptions)),
          },
          {
            name: name(scopeName, TokenType.Other, RuleName.RegExpGroup, RuleName.RegExpOption, RuleDescriptor.Begin),
            match: char('-'),
          },
          {
            name: name(scopeName, TokenType.Other, StyleName.Invalid),
            match: anyChar(),
          },
        ),
      },
      end: capture(char(')')),
      endCaptures: {
        1: nameRule(scopeName, TokenType.Other, RuleName.RegExpGroup, RuleDescriptor.End),
      },
      patterns: [ includeRule(placeholder.contentRepository) ],
    },
    // #endregion sub expression

    // #region raw text
    {
      begin: capture(seq(text('\\Q'))),
      beginCaptures: {
        1: nameRule(scopeName, RuleName.RegExpGroup, RuleDescriptor.Begin),
      },
      end: alt(
        capture(text('\\E')),
        lookahead(seq(inlineSpaces1(), char(';'))),
        endAnchor(),
      ),
      endCaptures: {
        1: nameRule(scopeName, RuleName.RegExpGroup, RuleDescriptor.End),
      },
    },
    // #endregion raw text

    // #region character classes
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
          match: seq(backslash(), char('^', '-', ']')),
        },
        includeRule(placeholder.commonContentRepository),
      ],
    },
    // #endregion character classes

    // #region anchor
    {
      name: name(scopeName, RuleName.RegExpAnchor),
      match: seq(negativeLookahead(backslash()), char('^', '$')),
    },
    // #endregion anchor

    // #region quantifier
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
    // #endregion quantifier

    includeRule(placeholder.commonContentRepository),
  );
}

interface Placeholder3 {
  regexpEscapeSequences: readonly string[];
  pcreUnicodePropertyCodes: readonly string[];
  pcreUnicodePropertyScripts: readonly string[];
  stringEscapeSequences: readonly string[];
}
export function createRegExpCommonContentRule(scopeName: ScopeName, placeholder: Placeholder3): PatternsRule {
  return patternsRule(
    // shorthand character classes
    {
      name: name(scopeName, RuleName.RegExpCharacterClass),
      match: char('.'),
    },
    {
      // shorthand unicode character properties e.g. `\pL`
      name: name(scopeName, RuleName.RegExpCharacterClass),
      match: capture(seq(
        backslash(),
        char('p', 'P'),
        group(ordalt(...escapeOnigurumaTexts(placeholder.pcreUnicodePropertyCodes.filter((code) => code.length === 1)))),
        lookahead(wordBound()),
      )),
    },
    {
      // unicode character properties e.g. `\p{Cc}`
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

    // escape sequences
    {
      // regexp escape sequences
      name: name(scopeName, StyleName.Escape),
      match: ordalt(...escapeOnigurumaTexts(placeholder.regexpEscapeSequences)),
    },
    {
      name: name(scopeName, StyleName.Escape),
      match: backslash(),
    },
    {
      // string escape sequences
      name: name(scopeName, StyleName.Escape),
      match: ordalt(...escapeOnigurumaTexts(placeholder.stringEscapeSequences)),
    },
    {
      name: name(scopeName, StyleName.Escape),
      match: char('`'),
    },
  );
}
