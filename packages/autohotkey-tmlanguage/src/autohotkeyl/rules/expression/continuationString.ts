import { Repository, RuleDescriptor, RuleName, StyleName } from '../../../constants';
import { alt, anyChars0, anyChars1, capture, char, endAnchor, group, ignoreCase, inlineSpace, inlineSpaces0, inlineSpaces1, lookahead, lookbehind, many0, negativeLookahead, negChar, negChars0, optseq, ordalt, seq, startAnchor, whitespace } from '../../../oniguruma';
import type { BeginEndRule, ElementName, ScopeName } from '../../../types';
import { includeRule, name, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  endAnchor: string;
  quoteChar: string;
  stringElementName: ElementName;
  stringContentRepository: Repository;
}
export function createContinuationString(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return {
    begin: seq(
      capture(char(placeholder.quoteChar)),
      capture(many0(alt(
        seq(inlineSpace(), negativeLookahead(char(';'))),
        seq(negChar(';')),
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
      2: patternsRule(includeRule(placeholder.stringContentRepository)),
      3: patternsRule(includeRule(Repository.InLineComment)),
    },
    end: seq(
      startAnchor(),
      inlineSpaces0(),
      capture(char(')')),
      capture(char(placeholder.quoteChar)),
    ),
    endCaptures: {
      1: nameRule(scopeName, RuleName.CloseParen),
      2: nameRule(scopeName, placeholder.stringElementName, RuleDescriptor.End),
    },
    patterns: [
      {
        match: capture(seq(
          startAnchor(),
          inlineSpaces0(),
          char('('),
          anyChars0(),
          endAnchor(),
        )),
        captures: {
          1: patternsRule(includeRule(Repository.ContinuationStringOptions)),
        },
      },
      {
        name: name(scopeName, placeholder.stringElementName),
        match: anyChars1(),
        patterns: [ includeRule(placeholder.stringContentRepository) ],
      },
    ],
  };
}

// [options](https://www.autohotkey.com/docs/v1/Scripts.htm#Join)
export function createContinuationStringOptionsRule(scopeName: ScopeName): BeginEndRule {
  return {
    begin: seq(
      startAnchor(),
      inlineSpaces0(),
      capture(char('(')),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.OpenParen),
      2: nameRule(scopeName, RuleName.ContinuationOption, StyleName.Strong),
    },
    end: endAnchor(),
    patterns: [
      includeRule(Repository.InLineComment),

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
