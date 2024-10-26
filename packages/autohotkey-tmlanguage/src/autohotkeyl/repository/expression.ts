import { builtinVaribles_v1, Repository, RuleName } from '../../constants';
import { alt, capture, char, charRange, escapeOnigurumaTexts, group, groupMany1, ignoreCase, lookahead, lookbehind, negativeLookahead, number, numbers0, numbers1, opt, ordalt, seq, wordBound } from '../../oniguruma';
import type { MatchRule, PatternsRule, Repositories, ScopeName } from '../../types';
import { createUtilities, getEscapeSequencesInfo, getOperators, getVariableParts, patternsRule } from '../../utils';
import * as v1 from '../rules';

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
  const { includeRule, name, nameRule } = createUtilities(scopeName);

  const operatorTokens = getOperators(scopeName);
  const operators = ignoreCase(ordalt(...escapeOnigurumaTexts(operatorTokens.filter((operator) => operator !== ','))));

  const variableParts = getVariableParts(scopeName);
  const escapeSequencesInfo = getEscapeSequencesInfo(scopeName);

  return {
    [Repository.Expression]: v1.createExpressionRule(),
    [Repository.ParenthesizedExpression]: v1.createParenthesizedExpressionRule(scopeName),

    // #region variable
    [Repository.Variable]: v1.createVariableRule(scopeName, variableParts.headChar, variableParts.tailChar),
    [Repository.InvalidVariable]: v1.createInvalidVariableRule(scopeName, variableParts.headChar, variableParts.tailChar),
    [Repository.BuiltInVariable]: v1.createBuiltinVariableRule(scopeName, [ ...builtinVaribles_v1 ]),
    // #endregion variable

    // #region access
    [Repository.Dereference]: v1.createDereferenceRule(scopeName),
    [Repository.InvalidDereference]: v1.createInvalidDereferenceRule(scopeName),
    // #endregion access

    // #region literal
    [Repository.Literal]: ((): PatternsRule => {
      return patternsRule(
        includeRule(Repository.DoubleString),
        includeRule(Repository.Number),
      );
    })(),

    // #region string
    [Repository.String]: patternsRule(includeRule(Repository.DoubleString)),
    [Repository.DoubleString]: v1.createStringRule(scopeName, '"', escapeSequencesInfo.doubleQuote),
    // #endregion string

    // #region number
    [Repository.Number]: ((): PatternsRule => {
      return patternsRule(
        includeRule(Repository.Integer),
        includeRule(Repository.InvalidFloat),
        includeRule(Repository.Float),
        includeRule(Repository.InvalidHex),
        includeRule(Repository.Hex),
        includeRule(Repository.InvalidScientificNotation),
        includeRule(Repository.ScientificNotation),
      );
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
      return patternsRule({
        name: name(RuleName.Float),
        match: seq(
          lookbehind(wordBound()),
          capture(numbers1()),
          capture(char('.')),
          negativeLookahead(number()),
        ),
        captures: {
          1: nameRule(RuleName.Integer),
          2: nameRule(RuleName.DecimalPoint, RuleName.Invalid),
        },
      });
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
            1: nameRule(RuleName.HexPrefix, RuleName.Invalid),
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
            2: nameRule(RuleName.Hex, RuleName.HexPrefix, RuleName.Invalid),
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
            3: nameRule(RuleName.DecimalPoint, RuleName.Invalid),
          },
        },
      );
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
            1: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.Integer),
            2: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPoint),
            3: nameRule(RuleName.ScientificNotation, RuleName.Float, RuleName.DecimalPart),
            4: nameRule(RuleName.ScientificNotation, RuleName.Integer),
            5: nameRule(RuleName.ScientificNotation, RuleName.ENotation),
            6: nameRule(RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign),
            7: nameRule(RuleName.ScientificNotation, RuleName.Exponent),
            8: nameRule(RuleName.ScientificNotation, RuleName.DecimalPart, RuleName.Invalid),
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
            6: nameRule(RuleName.ScientificNotation, RuleName.ExponentPlusMinusSign, RuleName.Invalid),
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
            5: nameRule(RuleName.ScientificNotation, RuleName.ENotation, RuleName.Invalid),
          },
        },
      );
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
        match: operators,
      };
    })(),
    // #endregion token
  };
}
