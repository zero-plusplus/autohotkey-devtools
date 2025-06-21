import {
  alt, anyChars1, capture, char, chars0, endAnchor, ignoreCase, inlineSpace, inlineSpaces0, lookahead,
  lookbehind, negChars0, negChars1, numbers1, optional, optseq, ordalt, seq, textalt,
} from '../../../oniguruma';
import {
  includeRule, name, patternsRule, Repository, RuleName, StyleName,
  type MatchRule, type Rule, type ScopeName,
} from '../../../tmlanguage';

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
export function createBooleanLike(scopeName: ScopeName, placeholder: Placeholder_UnquotedStringRule): MatchRule {
  return {
    match: seq(inlineSpaces0(), capture(placeholder.stringPattern)),
    captures: {
      1: patternsRule(
        {
          match: capture(ignoreCase(ordalt('true', 'false', '0', '1'))),
          captures: {
            1: patternsRule(includeRule(Repository.Expression)),
          },
        },
        {
          name: name(scopeName, RuleName.UnquotedString, StyleName.Invalid),
          match: anyChars1(),
        },
      ),
    },
  };
}
export function createUnquotedEscapeSequencesRule(scopeName: ScopeName, escapeSequences: readonly string[]): MatchRule {
  return {
    name: name(scopeName, RuleName.UnquotedString, StyleName.Escape),
    match: textalt(...escapeSequences),
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
        includeRule(Repository.DereferenceUnaryOperator),
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
      optional(capture(char(...placeholder.unaryOperator ?? [ '+', '-' ]))),
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
    captures: {
      1: patternsRule(includeRule(Repository.Operator)),
      2: patternsRule(includeRule(Repository.Number)),
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
