import { Repository, RuleName } from '../../constants';
import { alt, anyChar, capture, char, charRange, endAnchor, escapeOnigurumaTexts, group, groupMany1, ignoreCase, inlineSpaces0, inlineSpaces1, lookahead, lookbehind, many0, many1, manyRange, negativeLookahead, negativeLookbehind, negChar, number, numbers0, numbers1, opt, ordalt, seq, whitespace, wordBound } from '../../oniguruma';
import type { BeginEndRule, MatchRule, PatternsRule, Repositories, ScopeName } from '../../types';
import { createUtilities } from '../../utils';

export const integer: string = alt(
  seq(charRange('1', '9'), numbers0()),
  char('0'),
);
export const hexPrefix: string = seq(char('0'), ignoreCase(char('x')));
export const hexValue: string = groupMany1(alt(
  charRange('0', '9'),
  charRange('a', 'f'),
  charRange('A', 'F'),
));
export const hex: string = seq(hexPrefix, hexValue);

export function createLiteralRepositories(scopeName: ScopeName): Repositories {
  const { getOperators, getVariableParts, getEscapeSequencesInfo, getBuiltInVariableNames, includeRule, name, nameRule } = createUtilities(scopeName);
  const operators = getOperators();

  const endLine = alt(
    seq(inlineSpaces1(), char(';')),
    seq(inlineSpaces0(), endAnchor()),
  );
  const variableParts = getVariableParts();
  const escapeSequencesInfo = getEscapeSequencesInfo();
  const builtinVariables = getBuiltInVariableNames();

  return {
    [Repository.Expression]: ((): PatternsRule => {
      return {
        patterns: [
          includeRule(Repository.Comma),

          includeRule(Repository.ParenthesizedExpression),
          includeRule(Repository.Literal),
          includeRule(Repository.BuiltInVariable),
          includeRule(Repository.InvalidVariable),
          includeRule(Repository.Variable),
          includeRule(Repository.InvalidDereference),
          includeRule(Repository.Dereference),

          includeRule(Repository.Operator),
        ],
      };
    })(),
    [Repository.ParenthesizedExpression]: ((): BeginEndRule => {
      return {
        name: name(RuleName.ParenthesizedExpression),
        begin: capture(char('(')),
        beginCaptures: {
          1: nameRule(RuleName.OpenParen),
        },
        end: capture(char(')')),
        endCaptures: {
          1: nameRule(RuleName.CloseParen),
        },
        patterns: [ includeRule(Repository.Expression) ],
      };
    })(),

    // #region variable
    [Repository.Variable]: ((): MatchRule => {
      return {
        match: capture(seq(variableParts.headChar, manyRange(variableParts.tailChar, 0, 252))),
        captures: {
          1: nameRule(RuleName.Variable),
        },
      };
    })(),
    [Repository.InvalidVariable]: ((): PatternsRule => {
      return {
        patterns: [
          {
            match: seq(
              capture(numbers1()),
              capture(seq(variableParts.headChar, manyRange(variableParts.tailChar, 0, 252))),
            ),
            captures: {
              1: nameRule(RuleName.Variable, RuleName.Integer, RuleName.InvalidVariable),
              2: nameRule(RuleName.Variable),
            },
          },
          {
            match: seq(
              capture(seq(variableParts.headChar, manyRange(variableParts.tailChar, 252))),
              capture(many1(variableParts.tailChar)),
            ),
            captures: {
              1: nameRule(RuleName.Variable),
              2: nameRule(RuleName.Variable, RuleName.InvalidVariable),
            },
          },
        ],
      };
    })(),
    [Repository.BuiltInVariable]: ((): MatchRule => {
      return {
        match: ignoreCase(seq(
          lookbehind(wordBound()),
          capture(ordalt(...builtinVariables)),
          lookahead(wordBound()),
        )),
        captures: {
          1: nameRule(RuleName.BuiltInVariable),
        },
      };
    })(),
    // #endregion variable

    // #region access
    [Repository.Dereference]: ((): BeginEndRule => {
      const dereferenceContent = negChar('%', whitespace());

      return {
        begin: capture(char('%')),
        beginCaptures: {
          1: nameRule(RuleName.Dereference, RuleName.DereferencePercentBegin),
        },
        end: alt(
          capture(char('%')),
          lookahead(endLine),
        ),
        endCaptures: {
          1: nameRule(RuleName.Dereference, RuleName.DereferencePercentEnd),
        },
        patterns: [
          // %a b c %
          //   ^ ^ ^ invalid
          {
            match: seq(
              capture(many0(dereferenceContent)),
              capture(dereferenceContent),
              inlineSpaces1(),
            ),
            captures: {
              1: {
                name: name(RuleName.Dereference),
                patterns: [
                  includeRule(Repository.BuiltInVariable),
                  includeRule(Repository.Variable),
                ],
              },
              2: nameRule(RuleName.Dereference, RuleName.Variable, RuleName.InvalidDereference),
            },
          },
          // %abc%
          //  ^^^ valid
          {
            name: name(RuleName.Dereference),
            match: capture(many1(dereferenceContent)),
            captures: {
              1: {
                patterns: [
                  includeRule(Repository.BuiltInVariable),
                  includeRule(Repository.Variable),
                ],
              },
            },
          },
        ],
      };
    })(),
    [Repository.InvalidDereference]: ((): PatternsRule => {
      const dereferenceContent = negChar('%', whitespace());

      return {
        patterns: [
          // %%
          //  ^ missing
          {
            match: seq(
              capture(char('%')),
              capture(char('%')),
            ),
            captures: {
              1: nameRule(RuleName.Dereference, RuleName.DereferencePercentBegin, RuleName.InvalidDereferencePercent),
              2: nameRule(RuleName.Dereference, RuleName.DereferencePercentEnd, RuleName.InvalidDereferencePercent),
            },
          },
          // %
          //  ^ missing
          {
            match: seq(
              capture(char('%')),
              lookahead(endLine),
            ),
            captures: {
              1: nameRule(RuleName.Dereference, RuleName.DereferencePercentBegin, RuleName.InvalidDereferencePercent),
            },
          },
          // %abc
          //     ^ missing
          {
            match: seq(
              capture(char('%')),
              capture(many0(dereferenceContent)),
              capture(dereferenceContent),
              lookahead(endLine),
            ),
            captures: {
              1: nameRule(RuleName.Dereference, RuleName.DereferencePercentBegin),
              2: {
                name: name(RuleName.Dereference),
                patterns: [
                  includeRule(Repository.BuiltInVariable),
                  includeRule(Repository.Variable),
                ],
              },
              3: nameRule(RuleName.Dereference, RuleName.Variable, RuleName.InvalidDereference),
            },
          },
        ],
      };
    })(),
    // #endregion access

    // #region literal
    [Repository.Literal]: ((): PatternsRule => {
      return {
        patterns: [
          includeRule(Repository.DoubleString),
          includeRule(Repository.Number),
        ],
      };
    })(),

    // #region string
    [Repository.String]: ((): PatternsRule => {
      return {
        patterns: [ includeRule(Repository.DoubleString) ],
      };
    })(),
    [Repository.DoubleString]: ((): BeginEndRule => {
      const quote = char('"');
      return {
        name: name(RuleName.DoubleString),
        begin: seq(negativeLookbehind(quote), capture(quote)),
        beginCaptures: {
          1: nameRule(RuleName.StringBegin),
        },
        end: seq(capture(quote), negativeLookahead(quote)),
        endCaptures: {
          1: nameRule(RuleName.StringEnd),
        },
        patterns: [
          includeRule(Repository.InvalidStringContent),
          includeRule(Repository.DoubleStringEscapeSequence),
        ],
      };
    })(),
    [Repository.InvalidStringContent]: ((): MatchRule => {
      return {
        match: seq(
          capture(anyChar()),
          inlineSpaces0(),
          lookahead(endAnchor()),
        ),
        captures: {
          1: nameRule(RuleName.InvalidSingleLineStringContent),
        },
      };
    })(),
    [Repository.DoubleStringEscapeSequence]: ((): MatchRule => {
      return {
        name: name(RuleName.DoubleStringEscapeSequence),
        match: seq(
          capture(ordalt(...escapeSequencesInfo.doubleQuote)),
          negativeLookahead(endAnchor()),
        ),
      };
    })(),
    // #endregion string

    // #region number
    [Repository.Number]: ((): PatternsRule => {
      return {
        patterns: [
          includeRule(Repository.Integer),
          includeRule(Repository.InvalidFloat),
          includeRule(Repository.Float),
          includeRule(Repository.InvalidHex),
          includeRule(Repository.Hex),
          includeRule(Repository.InvalidScientificNotation),
          includeRule(Repository.ScientificNotation),
        ],
      };
    })(),
    [Repository.Integer]: ((): MatchRule => {
      return {
        match: seq(
          lookbehind(wordBound()),
          capture(numbers1()),
          negativeLookahead(char('.')),
          lookahead(wordBound()),
        ),
        captures: {
          1: nameRule(RuleName.Integer),
        },
      };
    })(),
    [Repository.Float]: ((): MatchRule => {
      return {
        name: name(RuleName.Float),
        match: seq(
          lookbehind(wordBound()),
          capture(numbers1()),
          capture(char('.')),
          capture(numbers1()),
          lookahead(wordBound()),
        ),
        captures: {
          1: nameRule(RuleName.Integer),
          2: nameRule(RuleName.DecimalPoint),
          3: nameRule(RuleName.DecimalPart),
        },
      };
    })(),
    [Repository.InvalidFloat]: ((): PatternsRule => {
      return {
        patterns: [
          {
            name: name(RuleName.Float),
            match: seq(
              lookbehind(wordBound()),
              capture(numbers1()),
              capture(char('.')),
              negativeLookahead(number()),
            ),
            captures: {
              1: nameRule(RuleName.Integer),
              2: nameRule(RuleName.DecimalPoint, RuleName.InvalidNumber),
            },
          },
        ],
      };
    })(),
    [Repository.Hex]: ((): MatchRule => {
      return {
        name: name(RuleName.Hex),
        match: seq(
          lookbehind(wordBound()),
          capture(hexPrefix),
          capture(hexValue),
          lookahead(wordBound()),
        ),
        captures: {
          1: nameRule(RuleName.HexPrefix),
          2: nameRule(RuleName.HexValue),
        },
      };
    })(),
    [Repository.InvalidHex]: ((): PatternsRule => {
      return {
        patterns: [
          {
            match: seq(
              capture(numbers1()),
              capture(seq(
                capture(hexPrefix),
                opt(capture(hexValue)),
              )),
            ),
            captures: {
              1: nameRule(RuleName.HexPrefix, RuleName.InvalidNumber),
              2: nameRule(RuleName.Hex),
              3: nameRule(RuleName.HexPrefix),
              4: nameRule(RuleName.HexValue),
            },
          },
          {
            match: ignoreCase(seq(
              capture(char('0')),
              capture(char('x')),
              negativeLookahead(hexValue),
            )),
            captures: {
              1: nameRule(RuleName.Hex, RuleName.HexPrefix),
              2: nameRule(RuleName.Hex, RuleName.HexPrefix, RuleName.InvalidNumber),
            },
          },
          {
            match: ignoreCase(seq(
              capture(hexPrefix),
              capture(hexValue),
              capture(seq(char('.'), numbers0())),
            )),
            captures: {
              1: nameRule(RuleName.Hex, RuleName.HexPrefix),
              2: nameRule(RuleName.Hex, RuleName.HexValue),
              3: nameRule(RuleName.DecimalPoint, RuleName.InvalidNumber),
            },
          },
        ],
      };
    })(),
    [Repository.ScientificNotation]: ((): MatchRule => {
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
          1: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.Integer),
          2: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint),
          3: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart),
          4: nameRule(RuleName.ScientificNotation, RuleName.Integer),
          5: nameRule(RuleName.ScientificNotation, RuleName.ENotation),
          6: nameRule(RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign),
          7: nameRule(RuleName.ScientificNotation, RuleName.Exponent),
        },
      };
    })(),
    [Repository.InvalidScientificNotation]: ((): PatternsRule => {
      return {
        patterns: [
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
              1: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.Integer),
              2: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint),
              3: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart),
              4: nameRule(RuleName.ScientificNotation, RuleName.Integer),
              5: nameRule(RuleName.ScientificNotation, RuleName.ENotation),
              6: nameRule(RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign),
              7: nameRule(RuleName.ScientificNotation, RuleName.Exponent),
              8: nameRule(RuleName.ScientificNotation, RuleName.DecimalPart, RuleName.InvalidNumber),
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
              1: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.Integer),
              2: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint),
              3: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart),
              4: nameRule(RuleName.ScientificNotation, RuleName.Integer),
              5: nameRule(RuleName.ScientificNotation, RuleName.ENotation),
              6: nameRule(RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign, RuleName.InvalidNumber),
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
              1: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.Integer),
              2: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint),
              3: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart),
              4: nameRule(RuleName.ScientificNotation, RuleName.Integer),
              5: nameRule(RuleName.ScientificNotation, RuleName.ENotation, RuleName.InvalidNumber),
            },
          },
        ],
      };
    })(),
    // #endregion number
    // #endregion literal

    // #region token
    [Repository.Comma]: ((): MatchRule => {
      return {
        name: name(RuleName.Comma),
        match: char(','),
      };
    })(),
    [Repository.Operator]: ((): MatchRule => {
      return {
        name: name(RuleName.Operator),
        match: ignoreCase(ordalt(...escapeOnigurumaTexts(operators.filter((operator) => operator !== ',')))),
      };
    })(),
    // #endregion token
  };
}
