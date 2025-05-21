import { Repository, RuleDescriptor, RuleName, StyleName } from '../../../constants';
import {
  alt, anyChars0, capture, char, endAnchor, group, groupMany0, ignoreCase, inlineSpace,
  inlineSpaces0, inlineSpaces1, lookahead, lookbehind, many0, negativeLookahead, negChar,
  negChars0, optseq, ordalt, seq, startAnchor, textalt, whitespace,
} from '../../../oniguruma';
import type { BeginEndRule, ElementName, MatchRule, Repositories, Rule, ScopeName } from '../../../types';
import { includeRule, name, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  endAnchor: string;
  escapedQuotePattern: string;
  escapeSequences: readonly string[];
}
export function createDoubleStringRepositories(scopeName: ScopeName, placeholder: Placeholder): Repositories {
  const quoteChar = '"';
  const stringElementName = RuleName.DoubleString;

  return {
    [Repository.DoubleString]: createStringRule(scopeName, {
      quoteChar,
      stringElementName,
      escapedQuotePattern: placeholder.escapedQuotePattern,
      escapeSequences: placeholder.escapeSequences,
    }),
    [Repository.ContinuationStringOptions]: createContinuationStringOptionsRule(scopeName),
    [Repository.ContinuationDoubleString]: createContinuationString(scopeName, {
      quoteChar,
      stringElementName,
      endAnchor: placeholder.endAnchor,
      escapedQuotePattern: placeholder.escapedQuotePattern,
      escapeSequences: placeholder.escapeSequences,
    }),
  };
}
export function createSingleStringRepositories(scopeName: ScopeName, placeholder: Placeholder): Repositories {
  const quoteChar = `'`;
  const stringElementName = RuleName.SingleString;

  return {
    [Repository.SingleString]: createStringRule(scopeName, {
      quoteChar,
      stringElementName,
      escapedQuotePattern: placeholder.escapedQuotePattern,
      escapeSequences: placeholder.escapeSequences,
    }),
    [Repository.ContinuationStringOptions]: createContinuationStringOptionsRule(scopeName),
    [Repository.ContinuationSingleString]: createContinuationString(scopeName, {
      quoteChar,
      stringElementName,
      endAnchor: placeholder.endAnchor,
      escapedQuotePattern: placeholder.escapedQuotePattern,
      escapeSequences: placeholder.escapeSequences,
    }),
  };
}

interface Placeholder_StringRule {
  quoteChar: string;
  escapedQuotePattern: string;
  stringElementName: ElementName;
  escapeSequences: readonly string[];
}
export function createStringRule(scopeName: ScopeName, placeholder: Placeholder_StringRule): MatchRule {
  return {
    name: name(scopeName, placeholder.stringElementName),
    match: seq(
      capture(char(placeholder.quoteChar)),
      capture(groupMany0(alt(
        placeholder.escapedQuotePattern,
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

interface Placeholder_ContinuationString {
  endAnchor: string;
  quoteChar: string;
  escapedQuotePattern: string;
  stringElementName: ElementName;
  escapeSequences: readonly string[];
}
export function createContinuationString(scopeName: ScopeName, placeholder: Placeholder_ContinuationString): BeginEndRule {
  const contentRules: Rule[] = [
    {
      name: name(scopeName, StyleName.Escape),
      match: textalt(...placeholder.escapeSequences),
    },
    {
      name: name(scopeName, StyleName.Invalid),
      match: char('`'),
    },
  ];

  return {
    begin: seq(
      capture(char(placeholder.quoteChar)),
      capture(many0(alt(
        placeholder.escapedQuotePattern,
        seq(inlineSpaces1(), negativeLookahead(char(';'))),
        negChar(placeholder.quoteChar, '\\s'),
      ))),
      capture(optseq(
        inlineSpaces1(),
        char(';'),
        anyChars0(),
      )),
      lookahead(placeholder.endAnchor),
    ),
    beginCaptures: {
      1: nameRule(scopeName, placeholder.stringElementName, RuleDescriptor.Begin),
      2: patternsRule(...contentRules),
      3: patternsRule(includeRule(Repository.InLineComments)),
    },
    end: seq(
      startAnchor(),
      inlineSpaces0(),
      capture(seq(
        char(')'),
        char(placeholder.quoteChar),
      )),
    ),
    endCaptures: {
      1: nameRule(scopeName, placeholder.stringElementName, RuleDescriptor.End),
    },
    patterns: [
      {
        name: name(scopeName, placeholder.stringElementName),
        begin: seq(
          startAnchor(),
          inlineSpaces0(),
          char('('),
          capture(anyChars0()),
          endAnchor(),
        ),
        beginCaptures: {
          1: patternsRule(includeRule(Repository.ContinuationStringOptions)),
        },
        end: lookahead(seq(
          startAnchor(),
          inlineSpaces0(),
          char(')'),
          char(placeholder.quoteChar),
        )),
        patterns: contentRules,
      },
    ],
  };
}

// [options](https://www.autohotkey.com/docs/v1/Scripts.htm#Join)
export function createContinuationStringOptionsRule(scopeName: ScopeName): BeginEndRule {
  return {
    begin: lookbehind(seq(
      startAnchor(),
      inlineSpaces0(),
      capture(char('(')),
    )),
    end: endAnchor(),
    patterns: [
      includeRule(Repository.InLineComments),

      // [options](https://www.autohotkey.com/docs/v1/Scripts.htm#Join)
      {
        match: seq(
          lookbehind(alt(inlineSpace(), char('('))),
          inlineSpaces0(),
          capture(alt(
            group(alt(
              ignoreCase('LTrim'),
              ignoreCase('RTrim0'),
              ignoreCase(ordalt('Comments', 'Comment', 'Com', 'C')),
              char('%', ',', '`'),
            )),
            group(seq(ignoreCase('Join'), negChars0(whitespace()))),
          )),
          lookahead(alt(inlineSpace(), endAnchor())),
        ),
        captures: {
          1: nameRule(scopeName, RuleName.ContinuationOption, StyleName.Strong),
        },
      },
      // invalid options
      {
        name: name(scopeName, RuleName.ContinuationOption, StyleName.Invalid),
        match: negChar('\\s'),
      },
    ],
  };
}
