import { RuleName } from '../../../constants';
import { alt, capture, char, charRange, group, groupMany1, ignoreCase, lookahead, lookbehind, negativeLookahead, number, numbers0, numbers1, opt, seq, wordBound } from '../../../oniguruma';
import type { MatchRule, PatternsRule, ScopeName } from '../../../types';
import { name, nameRule, patternsRule } from '../../../utils';

const integer: string = alt(
  seq(charRange('1', '9'), numbers0()),
  char('0'),
);
const hexPrefix: string = seq(char('0'), ignoreCase(char('x')));
const hexValue: string = groupMany1(alt(
  charRange('0', '9'),
  charRange('a', 'f'),
  charRange('A', 'F'),
));

export function createIntegerRule(scopeName: ScopeName): MatchRule {
  return {
    match: seq(
      lookbehind(wordBound()),
      capture(numbers1()),
      negativeLookahead(char('.')),
      lookahead(wordBound()),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.Integer),
    },
  };
}
export function createFloatRule(scopeName: ScopeName): MatchRule {
  return {
    name: name(scopeName, RuleName.Float),
    match: seq(
      lookbehind(wordBound()),
      capture(numbers1()),
      capture(char('.')),
      capture(numbers1()),
      lookahead(wordBound()),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.Integer),
      2: nameRule(scopeName, RuleName.DecimalPoint),
      3: nameRule(scopeName, RuleName.DecimalPart),
    },
  };
}
export function createInvalidFloatRule(scopeName: ScopeName): PatternsRule {
  return patternsRule({
    name: name(scopeName, RuleName.Float),
    match: seq(
      lookbehind(wordBound()),
      capture(numbers1()),
      capture(char('.')),
      negativeLookahead(number()),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.Integer),
      2: nameRule(scopeName, RuleName.DecimalPoint, RuleName.Invalid),
    },
  });
}
export function createHexRule(scopeName: ScopeName): MatchRule {
  return {
    name: name(scopeName, RuleName.Hex),
    match: seq(
      lookbehind(wordBound()),
      capture(hexPrefix),
      capture(hexValue),
      lookahead(wordBound()),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.HexPrefix),
      2: nameRule(scopeName, RuleName.HexValue),
    },
  };
}
export function createInvalidHexRule(scopeName: ScopeName): PatternsRule {
  return patternsRule(
    {
      match: seq(
        capture(numbers1()),
        capture(seq(
          capture(hexPrefix),
          opt(capture(hexValue)),
        )),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.HexPrefix, RuleName.Invalid),
        2: nameRule(scopeName, RuleName.Hex),
        3: nameRule(scopeName, RuleName.HexPrefix),
        4: nameRule(scopeName, RuleName.HexValue),
      },
    },
    {
      match: ignoreCase(seq(
        capture(char('0')),
        capture(char('x')),
        negativeLookahead(hexValue),
      )),
      captures: {
        1: nameRule(scopeName, RuleName.Hex, RuleName.HexPrefix),
        2: nameRule(scopeName, RuleName.Hex, RuleName.HexPrefix, RuleName.Invalid),
      },
    },
    {
      match: ignoreCase(seq(
        capture(hexPrefix),
        capture(hexValue),
        capture(seq(char('.'), numbers0())),
      )),
      captures: {
        1: nameRule(scopeName, RuleName.Hex, RuleName.HexPrefix),
        2: nameRule(scopeName, RuleName.Hex, RuleName.HexValue),
        3: nameRule(scopeName, RuleName.DecimalPoint, RuleName.Invalid),
      },
    },
  );
}
export function createScientificNotationRule(scopeName: ScopeName): MatchRule {
  return {
    match: seq(
      lookbehind(wordBound()),
      group(alt(
        seq(capture(integer), capture(char('.')), capture(numbers1())),
        capture(integer),
      )),
      capture(ignoreCase(char('e'))),
      opt(capture(char('+', '-'))),
      capture(numbers1()),
      lookahead(wordBound()),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.Integer),
      2: nameRule(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint),
      3: nameRule(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart),
      4: nameRule(scopeName, RuleName.ScientificNotation, RuleName.Integer),
      5: nameRule(scopeName, RuleName.ScientificNotation, RuleName.ENotation),
      6: nameRule(scopeName, RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign),
      7: nameRule(scopeName, RuleName.ScientificNotation, RuleName.Exponent),
    },
  };
}
export function createInvalidScientificNotationRule(scopeName: ScopeName): PatternsRule {
  return patternsRule(
    // 123.0e+1.
    //         ^ Invalid
    {
      match: seq(
        lookbehind(wordBound()),
        group(alt(
          seq(capture(integer), capture(char('.')), capture(numbers1())),
          capture(integer),
        )),
        capture(ignoreCase(char('e'))),
        opt(capture(char('+', '-'))),
        capture(numbers1()),
        capture(char('.')),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.Integer),
        2: nameRule(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint),
        3: nameRule(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart),
        4: nameRule(scopeName, RuleName.ScientificNotation, RuleName.Integer),
        5: nameRule(scopeName, RuleName.ScientificNotation, RuleName.ENotation),
        6: nameRule(scopeName, RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign),
        7: nameRule(scopeName, RuleName.ScientificNotation, RuleName.Exponent),
        8: nameRule(scopeName, RuleName.ScientificNotation, RuleName.DecimalPart, RuleName.Invalid),
      },
    },
    // 123.0e+
    //        ^ Missing
    {
      match: seq(
        lookbehind(wordBound()),
        group(alt(
          seq(capture(integer), capture(char('.')), capture(numbers1())),
          capture(integer),
        )),
        capture(ignoreCase(char('e'))),
        capture(char('+', '-')),
        negativeLookahead(number()),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.Integer),
        2: nameRule(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint),
        3: nameRule(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart),
        4: nameRule(scopeName, RuleName.ScientificNotation, RuleName.Integer),
        5: nameRule(scopeName, RuleName.ScientificNotation, RuleName.ENotation),
        6: nameRule(scopeName, RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign, RuleName.Invalid),
      },
    },
    // 123.0e
    //       ^ Missing
    {
      match: seq(
        lookbehind(wordBound()),
        group(alt(
          seq(capture(integer), capture(char('.')), capture(numbers1())),
          capture(integer),
        )),
        capture(ignoreCase(char('e'))),
        negativeLookahead(alt(char('+', '-'), number())),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.Integer),
        2: nameRule(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint),
        3: nameRule(scopeName, RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart),
        4: nameRule(scopeName, RuleName.ScientificNotation, RuleName.Integer),
        5: nameRule(scopeName, RuleName.ScientificNotation, RuleName.ENotation, RuleName.Invalid),
      },
    },
  );
}
