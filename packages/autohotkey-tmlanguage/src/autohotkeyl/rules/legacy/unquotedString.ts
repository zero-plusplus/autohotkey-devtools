import { Repository, RuleName, StyleName } from '../../../constants';
import { alt, capture, char, chars0, endAnchor, ignoreCase, inlineSpace, inlineSpaces0, lookahead, lookbehind, negChars0, negChars1, numbers1, optional, optseq, seq } from '../../../oniguruma';
import type { MatchRule, Rule, ScopeName } from '../../../types';
import { includeRule, name, patternsRule } from '../../../utils';

interface Placeholder_UnquotedStringRule {
  stringRuleName: RuleName;
  stringPattern: string;
  additionalRules?: Rule[];
  escapeSequenceRepository?: Repository;
}
export function createUnquotedStringRule(scopeName: ScopeName, placeholder: Placeholder_UnquotedStringRule): MatchRule {
  return {
    match: seq(inlineSpaces0(), capture(placeholder.stringPattern)),
    captures: {
      1: patternsRule(
        includeRule(Repository.Dereference),
        ...(placeholder.additionalRules ?? []),

        includeRule(placeholder.escapeSequenceRepository ?? Repository.UnquotedStringEscapeSequence),
        {
          name: name(scopeName, placeholder.stringRuleName),
          match: negChars1('`', '%'),
        },
      ),
    },
  };
}

// #region helpers
interface Placeholder_SpacedArgumentTextRule {
  stringRuleName: RuleName;
  additionalRules?: Rule[];
}
export function createSpacedArgumentTextRule(scopeName: ScopeName, placeholder: Placeholder_SpacedArgumentTextRule): MatchRule {
  return {
    match: seq(
      lookbehind(alt(
        inlineSpace(),
        char(','),
      )),
      capture(negChars1('\\s')),
      lookahead(alt(
        inlineSpace(),
        char(','),
        endAnchor(),
      )),
    ),
    captures: {
      1: patternsRule(
        includeRule(Repository.Dereference),
        ...(placeholder.additionalRules ?? []),

        includeRule(Repository.UnquotedStringEscapeSequence),
        {
          name: name(scopeName, placeholder.stringRuleName),
          match: negChars1('`', inlineSpace()),
        },
      ),
    },
  };
}

interface Placeholder_ArgumentNumberRules {
  unaryOperator?: readonly string[];
}
export function createNumberRule(scopeName: ScopeName, placeholder: Placeholder_ArgumentNumberRules = {}): MatchRule {
  return {
    match: seq(
      lookbehind(alt(
        inlineSpace(),
        char(','),
      )),
      ...(placeholder.unaryOperator ? [ optional(capture(char(...placeholder.unaryOperator))) ] : []),
      capture(alt(
        seq(ignoreCase('0x'), chars0('0-9', 'a-f', 'A-F')),
        seq(
          numbers1(),
          optseq(char('.'), numbers1()),
          optseq(
            ignoreCase('E'),
            optional(char('+', '-')),
            numbers1(),
          ),
        ),
      )),
      lookahead(alt(
        inlineSpace(),
        char(','),
        endAnchor(),
      )),
    ),
    captures: placeholder.unaryOperator
      ? {
        1: patternsRule(includeRule(Repository.Operator)),
        2: patternsRule(includeRule(Repository.Number)),
      }
      : {
        1: patternsRule(includeRule(Repository.Number)),
      },
  };
}

interface Placeholder_AllowArgumentRule {
  stringRuleName: RuleName;
  stringPattern: string;
  allowRules: Rule[];
}
export function createAllowArgumentRule(scopeName: ScopeName, placeholder: Placeholder_AllowArgumentRule): MatchRule {
  return createSpacedArgumentTextRule(scopeName, {
    ...placeholder,
    additionalRules: [
      ...placeholder.allowRules,
      {
        name: name(scopeName, placeholder.stringRuleName, StyleName.Invalid),
        match: negChars0('`', inlineSpace()),
      },
    ],
  });
}
// #endregion helpers
